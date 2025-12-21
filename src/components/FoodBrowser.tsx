'use client';

import { useState, useMemo, useCallback } from 'react';
import { Food, PatientProfile, FoodCategory, DoshaType, Virya, Rasa } from '@/lib/types';
import { calculateANHScore } from '@/lib/algorithms';
import { ScoreCircle } from './ui/ScoreCircle';
import { FoodCard } from './FoodCard';

interface FoodBrowserProps {
  foods: Food[];
  patient?: PatientProfile;
  onSelectFood?: (food: Food) => void;
  showScores?: boolean;
}

interface FilterState {
  search: string;
  category: FoodCategory | 'all';
  virya: Virya | 'all';
  rasa: Rasa | 'all';
  doshaEffect: DoshaType | 'all';
  doshaDirection: 'pacifying' | 'aggravating' | 'all';
  calorieRange: [number, number];
  proteinMin: number;
  sortBy: 'name' | 'score' | 'calories' | 'protein';
  sortOrder: 'asc' | 'desc';
}

const CATEGORIES: { value: FoodCategory | 'all'; label: string; icon: string }[] = [
  { value: 'all', label: 'All', icon: '🍽️' },
  { value: 'grains', label: 'Grains', icon: '🌾' },
  { value: 'pulses', label: 'Pulses', icon: '🫘' },
  { value: 'vegetables', label: 'Vegetables', icon: '🥬' },
  { value: 'fruits', label: 'Fruits', icon: '🍎' },
  { value: 'dairy', label: 'Dairy', icon: '🥛' },
  { value: 'oils', label: 'Oils', icon: '🫒' },
  { value: 'spices', label: 'Spices', icon: '🌶️' },
  { value: 'nuts_seeds', label: 'Nuts & Seeds', icon: '🥜' },
  { value: 'sweets', label: 'Sweets', icon: '🍯' },
  { value: 'meat', label: 'Meat', icon: '🍗' },
  { value: 'seafood', label: 'Seafood', icon: '🐟' },
  { value: 'beverages', label: 'Beverages', icon: '🍵' },
];

const RASAS: { value: Rasa | 'all'; label: string; labelHindi: string }[] = [
  { value: 'all', label: 'All Tastes', labelHindi: 'Sabhi Ras' },
  { value: 'madhura', label: 'Sweet', labelHindi: 'Madhur' },
  { value: 'amla', label: 'Sour', labelHindi: 'Amla' },
  { value: 'lavana', label: 'Salty', labelHindi: 'Lavana' },
  { value: 'katu', label: 'Pungent', labelHindi: 'Katu' },
  { value: 'tikta', label: 'Bitter', labelHindi: 'Tikta' },
  { value: 'kashaya', label: 'Astringent', labelHindi: 'Kashaya' },
];

