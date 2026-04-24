'use client';

import { useRouter } from 'next/navigation';
import { OnboardingWizard, type OnboardingData } from '@/components/onboarding/OnboardingWizard';
import { useToast } from '@/components/ui/toast';

export default function OnboardingPage() {
    const router = useRouter();
    const toast = useToast();

    const handleComplete = async (data: OnboardingData) => {
        try {
            const registerRes = await fetch('/api/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({
                    action: 'register',
                    name: data.name,
                    email: data.email,
                    password: data.password,
                    age: data.age,
                    gender: data.gender,
                }),
            });

            if (!registerRes.ok) {
                const err = await registerRes.json();
                throw new Error(err.error || 'Registration failed');
            }

            const { user } = await registerRes.json();

            await Promise.all([
                fetch('/api/users', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify({
                        action: 'savePrakriti',
                        userId: user.id,
                        vata: data.vata,
                        pitta: data.pitta,
                        kapha: data.kapha,
                        dominant: data.dominant,
                        secondary: data.secondary,
                    }),
                }),
                fetch('/api/users', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify({
                        action: 'saveHealth',
                        userId: user.id,
                        conditions: data.conditions,
                        allergies: data.allergies,
                        dietaryPreferences: data.dietaryPreferences,
                        weightGoal: data.weightGoal,
                        calorieTarget: data.calorieTarget,
                        proteinTarget: data.proteinTarget,
                    }),
                }),
            ]);

            localStorage.setItem('ayurdiet_user_id', user.id);
            toast.success('Welcome to AyurDiet!', `Your ${data.dominant}-dominant profile is ready.`);
            router.push('/patient/dashboard');
        } catch (err) {
            console.error('Onboarding failed:', err);
            toast.error(
                'Could not complete onboarding',
                err instanceof Error ? err.message : 'Unexpected error. Please try again.'
            );
        }
    };

    return <OnboardingWizard onComplete={handleComplete} />;
}
