'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    MessageCircle,
    CalendarDays,
    UtensilsCrossed,
    Network,
    User,
    ChevronLeft,
    ChevronRight,
    Leaf,
    LogOut,
    ClipboardList,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
    { href: '/patient/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/patient/chat', label: 'AyurOS Agent', icon: MessageCircle },
    { href: '/patient/meal-log', label: 'Meal Log', icon: ClipboardList },
    { href: '/patient/weekly-plan', label: 'Weekly Plan', icon: CalendarDays },
    { href: '/foods', label: 'Food Browser', icon: UtensilsCrossed },
    { href: '/knowledge-graph', label: 'Knowledge Graph', icon: Network },
    { href: '/patient/profile', label: 'My Profile', icon: User },
];

interface SidebarProps {
    userName?: string;
    onLogout?: () => void;
    collapsed: boolean;
    onToggle: () => void;
}

export const SIDEBAR_W_OPEN = 240;
export const SIDEBAR_W_COLLAPSED = 68;

export function Sidebar({ userName = 'User', onLogout, collapsed, onToggle }: SidebarProps) {
    const pathname = usePathname();

    return (
        <aside
            className={cn(
                'fixed left-0 top-0 h-screen bg-[#1a1a1a] border-r border-white/10 flex flex-col transition-all duration-300 z-40',
                collapsed ? 'w-[68px]' : 'w-[240px]'
            )}
        >
            <div className="flex items-center gap-3 p-4 border-b border-white/10">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#4a7c59] to-[#c9a227] flex items-center justify-center flex-shrink-0">
                    <Leaf className="h-4 w-4 text-white" />
                </div>
                {!collapsed && (
                    <span className="text-lg font-bold text-white tracking-tight">
                        <span className="text-[#4a7c59]">Ayur</span>
                        <span className="text-[#c9a227]">Diet</span>
                    </span>
                )}
            </div>

            <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
                                isActive
                                    ? 'bg-white/10 text-white'
                                    : 'text-white/60 hover:bg-white/5 hover:text-white/90'
                            )}
                            title={collapsed ? item.label : undefined}
                        >
                            <Icon className={cn('h-5 w-5 flex-shrink-0', isActive && 'text-[#c9a227]')} />
                            {!collapsed && <span>{item.label}</span>}
                        </Link>
                    );
                })}
            </nav>

            <div className="border-t border-white/10 p-3">
                {!collapsed && (
                    <div className="flex items-center gap-3 px-2 py-2 mb-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#c9a227] to-[#d35400] flex items-center justify-center flex-shrink-0">
                            <span className="text-xs font-bold text-white">{userName.charAt(0).toUpperCase()}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-white truncate">{userName}</p>
                            <p className="text-xs text-white/50">Signed in</p>
                        </div>
                    </div>
                )}
                {onLogout && (
                    <button
                        onClick={onLogout}
                        className={cn(
                            'flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-white/50 hover:text-white/80 hover:bg-white/5 transition-all w-full',
                        )}
                        title={collapsed ? 'Logout' : undefined}
                    >
                        <LogOut className="h-4 w-4 flex-shrink-0" />
                        {!collapsed && <span>Logout</span>}
                    </button>
                )}
            </div>

            <button
                onClick={onToggle}
                aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-[#2a2a2a] border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-[#3a3a3a] transition-all"
            >
                {collapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
            </button>
        </aside>
    );
}
