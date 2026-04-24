'use client';

import { useState, useEffect, ReactNode } from 'react';
import { Sidebar, SIDEBAR_W_OPEN, SIDEBAR_W_COLLAPSED } from './Sidebar';

const STORAGE_KEY = 'ayurdiet_sidebar_collapsed';

interface SidebarLayoutProps {
    userName: string;
    onLogout: () => void;
    children: ReactNode;
    /** Optional breadcrumb/title shown above children */
    header?: ReactNode;
}

export function SidebarLayout({ userName, onLogout, children, header }: SidebarLayoutProps) {
    const [collapsed, setCollapsed] = useState<boolean>(false);
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored === '1') setCollapsed(true);
        } catch { /* ignore */ }
        setHydrated(true);
    }, []);

    useEffect(() => {
        if (!hydrated) return;
        try {
            localStorage.setItem(STORAGE_KEY, collapsed ? '1' : '0');
        } catch { /* ignore */ }
    }, [collapsed, hydrated]);

    const sidebarWidth = collapsed ? SIDEBAR_W_COLLAPSED : SIDEBAR_W_OPEN;

    return (
        <div className="min-h-screen bg-[#0a0a0a]">
            <Sidebar
                userName={userName}
                onLogout={onLogout}
                collapsed={collapsed}
                onToggle={() => setCollapsed(v => !v)}
            />
            <main
                className="transition-[margin] duration-300 ease-out"
                style={{ marginLeft: sidebarWidth }}
            >
                <div className="p-6 lg:p-8">
                    {header}
                    {children}
                </div>
            </main>
        </div>
    );
}
