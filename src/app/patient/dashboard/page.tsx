'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { PatientProfile, DoshaPrakriti, PrakritiQuizResult, Food } from '@/lib/types';
import { foods } from '@/lib/data';
import { getTopRecommendations, composeMeal, generateDailyPlan } from '@/lib/algorithms';
import { DoshaBar } from '@/components/ui/DoshaBar';
import { ScoreCircle } from '@/components/ui/ScoreCircle';
import { FoodCard } from '@/components/FoodCard';
import { MealPlate } from '@/components/MealPlate';

// Default patient profile for demo
const defaultPrakriti: DoshaPrakriti = {
  vata: 45,
  pitta: 35,
  kapha: 20,
  dominant: 'vata',
  secondary: 'pitta',
};

export default function PatientDashboardPage() {
  const [prakriti, setPrakriti] = useState<DoshaPrakriti | null>(null);
  const [patient, setPatient] = useState<PatientProfile | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'foods' | 'meals'>('overview');

  useEffect(() => {
    // Try to load prakriti from localStorage
    const stored = localStorage.getItem('patientPrakriti');
    if (stored) {
      const result: PrakritiQuizResult = JSON.parse(stored);
      setPrakriti(result.prakriti);
    } else {
      // Use default for demo
      setPrakriti(defaultPrakriti);
    }
  }, []);

  useEffect(() => {
    if (prakriti) {
      setPatient({
        id: 'demo_patient',
        name: 'Demo Patient',
        age: 30,
        gender: 'male',
        prakriti,
        conditions: [],
        allergies: [],
        dietaryPreferences: ['vegetarian'],
        goals: { weightGoal: 'maintain', dailyCalorieTarget: 1800, proteinTarget: 55, dietGoals: ['digestive_health', 'energy_boost'] },
      });
    }
  }, [prakriti]);

  if (!prakriti || !patient) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h2 className="text-xl font-semibold mb-4">Welcome to AyurDiet OS</h2>
        <p className="text-stone mb-6">Complete the Prakriti assessment to get started</p>
        <Link href="/patient/onboarding" className="btn btn-primary">
          Take Prakriti Quiz
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold mb-2">Your Dashboard</h1>
          <p className="text-stone">Personalized diet recommendations based on your Prakriti</p>
        </div>
        <Link href="/patient/onboarding" className="btn btn-outline text-sm">
          Retake Quiz
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-clay pb-2">
        {(['overview', 'foods', 'meals'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-t-lg font-medium capitalize transition-colors ${
              activeTab === tab
                ? 'bg-primary text-white'
                : 'text-stone hover:text-foreground hover:bg-sand'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <OverviewTab prakriti={prakriti} patient={patient} />
      )}
      {activeTab === 'foods' && (
        <FoodsTab patient={patient} />
      )}
      {activeTab === 'meals' && (
        <MealsTab patient={patient} />
      )}
    </div>
  );
}

function OverviewTab({ prakriti, patient }: { prakriti: DoshaPrakriti; patient: PatientProfile }) {
  const topFoods = getTopRecommendations(foods, patient, 5);

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Prakriti Card */}
      <div className="card p-6">
        <h2 className="text-xl font-semibold mb-4">Your Prakriti</h2>
        <div className="mb-6">
          <DoshaBar prakriti={prakriti} size="lg" />
        </div>
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className={`px-3 py-1 rounded-full font-medium ${
            prakriti.dominant === 'vata' ? 'badge-vata' :
            prakriti.dominant === 'pitta' ? 'badge-pitta' : 'badge-kapha'
          }`}>
            {prakriti.dominant.charAt(0).toUpperCase() + prakriti.dominant.slice(1)}
          </span>
          {prakriti.secondary && (
            <>
              <span className="text-stone">-</span>
              <span className={`px-3 py-1 rounded-full font-medium ${
                prakriti.secondary === 'vata' ? 'badge-vata' :
                prakriti.secondary === 'pitta' ? 'badge-pitta' : 'badge-kapha'
              }`}>
                {prakriti.secondary.charAt(0).toUpperCase() + prakriti.secondary.slice(1)}
              </span>
            </>
          )}
          <span className="text-stone">Constitution</span>
        </div>
        <div className="p-4 bg-sand rounded-lg text-sm">
          <p className="text-stone">
            {prakriti.dominant === 'vata' && 
              'Your Vata-dominant constitution benefits from warm, grounding foods. Avoid cold and dry foods.'
            }
            {prakriti.dominant === 'pitta' && 
              'Your Pitta-dominant constitution benefits from cooling, calming foods. Avoid hot and spicy foods.'
            }
            {prakriti.dominant === 'kapha' && 
              'Your Kapha-dominant constitution benefits from light, stimulating foods. Avoid heavy and oily foods.'
            }
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="card p-6">
        <h2 className="text-xl font-semibold mb-4">Today&apos;s Overview</h2>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <ScoreCircle score={75} size="sm" />
            <p className="text-xs text-stone mt-2">Diet Score</p>
          </div>
          <div className="text-center">
            <ScoreCircle score={4} size="sm" />
            <p className="text-xs text-stone mt-2">Rasas Today</p>
          </div>
          <div className="text-center">
            <ScoreCircle score={85} size="sm" />
            <p className="text-xs text-stone mt-2">Compliance</p>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-stone">Recommended tastes to include:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {prakriti.dominant === 'vata' && (
              <>
                <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded text-xs">Sweet</span>
                <span className="px-2 py-1 bg-lime-100 text-lime-700 rounded text-xs">Sour</span>
                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">Salty</span>
              </>
            )}
            {prakriti.dominant === 'pitta' && (
              <>
                <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded text-xs">Sweet</span>
                <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded text-xs">Bitter</span>
                <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">Astringent</span>
              </>
            )}
            {prakriti.dominant === 'kapha' && (
              <>
                <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs">Pungent</span>
                <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded text-xs">Bitter</span>
                <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">Astringent</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Top Recommended Foods */}
      <div className="md:col-span-2">
        <h2 className="text-xl font-semibold mb-4">Top Recommended Foods For You</h2>
        <div className="grid md:grid-cols-5 gap-4">
          {topFoods.map(({ food, score }) => (
            <FoodCard key={food.id} food={food} score={score} compact />
          ))}
        </div>
      </div>
    </div>
  );
}

