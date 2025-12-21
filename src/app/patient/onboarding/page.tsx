'use client';

import { useRouter } from 'next/navigation';
import { DoshaQuiz } from '@/components/DoshaQuiz';
import { PrakritiQuizResult } from '@/lib/types';

export default function PatientOnboardingPage() {
  const router = useRouter();

  const handleQuizComplete = (result: PrakritiQuizResult) => {
    // Store the result in localStorage for demo purposes
    // In production, this would be sent to a backend
    localStorage.setItem('patientPrakriti', JSON.stringify(result));
    router.push('/patient/dashboard');
  };

  return (
    <div className="py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Discover Your Prakriti</h1>
        <p className="text-stone max-w-xl mx-auto">
          Answer these questions about your physical and mental characteristics 
          to determine your Ayurvedic body constitution (Prakriti).
        </p>
      </div>
      
      <DoshaQuiz onComplete={handleQuizComplete} />
    </div>
  );
}

