'use client';

import { motion } from 'framer-motion';
import type { OnboardingData } from '../OnboardingWizard';

interface StepProps {
    formData: OnboardingData;
    updateField: (name: string, value: unknown) => void;
    direction: 'next' | 'prev' | null;
}

const WEIGHT_GOALS = [
    { id: 'lose', label: 'Lose Weight', emoji: '📉', desc: 'Reduce Kapha, light diet' },
    { id: 'maintain', label: 'Maintain', emoji: '⚖️', desc: 'Balanced approach' },
    { id: 'gain', label: 'Gain Weight', emoji: '📈', desc: 'Build strength, nourishing' },
];

export function GoalsStep({ formData, updateField, direction }: StepProps) {
    const variants = {
        initial: { opacity: 0, x: direction === 'next' ? 80 : -80, scale: 0.96 },
        animate: { opacity: 1, x: 0, scale: 1 },
        exit: { opacity: 0, x: direction === 'next' ? -80 : 80, scale: 0.96 },
    };

    return (
        <motion.div
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="space-y-6"
        >
            {/* Weight Goal */}
            <div>
                <label className="block text-sm font-medium text-white/70 mb-3">Weight Goal</label>
                <div className="grid grid-cols-3 gap-3">
                    {WEIGHT_GOALS.map((goal) => (
                        <button
                            key={goal.id}
                            onClick={() => updateField('weightGoal', goal.id)}
                            className={`flex flex-col items-center gap-2 px-3 py-4 rounded-xl transition-all duration-200 border ${formData.weightGoal === goal.id
                                    ? 'bg-[#c9a227]/15 border-[#c9a227]/30 text-white'
                                    : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'
                                }`}
                        >
                            <span className="text-2xl">{goal.emoji}</span>
                            <span className="text-sm font-medium">{goal.label}</span>
                            <span className="text-xs text-white/40">{goal.desc}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Calorie Target */}
            <div>
                <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium text-white/70">Daily Calorie Target</label>
                    <span className="text-sm font-bold text-[#c9a227]">{formData.calorieTarget} kcal</span>
                </div>
                <input
                    type="range"
                    min={1200}
                    max={3500}
                    step={50}
                    value={formData.calorieTarget}
                    onChange={(e) => updateField('calorieTarget', parseInt(e.target.value))}
                    className="w-full h-1.5 rounded-full bg-white/10 appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#c9a227]"
                />
                <div className="flex justify-between text-xs text-white/30 mt-1">
                    <span>1200</span>
                    <span>3500</span>
                </div>
            </div>

            {/* Protein Target */}
            <div>
                <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium text-white/70">Daily Protein Target</label>
                    <span className="text-sm font-bold text-[#4a7c59]">{formData.proteinTarget}g</span>
                </div>
                <input
                    type="range"
                    min={30}
                    max={200}
                    step={5}
                    value={formData.proteinTarget}
                    onChange={(e) => updateField('proteinTarget', parseInt(e.target.value))}
                    className="w-full h-1.5 rounded-full bg-white/10 appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#4a7c59]"
                />
                <div className="flex justify-between text-xs text-white/30 mt-1">
                    <span>30g</span>
                    <span>200g</span>
                </div>
            </div>

            {/* Summary */}
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <p className="text-xs text-white/40 mb-1">Your personalized plan will be based on:</p>
                <p className="text-sm text-white/70">
                    <span className="text-[#c9a227] font-medium capitalize">{formData.dominant}</span> constitution · {' '}
                    <span className="text-white font-medium">{formData.calorieTarget} kcal</span> / day · {' '}
                    <span className="text-[#4a7c59] font-medium">{formData.proteinTarget}g</span> protein
                </p>
            </div>
        </motion.div>
    );
}
