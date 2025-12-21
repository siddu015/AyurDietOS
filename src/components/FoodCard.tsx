'use client';

import { Food, ANHScoreResult } from '@/lib/types';
import { ScoreCircle } from './ui/ScoreCircle';

interface FoodCardProps {
  food: Food;
  score?: ANHScoreResult;
  onSelect?: (food: Food) => void;
  selected?: boolean;
  compact?: boolean;
}

const rasaLabels: Record<string, string> = {
  madhura: 'Sweet',
  amla: 'Sour',
  lavana: 'Salty',
  katu: 'Pungent',
  tikta: 'Bitter',
  kashaya: 'Astringent',
};

const viryaLabels: Record<string, { label: string; color: string }> = {
  ushna: { label: 'Heating', color: 'bg-pitta/20 text-pitta' },
  sheeta: { label: 'Cooling', color: 'bg-vata/20 text-vata' },
};

export function FoodCard({ food, score, onSelect, selected, compact }: FoodCardProps) {
  const handleClick = () => {
    if (onSelect) onSelect(food);
  };

  if (compact) {
    return (
      <div
        onClick={handleClick}
        className={`
          p-3 rounded-lg border-2 cursor-pointer transition-all
          ${selected 
            ? 'border-primary bg-primary/10' 
            : 'border-transparent bg-sand hover:border-clay'
          }
        `}
      >
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium">{food.name}</h4>
            {food.nameHindi && (
              <p className="text-sm text-stone">{food.nameHindi}</p>
            )}
          </div>
          {score && (
            <ScoreCircle score={score.totalScore} size="sm" />
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={handleClick}
      className={`
        card p-4 cursor-pointer
        ${selected ? 'ring-2 ring-primary' : ''}
      `}
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-lg font-semibold">{food.name}</h3>
          {food.nameHindi && (
            <p className="text-sm text-stone">{food.nameHindi}</p>
          )}
          <span className="inline-block mt-1 px-2 py-0.5 text-xs rounded-full bg-clay/50 text-stone capitalize">
            {food.category.replace('_', ' ')}
          </span>
        </div>
        {score && (
          <ScoreCircle score={score.totalScore} size="sm" />
        )}
      </div>

      {/* Ayurvedic Properties */}
      <div className="mb-3">
        <div className="flex flex-wrap gap-1 mb-2">
          {food.ayurvedic.rasa.map(rasa => (
            <span
              key={rasa}
              className="px-2 py-0.5 text-xs rounded-full bg-secondary/10 text-secondary"
            >
              {rasaLabels[rasa]}
            </span>
          ))}
        </div>
        <span className={`px-2 py-0.5 text-xs rounded-full ${viryaLabels[food.ayurvedic.virya].color}`}>
          {viryaLabels[food.ayurvedic.virya].label}
        </span>
      </div>

      {/* Dosha Effects */}
      <div className="flex gap-2 mb-3">
        {(['vata', 'pitta', 'kapha'] as const).map(dosha => {
          const effect = food.ayurvedic.doshaEffect[dosha];
          const effectClass = effect < 0 ? 'text-secondary' : effect > 0 ? 'text-severe' : 'text-stone';
          const effectSymbol = effect < 0 ? '-' : effect > 0 ? '+' : '';
          return (
            <div key={dosha} className="text-center flex-1">
              <div className={`text-xs uppercase tracking-wider ${dosha === 'vata' ? 'text-vata' : dosha === 'pitta' ? 'text-pitta' : 'text-kapha'}`}>
                {dosha[0].toUpperCase()}
              </div>
              <div className={`font-semibold ${effectClass}`}>
                {effectSymbol}{Math.abs(effect)}
              </div>
            </div>
          );
        })}
      </div>

      {/* Nutrition */}
      <div className="grid grid-cols-4 gap-2 text-center text-xs border-t border-sand pt-3">
        <div>
          <div className="font-semibold">{food.nutrition.calories}</div>
          <div className="text-stone">cal</div>
        </div>
        <div>
          <div className="font-semibold">{food.nutrition.protein}g</div>
          <div className="text-stone">protein</div>
        </div>
        <div>
          <div className="font-semibold">{food.nutrition.carbs}g</div>
          <div className="text-stone">carbs</div>
        </div>
        <div>
          <div className="font-semibold">{food.nutrition.fat}g</div>
          <div className="text-stone">fat</div>
        </div>
      </div>

      {/* Score Breakdown */}
      {score && (
        <div className="mt-3 pt-3 border-t border-sand">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex justify-between">
              <span className="text-stone">Ayurvedic</span>
              <span className="font-medium">{score.ayurvedicScore}/100</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone">Nutritional</span>
              <span className="font-medium">{score.nutritionalScore}/100</span>
            </div>
          </div>
          
          {score.warnings.length > 0 && (
            <div className="mt-2 p-2 bg-severe/10 rounded text-xs text-severe">
              {score.warnings[0]}
            </div>
          )}
          
          {score.recommendations.length > 0 && score.warnings.length === 0 && (
            <div className="mt-2 p-2 bg-secondary/10 rounded text-xs text-secondary">
              {score.recommendations[0]}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

