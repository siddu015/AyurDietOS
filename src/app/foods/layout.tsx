'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { SidebarLayout } from '@/components/sidebar/SidebarLayout';

export default function FoodsLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const [userName, setUserName] = useState('User');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                const meRes = await fetch('/api/users?me=1', { credentials: 'include' });
                if (meRes.ok) {
                    const data = await meRes.json();
                    if (data?.user) {
                        setIsLoggedIn(true);
                        setUserName(data.user.name);
                        localStorage.setItem('ayurdiet_user_id', data.user.id);
                        return;
                    }
                }
                const stored = localStorage.getItem('ayurdiet_user_id');
                if (stored) {
                    setIsLoggedIn(true);
                    const r = await fetch(`/api/users?id=${stored}`, { credentials: 'include' });
                    if (r.ok) {
                        const d = await r.json();
                        if (d?.user) setUserName(d.user.name);
                    }
                }
            } catch { /* ignore */ }
        })();
    }, []);

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

    if (!isLoggedIn) {
        return <>{children}</>;
    }

    const crumb = pathname?.split('/').filter(Boolean).join(' / ');

    return (
        <SidebarLayout
            userName={userName}
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
