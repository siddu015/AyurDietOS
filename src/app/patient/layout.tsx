'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { SidebarLayout } from '@/components/sidebar/SidebarLayout';

interface UserData {
    id: string;
    name: string;
    email: string;
}

export default function PatientLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const [user, setUser] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const meRes = await fetch('/api/users?me=1', { credentials: 'include' });
                if (meRes.ok) {
                    const data = await meRes.json();
                    if (data?.user) {
                        setUser(data.user);
                        localStorage.setItem('ayurdiet_user_id', data.user.id);
                        setLoading(false);
                        return;
                    }
                }
                const stored = localStorage.getItem('ayurdiet_user_id');
                if (!stored) {
                    router.push('/login');
                    return;
                }
                const res = await fetch(`/api/users?id=${stored}`, { credentials: 'include' });
                if (!res.ok) throw new Error('Not found');
                const data = await res.json();
                setUser(data.user);
                setLoading(false);
            } catch {
                localStorage.removeItem('ayurdiet_user_id');
                router.push('/login');
            }
        })();
    }, [router]);

    const handleLogout = async () => {
        try {
            await fetch('/api/users', {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'logout' }),
            });
        } catch { /* ignore */ }
        localStorage.removeItem('ayurdiet_user_id');
        router.push('/');
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-10 h-10 rounded-full border-2 border-[#c9a227] border-t-transparent animate-spin" />
                    <p className="text-white/50 text-sm">Loading your profile...</p>
                </div>
            </div>
        );
    }

    const crumb = pathname?.split('/').filter(Boolean).join(' / ');

    return (
        <SidebarLayout
            userName={user?.name || 'User'}
            onLogout={handleLogout}
            header={
                <div className="mb-8">
                    <p className="text-xs text-white/30 uppercase tracking-wider mb-1">{crumb}</p>
                </div>
            }
        >
            {children}
        </SidebarLayout>
    );
}
