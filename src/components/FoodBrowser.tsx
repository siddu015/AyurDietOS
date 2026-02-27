'use client';

import { useState, useMemo, useCallback } from 'react';
import { Food, PatientProfile, FoodCategory, DoshaType, Virya, Rasa } from '@/lib/types';
import { calculateANHScore } from '@/lib/algorithms';
import { Search, RotateCcw, Grid3X3, List } from 'lucide-react';

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
  proteinMin: number;
  sortBy: 'name' | 'score' | 'calories' | 'protein';
  sortOrder: 'asc' | 'desc';
}

const CATEGORIES: { value: FoodCategory | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'grains', label: 'Grains' },
  { value: 'pulses', label: 'Pulses' },
  { value: 'vegetables', label: 'Vegetables' },
  { value: 'fruits', label: 'Fruits' },
  { value: 'dairy', label: 'Dairy' },
  { value: 'oils', label: 'Oils' },
  { value: 'spices', label: 'Spices' },
  { value: 'nuts_seeds', label: 'Nuts & Seeds' },
  { value: 'sweets', label: 'Sweets' },
  { value: 'meat', label: 'Meat' },
  { value: 'seafood', label: 'Seafood' },
  { value: 'beverages', label: 'Beverages' },
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
    proteinMin: 0,
    sortBy: patient ? 'score' : 'name',
    sortOrder: 'desc',
  });

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);

  const foodsWithScores = useMemo(() => {
    return foods.map(food => ({
      food,
      score: patient ? calculateANHScore(food, patient) : null,
    }));
  }, [foods, patient]);

  const filteredFoods = useMemo(() => {
    let result = foodsWithScores;

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(({ food }) =>
        food.name.toLowerCase().includes(searchLower) ||
        food.nameHindi?.toLowerCase().includes(searchLower) ||
        food.id.includes(searchLower)
      );
    }

    if (filters.category !== 'all') {
      result = result.filter(({ food }) => food.category === filters.category);
    }

    if (filters.virya !== 'all') {
      result = result.filter(({ food }) => food.ayurvedic.virya === filters.virya);
    }

    if (filters.rasa !== 'all') {
      result = result.filter(({ food }) => food.ayurvedic.rasa.includes(filters.rasa as Rasa));
    }

    if (filters.doshaEffect !== 'all') {
      const dosha = filters.doshaEffect;
      result = result.filter(({ food }) => {
        const effect = food.ayurvedic.doshaEffect[dosha];
        if (filters.doshaDirection === 'pacifying') return effect < 0;
        if (filters.doshaDirection === 'aggravating') return effect > 0;
        return effect !== 0;
      });
    }

    if (filters.proteinMin > 0) {
      result = result.filter(({ food }) => food.nutrition.protein >= filters.proteinMin);
    }

    result.sort((a, b) => {
      let comparison = 0;
      switch (filters.sortBy) {
        case 'name':
          comparison = a.food.name.localeCompare(b.food.name);
          break;
        case 'score':
          comparison = (a.score?.totalScore ?? 0) - (b.score?.totalScore ?? 0);
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

  const updateFilter = useCallback(<K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({
      search: '', category: 'all', virya: 'all', rasa: 'all',
      doshaEffect: 'all', doshaDirection: 'all', proteinMin: 0,
      sortBy: patient ? 'score' : 'name', sortOrder: 'desc',
    });
  }, [patient]);

  const handleSelectFood = (food: Food) => {
    setSelectedFood(food);
    onSelectFood?.(food);
  };

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: foods.length };
    foods.forEach(food => { counts[food.category] = (counts[food.category] || 0) + 1; });
    return counts;
  }, [foods]);

  const scoreColor = (s: number) =>
    s >= 70 ? 'bg-green-500/15 text-green-400' :
    s >= 50 ? 'bg-yellow-500/15 text-yellow-400' :
    'bg-red-500/15 text-red-400';

  return (
    <div className="space-y-5">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
        <input
          type="text"
          placeholder="Search foods (English / Hindi)..."
          value={filters.search}
          onChange={(e) => updateFilter('search', e.target.value)}
          className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white placeholder-white/30 focus:outline-none focus:border-[#c9a227]/40 focus:ring-1 focus:ring-[#c9a227]/20 transition-all"
        />
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {CATEGORIES.map(cat => (
          <button
            key={cat.value}
            onClick={() => updateFilter('category', cat.value)}
            className={`flex items-center gap-1 px-3 py-2 rounded-lg whitespace-nowrap text-sm transition-all ${
              filters.category === cat.value
                ? 'bg-[#c9a227]/15 text-[#c9a227] border border-[#c9a227]/30'
                : 'bg-white/[0.04] text-white/50 border border-white/[0.06] hover:bg-white/[0.06]'
            }`}
          >
            {cat.label}
            <span className="text-[10px] opacity-60">({categoryCounts[cat.value] || 0})</span>
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-sm font-medium text-white/60">Filters</h3>
          <button onClick={resetFilters} className="flex items-center gap-1 text-xs text-[#c9a227] hover:text-[#e8d18c] transition-colors">
            <RotateCcw className="h-3 w-3" /> Reset
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div>
            <label className="text-[10px] text-white/30 block mb-1">Virya (Potency)</label>
            <select value={filters.virya} onChange={(e) => updateFilter('virya', e.target.value as Virya | 'all')}
              className="w-full px-3 py-2 rounded-lg bg-white/[0.05] border border-white/[0.06] text-sm text-white/70 focus:outline-none focus:border-[#c9a227]/40">
              <option value="all" className="bg-[#141414]">All</option>
              <option value="ushna" className="bg-[#141414]">Heating (Ushna)</option>
              <option value="sheeta" className="bg-[#141414]">Cooling (Sheeta)</option>
            </select>
          </div>

          <div>
            <label className="text-[10px] text-white/30 block mb-1">Rasa (Taste)</label>
            <select value={filters.rasa} onChange={(e) => updateFilter('rasa', e.target.value as Rasa | 'all')}
              className="w-full px-3 py-2 rounded-lg bg-white/[0.05] border border-white/[0.06] text-sm text-white/70 focus:outline-none focus:border-[#c9a227]/40">
              {RASAS.map(rasa => (
                <option key={rasa.value} value={rasa.value} className="bg-[#141414]">
                  {rasa.label} ({rasa.labelHindi})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[10px] text-white/30 block mb-1">Dosha Effect</label>
            <div className="flex gap-1">
              <select value={filters.doshaEffect} onChange={(e) => updateFilter('doshaEffect', e.target.value as DoshaType | 'all')}
                className="flex-1 px-2 py-2 rounded-lg bg-white/[0.05] border border-white/[0.06] text-sm text-white/70 focus:outline-none">
                <option value="all" className="bg-[#141414]">All</option>
                <option value="vata" className="bg-[#141414]">Vata</option>
                <option value="pitta" className="bg-[#141414]">Pitta</option>
                <option value="kapha" className="bg-[#141414]">Kapha</option>
              </select>
              {filters.doshaEffect !== 'all' && (
                <select value={filters.doshaDirection} onChange={(e) => updateFilter('doshaDirection', e.target.value as 'pacifying' | 'aggravating' | 'all')}
                  className="px-2 py-2 rounded-lg bg-white/[0.05] border border-white/[0.06] text-sm text-white/70 focus:outline-none">
                  <option value="all" className="bg-[#141414]">Any</option>
                  <option value="pacifying" className="bg-[#141414]">Pacifying</option>
                  <option value="aggravating" className="bg-[#141414]">Aggravating</option>
                </select>
              )}
            </div>
          </div>

          <div>
            <label className="text-[10px] text-white/30 block mb-1">Min Protein (g)</label>
            <input type="number" value={filters.proteinMin} onChange={(e) => updateFilter('proteinMin', parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 rounded-lg bg-white/[0.05] border border-white/[0.06] text-sm text-white/70 focus:outline-none focus:border-[#c9a227]/40"
              min={0} max={50} />
          </div>
        </div>

        {/* Sort + View */}
        <div className="flex justify-between items-center mt-3 pt-3 border-t border-white/[0.04]">
          <div className="flex items-center gap-2">
            <label className="text-xs text-white/30">Sort:</label>
            <select value={filters.sortBy} onChange={(e) => updateFilter('sortBy', e.target.value as FilterState['sortBy'])}
              className="px-2 py-1.5 rounded-lg bg-white/[0.05] border border-white/[0.06] text-xs text-white/60 focus:outline-none">
              <option value="name" className="bg-[#141414]">Name</option>
              <option value="score" className="bg-[#141414]">ANH Score</option>
              <option value="calories" className="bg-[#141414]">Calories</option>
              <option value="protein" className="bg-[#141414]">Protein</option>
            </select>
            <button onClick={() => updateFilter('sortOrder', filters.sortOrder === 'asc' ? 'desc' : 'asc')}
              className="p-1.5 rounded-lg bg-white/[0.05] border border-white/[0.06] text-white/50 hover:text-white/80 text-xs transition-colors">
              {filters.sortOrder === 'asc' ? '↑' : '↓'}
            </button>
          </div>

          <div className="flex items-center gap-1">
            <button onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-[#c9a227]/15 text-[#c9a227]' : 'bg-white/[0.04] text-white/40'}`}>
              <Grid3X3 className="h-4 w-4" />
            </button>
            <button onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-[#c9a227]/15 text-[#c9a227]' : 'bg-white/[0.04] text-white/40'}`}>
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Count */}
      <div className="text-xs text-white/30">
        Showing {filteredFoods.length} of {foods.length} foods
      </div>

      {/* Food Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {filteredFoods.map(({ food, score }) => (
            <div
              key={food.id}
              onClick={() => handleSelectFood(food)}
              className={`p-4 rounded-xl cursor-pointer transition-all duration-200 bg-white/[0.03] border hover:bg-white/[0.05] ${
                selectedFood?.id === food.id ? 'border-[#c9a227]/40 ring-1 ring-[#c9a227]/20' : 'border-white/[0.06] hover:border-white/[0.1]'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-medium text-sm text-white/80">{food.name}</h4>
                  <p className="text-[10px] text-white/30">{food.nameHindi}</p>
                </div>
                {showScores && score && (
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${scoreColor(score.totalScore)}`}>
                    {score.totalScore}
                  </span>
                )}
              </div>
              <div className="flex gap-1 flex-wrap mt-2">
                {food.ayurvedic.rasa.slice(0, 2).map(r => (
                  <span key={r} className="text-[10px] px-1.5 py-0.5 rounded bg-white/[0.06] text-white/40">{r}</span>
                ))}
                <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                  food.ayurvedic.virya === 'ushna' ? 'bg-red-500/10 text-red-400/60' : 'bg-blue-500/10 text-blue-400/60'
                }`}>
                  {food.ayurvedic.virya}
                </span>
              </div>
              <div className="text-[10px] text-white/30 mt-2">
                {food.nutrition.calories} kcal | {food.nutrition.protein}g protein
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-1.5">
          {filteredFoods.map(({ food, score }) => (
            <div
              key={food.id}
              onClick={() => handleSelectFood(food)}
              className={`p-3 rounded-xl cursor-pointer transition-all flex justify-between items-center bg-white/[0.03] border hover:bg-white/[0.05] ${
                selectedFood?.id === food.id ? 'border-[#c9a227]/40 ring-1 ring-[#c9a227]/20' : 'border-white/[0.06] hover:border-white/[0.1]'
              }`}
            >
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-medium text-white/80">{food.name}</h4>
                  <span className="text-xs text-white/30">({food.nameHindi})</span>
                </div>
                <div className="flex gap-2 text-[10px] text-white/30 mt-0.5">
                  <span className="capitalize">{food.category}</span>
                  <span>|</span>
                  <span>{food.nutrition.calories} kcal</span>
                  <span>|</span>
                  <span>{food.nutrition.protein}g protein</span>
                  <span>|</span>
                  <span>{food.ayurvedic.virya}</span>
                </div>
              </div>
              {showScores && score && (
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${scoreColor(score.totalScore)}`}>
                  {score.totalScore}
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      {filteredFoods.length === 0 && (
        <div className="text-center py-12">
          <p className="text-white/30 text-sm">No foods found matching your filters.</p>
          <button onClick={resetFilters} className="mt-2 text-[#c9a227] text-sm hover:text-[#e8d18c] transition-colors">
            Reset filters
          </button>
        </div>
      )}
    </div>
  );
}
