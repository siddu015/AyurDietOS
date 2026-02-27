'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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
    login: (email: string) => Promise<boolean>;
    register: (data: { name: string; email: string; age?: number; gender?: string }) => Promise<UserSession>;
    logout: () => void;
    refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<UserSession | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check for stored session on mount
        const storedUserId = localStorage.getItem('ayurdiet_user_id');
        if (storedUserId) {
            fetchUser(storedUserId).then(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, []);

    async function fetchUser(userId: string) {
        try {
            const res = await fetch(`/api/users?id=${userId}`);
            if (res.ok) {
                const data = await res.json();
                setUser(data.user);
            } else {
                localStorage.removeItem('ayurdiet_user_id');
                setUser(null);
            }
        } catch {
            localStorage.removeItem('ayurdiet_user_id');
            setUser(null);
        }
    }

    async function login(email: string): Promise<boolean> {
        try {
            const res = await fetch('/api/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'login', email }),
            });
            if (res.ok) {
                const data = await res.json();
                setUser(data.user);
                localStorage.setItem('ayurdiet_user_id', data.user.id);
                return true;
            }
            return false;
        } catch {
            return false;
        }
    }

    async function register(data: { name: string; email: string; age?: number; gender?: string }): Promise<UserSession> {
        const res = await fetch('/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'register', ...data }),
        });
        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.error || 'Registration failed');
        }
        const result = await res.json();
        setUser(result.user);
        localStorage.setItem('ayurdiet_user_id', result.user.id);
        return result.user;
    }

    function logout() {
        localStorage.removeItem('ayurdiet_user_id');
        setUser(null);
    }

    async function refreshUser() {
        const storedUserId = localStorage.getItem('ayurdiet_user_id');
        if (storedUserId) {
            await fetchUser(storedUserId);
        }
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
