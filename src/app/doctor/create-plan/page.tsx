'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { foods } from '@/lib/data';
import { calculateANHScore } from '@/lib/algorithms/anhScore';
import { composeMeal } from '@/lib/algorithms/mealComposer';
import { checkMealCompatibility, checkFoodAddition } from '@/lib/algorithms/viruddhaCheck';
import type { PatientProfile, Food, Meal, MealItem, MealType } from '@/lib/types';
import {
  Search, Wand2, Trash2, Plus, Minus, AlertTriangle,
  ChevronDown, UtensilsCrossed, ArrowLeft,
} from 'lucide-react';
import Link from 'next/link';

// Demo patient
const demoPatient: PatientProfile = {
  id: 'demo',
  name: 'Demo Patient',
  age: 35,
  gender: 'male',
  prakriti: { vata: 40, pitta: 35, kapha: 25, dominant: 'vata', secondary: 'pitta' },
  conditions: [],
  allergies: [],
  dietaryPreferences: ['vegetarian'],
  goals: { weightGoal: 'maintain', dailyCalorieTarget: 1800, proteinTarget: 60 },
};

export default function CreatePlanPage() {
  const [patient] = useState<PatientProfile>(demoPatient);
  const [currentMealType, setCurrentMealType] = useState<MealType>('lunch');
  const [selectedFoods, setSelectedFoods] = useState<MealItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [warnings, setWarnings] = useState<string[]>([]);

  const categories = ['all', ...new Set(foods.map(f => f.category))];

  const filteredFoods = foods.filter(food => {
    const matchesCategory = selectedCategory === 'all' || food.category === selectedCategory;
    const matchesSearch = food.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Check viruddha whenever foods change
  useEffect(() => {
    if (selectedFoods.length >= 2) {
      const meal: Meal = {
        id: 'temp', name: 'Current', type: currentMealType,
        foods: selectedFoods,
        totalNutrition: calculateTotalNutrition(selectedFoods),
        rasaCoverage: [], overallDoshaEffect: { vata: 0, pitta: 0, kapha: 0 },
      };
      const result = checkMealCompatibility(meal);
      setWarnings(result.warnings.map(w => w.message));
    } else {
      setWarnings([]);
    }
  }, [selectedFoods, currentMealType]);

  const handleAddFood = (food: Food) => {
    const existing = selectedFoods.find(item => item.foodId === food.id);
    if (existing) {
      setSelectedFoods(prev => prev.map(item =>
        item.foodId === food.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setSelectedFoods(prev => [...prev, { foodId: food.id, food, quantity: 1, unit: food.servingSize }]);
    }
  };

  const handleRemoveFood = (foodId: string) => {
    setSelectedFoods(prev => prev.filter(item => item.foodId !== foodId));
  };

  const handleAutoGenerate = () => {
    try {
      const composed = composeMeal(patient, currentMealType, {
        maxCalories: currentMealType === 'snack' ? 200 : 500,
        minProtein: currentMealType === 'snack' ? 5 : 20,
      });
      setSelectedFoods(composed.meal.foods);
    } catch { /* ignore */ }
  };

  const mealANHScore = selectedFoods.length > 0
    ? Math.round(selectedFoods.reduce((acc, item) => acc + calculateANHScore(item.food, patient).totalScore * item.quantity, 0) / selectedFoods.reduce((sum, item) => sum + item.quantity, 0))
    : 0;

  const totalNutrition = calculateTotalNutrition(selectedFoods);

  return (
    <div className="space-y-6 text-white">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link href="/doctor/dashboard" className="p-2 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] transition-all">
            <ArrowLeft className="h-4 w-4 text-white/60" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold">Create Diet Plan</h1>
            <p className="text-sm text-white/40">
              {patient.name} · <span className="capitalize">{patient.prakriti.dominant}</span> constitution
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={() => { setSelectedFoods([]); setWarnings([]); }}
            className="px-4 py-2 rounded-xl bg-white/[0.05] text-white/60 text-sm hover:bg-white/[0.1]">
            <Trash2 className="h-4 w-4" />
          </button>
          <button onClick={handleAutoGenerate}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#c9a227] to-[#d35400] text-white text-sm hover:scale-105 transition-transform">
            <Wand2 className="h-4 w-4" /> Auto Generate
          </button>
        </div>
      </motion.div>

      {/* Meal Type Tabs */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex gap-2 mb-6">
        {(['breakfast', 'lunch', 'dinner', 'snack'] as const).map(type => (
          <button
            key={type}
            onClick={() => setCurrentMealType(type)}
            className={`px-4 py-2 rounded-xl text-sm capitalize transition-all ${currentMealType === type
              ? 'bg-[#c9a227]/15 text-[#c9a227] border border-[#c9a227]/30'
              : 'text-white/40 hover:text-white/60'
              }`}
          >
            {type}
          </button>
        ))}
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Food Selection */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
              <input
                placeholder="Search foods..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white placeholder-white/30 focus:outline-none focus:border-[#c9a227]/40"
              />
            </div>
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value)}
                className="appearance-none pl-4 pr-10 py-3 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white/70 text-sm focus:outline-none"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat === 'all' ? 'All' : cat.replace('_', ' ')}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30 pointer-events-none" />
            </div>
          </div>

          {/* Food Grid */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2 max-h-[600px] overflow-y-auto pr-1">
            {filteredFoods.map(food => {
              const score = calculateANHScore(food, patient);
              const isSelected = selectedFoods.some(item => item.foodId === food.id);
              return (
                <button
                  key={food.id}
                  onClick={() => handleAddFood(food)}
                  className={`text-left p-3 rounded-xl border transition-all ${isSelected
                    ? 'bg-[#4a7c59]/10 border-[#4a7c59]/30'
                    : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.05]'
                    }`}
                >
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="font-medium text-xs text-white truncate">{food.name}</h3>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ml-1 ${score.totalScore >= 70 ? 'bg-green-500/15 text-green-400' :
                      score.totalScore >= 50 ? 'bg-yellow-500/15 text-yellow-400' :
                        'bg-red-500/15 text-red-400'
                      }`}>{score.totalScore}</span>
                  </div>
                  <p className="text-[10px] text-white/30">{food.nutrition.calories} kcal · {food.nutrition.protein}g P</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Current Meal */}
        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-white">
                {currentMealType.charAt(0).toUpperCase() + currentMealType.slice(1)} Plan
              </h2>
              {mealANHScore > 0 && (
                <div className={`text-xs font-bold px-2 py-1 rounded-full ${mealANHScore >= 70 ? 'bg-green-500/15 text-green-400' :
                  mealANHScore >= 50 ? 'bg-yellow-500/15 text-yellow-400' :
                    'bg-red-500/15 text-red-400'
                  }`}>
                  Score: {mealANHScore}
                </div>
              )}
            </div>

            {selectedFoods.length > 0 ? (
              <div className="space-y-2 mb-4">
                {selectedFoods.map(item => (
                  <div key={item.foodId} className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.03]">
                    <div>
                      <p className="text-sm text-white">{item.food.name}</p>
                      <p className="text-xs text-white/30">{item.quantity} × {item.unit}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <button onClick={() => {
                        if (item.quantity > 1) {
                          setSelectedFoods(prev => prev.map(i => i.foodId === item.foodId ? { ...i, quantity: i.quantity - 1 } : i));
                        }
                      }} className="p-1 rounded bg-white/[0.05] hover:bg-white/[0.1]">
                        <Minus className="h-3 w-3 text-white/40" />
                      </button>
                      <button onClick={() => handleAddFood(item.food)} className="p-1 rounded bg-white/[0.05] hover:bg-white/[0.1]">
                        <Plus className="h-3 w-3 text-white/40" />
                      </button>
                      <button onClick={() => handleRemoveFood(item.foodId)} className="p-1 rounded bg-red-500/10 hover:bg-red-500/20 ml-1">
                        <Trash2 className="h-3 w-3 text-red-400" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <UtensilsCrossed className="h-8 w-8 text-white/15 mx-auto mb-2" />
                <p className="text-sm text-white/30">Click foods to add, or use Auto Generate</p>
              </div>
            )}

            {/* Nutrition Summary */}
            {selectedFoods.length > 0 && (
              <div className="grid grid-cols-4 gap-2 pt-3 border-t border-white/[0.06]">
                <div className="text-center"><p className="text-xs text-white/30">Cal</p><p className="text-sm font-medium">{Math.round(totalNutrition.calories)}</p></div>
                <div className="text-center"><p className="text-xs text-white/30">Protein</p><p className="text-sm font-medium">{Math.round(totalNutrition.protein)}g</p></div>
                <div className="text-center"><p className="text-xs text-white/30">Carbs</p><p className="text-sm font-medium">{Math.round(totalNutrition.carbs)}g</p></div>
                <div className="text-center"><p className="text-xs text-white/30">Fat</p><p className="text-sm font-medium">{Math.round(totalNutrition.fat)}g</p></div>
              </div>
            )}
          </div>

          {/* Viruddha Warning */}
          {warnings.length > 0 && (
            <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/15">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-red-400" />
                <span className="text-sm font-medium text-red-400">Viruddha Aahara!</span>
              </div>
              {warnings.map((w, i) => (
                <p key={i} className="text-xs text-white/50 mt-1">{w}</p>
              ))}
            </div>
          )}

          {selectedFoods.length > 0 && (
            <button className="w-full py-3 rounded-xl bg-gradient-to-r from-[#4a7c59] to-[#3a6249] text-white text-sm font-medium hover:scale-[1.02] transition-transform">
              Save Diet Plan
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function calculateTotalNutrition(items: MealItem[]) {
  return items.reduce((acc, item) => ({
    calories: acc.calories + item.food.nutrition.calories * item.quantity,
    protein: acc.protein + item.food.nutrition.protein * item.quantity,
    carbs: acc.carbs + item.food.nutrition.carbs * item.quantity,
    fat: acc.fat + item.food.nutrition.fat * item.quantity,
    fiber: acc.fiber + item.food.nutrition.fiber * item.quantity,
  }), { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 });
}
