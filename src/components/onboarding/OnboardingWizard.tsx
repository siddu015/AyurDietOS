'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { AuroraBackground } from '@/components/ui/aurora-background';
import { ProgressIndicator } from '@/components/ui/progress-indicator';
import { NavigationControls } from '@/components/ui/navigation-controls';
import { BasicInfoStep } from './steps/BasicInfoStep';
import { PrakritiStep } from './steps/PrakritiStep';
import { HealthStep } from './steps/HealthStep';
import { GoalsStep } from './steps/GoalsStep';

export interface OnboardingData {
    // Step 1: Basic Info
    name: string;
    email: string;
    password: string;
    age: number;
    gender: string;
    // Step 2: Prakriti
    prakritiCompleted: boolean;
    vata: number;
    pitta: number;
    kapha: number;
    dominant: string;
    secondary?: string;
    // Step 3: Health
    conditions: string[];
    allergies: string[];
    dietaryPreferences: string[];
    // Step 4: Goals
    weightGoal: string;
    calorieTarget: number;
    proteinTarget: number;
}

const TOTAL_STEPS = 4;

interface OnboardingWizardProps {
    onComplete: (data: OnboardingData) => Promise<void>;
}

export function OnboardingWizard({ onComplete }: OnboardingWizardProps) {
    const [currentStep, setCurrentStep] = useState(0);
    const [direction, setDirection] = useState<'next' | 'prev' | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const [formData, setFormData] = useState<OnboardingData>({
        name: '',
        email: '',
        password: '',
        age: 25,
        gender: '',
        prakritiCompleted: false,
        vata: 0,
        pitta: 0,
        kapha: 0,
        dominant: '',
        conditions: [],
        allergies: [],
        dietaryPreferences: [],
        weightGoal: 'maintain',
        calorieTarget: 2000,
        proteinTarget: 60,
    });

    const updateField = (name: string, value: unknown) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const canProceed = (): boolean => {
        switch (currentStep) {
            case 0:
                return (
                    formData.name.trim().length > 0 &&
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim()) &&
                    formData.password.length >= 8 &&
                    formData.gender.length > 0 &&
                    formData.age > 0 && formData.age < 120
                );
            case 1:
                return formData.prakritiCompleted;
            case 2:
                return true; // Health step is optional
            case 3:
                return true; // Goals have defaults
            default:
                return false;
        }
    };

    const nextStep = () => {
        if (currentStep < TOTAL_STEPS - 1 && canProceed()) {
            setDirection('next');
            setCurrentStep((prev) => prev + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setDirection('prev');
            setCurrentStep((prev) => prev - 1);
        }
    };

    const handleSubmit = async () => {
        setIsProcessing(true);
        try {
            await onComplete(formData);
        } catch (err) {
            console.error('Onboarding error:', err);
        } finally {
            setIsProcessing(false);
        }
    };

    const renderStep = () => {
        const props = { formData, updateField, direction };
        switch (currentStep) {
            case 0: return <BasicInfoStep {...props} />;
            case 1: return <PrakritiStep {...props} />;
            case 2: return <HealthStep {...props} />;
            case 3: return <GoalsStep {...props} />;
            default: return null;
        }
    };

    const stepTitles = [
        { title: 'Welcome to AyurDiet OS', subtitle: "Let's start with your basic information" },
        { title: 'Discover Your Prakriti', subtitle: 'Answer questions to determine your Ayurvedic constitution' },
        { title: 'Health Profile', subtitle: 'Tell us about your health conditions and preferences' },
        { title: 'Set Your Goals', subtitle: 'Customize your dietary targets' },
    ];

    return (
        <AuroraBackground>
            <div className="relative z-10 mx-auto w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-3xl rounded-lg sm:rounded-xl md:rounded-2xl bg-white/[0.02] backdrop-blur-sm p-4 sm:p-6 md:p-8 lg:p-10 shadow-xl border border-white/[0.04] min-h-[500px] sm:min-h-[550px] md:min-h-[600px] mx-2 sm:mx-auto flex flex-col">
                {/* Header */}
                <div className="text-left mb-6 sm:mb-8">
                    <h2 className="text-responsive-2xl font-bold text-white">
                        {stepTitles[currentStep].title}
                    </h2>
                    <p className="mt-2 text-responsive-sm text-white/60">
                        {stepTitles[currentStep].subtitle}
                    </p>
                </div>

                {/* Progress */}
                <ProgressIndicator currentStep={currentStep} totalSteps={TOTAL_STEPS} />

                {/* Step Content */}
                <div className="flex-1 mb-6 sm:mb-8 min-h-[200px] relative">
                    <AnimatePresence mode="wait" onExitComplete={() => setDirection(null)}>
                        <div key={currentStep}>
                            {renderStep()}
                        </div>
                    </AnimatePresence>
                </div>

                {/* Navigation */}
                <NavigationControls
                    currentStep={currentStep}
                    totalSteps={TOTAL_STEPS}
                    canProceed={canProceed()}
                    isProcessing={isProcessing}
                    onNext={nextStep}
                    onPrev={prevStep}
                    onSubmit={handleSubmit}
                />
            </div>
        </AuroraBackground>
    );
}
