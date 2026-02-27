'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Sidebar } from '@/components/sidebar/Sidebar';

export default function DoctorLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const [userName, setUserName] = useState('Doctor');
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    useEffect(() => {
        const userId = localStorage.getItem('ayurdiet_user_id');
        if (userId) {
            fetch(`/api/users?id=${userId}`)
                .then(r => r.ok ? r.json() : null)
                .then(data => { if (data?.user) setUserName(data.user.name); })
                .catch(() => { });
        }
    }, []);

    useEffect(() => {
        const handleResize = () => {
            const sidebar = document.querySelector('aside');
            if (sidebar) setSidebarCollapsed(sidebar.clientWidth < 100);
        };
        const observer = new MutationObserver(handleResize);
        const sidebar = document.querySelector('aside');
        if (sidebar) {
            observer.observe(sidebar, { attributes: true, attributeFilter: ['class', 'style'] });
            handleResize();
        }
        return () => observer.disconnect();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('ayurdiet_user_id');
        router.push('/');
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a]">
            <Sidebar
                userName={userName}
                userRole="doctor"
                onLogout={handleLogout}
            />
            <main
                className="transition-all duration-300"
                style={{ marginLeft: sidebarCollapsed ? '68px' : '240px' }}
            >
                <div className="p-6 lg:p-8">
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
