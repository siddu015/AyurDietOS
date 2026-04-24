'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Check, X } from 'lucide-react';
import type { OnboardingData } from '../OnboardingWizard';

interface StepProps {
    formData: OnboardingData;
    updateField: (name: string, value: unknown) => void;
    direction: 'next' | 'prev' | null;
}

export function BasicInfoStep({ formData, updateField, direction }: StepProps) {
    const [showPw, setShowPw] = useState(false);

    const variants = {
        initial: { opacity: 0, x: direction === 'next' ? 80 : direction === 'prev' ? -80 : 0, scale: 0.96 },
        animate: { opacity: 1, x: 0, scale: 1 },
        exit: { opacity: 0, x: direction === 'next' ? -80 : direction === 'prev' ? 80 : 0, scale: 0.96 },
    };

    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim());
    const pwLen = formData.password.length;
    const pwStrong = pwLen >= 8;

    return (
        <motion.div
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="space-y-5"
        >
            <div>
                <label className="block text-sm font-medium text-white/70 mb-2">Full Name</label>
                <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => updateField('name', e.target.value)}
                    placeholder="Enter your full name"
                    className="input-dark"
                    autoFocus
                    autoComplete="name"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-white/70 mb-2">Email</label>
                <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    placeholder="your@email.com"
                    className="input-dark"
                    autoComplete="email"
                />
                {formData.email.length > 0 && !emailValid && (
                    <p className="text-xs text-red-400/80 mt-1.5 flex items-center gap-1">
                        <X className="h-3 w-3" /> Enter a valid email address
                    </p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-white/70 mb-2">Password</label>
                <div className="relative">
                    <input
                        type={showPw ? 'text' : 'password'}
                        value={formData.password}
                        onChange={(e) => updateField('password', e.target.value)}
                        placeholder="At least 8 characters"
                        className="input-dark pr-11"
                        autoComplete="new-password"
                        minLength={8}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPw(s => !s)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70"
                        tabIndex={-1}
                        aria-label={showPw ? 'Hide password' : 'Show password'}
                    >
                        {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                </div>
                {pwLen > 0 && (
                    <p className={`text-xs mt-1.5 flex items-center gap-1 ${pwStrong ? 'text-emerald-400/80' : 'text-white/40'}`}>
                        {pwStrong ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                        {pwStrong ? 'Strong enough' : `${pwLen}/8 minimum characters`}
                    </p>
                )}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">Age</label>
                    <input
                        type="number"
                        value={formData.age}
                        onChange={(e) => updateField('age', parseInt(e.target.value) || 0)}
                        min={1}
                        max={120}
                        className="input-dark"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">Gender</label>
                    <div className="flex gap-2">
                        {['male', 'female', 'other'].map((g) => (
                            <button
                                key={g}
                                type="button"
                                onClick={() => updateField('gender', g)}
                                className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${formData.gender === g
                                    ? 'bg-[#c9a227]/20 text-[#c9a227] border border-[#c9a227]/30'
                                    : 'bg-white/5 text-white/50 border border-white/10 hover:bg-white/10'
                                    }`}
                            >
                                {g.charAt(0).toUpperCase() + g.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
