'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Redirect old onboarding path to the new one
export default function PatientOnboardingRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/onboarding');
  }, [router]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 rounded-full border-2 border-[#c9a227] border-t-transparent animate-spin" />
        <p className="text-white/50 text-sm">Redirecting to onboarding...</p>
      </div>
    </div>
  );
}
