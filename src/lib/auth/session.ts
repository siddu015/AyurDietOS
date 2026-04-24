import { cookies } from 'next/headers';
import { randomBytes } from 'crypto';
import { createSession, deleteSession, getSession } from '@/lib/db';

const COOKIE_NAME = 'ayurdiet_session';
const TTL_MS = 1000 * 60 * 60 * 24 * 30; // 30 days

function mintToken(): string {
    return randomBytes(32).toString('base64url');
}

/**
 * Create a session for the user and set an HTTP-only cookie.
 * Returns the issued token (do not expose to clients).
 */
export async function issueSession(userId: string): Promise<string> {
    const token = mintToken();
    createSession(userId, token, TTL_MS);
    const cookieStore = await cookies();
    cookieStore.set({
        name: COOKIE_NAME,
        value: token,
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: Math.floor(TTL_MS / 1000),
    });
    return token;
}

/** Read the signed-in user's id from the session cookie, or null. */
export async function getSessionUserId(): Promise<string | null> {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) return null;
    const sess = getSession(token);
    return sess?.userId ?? null;
}

/** Clear the current session cookie and delete the DB row. */
export async function revokeSession(): Promise<void> {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (token) deleteSession(token);
    cookieStore.delete(COOKIE_NAME);
}

export const SESSION_COOKIE_NAME = COOKIE_NAME;
