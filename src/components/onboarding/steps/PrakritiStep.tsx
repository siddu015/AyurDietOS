'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { prakritiQuiz } from '@/lib/data';
import type { OnboardingData } from '../OnboardingWizard';

interface StepProps {
    formData: OnboardingData;
    updateField: (name: string, value: unknown) => void;
    direction: 'next' | 'prev' | null;
}

export function PrakritiStep({ formData, updateField, direction }: StepProps) {
    const [quizStep, setQuizStep] = useState(0);
    const [answers, setAnswers] = useState<Record<string, number>>({});

    const questions = prakritiQuiz?.questions || [];
    const currentQuestion = questions[quizStep];
    const totalQuestions = questions.length;

    const handleAnswer = (questionId: string, optionIndex: number) => {
        const newAnswers = { ...answers, [questionId]: optionIndex };
        setAnswers(newAnswers);

        // Auto-advance after short delay
        setTimeout(() => {
            if (quizStep < totalQuestions - 1) {
                setQuizStep(quizStep + 1);
            } else {
                // Calculate results
                calculatePrakriti(newAnswers);
            }
        }, 300);
    };

    const calculatePrakriti = (allAnswers: Record<string, number>) => {
        let vataTotal = 0, pittaTotal = 0, kaphaTotal = 0;

        questions.forEach((q) => {
            const answerIndex = allAnswers[q.id];
            if (answerIndex !== undefined && q.options[answerIndex]) {
                vataTotal += q.options[answerIndex].vataScore;
                pittaTotal += q.options[answerIndex].pittaScore;
                kaphaTotal += q.options[answerIndex].kaphaScore;
            }
        });

        const total = vataTotal + pittaTotal + kaphaTotal;
        const vata = Math.round((vataTotal / total) * 100);
        const pitta = Math.round((pittaTotal / total) * 100);
        const kapha = 100 - vata - pitta;

        const scores = { vata, pitta, kapha };
        const dominant = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
        const secondary = Object.entries(scores).sort((a, b) => b[1] - a[1])[1];

        updateField('vata', vata);
        updateField('pitta', pitta);
        updateField('kapha', kapha);
        updateField('dominant', dominant);
        updateField('secondary', secondary[1] > 30 ? secondary[0] : undefined);
        updateField('prakritiCompleted', true);
    };

    const variants = {
        initial: { opacity: 0, x: direction === 'next' ? 80 : -80, scale: 0.96 },
        animate: { opacity: 1, x: 0, scale: 1 },
        exit: { opacity: 0, x: direction === 'next' ? -80 : 80, scale: 0.96 },
    };

    // Show results if completed
    if (formData.prakritiCompleted) {
        return (
            <motion.div
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                className="space-y-6"
            >
                <div className="text-center">
                    <div className="text-4xl mb-3">🧘</div>
                    <h3 className="text-xl font-semibold text-white mb-2">Your Prakriti Assessment Complete!</h3>
                    <p className="text-sm text-white/50">
                        Dominant: <span className="font-semibold text-[#c9a227] capitalize">{formData.dominant}</span>
                        {formData.secondary && (
                            <>, Secondary: <span className="font-semibold text-[#4a7c59] capitalize">{formData.secondary}</span></>
                        )}
                    </p>
                </div>

                {/* Dosha Bars */}
                <div className="space-y-3">
                    {[
                        { name: 'Vata', value: formData.vata, color: '#7eb8da' },
                        { name: 'Pitta', value: formData.pitta, color: '#e74c3c' },
                        { name: 'Kapha', value: formData.kapha, color: '#2ecc71' },
                    ].map((d) => (
                        <div key={d.name}>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-white/70">{d.name}</span>
                                <span className="font-medium text-white">{d.value}%</span>
                            </div>
                            <div className="h-2 rounded-full bg-white/10">
                                <motion.div
                                    className="h-full rounded-full"
                                    style={{ backgroundColor: d.color }}
                                    initial={{ width: 0 }}
                                    animate={{ width: `${d.value}%` }}
                                    transition={{ duration: 0.8, delay: 0.2 }}
                                />
                            </div>
                        </div>
                    ))}
                </div>

                <button
                    onClick={() => {
                        updateField('prakritiCompleted', false);
                        setQuizStep(0);
                        setAnswers({});
                    }}
                    className="text-sm text-white/40 hover:text-white/60 transition-colors"
                >
                    ↻ Retake Quiz
                </button>
            </motion.div>
        );
    }

    if (!currentQuestion) {
        return <div className="text-white/50">Loading quiz...</div>;
    }

    return (
        <motion.div
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="space-y-5"
        >
            {/* Mini progress */}
            <div className="flex items-center justify-between text-xs text-white/40 mb-1">
                <span>Question {quizStep + 1} of {totalQuestions}</span>
                <span>{Math.round(((quizStep) / totalQuestions) * 100)}%</span>
            </div>
            <div className="h-0.5 rounded-full bg-white/10 mb-4">
                <div
                    className="h-full rounded-full bg-[#c9a227] transition-all duration-300"
                    style={{ width: `${(quizStep / totalQuestions) * 100}%` }}
                />
            </div>

            {/* Question */}
            <p className="text-white font-medium text-base sm:text-lg">{currentQuestion.question}</p>

            {/* Options */}
            <div className="space-y-2">
                {currentQuestion.options.map((option: { text: string; vataScore: number; pittaScore: number; kaphaScore: number }, idx: number) => (
                    <button
                        key={idx}
                        onClick={() => handleAnswer(currentQuestion.id, idx)}
                        className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-all duration-200 border ${answers[currentQuestion.id] === idx
                            ? 'bg-[#c9a227]/15 border-[#c9a227]/30 text-[#e8d18c]'
                            : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:border-white/20'
                            }`}
                    >
                        {option.text}
                    </button>
                ))}
            </div>

            {/* Back within quiz */}
            {quizStep > 0 && (
                <button
                    onClick={() => setQuizStep(quizStep - 1)}
                    className="text-sm text-white/40 hover:text-white/60 transition-colors"
                >
                    ← Previous question
                </button>
            )}
        </motion.div>
    );
}
