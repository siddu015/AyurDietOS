'use client';

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';

interface UserSession {
    id: string;
    name: string;
    email: string;
    age?: number;
    gender?: string;
}

interface AuthContextType {
    user: UserSession | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<boolean>;
    register: (data: { name: string; email: string; password: string; age?: number; gender?: string }) => Promise<UserSession>;
    logout: () => Promise<void>;
    refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'ayurdiet_user_id';

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<UserSession | null>(null);
    const [loading, setLoading] = useState(true);

    const hydrateFromSession = useCallback(async () => {
        try {
            const res = await fetch('/api/users?me=1', { credentials: 'include' });
            if (res.ok) {
                const data = await res.json();
                if (data.user) {
                    setUser(data.user as UserSession);
                    localStorage.setItem(STORAGE_KEY, data.user.id);
                    return true;
                }
            }
        } catch { /* offline */ }
        return false;
    }, []);

    useEffect(() => {
        (async () => {
            const ok = await hydrateFromSession();
            if (!ok) {
                const stored = localStorage.getItem(STORAGE_KEY);
                if (stored) {
                    try {
                        const res = await fetch(`/api/users?id=${stored}`, { credentials: 'include' });
                        if (res.ok) {
                            const data = await res.json();
                            if (data.user) setUser(data.user as UserSession);
                            else localStorage.removeItem(STORAGE_KEY);
                        } else {
                            localStorage.removeItem(STORAGE_KEY);
                        }
                    } catch { /* ignore */ }
                }
            }
            setLoading(false);
        })();
    }, [hydrateFromSession]);

    async function login(email: string, password: string): Promise<boolean> {
        try {
            const res = await fetch('/api/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ action: 'login', email, password }),
            });
            if (res.ok) {
                const data = await res.json();
                setUser(data.user);
                localStorage.setItem(STORAGE_KEY, data.user.id);
                return true;
            }
            return false;
        } catch {
            return false;
        }
    }

    async function register(data: { name: string; email: string; password: string; age?: number; gender?: string }): Promise<UserSession> {
        const res = await fetch('/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ action: 'register', ...data }),
        });
        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.error || 'Registration failed');
        }
        const result = await res.json();
        setUser(result.user);
        localStorage.setItem(STORAGE_KEY, result.user.id);
        return result.user;
    }

    async function logout() {
        try {
            await fetch('/api/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ action: 'logout' }),
            });
        } catch { /* ignore */ }
        localStorage.removeItem(STORAGE_KEY);
        setUser(null);
    }

    async function refreshUser() {
        await hydrateFromSession();
    }

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout, refreshUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
