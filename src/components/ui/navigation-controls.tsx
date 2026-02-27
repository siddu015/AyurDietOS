'use client';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavigationControlsProps {
    currentStep: number;
    totalSteps: number;
    canProceed: boolean;
    isProcessing?: boolean;
    onNext: () => void;
    onPrev: () => void;
    onSubmit: () => void;
    submitText?: string;
    className?: string;
}

export function NavigationControls({
    currentStep,
    totalSteps,
    canProceed,
    isProcessing = false,
    onNext,
    onPrev,
    onSubmit,
    submitText = 'Complete Setup',
    className,
}: NavigationControlsProps) {
    const isFirstStep = currentStep === 0;
    const isLastStep = currentStep === totalSteps - 1;

    return (
        <div className={cn('flex flex-col-reverse sm:flex-row justify-between items-center gap-3 sm:gap-0', className)}>
            {/* Previous Button */}
            <button
                type="button"
                onClick={onPrev}
                disabled={isFirstStep || isProcessing}
                className={cn(
                    'flex items-center gap-2 rounded-xl px-6 py-3 text-base transition-all duration-300 font-medium w-full sm:w-auto',
                    isFirstStep || isProcessing
                        ? 'opacity-0 pointer-events-none'
                        : 'bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white'
                )}
            >
                <ChevronLeft className="h-4 w-4" />
                <span>Back</span>
            </button>

            {isLastStep ? (
                <button
                    type="button"
                    onClick={onSubmit}
                    disabled={!canProceed || isProcessing}
                    className={cn(
                        'flex items-center gap-2 rounded-xl px-6 py-3 text-base transition-all duration-300 font-semibold w-full sm:w-auto',
                        !canProceed || isProcessing
                            ? 'bg-white/5 text-white/40 cursor-not-allowed'
                            : 'bg-gradient-to-br from-[#4a7c59] to-[#c9a227] text-white shadow-lg hover:shadow-xl hover:scale-105'
                    )}
                >
                    {isProcessing ? (
                        <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current" />
                            <span>Processing...</span>
                        </>
                    ) : (
                        <span>{submitText}</span>
                    )}
                </button>
            ) : (
                <button
                    type="button"
                    onClick={onNext}
                    disabled={!canProceed || isProcessing}
                    className={cn(
                        'flex items-center gap-2 rounded-xl px-6 py-3 text-base transition-all duration-300 font-semibold w-full sm:w-auto',
                        !canProceed || isProcessing
                            ? 'bg-white/5 text-white/40 cursor-not-allowed'
                            : 'bg-gradient-to-br from-[#4a7c59] to-[#c9a227] text-white shadow-lg hover:shadow-xl hover:scale-105'
                    )}
                >
                    <span>Next</span>
                    <ChevronRight className="h-4 w-4" />
                </button>
            )}
        </div>
    );
}
