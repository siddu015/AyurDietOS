'use client';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ProgressIndicatorProps {
    currentStep: number;
    totalSteps: number;
    showPercentage?: boolean;
    showStepText?: boolean;
    className?: string;
}

export function ProgressIndicator({
    currentStep,
    totalSteps,
    showPercentage = true,
    showStepText = true,
    className,
}: ProgressIndicatorProps) {
    const progressPercentage = Math.round(((currentStep + 1) / totalSteps) * 100);

    return (
        <div className={cn('mb-6 sm:mb-8', className)}>
            {(showStepText || showPercentage) && (
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                    {showStepText && (
                        <span className="text-xs sm:text-sm font-medium text-white/70">
                            Step {currentStep + 1} of {totalSteps}
                        </span>
                    )}
                    {showPercentage && (
                        <span className="text-xs sm:text-sm font-medium text-white/70">
                            {progressPercentage}% complete
                        </span>
                    )}
                </div>
            )}

            <div className="w-full h-1 sm:h-1.5 rounded-full bg-white/10">
                <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-[#4a7c59] via-[#c9a227] to-[#d35400]"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercentage}%` }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                />
            </div>
        </div>
    );
}
