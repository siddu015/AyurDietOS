'use client';
import { cn } from '@/lib/utils';
import React from 'react';

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
    children: React.ReactNode;
    showRadialGradient?: boolean;
}

export const AuroraBackground = ({
    className,
    children,
    showRadialGradient = true,
    ...props
}: AuroraBackgroundProps) => {
    return (
        <div
            className={cn(
                'relative flex flex-col min-h-screen items-center justify-center bg-[#1a1a1a] text-white transition-all',
                className
            )}
            {...props}
        >
            <div className="absolute inset-0 overflow-hidden">
                <div
                    className={cn(
                        `
            [--dark-gradient:repeating-linear-gradient(100deg,#1a1a1a_0%,#1a1a1a_7%,transparent_10%,transparent_12%,#1a1a1a_16%)]
            [--aurora:repeating-linear-gradient(100deg,#c9a22780_0%,#e8d18c60_15%,#4a7c5960_30%,#7ab08a40_45%,#d3540060_60%,#e67e2240_75%,#c9a22780_90%)]
            [background-image:var(--dark-gradient),var(--aurora)]
            [background-size:300%,_250%]
            [background-position:30%_30%,30%_30%]
            after:content-[""] after:absolute after:inset-0 
            after:[background-image:var(--dark-gradient),var(--aurora)]
            after:[background-size:250%,_200%] 
            after:animate-aurora after:[background-attachment:fixed] after:mix-blend-difference
            pointer-events-none
            absolute -inset-[8px] opacity-50 will-change-transform`,
                        showRadialGradient &&
                        `[mask-image:radial-gradient(ellipse_at_85%_15%,black_25%,transparent_70%)]`
                    )}
                />
            </div>
            {children}
        </div>
    );
};
