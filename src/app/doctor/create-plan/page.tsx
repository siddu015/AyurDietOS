'use client';

import { useState, useEffect } from 'react';
import { PatientProfile, Food, Meal, MealItem, MealType } from '@/lib/types';
import { foods } from '@/lib/data';
import { 
  calculateANHScore, 
  composeMeal, 
  checkMealCompatibility,
  checkFoodAddition 
} from '@/lib/algorithms';
import { FoodCard } from '@/components/FoodCard';
import { MealPlate } from '@/components/MealPlate';
import { ViruddhaWarning } from '@/components/ViruddhaWarning';
import { ScoreCircle } from '@/components/ui/ScoreCircle';

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
  goals: { weightGoal: 'maintain', dailyCalorieTarget: 1800, proteinTarget: 60, dietGoals: ['digestive_health'] },
};

export default function CreatePlanPage() {
  const [patient] = useState<PatientProfile>(demoPatient);
  const [currentMealType, setCurrentMealType] = useState<MealType>('lunch');
  const [selectedFoods, setSelectedFoods] = useState<MealItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viruddhaResult, setViruddhaResult] = useState<ReturnType<typeof checkMealCompatibility> | null>(null);

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
        id: 'temp',
        name: 'Current Selection',
        type: currentMealType,
        foods: selectedFoods,
        totalNutrition: calculateTotalNutrition(selectedFoods),
        rasaCoverage: [],
        overallDoshaEffect: { vata: 0, pitta: 0, kapha: 0 },
      };
      const result = checkMealCompatibility(meal);
      setViruddhaResult(result);
    } else {
      setViruddhaResult(null);
    }
  }, [selectedFoods, currentMealType]);

  const handleAddFood = (food: Food) => {
    // Check for viruddha before adding
    if (selectedFoods.length > 0) {
      const addResult = checkFoodAddition(selectedFoods, food);
      if (addResult.severeCount > 0) {
        // Show warning but still allow adding
        console.log('Warning:', addResult.warnings);
      }
    }

    const existing = selectedFoods.find(item => item.foodId === food.id);
    if (existing) {
      setSelectedFoods(prev => prev.map(item => 
        item.foodId === food.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setSelectedFoods(prev => [...prev, {
        foodId: food.id,
        food,
        quantity: 1,
        unit: food.servingSize,
      }]);
    }
  };

  const handleRemoveFood = (foodId: string) => {
    setSelectedFoods(prev => prev.filter(item => item.foodId !== foodId));
  };

  const handleAutoGenerate = () => {
    const composed = composeMeal(patient, currentMealType, {
      maxCalories: currentMealType === 'snack' ? 200 : 500,
      minProtein: currentMealType === 'snack' ? 5 : 20,
    });
    setSelectedFoods(composed.meal.foods);
  };

  const handleClear = () => {
    setSelectedFoods([]);
    setViruddhaResult(null);
  };

  const currentMeal: Meal | null = selectedFoods.length > 0 ? {
    id: 'current',
    name: `${currentMealType.charAt(0).toUpperCase() + currentMealType.slice(1)} Plan`,
    type: currentMealType,
    foods: selectedFoods,
    totalNutrition: calculateTotalNutrition(selectedFoods),
    rasaCoverage: getRasaCoverage(selectedFoods),
    overallDoshaEffect: getDoshaEffect(selectedFoods),
  } : null;

  const mealANHScore = currentMeal ? calculateMealANHScore(selectedFoods, patient) : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold mb-2">Create Diet Plan</h1>
          <p className="text-stone">
            Patient: <span className="font-medium text-foreground">{patient.name}</span> | 
            <span className={`ml-2 px-2 py-0.5 rounded text-xs ${
              patient.prakriti.dominant === 'vata' ? 'badge-vata' :
              patient.prakriti.dominant === 'pitta' ? 'badge-pitta' : 'badge-kapha'
            }`}>
              {patient.prakriti.dominant}
            </span>
          </p>
        </div>
        <div className="flex gap-2">
          <button onClick={handleClear} className="btn btn-outline">
            Clear
          </button>
          <button onClick={handleAutoGenerate} className="btn btn-secondary">
            Auto Generate
          </button>
        </div>
      </div>

      {/* Meal Type Selection */}
      <div className="flex gap-2">
        {(['breakfast', 'lunch', 'dinner', 'snack'] as const).map(type => (
          <button
            key={type}
            onClick={() => setCurrentMealType(type)}
            className={`px-4 py-2 rounded-lg font-medium capitalize transition-colors ${
              currentMealType === type
                ? 'bg-primary text-white'
                : 'bg-sand text-stone hover:bg-clay'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Food Selection */}
        <div className="lg:col-span-2 space-y-4">
          {/* Search and Filter */}
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Search foods..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-2 rounded-lg border border-clay"
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
          <div className="grid md:grid-cols-3 gap-3 max-h-[600px] overflow-y-auto p-1">
            {filteredFoods.map(food => {
              const score = calculateANHScore(food, patient);
              const isSelected = selectedFoods.some(item => item.foodId === food.id);
              return (
                <FoodCard
                  key={food.id}
                  food={food}
                  score={score}
                  compact
                  selected={isSelected}
                  onSelect={handleAddFood}
                />
              );
            })}
          </div>
        </div>

        {/* Current Meal */}
        <div className="space-y-4">
          {currentMeal ? (
            <>
              <MealPlate
                meal={currentMeal}
                anhScore={mealANHScore}
                onRemoveFood={handleRemoveFood}
                editable
              />

              {/* Viruddha Warning */}
              {viruddhaResult && viruddhaResult.warnings.length > 0 && (
                <ViruddhaWarning warnings={viruddhaResult.warnings} />
              )}

              {/* Save Button */}
              <button className="btn btn-primary w-full">
                Save Diet Plan
              </button>
            </>
          ) : (
            <div className="card p-8 text-center">
              <p className="text-stone mb-4">
                Select foods from the left to build your meal, or click Auto Generate
              </p>
              <button onClick={handleAutoGenerate} className="btn btn-secondary">
                Auto Generate Meal
              </button>
            </div>
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

function getRasaCoverage(items: MealItem[]) {
  const rasas = new Set<string>();
  items.forEach(item => {
    item.food.ayurvedic.rasa.forEach(r => rasas.add(r));
  });
  return Array.from(rasas) as any;
}

function getDoshaEffect(items: MealItem[]) {
  return items.reduce((acc, item) => ({
    vata: acc.vata + item.food.ayurvedic.doshaEffect.vata,
    pitta: acc.pitta + item.food.ayurvedic.doshaEffect.pitta,
    kapha: acc.kapha + item.food.ayurvedic.doshaEffect.kapha,
  }), { vata: 0, pitta: 0, kapha: 0 });
}

function calculateMealANHScore(items: MealItem[], patient: PatientProfile): number {
  if (items.length === 0) return 0;
  const scores = items.map(item => calculateANHScore(item.food, patient).totalScore * item.quantity);
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  return Math.round(scores.reduce((a, b) => a + b, 0) / totalQuantity);
}

