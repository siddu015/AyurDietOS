'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Sidebar } from '@/components/sidebar/Sidebar';

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
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    useEffect(() => {
        const userId = localStorage.getItem('ayurdiet_user_id');
        if (!userId) {
            router.push('/login');
            return;
        }

        fetch(`/api/users?id=${userId}`)
            .then((res) => {
                if (!res.ok) throw new Error('Not found');
                return res.json();
            })
            .then((data) => {
                setUser(data.user);
                setLoading(false);
            })
            .catch(() => {
                localStorage.removeItem('ayurdiet_user_id');
                router.push('/login');
            });
    }, [router]);

    // Listen for sidebar collapse via a custom event from the Sidebar component
    useEffect(() => {
        const handleResize = () => {
            const sidebar = document.querySelector('aside');
            if (sidebar) {
                setSidebarCollapsed(sidebar.clientWidth < 100);
            }
        };

        const observer = new MutationObserver(handleResize);
        const sidebar = document.querySelector('aside');
        if (sidebar) {
            observer.observe(sidebar, { attributes: true, attributeFilter: ['class', 'style'] });
            handleResize();
        }

        return () => observer.disconnect();
    }, [loading]);

    const handleLogout = () => {
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

    return (
        <div className="min-h-screen bg-[#0a0a0a]">
            <Sidebar
                userName={user?.name || 'User'}
                userRole="patient"
                onLogout={handleLogout}
            />
            <main
                className="transition-all duration-300"
                style={{ marginLeft: sidebarCollapsed ? '68px' : '240px' }}
            >
                <div className="p-6 lg:p-8">
                    {/* Page header showing current section */}
                    <div className="mb-8">
                        <p className="text-xs text-white/30 uppercase tracking-wider mb-1">
                            {pathname?.split('/').filter(Boolean).join(' / ')}
                        </p>
                    </div>
                    {children}
                </div>
            </main>
        </div>
    );
}
