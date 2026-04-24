import { NextRequest, NextResponse } from 'next/server';
import {
    createUser, getUserByEmail, getUserById, updateUser,
    savePrakriti, getLatestPrakriti, saveUserHealth, getUserHealth, getFullProfile
} from '@/lib/db';
import { hashPassword, verifyPassword } from '@/lib/auth/password';
import { issueSession, revokeSession, getSessionUserId } from '@/lib/auth/session';

/** Strip password_hash from any raw user row before returning. */
function sanitizeUser<T extends Record<string, unknown>>(user: T): Omit<T, 'password_hash'> {
    if (!user) return user;
    const { password_hash: _ph, ...rest } = user as T & { password_hash?: unknown };
    void _ph;
    return rest;
}

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const email = searchParams.get('email');
    const me = searchParams.get('me');

    try {
        if (me === '1') {
            const userId = await getSessionUserId();
            if (!userId) return NextResponse.json({ user: null }, { status: 200 });
            const profile = getFullProfile(userId);
            return NextResponse.json(profile ?? { user: null });
        }

        if (id) {
            const profile = getFullProfile(id);
            if (!profile) {
                return NextResponse.json({ error: 'User not found' }, { status: 404 });
            }
            return NextResponse.json(profile);
        }

        if (email) {
            const user = getUserByEmail(email);
            if (!user) {
                return NextResponse.json({ error: 'User not found' }, { status: 404 });
            }
            return NextResponse.json({ user: sanitizeUser(user) });
        }

        return NextResponse.json({ error: 'Provide id, email, or me=1' }, { status: 400 });
    } catch (error) {
        console.error('User API GET error:', error);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { action } = body;

        switch (action) {
            case 'register': {
                const { name, email, password, age, gender } = body;
                if (!name || typeof name !== 'string' || name.trim().length < 2) {
                    return NextResponse.json({ error: 'Valid name required' }, { status: 400 });
                }
                if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                    return NextResponse.json({ error: 'Valid email required' }, { status: 400 });
                }
                if (!password || typeof password !== 'string' || password.length < 8) {
                    return NextResponse.json({ error: 'Password must be at least 8 characters' }, { status: 400 });
                }
                if (age !== undefined && age !== null && (typeof age !== 'number' || age < 0 || age > 120)) {
                    return NextResponse.json({ error: 'Age must be 0-120' }, { status: 400 });
                }
                const existing = getUserByEmail(email.toLowerCase().trim());
                if (existing) {
                    return NextResponse.json({ error: 'Email already registered' }, { status: 409 });
                }
                const passwordHash = await hashPassword(password);
                const user = createUser({
                    name: name.trim(),
                    email: email.toLowerCase().trim(),
                    passwordHash,
                    age,
                    gender,
                });
                await issueSession(user.id);
                return NextResponse.json({ user: sanitizeUser(user as Record<string, unknown>) }, { status: 201 });
            }

            case 'login': {
                const { email, password } = body;
                if (!email || !password) {
                    return NextResponse.json({ error: 'Email and password required' }, { status: 400 });
                }
                const user = getUserByEmail(String(email).toLowerCase().trim());
                // Uniform error message to avoid account enumeration
                const generic = { error: 'Invalid email or password' };
                if (!user) {
                    return NextResponse.json(generic, { status: 401 });
                }
                const ok = await verifyPassword(String(password), user.password_hash as string | null);
                if (!ok) {
                    return NextResponse.json(generic, { status: 401 });
                }
                await issueSession(user.id as string);
                return NextResponse.json({ user: sanitizeUser(user) });
            }

            case 'logout': {
                await revokeSession();
                return NextResponse.json({ ok: true });
            }

            case 'update': {
                const sessionUserId = await getSessionUserId();
                const { userId, name, age, gender } = body;
                const targetId = userId ?? sessionUserId;
                if (!targetId) {
                    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
                }
                if (sessionUserId && sessionUserId !== targetId) {
                    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
                }
                updateUser(targetId, { name, age, gender });
                const user = getUserById(targetId);
                return NextResponse.json({ user: user ? sanitizeUser(user) : null });
            }

            case 'savePrakriti': {
                const sessionUserId = await getSessionUserId();
                const { userId, vata, pitta, kapha, dominant, secondary } = body;
                const targetId = userId ?? sessionUserId;
                if (!targetId) {
                    return NextResponse.json({ error: 'userId is required' }, { status: 400 });
                }
                if (sessionUserId && sessionUserId !== targetId) {
                    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
                }
                for (const [k, v] of [['vata', vata], ['pitta', pitta], ['kapha', kapha]] as const) {
                    if (typeof v !== 'number' || v < 0 || v > 100) {
                        return NextResponse.json({ error: `${k} must be 0-100` }, { status: 400 });
                    }
                }
                const id = savePrakriti({ userId: targetId, vata, pitta, kapha, dominant, secondary });
                const prakriti = getLatestPrakriti(targetId);
                return NextResponse.json({ id, prakriti }, { status: 201 });
            }

            case 'saveHealth': {
                const sessionUserId = await getSessionUserId();
                const { userId, conditions, allergies, dietaryPreferences, weightGoal, calorieTarget, proteinTarget } = body;
                const targetId = userId ?? sessionUserId;
                if (!targetId) {
                    return NextResponse.json({ error: 'userId is required' }, { status: 400 });
                }
                if (sessionUserId && sessionUserId !== targetId) {
                    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
                }
                saveUserHealth({ userId: targetId, conditions, allergies, dietaryPreferences, weightGoal, calorieTarget, proteinTarget });
                const health = getUserHealth(targetId);
                return NextResponse.json({ health });
            }

            default:
                return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
        }
    } catch (error) {
        console.error('User API POST error:', error);
        const message = error instanceof Error ? error.message : 'Server error';
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
