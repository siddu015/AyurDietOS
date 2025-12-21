'use client';

import { useState } from 'react';
import { PrakritiQuestion, DoshaPrakriti, PrakritiQuizResult, DoshaType } from '@/lib/types';
import { prakritiQuiz } from '@/lib/data';
import { DoshaBar } from './ui/DoshaBar';

interface DoshaQuizProps {
  onComplete: (result: PrakritiQuizResult) => void;
}

export function DoshaQuiz({ onComplete }: DoshaQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);

  const questions = prakritiQuiz.questions;
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswer = (questionId: string, optionIndex: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex,
    }));

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(prev => prev + 1);
      }, 300);
    } else {
      // Calculate results
      setTimeout(() => {
        setShowResults(true);
      }, 300);
    }
  };

  const calculateResults = (): PrakritiQuizResult => {
    let totalVata = 0;
    let totalPitta = 0;
    let totalKapha = 0;

    questions.forEach(question => {
      const answerIndex = answers[question.id];
      if (answerIndex !== undefined) {
        const option = question.options[answerIndex];
        totalVata += option.vataScore;
        totalPitta += option.pittaScore;
        totalKapha += option.kaphaScore;
      }
    });

    const total = totalVata + totalPitta + totalKapha;
    const vataPercent = Math.round((totalVata / total) * 100);
    const pittaPercent = Math.round((totalPitta / total) * 100);
    const kaphaPercent = Math.round((totalKapha / total) * 100);

    // Determine dominant and secondary dosha
    const doshaScores: [DoshaType, number][] = [
      ['vata', vataPercent],
      ['pitta', pittaPercent],
      ['kapha', kaphaPercent],
    ];
    doshaScores.sort((a, b) => b[1] - a[1]);

    const dominant = doshaScores[0][0];
    const secondary = doshaScores[1][1] > 25 ? doshaScores[1][0] : undefined;

    // Get interpretation
    let interpretationKey = `${dominant}_dominant`;
    if (secondary) {
      interpretationKey = `${dominant}_${secondary}`;
    }
    if (Math.abs(doshaScores[0][1] - doshaScores[1][1]) < 10 && 
        Math.abs(doshaScores[1][1] - doshaScores[2][1]) < 10) {
      interpretationKey = 'tridosha';
    }

    const interpretation = prakritiQuiz.interpretations[interpretationKey] || 
                          prakritiQuiz.interpretations[`${dominant}_dominant`];

    return {
      totalVata,
      totalPitta,
      totalKapha,
      prakriti: {
        vata: vataPercent,
        pitta: pittaPercent,
        kapha: kaphaPercent,
        dominant,
        secondary,
      },
      description: interpretation?.description || '',
      recommendations: interpretation?.recommendations || [],
    };
  };

  if (showResults) {
    const result = calculateResults();
    
    return (
      <div className="max-w-2xl mx-auto animate-fade-in">
        <div className="card p-8">
          <h2 className="text-2xl font-bold text-center mb-2">Your Prakriti Analysis</h2>
          <p className="text-center text-stone mb-6">Based on your responses</p>

          {/* Dosha Distribution */}
          <div className="mb-8">
            <DoshaBar prakriti={result.prakriti} size="lg" />
          </div>

          {/* Dominant Dosha */}
          <div className="text-center mb-6">
            <div className={`
              inline-flex items-center gap-2 px-4 py-2 rounded-full text-lg font-semibold
              ${result.prakriti.dominant === 'vata' ? 'bg-vata/20 text-vata' : ''}
              ${result.prakriti.dominant === 'pitta' ? 'bg-pitta/20 text-pitta' : ''}
              ${result.prakriti.dominant === 'kapha' ? 'bg-kapha/20 text-kapha' : ''}
            `}>
              <span className="capitalize">{result.prakriti.dominant}</span>
              {result.prakriti.secondary && (
                <>
                  <span className="text-stone">-</span>
                  <span className="capitalize">{result.prakriti.secondary}</span>
                </>
              )}
              <span>Prakriti</span>
            </div>
          </div>

          {/* Description */}
          <div className="p-4 bg-sand rounded-lg mb-6">
            <p className="text-sm leading-relaxed">{result.description}</p>
          </div>

          {/* Recommendations */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3">Dietary & Lifestyle Recommendations</h3>
            <ul className="space-y-2">
              {result.recommendations.map((rec, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-secondary mt-1">*</span>
                  <span className="text-sm">{rec}</span>
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={() => onComplete(result)}
            className="btn btn-primary w-full"
          >
            Continue to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-stone mb-2">
          <span>Question {currentQuestion + 1} of {questions.length}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="progress-bar">
          <div
            className="progress-fill gradient-ayur"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="card p-8 animate-fade-in" key={question.id}>
        <div className="mb-2">
          <span className="text-xs uppercase tracking-wider text-stone">
            {question.category}
          </span>
        </div>
        <h2 className="text-xl font-semibold mb-6">{question.question}</h2>

        {/* Options */}
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(question.id, index)}
              className={`
                w-full p-4 text-left rounded-lg border-2 transition-all
                ${answers[question.id] === index
                  ? 'border-primary bg-primary/10'
                  : 'border-clay hover:border-primary/50 hover:bg-sand'
                }
              `}
            >
              <span className="text-sm">{option.text}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-6">
        <button
          onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
          disabled={currentQuestion === 0}
          className="btn btn-outline disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <button
          onClick={() => {
            if (answers[question.id] !== undefined) {
              if (currentQuestion < questions.length - 1) {
                setCurrentQuestion(prev => prev + 1);
              } else {
                setShowResults(true);
              }
            }
          }}
          disabled={answers[question.id] === undefined}
          className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {currentQuestion === questions.length - 1 ? 'See Results' : 'Next'}
        </button>
      </div>
    </div>
  );
}

