'use client';

import { useState, useEffect } from 'react';
import { Food, PatientProfile, ANHScoreResult } from '@/lib/types';
import { calculateANHScore } from '@/lib/algorithms';
import { ScoreCircle } from './ui/ScoreCircle';

interface PortionSliderProps {
  food: Food;
  patient?: PatientProfile;
  initialPortion?: number;
  onChange?: (portion: number, adjustedNutrition: AdjustedNutrition) => void;
}

interface AdjustedNutrition {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  servingGrams: number;
}

const PORTION_PRESETS = [
  { value: 0.5, label: 'Half' },
  { value: 1, label: '1x' },
  { value: 1.5, label: '1.5x' },
  { value: 2, label: '2x' },
];

export function PortionSlider({ food, patient, initialPortion = 1, onChange }: PortionSliderProps) {
  const [portion, setPortion] = useState(initialPortion);
  const [score, setScore] = useState<ANHScoreResult | null>(null);

  // Calculate adjusted nutrition
  const adjustedNutrition: AdjustedNutrition = {
    calories: Math.round(food.nutrition.calories * portion),
    protein: Math.round(food.nutrition.protein * portion * 10) / 10,
    carbs: Math.round(food.nutrition.carbs * portion * 10) / 10,
    fat: Math.round(food.nutrition.fat * portion * 10) / 10,
    fiber: Math.round(food.nutrition.fiber * portion * 10) / 10,
    servingGrams: Math.round(food.servingGrams * portion),
  };

  // Update score when patient changes
  useEffect(() => {
    if (patient) {
      const result = calculateANHScore(food, patient);
      setScore(result);
    }
  }, [food, patient]);

  // Notify parent of changes
  useEffect(() => {
    onChange?.(portion, adjustedNutrition);
  }, [portion]);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPortion(parseFloat(e.target.value));
  };

  const handlePresetClick = (value: number) => {
    setPortion(value);
  };

  return (
    <div className="card p-4">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-semibold">{food.name}</h3>
          <p className="text-sm text-stone">{food.nameHindi}</p>
        </div>
        {score && patient && (
          <ScoreCircle score={score.totalScore} size="sm" />
        )}
      </div>

      {/* Portion Slider */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm font-medium">Portion Size</label>
          <span className="text-lg font-bold text-primary">
            {portion}x
          </span>
        </div>
        
        <input
          type="range"
          min="0.25"
          max="3"
          step="0.25"
          value={portion}
          onChange={handleSliderChange}
          className="w-full h-2 bg-sand rounded-lg appearance-none cursor-pointer accent-primary"
        />

        {/* Preset buttons */}
        <div className="flex gap-2 mt-2">
          {PORTION_PRESETS.map(preset => (
            <button
              key={preset.value}
              onClick={() => handlePresetClick(preset.value)}
              className={`flex-1 py-1 px-2 rounded text-sm font-medium transition-colors ${
                portion === preset.value
                  ? 'bg-primary text-white'
                  : 'bg-sand text-stone hover:bg-clay'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Serving Info */}
      <div className="p-3 bg-sand rounded-lg mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-stone">Serving</span>
          <span className="font-medium">
            {portion}x {food.servingSize} ({adjustedNutrition.servingGrams}g)
          </span>
        </div>
      </div>

      {/* Nutrition Grid */}
      <div className="grid grid-cols-5 gap-2 text-center">
        <NutrientBox 
          label="Cal" 
          value={adjustedNutrition.calories} 
          unit="kcal"
          highlighted={adjustedNutrition.calories > 300}
        />
        <NutrientBox 
          label="Protein" 
          value={adjustedNutrition.protein} 
          unit="g"
          highlighted={adjustedNutrition.protein > 15}
          positive
        />
        <NutrientBox 
          label="Carbs" 
          value={adjustedNutrition.carbs} 
          unit="g"
        />
        <NutrientBox 
          label="Fat" 
          value={adjustedNutrition.fat} 
          unit="g"
        />
        <NutrientBox 
          label="Fiber" 
          value={adjustedNutrition.fiber} 
          unit="g"
          highlighted={adjustedNutrition.fiber > 5}
          positive
        />
      </div>

      {/* Daily percentage (based on 2000 cal diet) */}
      <div className="mt-4 pt-3 border-t border-clay">
        <p className="text-xs text-stone text-center">
          {Math.round(adjustedNutrition.calories / 20)}% of daily calories (2000 cal diet)
        </p>
        <div className="mt-2 h-2 bg-sand rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${Math.min(100, adjustedNutrition.calories / 20)}%` }}
          />
        </div>
      </div>
    </div>
  );
}

function NutrientBox({ 
  label, 
  value, 
  unit,
  highlighted,
  positive
}: { 
  label: string; 
  value: number; 
  unit: string;
  highlighted?: boolean;
  positive?: boolean;
}) {
  return (
    <div className={`p-2 rounded ${highlighted ? (positive ? 'bg-secondary/10' : 'bg-moderate/10') : 'bg-sand'}`}>
      <div className={`text-lg font-bold ${highlighted ? (positive ? 'text-secondary' : 'text-moderate') : ''}`}>
        {value}
      </div>
      <div className="text-xs text-stone">{unit}</div>
      <div className="text-xs text-stone">{label}</div>
    </div>
  );
}

// Quick portion calculator for meal totals
export function calculateMealPortionTotals(
  items: Array<{ food: Food; portion: number }>
): AdjustedNutrition {
  return items.reduce((total, { food, portion }) => ({
    calories: total.calories + Math.round(food.nutrition.calories * portion),
    protein: total.protein + food.nutrition.protein * portion,
    carbs: total.carbs + food.nutrition.carbs * portion,
    fat: total.fat + food.nutrition.fat * portion,
    fiber: total.fiber + food.nutrition.fiber * portion,
    servingGrams: total.servingGrams + Math.round(food.servingGrams * portion),
  }), { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0, servingGrams: 0 });
}

