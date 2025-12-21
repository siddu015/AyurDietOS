'use client';

import { Meal, Rasa } from '@/lib/types';
import { ScoreCircle } from './ui/ScoreCircle';

interface MealPlateProps {
  meal: Meal;
  anhScore?: number;
  onRemoveFood?: (foodId: string) => void;
  editable?: boolean;
}

const rasaColors: Record<Rasa, string> = {
  madhura: 'bg-amber-400',
  amla: 'bg-lime-400',
  lavana: 'bg-blue-400',
  katu: 'bg-red-400',
  tikta: 'bg-emerald-600',
  kashaya: 'bg-purple-400',
};

const rasaLabels: Record<Rasa, string> = {
  madhura: 'Sweet',
  amla: 'Sour',
  lavana: 'Salty',
  katu: 'Pungent',
  tikta: 'Bitter',
  kashaya: 'Astringent',
};

export function MealPlate({ meal, anhScore, onRemoveFood, editable }: MealPlateProps) {
  const allRasas: Rasa[] = ['madhura', 'amla', 'lavana', 'katu', 'tikta', 'kashaya'];
  
  return (
    <div className="card p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-xl font-semibold">{meal.name}</h3>
          <p className="text-sm text-stone capitalize">{meal.type}</p>
        </div>
        {anhScore !== undefined && (
          <ScoreCircle score={anhScore} size="md" label="ANH Score" />
        )}
      </div>

      {/* Food Items */}
      <div className="space-y-2 mb-4">
        {meal.foods.map(item => (
          <div
            key={item.foodId}
            className="flex items-center justify-between p-3 bg-sand rounded-lg"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-clay flex items-center justify-center text-lg">
                {getCategoryEmoji(item.food.category)}
              </div>
              <div>
                <p className="font-medium">{item.food.name}</p>
                <p className="text-xs text-stone">
                  {item.quantity} x {item.unit}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right text-sm">
                <p className="font-medium">{Math.round(item.food.nutrition.calories * item.quantity)} cal</p>
                <p className="text-xs text-stone">{Math.round(item.food.nutrition.protein * item.quantity)}g protein</p>
              </div>
              {editable && onRemoveFood && (
                <button
                  onClick={() => onRemoveFood(item.foodId)}
                  className="w-8 h-8 rounded-full bg-severe/10 text-severe hover:bg-severe/20 transition-colors flex items-center justify-center"
                >
                  x
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Rasa Coverage (6 Tastes Wheel) */}
      <div className="mb-4">
        <h4 className="text-sm font-medium mb-2">Taste Coverage (Shadras)</h4>
        <div className="flex gap-2">
          {allRasas.map(rasa => {
            const covered = meal.rasaCoverage.includes(rasa);
            return (
              <div
                key={rasa}
                className={`flex-1 text-center p-2 rounded-lg transition-all ${
                  covered 
                    ? `${rasaColors[rasa]} text-white` 
                    : 'bg-sand text-stone'
                }`}
              >
                <div className="text-xs font-medium">
                  {rasaLabels[rasa]}
                </div>
              </div>
            );
          })}
        </div>
        <p className="text-xs text-stone mt-1 text-center">
          {meal.rasaCoverage.length}/6 tastes covered
        </p>
      </div>

      {/* Nutrition Summary */}
      <div className="grid grid-cols-4 gap-3 p-4 bg-sand rounded-lg">
        <NutrientBox label="Calories" value={Math.round(meal.totalNutrition.calories)} unit="kcal" />
        <NutrientBox label="Protein" value={Math.round(meal.totalNutrition.protein)} unit="g" />
        <NutrientBox label="Carbs" value={Math.round(meal.totalNutrition.carbs)} unit="g" />
        <NutrientBox label="Fat" value={Math.round(meal.totalNutrition.fat)} unit="g" />
      </div>

      {/* Dosha Impact */}
      <div className="mt-4 flex justify-center gap-6">
        {(['vata', 'pitta', 'kapha'] as const).map(dosha => {
          const effect = meal.overallDoshaEffect[dosha];
          return (
            <div key={dosha} className="text-center">
              <div className={`
                w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold
                ${dosha === 'vata' ? 'bg-vata/20 text-vata' : ''}
                ${dosha === 'pitta' ? 'bg-pitta/20 text-pitta' : ''}
                ${dosha === 'kapha' ? 'bg-kapha/20 text-kapha' : ''}
              `}>
                {effect > 0 ? '+' : ''}{effect}
              </div>
              <p className="text-xs mt-1 capitalize text-stone">{dosha}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function NutrientBox({ label, value, unit }: { label: string; value: number; unit: string }) {
  return (
    <div className="text-center">
      <div className="text-lg font-bold">{value}</div>
      <div className="text-xs text-stone">{unit}</div>
      <div className="text-xs text-stone">{label}</div>
    </div>
  );
}

function getCategoryEmoji(category: string): string {
  const emojis: Record<string, string> = {
    grains: 'G',
    pulses: 'P',
    vegetables: 'V',
    fruits: 'F',
    dairy: 'D',
    spices: 'S',
    oils: 'O',
    nuts_seeds: 'N',
    beverages: 'B',
    meat: 'M',
    seafood: 'SF',
    sweets: 'SW',
  };
  return emojis[category] || '?';
}