function FoodsTab({ patient }: { patient: PatientProfile }) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['all', ...new Set(foods.map(f => f.category))];

  const filteredFoods = foods.filter(food => {
    const matchesCategory = selectedCategory === 'all' || food.category === selectedCategory;
    const matchesSearch = food.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         food.nameHindi?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const scoredFoods = getTopRecommendations(filteredFoods, patient, filteredFoods.length);

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <input
          type="text"
          placeholder="Search foods..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 rounded-lg border border-clay max-w-xs"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 rounded-lg border border-clay"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>
              {cat === 'all' ? 'All Categories' : cat.replace('_', ' ')}
            </option>
          ))}
        </select>
      </div>

      {/* Food Grid */}
      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
        {scoredFoods.map(({ food, score }) => (
          <FoodCard key={food.id} food={food} score={score} />
        ))}
      </div>
    </div>
  );
}

function MealsTab({ patient }: { patient: PatientProfile }) {
  const [dailyPlan, setDailyPlan] = useState<ReturnType<typeof generateDailyPlan> | null>(null);

  useEffect(() => {
    const plan = generateDailyPlan(patient);
    setDailyPlan(plan);
  }, [patient]);

  const regeneratePlan = () => {
    const plan = generateDailyPlan(patient);
    setDailyPlan(plan);
  };

  if (!dailyPlan) return null;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Today&apos;s Meal Plan</h2>
        <button onClick={regeneratePlan} className="btn btn-primary">
          Regenerate Plan
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <MealPlate meal={dailyPlan.breakfast.meal} anhScore={dailyPlan.breakfast.totalANHScore} />
        <MealPlate meal={dailyPlan.lunch.meal} anhScore={dailyPlan.lunch.totalANHScore} />
        <MealPlate meal={dailyPlan.dinner.meal} anhScore={dailyPlan.dinner.totalANHScore} />
        {dailyPlan.snack && (
          <MealPlate meal={dailyPlan.snack.meal} anhScore={dailyPlan.snack.totalANHScore} />
        )}
      </div>
    </div>
  );
}