export function FoodBrowser({ foods, patient, onSelectFood, showScores = true }: FoodBrowserProps) {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    category: 'all',
    virya: 'all',
    rasa: 'all',
    doshaEffect: 'all',
    doshaDirection: 'all',
    calorieRange: [0, 500],
    proteinMin: 0,
    sortBy: 'name',
    sortOrder: 'asc',
  });

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);

  // Calculate scores for all foods if patient is provided
  const foodsWithScores = useMemo(() => {
    return foods.map(food => ({
      food,
      score: patient ? calculateANHScore(food, patient).totalScore : 50,
    }));
  }, [foods, patient]);

  // Filter and sort foods
  const filteredFoods = useMemo(() => {
    let result = foodsWithScores;

    // Search filter (English and Hindi)
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(({ food }) => 
        food.name.toLowerCase().includes(searchLower) ||
        food.nameHindi?.toLowerCase().includes(searchLower) ||
        food.id.includes(searchLower)
      );
    }

    // Category filter
    if (filters.category !== 'all') {
      result = result.filter(({ food }) => food.category === filters.category);
    }

    // Virya filter
    if (filters.virya !== 'all') {
      result = result.filter(({ food }) => food.ayurvedic.virya === filters.virya);
    }

    // Rasa filter
    if (filters.rasa !== 'all') {
      result = result.filter(({ food }) => food.ayurvedic.rasa.includes(filters.rasa as Rasa));
    }

    // Dosha effect filter
    if (filters.doshaEffect !== 'all') {
      const dosha = filters.doshaEffect;
      result = result.filter(({ food }) => {
        const effect = food.ayurvedic.doshaEffect[dosha];
        if (filters.doshaDirection === 'pacifying') return effect < 0;
        if (filters.doshaDirection === 'aggravating') return effect > 0;
        return effect !== 0;
      });
    }

    // Calorie range filter
    result = result.filter(({ food }) => 
      food.nutrition.calories >= filters.calorieRange[0] &&
      food.nutrition.calories <= filters.calorieRange[1]
    );

    // Protein minimum filter
    if (filters.proteinMin > 0) {
      result = result.filter(({ food }) => food.nutrition.protein >= filters.proteinMin);
    }

    // Sorting
    result.sort((a, b) => {
      let comparison = 0;
      switch (filters.sortBy) {
        case 'name':
          comparison = a.food.name.localeCompare(b.food.name);
          break;
        case 'score':
          comparison = a.score - b.score;
          break;
        case 'calories':
          comparison = a.food.nutrition.calories - b.food.nutrition.calories;
          break;
        case 'protein':
          comparison = a.food.nutrition.protein - b.food.nutrition.protein;
          break;
      }
      return filters.sortOrder === 'asc' ? comparison : -comparison;
    });

    return result;
  }, [foodsWithScores, filters]);

  const updateFilter = useCallback(<K extends keyof FilterState>(
    key: K, 
    value: FilterState[K]
  ) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({
      search: '',
      category: 'all',
      virya: 'all',
      rasa: 'all',
      doshaEffect: 'all',
      doshaDirection: 'all',
      calorieRange: [0, 500],
      proteinMin: 0,
      sortBy: 'name',
      sortOrder: 'asc',
    });
  }, []);

  const handleSelectFood = (food: Food) => {
    setSelectedFood(food);
    onSelectFood?.(food);
  };

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: foods.length };
    foods.forEach(food => {
      counts[food.category] = (counts[food.category] || 0) + 1;
    });
    return counts;
  }, [foods]);

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search foods (English / Hindi)..."
          value={filters.search}
          onChange={(e) => updateFilter('search', e.target.value)}
          className="w-full px-4 py-3 pl-10 bg-sand rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <svg 
          className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {CATEGORIES.map(cat => (
          <button
            key={cat.value}
            onClick={() => updateFilter('category', cat.value)}
            className={`flex items-center gap-1 px-3 py-2 rounded-lg whitespace-nowrap transition-colors ${
              filters.category === cat.value
                ? 'bg-primary text-white'
                : 'bg-sand text-stone hover:bg-clay'
            }`}
          >
            <span>{cat.icon}</span>
            <span className="text-sm">{cat.label}</span>
            <span className="text-xs opacity-75">({categoryCounts[cat.value] || 0})</span>
          </button>
        ))}
      </div>

      {/* Advanced Filters */}
      <div className="card p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium">Filters</h3>
          <button 
            onClick={resetFilters}
            className="text-sm text-primary hover:underline"
          >
            Reset All
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Virya Filter */}
          <div>
            <label className="text-xs text-stone block mb-1">Virya (Potency)</label>
            <select
              value={filters.virya}
              onChange={(e) => updateFilter('virya', e.target.value as Virya | 'all')}
              className="w-full px-3 py-2 bg-sand rounded text-sm"
            >
              <option value="all">All</option>
              <option value="ushna">Heating (Ushna)</option>
              <option value="sheeta">Cooling (Sheeta)</option>
            </select>
          </div>

          {/* Rasa Filter */}
          <div>
            <label className="text-xs text-stone block mb-1">Rasa (Taste)</label>
            <select
              value={filters.rasa}
              onChange={(e) => updateFilter('rasa', e.target.value as Rasa | 'all')}
              className="w-full px-3 py-2 bg-sand rounded text-sm"
            >
              {RASAS.map(rasa => (
                <option key={rasa.value} value={rasa.value}>
                  {rasa.label} ({rasa.labelHindi})
                </option>
              ))}
            </select>
          </div>

          {/* Dosha Effect Filter */}
          <div>
            <label className="text-xs text-stone block mb-1">Dosha Effect</label>
            <div className="flex gap-1">
              <select
                value={filters.doshaEffect}
                onChange={(e) => updateFilter('doshaEffect', e.target.value as DoshaType | 'all')}
                className="flex-1 px-2 py-2 bg-sand rounded text-sm"
              >
                <option value="all">All</option>
                <option value="vata">Vata</option>
                <option value="pitta">Pitta</option>
                <option value="kapha">Kapha</option>
              </select>
              {filters.doshaEffect !== 'all' && (
                <select
                  value={filters.doshaDirection}
                  onChange={(e) => updateFilter('doshaDirection', e.target.value as 'pacifying' | 'aggravating' | 'all')}
                  className="px-2 py-2 bg-sand rounded text-sm"
                >
                  <option value="all">Any</option>
                  <option value="pacifying">Pacifying</option>
                  <option value="aggravating">Aggravating</option>
                </select>
              )}
            </div>
          </div>

          {/* Protein Filter */}
          <div>
            <label className="text-xs text-stone block mb-1">Min Protein (g)</label>
            <input
              type="number"
              value={filters.proteinMin}
              onChange={(e) => updateFilter('proteinMin', parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 bg-sand rounded text-sm"
              min={0}
              max={50}
            />
          </div>
        </div>

        {/* Sort Options */}
        <div className="flex justify-between items-center mt-4 pt-4 border-t border-clay">
          <div className="flex items-center gap-2">
            <label className="text-sm text-stone">Sort by:</label>
            <select
              value={filters.sortBy}
              onChange={(e) => updateFilter('sortBy', e.target.value as FilterState['sortBy'])}
              className="px-3 py-1 bg-sand rounded text-sm"
            >
              <option value="name">Name</option>
              <option value="score">ANH Score</option>
              <option value="calories">Calories</option>
              <option value="protein">Protein</option>
            </select>
            <button
              onClick={() => updateFilter('sortOrder', filters.sortOrder === 'asc' ? 'desc' : 'asc')}
              className="p-1 bg-sand rounded hover:bg-clay"
            >
              {filters.sortOrder === 'asc' ? '↑' : '↓'}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded ${viewMode === 'grid' ? 'bg-primary text-white' : 'bg-sand'}`}
            >
              ⊞
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded ${viewMode === 'list' ? 'bg-primary text-white' : 'bg-sand'}`}
            >
              ☰
            </button>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="text-sm text-stone">
        Showing {filteredFoods.length} of {foods.length} foods
      </div>

      {/* Food Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredFoods.map(({ food, score }) => (
            <div 
              key={food.id}
              onClick={() => handleSelectFood(food)}
              className={`card p-4 cursor-pointer hover:shadow-lg transition-shadow ${
                selectedFood?.id === food.id ? 'ring-2 ring-primary' : ''
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-medium text-sm">{food.name}</h4>
                  <p className="text-xs text-stone">{food.nameHindi}</p>
                </div>
                {showScores && patient && (
                  <ScoreCircle score={score} size="sm" />
                )}
              </div>
              <div className="flex gap-1 flex-wrap mt-2">
                {food.ayurvedic.rasa.slice(0, 2).map(r => (
                  <span key={r} className="text-xs px-1 py-0.5 bg-sand rounded">
                    {r}
                  </span>
                ))}
                <span className={`text-xs px-1 py-0.5 rounded ${
                  food.ayurvedic.virya === 'ushna' ? 'bg-moderate/20' : 'bg-secondary/20'
                }`}>
                  {food.ayurvedic.virya}
                </span>
              </div>
              <div className="text-xs text-stone mt-2">
                {food.nutrition.calories} kcal | {food.nutrition.protein}g protein
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {filteredFoods.map(({ food, score }) => (
            <div 
              key={food.id}
              onClick={() => handleSelectFood(food)}
              className={`card p-3 cursor-pointer hover:shadow-md transition-shadow flex justify-between items-center ${
                selectedFood?.id === food.id ? 'ring-2 ring-primary' : ''
              }`}
            >
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium">{food.name}</h4>
                  <span className="text-sm text-stone">({food.nameHindi})</span>
                </div>
                <div className="flex gap-2 text-xs text-stone mt-1">
                  <span>{food.category}</span>
                  <span>|</span>
                  <span>{food.nutrition.calories} kcal</span>
                  <span>|</span>
                  <span>{food.nutrition.protein}g protein</span>
                  <span>|</span>
                  <span>{food.ayurvedic.virya}</span>
                </div>
              </div>
              {showScores && patient && (
                <ScoreCircle score={score} size="sm" />
              )}
            </div>
          ))}
        </div>
      )}

      {filteredFoods.length === 0 && (
        <div className="text-center py-12 text-stone">
          <p>No foods found matching your filters.</p>
          <button 
            onClick={resetFilters}
            className="mt-2 text-primary hover:underline"
          >
            Reset filters
          </button>
        </div>
      )}
    </div>
  );
}

