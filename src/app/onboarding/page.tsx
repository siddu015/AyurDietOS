'use client';

import { useRouter } from 'next/navigation';
import { OnboardingWizard, type OnboardingData } from '@/components/onboarding/OnboardingWizard';

export default function OnboardingPage() {
    const router = useRouter();

    const handleComplete = async (data: OnboardingData) => {
        try {
            // 1. Register user
            const registerRes = await fetch('/api/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    action: 'register',
                    name: data.name,
                    email: data.email,
                    age: data.age,
                    gender: data.gender,
                }),
            });

            if (!registerRes.ok) {
                const err = await registerRes.json();
                throw new Error(err.error || 'Registration failed');
            }

            const { user } = await registerRes.json();

            // 2. Save Prakriti
            await fetch('/api/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    action: 'savePrakriti',
                    userId: user.id,
                    vata: data.vata,
                    pitta: data.pitta,
                    kapha: data.kapha,
                    dominant: data.dominant,
                    secondary: data.secondary,
                }),
            });

            // 3. Save Health
            await fetch('/api/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
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
            });

            // 4. Store session
            localStorage.setItem('ayurdiet_user_id', user.id);

            // 5. Navigate to dashboard
            router.push('/patient/dashboard');
        } catch (err) {
            console.error('Onboarding failed:', err);
            alert(err instanceof Error ? err.message : 'Something went wrong');
        }
    };

    return <OnboardingWizard onComplete={handleComplete} />;
}
