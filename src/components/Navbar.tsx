'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Navbar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname.startsWith(path);
  };

  return (
    <nav className="bg-white border-b border-clay sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full gradient-ayur flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <span className="font-bold text-xl">
                <span className="text-secondary">Ayur</span>
                <span className="text-primary">Diet</span>
                <span className="text-stone">OS</span>
              </span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-1">
            <NavLink href="/patient/dashboard" active={isActive('/patient')}>
              Patient
            </NavLink>
            <NavLink href="/doctor/dashboard" active={isActive('/doctor')}>
              Doctor
            </NavLink>
            <NavLink href="/foods" active={isActive('/foods')}>
              Foods
            </NavLink>
            <NavLink href="/patient/weekly-plan" active={pathname === '/patient/weekly-plan'}>
              Meal Planner
            </NavLink>
            <NavLink href="/knowledge-graph" active={isActive('/knowledge-graph')}>
              Knowledge Graph
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={`
        px-4 py-2 rounded-lg text-sm font-medium transition-colors
        ${active 
          ? 'bg-primary/10 text-primary' 
          : 'text-stone hover:text-foreground hover:bg-sand'
        }
      `}
    >
      {children}
    </Link>
  );
}

