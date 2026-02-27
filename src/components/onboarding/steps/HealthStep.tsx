'use client';

import { motion } from 'framer-motion';
import type { OnboardingData } from '../OnboardingWizard';

interface StepProps {
    formData: OnboardingData;
    updateField: (name: string, value: unknown) => void;
    direction: 'next' | 'prev' | null;
}

const HEALTH_CONDITIONS = [
    { id: 'diabetes', label: 'Diabetes', emoji: '🩸' },
    { id: 'obesity', label: 'Obesity', emoji: '⚖️' },
    { id: 'pcod', label: 'PCOD/PCOS', emoji: '🔄' },
    { id: 'hypertension', label: 'Hypertension', emoji: '❤️' },
    { id: 'thyroid', label: 'Thyroid', emoji: '🦋' },
    { id: 'digestive', label: 'Digestive Issues', emoji: '🫃' },
    { id: 'cholesterol', label: 'High Cholesterol', emoji: '🫀' },
    { id: 'joint_pain', label: 'Joint Pain', emoji: '🦴' },
];

const COMMON_ALLERGIES = [
    { id: 'dairy', label: 'Dairy' },
    { id: 'gluten', label: 'Gluten' },
    { id: 'nuts', label: 'Nuts' },
    { id: 'soy', label: 'Soy' },
    { id: 'eggs', label: 'Eggs' },
    { id: 'seafood', label: 'Seafood' },
];

const DIET_PREFERENCES = [
    { id: 'vegetarian', label: 'Vegetarian', emoji: '🥬' },
    { id: 'vegan', label: 'Vegan', emoji: '🌱' },
    { id: 'eggetarian', label: 'Eggetarian', emoji: '🥚' },
    { id: 'non-vegetarian', label: 'Non-Veg', emoji: '🍗' },
    { id: 'jain', label: 'Jain', emoji: '☸️' },
    { id: 'sattvic', label: 'Sattvic', emoji: '🧘' },
];

export function HealthStep({ formData, updateField, direction }: StepProps) {
    const toggleItem = (field: 'conditions' | 'allergies' | 'dietaryPreferences', id: string) => {
        const current = formData[field] as string[];
        const updated = current.includes(id)
            ? current.filter((item) => item !== id)
            : [...current, id];
        updateField(field, updated);
    };

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
            className="space-y-6 max-h-[400px] overflow-y-auto pr-1"
        >
            {/* Health Conditions */}
            <div>
                <label className="block text-sm font-medium text-white/70 mb-3">
                    Health Conditions <span className="text-white/30">(select all that apply)</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                    {HEALTH_CONDITIONS.map((c) => (
                        <button
                            key={c.id}
                            onClick={() => toggleItem('conditions', c.id)}
                            className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 border ${formData.conditions.includes(c.id)
                                    ? 'bg-[#d35400]/15 border-[#d35400]/30 text-[#e67e22]'
                                    : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'
                                }`}
                        >
                            <span>{c.emoji}</span>
                            <span>{c.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Allergies */}
            <div>
                <label className="block text-sm font-medium text-white/70 mb-3">
                    Allergies <span className="text-white/30">(if any)</span>
                </label>
                <div className="flex flex-wrap gap-2">
                    {COMMON_ALLERGIES.map((a) => (
                        <button
                            key={a.id}
                            onClick={() => toggleItem('allergies', a.id)}
                            className={`px-4 py-2 rounded-full text-sm transition-all duration-200 border ${formData.allergies.includes(a.id)
                                    ? 'bg-[#e74c3c]/15 border-[#e74c3c]/30 text-[#e74c3c]'
                                    : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'
                                }`}
                        >
                            {a.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Dietary Preferences */}
            <div>
                <label className="block text-sm font-medium text-white/70 mb-3">
                    Dietary Preference
                </label>
                <div className="grid grid-cols-3 gap-2">
                    {DIET_PREFERENCES.map((p) => (
                        <button
                            key={p.id}
                            onClick={() => toggleItem('dietaryPreferences', p.id)}
                            className={`flex flex-col items-center gap-1 px-3 py-3 rounded-xl text-xs transition-all duration-200 border ${formData.dietaryPreferences.includes(p.id)
                                    ? 'bg-[#4a7c59]/15 border-[#4a7c59]/30 text-[#7ab08a]'
                                    : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'
                                }`}
                        >
                            <span className="text-lg">{p.emoji}</span>
                            <span>{p.label}</span>
                        </button>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
