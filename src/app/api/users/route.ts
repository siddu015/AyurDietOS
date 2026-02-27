import { NextRequest, NextResponse } from 'next/server';
import {
    createUser, getUserByEmail, getUserById, updateUser,
    savePrakriti, getLatestPrakriti, saveUserHealth, getUserHealth, getFullProfile
} from '@/lib/db';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const email = searchParams.get('email');

    try {
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
            return NextResponse.json({ user });
        }

        return NextResponse.json({ error: 'Provide id or email' }, { status: 400 });
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
                const { name, email, age, gender } = body;
                if (!name || !email) {
                    return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
                }
                // Check if email already exists
                const existing = getUserByEmail(email);
                if (existing) {
                    return NextResponse.json({ error: 'Email already registered' }, { status: 409 });
                }
                const user = createUser({ name, email, age, gender });
                return NextResponse.json({ user }, { status: 201 });
            }

            case 'login': {
                const { email } = body;
                if (!email) {
                    return NextResponse.json({ error: 'Email is required' }, { status: 400 });
                }
                const user = getUserByEmail(email);
                if (!user) {
                    return NextResponse.json({ error: 'User not found' }, { status: 404 });
                }
                return NextResponse.json({ user });
            }

            case 'update': {
                const { userId, name, age, gender } = body;
                if (!userId) {
                    return NextResponse.json({ error: 'userId is required' }, { status: 400 });
                }
                updateUser(userId, { name, age, gender });
                const user = getUserById(userId);
                return NextResponse.json({ user });
            }

            case 'savePrakriti': {
                const { userId, vata, pitta, kapha, dominant, secondary } = body;
                if (!userId) {
                    return NextResponse.json({ error: 'userId is required' }, { status: 400 });
                }
                const id = savePrakriti({ userId, vata, pitta, kapha, dominant, secondary });
                const prakriti = getLatestPrakriti(userId);
                return NextResponse.json({ id, prakriti }, { status: 201 });
            }

            case 'saveHealth': {
                const { userId, conditions, allergies, dietaryPreferences, weightGoal, calorieTarget, proteinTarget } = body;
                if (!userId) {
                    return NextResponse.json({ error: 'userId is required' }, { status: 400 });
                }
                saveUserHealth({ userId, conditions, allergies, dietaryPreferences, weightGoal, calorieTarget, proteinTarget });
                const health = getUserHealth(userId);
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
