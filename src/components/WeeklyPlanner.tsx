'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Food, PatientProfile, FoodCategory } from '@/lib/types';
import { Recipe } from '@/lib/data/recipes';
import { MealTemplate, MealTemplateSlot } from '@/lib/data/mealTemplates';
import { calculateANHScore, calculateRecipeScore } from '@/lib/algorithms';
import { Search, Plus, X, Copy, Trash2, Flame, Beef, Leaf, Star, AlertTriangle, Check, Info } from 'lucide-react';

interface MealSlot {
  id: string;
  items: Array<{ type: 'food' | 'recipe'; id: string; portion: number }>;
}

interface DayPlan {
  breakfast: MealSlot;
  lunch: MealSlot;
  dinner: MealSlot;
  snacks: MealSlot;
}

interface WeeklyPlan {
  [key: string]: DayPlan;
}

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const MEALS = ['breakfast', 'lunch', 'dinner', 'snacks'] as const;
type MealKey = typeof MEALS[number];

const emptyMealSlot = (): MealSlot => ({ id: crypto.randomUUID(), items: [] });
const emptyDayPlan = (): DayPlan => ({
  breakfast: emptyMealSlot(),
  lunch: emptyMealSlot(),
  dinner: emptyMealSlot(),
  snacks: emptyMealSlot(),
});

const MEAL_SLOT_MAP: Record<MealKey, (keyof MealTemplate['mealStructure'])[]> = {
  breakfast: ['breakfast'],
  lunch: ['lunch'],
  dinner: ['dinner'],
  snacks: ['morningSnack', 'eveningSnack'],
};

interface WeeklyPlannerProps {
  patient: PatientProfile;
  foods: Food[];
  recipes: Recipe[];
  template?: MealTemplate;
  initialPlan?: WeeklyPlan;
  onPlanChange?: (plan: WeeklyPlan) => void;
}

export function WeeklyPlanner({
  patient,
  foods,
  recipes,
  template,
  initialPlan,
  onPlanChange
}: WeeklyPlannerProps) {
  const [plan, setPlan] = useState<WeeklyPlan>(() => {
    if (initialPlan) return initialPlan;
    return DAYS.reduce((acc, day) => ({ ...acc, [day]: emptyDayPlan() }), {});
  });

  const [selectedDay, setSelectedDay] = useState(DAYS[0]);
  const [selectedMeal, setSelectedMeal] = useState<MealKey>('breakfast');
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const templateSlotForMeal = useMemo(() => {
    if (!template) return null;
    const keys = MEAL_SLOT_MAP[selectedMeal];
    for (const k of keys) {
      const slot = template.mealStructure[k];
      if (slot) return slot;
    }
    return null;
  }, [template, selectedMeal]);

  const dailyTotals = useMemo(() => {
    const totals: Record<string, { calories: number; protein: number; carbs: number; fat: number; avgScore: number; itemCount: number }> = {};

    DAYS.forEach(day => {
      const dayPlan = plan[day];
      let calories = 0, protein = 0, carbs = 0, fat = 0, scoreSum = 0, itemCount = 0;

      if (dayPlan) {
        MEALS.forEach(meal => {
          const mealSlot = dayPlan[meal];
          if (mealSlot?.items) {
            mealSlot.items.forEach(item => {
              if (item.type === 'food') {
                const food = foods.find(f => f.id === item.id);
                if (food) {
                  calories += food.nutrition.calories * item.portion;
                  protein += food.nutrition.protein * item.portion;
                  carbs += food.nutrition.carbs * item.portion;
                  fat += food.nutrition.fat * item.portion;
                  scoreSum += calculateANHScore(food, patient).totalScore;
                  itemCount++;
                }
              } else {
                const recipe = recipes.find(r => r.id === item.id);
                if (recipe) {
                  const recipeScore = calculateRecipeScore(recipe, patient);
                  calories += recipeScore.totalNutrition.perServing.calories * item.portion;
                  protein += recipeScore.totalNutrition.perServing.protein * item.portion;
                  carbs += recipeScore.totalNutrition.perServing.carbs * item.portion;
                  fat += recipeScore.totalNutrition.perServing.fat * item.portion;
                  scoreSum += recipeScore.anhScore.totalScore;
                  itemCount++;
                }
              }
            });
          }
        });
      }

      totals[day] = {
        calories: Math.round(calories),
        protein: Math.round(protein),
        carbs: Math.round(carbs),
        fat: Math.round(fat),
        avgScore: itemCount > 0 ? Math.round(scoreSum / itemCount) : 0,
        itemCount,
      };
    });

    return totals;
  }, [plan, foods, recipes, patient]);

  const weeklyAverage = useMemo(() => {
    const totals = Object.values(dailyTotals);
    const daysWithFood = totals.filter(t => t.calories > 0).length;
    if (daysWithFood === 0) return { calories: 0, protein: 0, avgScore: 0 };

    return {
      calories: Math.round(totals.reduce((sum, t) => sum + t.calories, 0) / daysWithFood),
      protein: Math.round(totals.reduce((sum, t) => sum + t.protein, 0) / daysWithFood),
      avgScore: Math.round(totals.reduce((sum, t) => sum + t.avgScore, 0) / daysWithFood),
    };
  }, [dailyTotals]);

  const calorieTarget = template?.dailyCalorieTarget || patient.goals.dailyCalorieTarget || 2000;
  const proteinTarget = template?.macroTargets?.protein?.min || patient.goals.proteinTarget || 60;

  // ---- Classify foods per template ----
  const { recommendedFoods, compatibleFoods, avoidFoodIds } = useMemo(() => {
    if (!template) return { recommendedFoods: new Set<string>(), compatibleFoods: new Set<string>(), avoidFoodIds: new Set<string>() };

    const preferred = new Set(template.preferredFoods);
    const avoid = new Set(template.avoidFoods);
    const prefCats = new Set<FoodCategory>(template.preferredCategories);
    const avoidCats = new Set<FoodCategory>(template.avoidCategories);

    const rec = new Set<string>();
    const compat = new Set<string>();
    const avd = new Set<string>();

    foods.forEach(f => {
      if (avoid.has(f.id) || avoidCats.has(f.category)) {
        avd.add(f.id);
      } else if (preferred.has(f.id)) {
        rec.add(f.id);
      } else if (prefCats.has(f.category)) {
        compat.add(f.id);
      } else {
        compat.add(f.id);
      }
    });

    return { recommendedFoods: rec, compatibleFoods: compat, avoidFoodIds: avd };
  }, [template, foods]);

  // ---- Filter and sort foods for the add modal ----
  const modalFoods = useMemo(() => {
    const mealKey = selectedMeal === 'snacks' ? 'snack' : selectedMeal;
    const slotCategories = templateSlotForMeal
      ? new Set<FoodCategory>([...templateSlotForMeal.requiredCategories, ...templateSlotForMeal.optionalCategories])
      : null;

    let filtered = foods.filter(f => {
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return f.name.toLowerCase().includes(q) || f.nameHindi?.toLowerCase().includes(q) || f.category.toLowerCase().includes(q);
      }
      return true;
    });

    type FoodWithMeta = { food: Food; score: number; relevance: 'recommended' | 'compatible' | 'avoid' | 'other'; slotMatch: boolean };

    const scored: FoodWithMeta[] = filtered.map(f => {
      const anhScore = calculateANHScore(f, patient).totalScore;
      let relevance: FoodWithMeta['relevance'] = 'other';
      if (avoidFoodIds.has(f.id)) relevance = 'avoid';
      else if (recommendedFoods.has(f.id)) relevance = 'recommended';
      else if (compatibleFoods.has(f.id)) relevance = 'compatible';

      const slotMatch = slotCategories ? slotCategories.has(f.category) : true;

      return { food: f, score: anhScore, relevance, slotMatch };
    });

    scored.sort((a, b) => {
      const relOrder = { recommended: 0, compatible: 1, other: 2, avoid: 3 };
      const slotDiff = (a.slotMatch ? 0 : 1) - (b.slotMatch ? 0 : 1);
      if (slotDiff !== 0) return slotDiff;
      const relDiff = relOrder[a.relevance] - relOrder[b.relevance];
      if (relDiff !== 0) return relDiff;
      return b.score - a.score;
    });

    return scored;
  }, [foods, patient, searchQuery, selectedMeal, templateSlotForMeal, recommendedFoods, compatibleFoods, avoidFoodIds]);

  // ---- Filter recipes for the add modal ----
  const modalRecipes = useMemo(() => {
    const mealKey = selectedMeal === 'snacks' ? 'snack' : selectedMeal;
    const suggested = templateSlotForMeal?.suggestedRecipes ? new Set(templateSlotForMeal.suggestedRecipes) : new Set<string>();

    let filtered = recipes.filter(r => {
      if (!r.mealTypes.includes(mealKey as 'breakfast' | 'lunch' | 'dinner' | 'snack')) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return r.name.toLowerCase().includes(q) || r.nameHindi?.toLowerCase().includes(q);
      }
      return true;
    });

    type RecipeWithMeta = { recipe: Recipe; isSuggested: boolean; score: number };

    const scored: RecipeWithMeta[] = filtered.map(r => {
      const s = calculateRecipeScore(r, patient);
      return { recipe: r, isSuggested: suggested.has(r.id), score: s.anhScore.totalScore };
    });

    scored.sort((a, b) => {
      if (a.isSuggested && !b.isSuggested) return -1;
      if (!a.isSuggested && b.isSuggested) return 1;
      return b.score - a.score;
    });

    return scored;
  }, [recipes, patient, searchQuery, selectedMeal, templateSlotForMeal]);

  const addItemToMeal = (type: 'food' | 'recipe', id: string) => {
    const newPlan = { ...plan };
    if (!newPlan[selectedDay]) newPlan[selectedDay] = emptyDayPlan();
    newPlan[selectedDay] = {
      ...newPlan[selectedDay],
      [selectedMeal]: {
        ...newPlan[selectedDay][selectedMeal],
        items: [...newPlan[selectedDay][selectedMeal].items, { type, id, portion: 1 }]
      }
    };
    setPlan(newPlan);
    onPlanChange?.(newPlan);
    setShowAddModal(false);
    setSearchQuery('');
  };

  const removeItemFromMeal = (day: string, meal: MealKey, index: number) => {
    const newPlan = { ...plan };
    newPlan[day][meal].items.splice(index, 1);
    setPlan({ ...newPlan });
    onPlanChange?.(newPlan);
  };

  const clearDay = (day: string) => {
    const newPlan = { ...plan };
    newPlan[day] = emptyDayPlan();
    setPlan(newPlan);
    onPlanChange?.(newPlan);
  };

  const copyDayTo = (fromDay: string, toDay: string) => {
    const newPlan = { ...plan };
    newPlan[toDay] = JSON.parse(JSON.stringify(plan[fromDay]));
    setPlan(newPlan);
    onPlanChange?.(newPlan);
  };

  const scoreColor = (score: number) =>
    score >= 70 ? 'text-green-400' : score >= 50 ? 'text-yellow-400' : 'text-red-400';

  const scoreBg = (score: number) =>
    score >= 70 ? 'bg-green-500/15 text-green-400' : score >= 50 ? 'bg-yellow-500/15 text-yellow-400' : 'bg-red-500/15 text-red-400';

  return (
    <div className="space-y-6">
      {/* Weekly Overview Bar Chart */}
      <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Weekly Overview</h2>
          <div className="flex items-center gap-4 text-xs text-white/40">
            <span className="flex items-center gap-1"><Flame className="h-3 w-3 text-[#c9a227]" />{weeklyAverage.calories} avg kcal</span>
            <span className="flex items-center gap-1"><Beef className="h-3 w-3 text-[#4a7c59]" />{weeklyAverage.protein}g avg protein</span>
            <span className="flex items-center gap-1"><Leaf className="h-3 w-3 text-[#10b981]" />ANH: {weeklyAverage.avgScore}</span>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {DAYS.map(day => {
            const t = dailyTotals[day];
            const calPercent = Math.min(100, (t.calories / calorieTarget) * 100);
            const protPercent = Math.min(100, (t.protein / proteinTarget) * 100);
            const isActive = selectedDay === day;
            const isOver = t.calories > calorieTarget;

            return (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`p-3 rounded-xl text-center transition-all duration-200 ${isActive
                  ? 'bg-[#c9a227]/15 border border-[#c9a227]/30 ring-1 ring-[#c9a227]/20'
                  : 'bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06]'
                  }`}
              >
                <div className={`text-xs font-medium mb-1 ${isActive ? 'text-[#c9a227]' : 'text-white/50'}`}>
                  {day.slice(0, 3)}
                </div>
                <div className={`text-lg font-bold ${isOver ? 'text-red-400' : isActive ? 'text-white' : 'text-white/70'}`}>
                  {t.calories || '--'}
                </div>
                <div className="text-[10px] text-white/30 mb-2">kcal</div>
                <div className="space-y-1">
                  <div className="h-1 rounded-full bg-white/[0.06] overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${isOver ? 'bg-red-500/70' : 'bg-[#c9a227]/60'}`}
                      style={{ width: `${calPercent}%` }}
                    />
                  </div>
                  <div className="h-1 rounded-full bg-white/[0.06] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-[#4a7c59]/60 transition-all duration-500"
                      style={{ width: `${protPercent}%` }}
                    />
                  </div>
                </div>
                {t.avgScore > 0 && (
                  <div className={`text-[10px] font-bold mt-1.5 ${scoreColor(t.avgScore)}`}>{t.avgScore}</div>
                )}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-6 mt-3 pt-3 border-t border-white/[0.04] text-[10px] text-white/30">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-1 rounded-full bg-[#c9a227]/60" /> Calories ({calorieTarget} target)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-1 rounded-full bg-[#4a7c59]/60" /> Protein ({proteinTarget}g target)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-green-400/40" /> ANH Score (higher = better)
          </span>
        </div>
      </div>

      {/* Daily Nutrition Breakdown */}
      {dailyTotals[selectedDay]?.calories > 0 && (
        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
          <h3 className="text-sm font-semibold text-white/60 mb-3">{selectedDay} Nutrition</h3>
          <div className="grid grid-cols-4 gap-3">
            <NutritionBar label="Calories" value={dailyTotals[selectedDay].calories} target={calorieTarget} unit="kcal" color="from-[#c9a227] to-[#d35400]" />
            <NutritionBar label="Protein" value={dailyTotals[selectedDay].protein} target={proteinTarget} unit="g" color="from-[#4a7c59] to-[#3a6249]" />
            <NutritionBar label="Carbs" value={dailyTotals[selectedDay].carbs} target={Math.round(calorieTarget * 0.5 / 4)} unit="g" color="from-[#3b82f6] to-[#2563eb]" />
            <NutritionBar label="Fat" value={dailyTotals[selectedDay].fat} target={Math.round(calorieTarget * 0.3 / 9)} unit="g" color="from-[#a855f7] to-[#7c3aed]" />
          </div>
        </div>
      )}

      {/* Day Detail */}
      <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-lg font-semibold text-white">{selectedDay}</h2>
          <div className="flex gap-2">
            <button
              onClick={() => clearDay(selectedDay)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg bg-white/[0.05] text-white/50 hover:text-white/80 hover:bg-white/[0.08] transition-all"
            >
              <Trash2 className="h-3 w-3" /> Clear
            </button>
            <div className="relative">
              <select
                className="appearance-none px-3 py-1.5 text-xs rounded-lg bg-white/[0.05] text-white/50 border border-white/[0.06] cursor-pointer hover:bg-white/[0.08] transition-all pr-6"
                onChange={(e) => { if (e.target.value) copyDayTo(e.target.value, selectedDay); e.target.value = ''; }}
                value=""
              >
                <option value="" className="bg-[#141414]">Copy from...</option>
                {DAYS.filter(d => d !== selectedDay).map(d => (
                  <option key={d} value={d} className="bg-[#141414]">{d}</option>
                ))}
              </select>
              <Copy className="absolute right-2 top-1/2 -translate-y-1/2 h-3 w-3 text-white/30 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {MEALS.map(meal => {
            const items = plan[selectedDay]?.[meal]?.items || [];
            const slot = template ? getSlotForMeal(template, meal) : null;

            return (
              <div key={meal} className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <div className="flex justify-between items-center mb-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-white/80 capitalize text-sm">{meal}</h3>
                    {slot && (
                      <span className="text-[10px] text-white/25">{slot.calorieRange.min}-{slot.calorieRange.max} kcal</span>
                    )}
                  </div>
                  <button
                    onClick={() => { setSelectedMeal(meal); setShowAddModal(true); }}
                    className="flex items-center gap-1 px-3 py-1.5 text-xs rounded-lg bg-[#4a7c59]/15 text-[#7ab08a] border border-[#4a7c59]/20 hover:bg-[#4a7c59]/25 transition-all"
                  >
                    <Plus className="h-3 w-3" /> Add
                  </button>
                </div>

                {slot?.notes && (
                  <p className="text-[10px] text-white/20 mb-2 italic">{slot.notes}</p>
                )}

                {items.length === 0 ? (
                  <p className="text-xs text-white/20 italic">No items added</p>
                ) : (
                  <div className="space-y-1.5">
                    {items.map((item, index) => {
                      const itemData = item.type === 'food'
                        ? foods.find(f => f.id === item.id)
                        : recipes.find(r => r.id === item.id);
                      if (!itemData) return null;

                      const score = item.type === 'food'
                        ? calculateANHScore(itemData as Food, patient).totalScore
                        : null;

                      const isAvoid = item.type === 'food' && avoidFoodIds.has(item.id);

                      return (
                        <div key={index} className={`flex justify-between items-center p-2.5 rounded-lg border ${isAvoid ? 'bg-red-500/5 border-red-500/15' : 'bg-white/[0.03] border-white/[0.04]'}`}>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-white/80">{itemData.name}</span>
                            <span className="text-[10px] text-white/30 px-1.5 py-0.5 rounded bg-white/[0.04]">
                              x{item.portion}
                            </span>
                            {score !== null && (
                              <span className={`text-[10px] font-bold ${scoreColor(score)}`}>{score}</span>
                            )}
                            {isAvoid && (
                              <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-red-500/15 text-red-400 flex items-center gap-0.5">
                                <AlertTriangle className="w-2.5 h-2.5" /> avoid
                              </span>
                            )}
                          </div>
                          <button
                            onClick={() => removeItemFromMeal(selectedDay, meal, index)}
                            className="text-white/20 hover:text-red-400 transition-colors"
                          >
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ============================================================
          ADD ITEM MODAL -- template-aware & meal-type-aware
         ============================================================ */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={(e) => { if (e.target === e.currentTarget) { setShowAddModal(false); setSearchQuery(''); } }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-xl max-h-[85vh] overflow-hidden rounded-2xl bg-[#141414] border border-white/[0.08]"
            >
              {/* Modal Header */}
              <div className="p-5 border-b border-white/[0.06]">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="text-lg font-semibold text-white">
                    Add to <span className="capitalize text-[#c9a227]">{selectedMeal}</span>
                    <span className="text-xs text-white/30 font-normal ml-2">{selectedDay}</span>
                  </h3>
                  <button onClick={() => { setShowAddModal(false); setSearchQuery(''); }} className="text-white/30 hover:text-white/70 transition-colors">
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Template context hint */}
                {templateSlotForMeal && (
                  <div className="flex items-start gap-2 p-2.5 rounded-lg bg-[#c9a227]/5 border border-[#c9a227]/10 mt-3 mb-3">
                    <Info className="w-3.5 h-3.5 text-[#c9a227]/60 mt-0.5 flex-shrink-0" />
                    <div className="text-xs text-white/40 leading-relaxed">
                      <span className="text-white/60">Target: {templateSlotForMeal.calorieRange.min}-{templateSlotForMeal.calorieRange.max} kcal</span>
                      {templateSlotForMeal.requiredCategories.length > 0 && (
                        <span> -- Include {templateSlotForMeal.requiredCategories.map(c => c.replace(/_/g, ' ')).join(', ')}</span>
                      )}
                      {templateSlotForMeal.notes && <span> -- {templateSlotForMeal.notes}</span>}
                    </div>
                  </div>
                )}

                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
                  <input
                    placeholder="Search foods or recipes..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#c9a227]/40"
                    autoFocus
                  />
                </div>
              </div>

              {/* Modal Body */}
              <div className="overflow-y-auto max-h-[60vh] p-5 space-y-5">

                {/* Recipes Section -- only recipes matching this meal type */}
                {modalRecipes.length > 0 && (
                  <div>
                    <h4 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      Recipes for {selectedMeal}
                      <span className="text-white/20 font-normal normal-case">({modalRecipes.length})</span>
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {modalRecipes.slice(0, 12).map(({ recipe, isSuggested, score }) => (
                        <button
                          key={recipe.id}
                          onClick={() => addItemToMeal('recipe', recipe.id)}
                          className={`p-3 text-left rounded-lg border transition-all ${
                            isSuggested
                              ? 'bg-[#4a7c59]/8 border-[#4a7c59]/20 hover:bg-[#4a7c59]/15'
                              : 'bg-white/[0.03] border-white/[0.06] hover:bg-white/[0.06]'
                          }`}
                        >
                          <div className="flex justify-between items-start gap-2">
                            <div className="min-w-0">
                              <div className="flex items-center gap-1.5">
                                {isSuggested && <Star className="w-3 h-3 text-[#c9a227] flex-shrink-0" />}
                                <span className="text-sm font-medium text-white/80 truncate">{recipe.name}</span>
                              </div>
                              <div className="text-[10px] text-white/30 truncate">{recipe.nameHindi}</div>
                            </div>
                            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full flex-shrink-0 ${scoreBg(score)}`}>{score}</span>
                          </div>
                          {isSuggested && (
                            <span className="inline-block text-[9px] text-[#7ab08a] mt-1">Suggested for this plan</span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Recommended Foods */}
                {(() => {
                  const rec = modalFoods.filter(f => f.relevance === 'recommended');
                  if (rec.length === 0) return null;
                  return (
                    <div>
                      <h4 className="text-xs font-semibold text-green-400/70 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <Check className="w-3 h-3" /> Recommended for this plan
                        <span className="text-white/20 font-normal normal-case">({rec.length})</span>
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        {rec.slice(0, 12).map(({ food, score, slotMatch }) => (
                          <FoodButton key={food.id} food={food} score={score} scoreBg={scoreBg} slotMatch={slotMatch} onAdd={addItemToMeal} highlight />
                        ))}
                      </div>
                    </div>
                  );
                })()}

                {/* Compatible Foods (matching slot categories first) */}
                {(() => {
                  const compat = modalFoods.filter(f => f.relevance === 'compatible' || f.relevance === 'other');
                  if (compat.length === 0) return null;
                  const slotMatched = compat.filter(f => f.slotMatch);
                  const rest = compat.filter(f => !f.slotMatch);
                  return (
                    <div>
                      <h4 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-2">
                        Other Foods
                        <span className="text-white/20 font-normal normal-case ml-1.5">({compat.length})</span>
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        {slotMatched.slice(0, 10).map(({ food, score, slotMatch }) => (
                          <FoodButton key={food.id} food={food} score={score} scoreBg={scoreBg} slotMatch={slotMatch} onAdd={addItemToMeal} />
                        ))}
                        {rest.slice(0, 8).map(({ food, score, slotMatch }) => (
                          <FoodButton key={food.id} food={food} score={score} scoreBg={scoreBg} slotMatch={slotMatch} onAdd={addItemToMeal} />
                        ))}
                      </div>
                    </div>
                  );
                })()}

                {/* Avoid Foods -- collapsed by default, shown at bottom with warning */}
                {(() => {
                  const avoidItems = modalFoods.filter(f => f.relevance === 'avoid');
                  if (avoidItems.length === 0 || !searchQuery) return null;
                  return (
                    <div>
                      <h4 className="text-xs font-semibold text-red-400/70 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <AlertTriangle className="w-3 h-3" /> Not recommended for this plan
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        {avoidItems.slice(0, 6).map(({ food, score }) => (
                          <button
                            key={food.id}
                            onClick={() => addItemToMeal('food', food.id)}
                            className="p-3 text-left rounded-lg bg-red-500/5 border border-red-500/10 hover:bg-red-500/10 transition-all opacity-60"
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <div className="text-sm font-medium text-white/60 line-through decoration-red-400/30">{food.name}</div>
                                <div className="text-[10px] text-red-400/50">Avoid in this plan</div>
                              </div>
                              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${scoreBg(score)}`}>{score}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })()}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---- Sub-components ---- */

function FoodButton({ food, score, scoreBg, slotMatch, onAdd, highlight }: {
  food: Food; score: number; scoreBg: (s: number) => string; slotMatch: boolean;
  onAdd: (type: 'food' | 'recipe', id: string) => void; highlight?: boolean;
}) {
  return (
    <button
      onClick={() => onAdd('food', food.id)}
      className={`p-3 text-left rounded-lg border transition-all ${
        highlight
          ? 'bg-green-500/5 border-green-500/15 hover:bg-green-500/10'
          : 'bg-white/[0.03] border-white/[0.06] hover:bg-white/[0.06]'
      }`}
    >
      <div className="flex justify-between items-start gap-2">
        <div className="min-w-0">
          <div className="text-sm font-medium text-white/80 truncate">{food.name}</div>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="text-[10px] text-white/30">{food.nutrition.calories} kcal</span>
            {slotMatch && (
              <span className="text-[9px] px-1 py-0.5 rounded bg-[#c9a227]/10 text-[#c9a227]/60">{food.category.replace(/_/g, ' ')}</span>
            )}
          </div>
        </div>
        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full flex-shrink-0 ${scoreBg(score)}`}>{score}</span>
      </div>
    </button>
  );
}

function NutritionBar({ label, value, target, unit, color }: {
  label: string; value: number; target: number; unit: string; color: string;
}) {
  const percent = Math.min(100, Math.round((value / target) * 100));
  const isOver = value > target;

  return (
    <div className="text-center">
      <p className="text-xs text-white/40 mb-1">{label}</p>
      <p className={`text-lg font-bold ${isOver ? 'text-red-400' : 'text-white'}`}>
        {value}<span className="text-[10px] text-white/30 ml-0.5">{unit}</span>
      </p>
      <div className="mt-1.5 h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${isOver ? 'from-red-500 to-red-400' : color} transition-all duration-500`}
          style={{ width: `${percent}%` }}
        />
      </div>
      <p className="text-[10px] text-white/25 mt-0.5">{percent}% of {target}</p>
    </div>
  );
}

function getSlotForMeal(template: MealTemplate, meal: MealKey): MealTemplateSlot | null {
  const keys = MEAL_SLOT_MAP[meal];
  for (const k of keys) {
    const slot = template.mealStructure[k];
    if (slot) return slot;
  }
  return null;
}

/* ---- Auto-generation from template ---- */

export function generateWeeklyPlanFromTemplate(
  templateFoods: string[],
  templateRecipes: string[],
  allFoods: Food[],
  allRecipes: Recipe[],
  patient: PatientProfile,
  template?: MealTemplate,
): WeeklyPlan {
  const plan: WeeklyPlan = {};

  const avoidFoodIds = new Set(template?.avoidFoods || []);
  const avoidCats = new Set(template?.avoidCategories || []);
  const prefFoodIds = new Set(template?.preferredFoods || []);
  const prefCats = new Set(template?.preferredCategories || []);
  const allergySet = new Set((patient.allergies || []).map(a => a.toLowerCase()));

  const isFoodAllowed = (f: Food) => {
    if (avoidFoodIds.has(f.id) || avoidCats.has(f.category)) return false;
    if (allergySet.size > 0) {
      const name = f.name.toLowerCase();
      for (const a of allergySet) { if (name.includes(a)) return false; }
    }
    return true;
  };

  const isRecipeAllowed = (r: Recipe) => {
    if (patient.dietaryPreferences?.length) {
      const prefs = new Set(patient.dietaryPreferences);
      if (prefs.has('vegetarian') && r.category === 'non_vegetarian') return false;
      if (prefs.has('vegan') && (r.category === 'non_vegetarian' || r.category === 'eggetarian')) return false;
    }
    return true;
  };

  const scoreFood = (f: Food): number => {
    let s = calculateANHScore(f, patient).totalScore;
    if (prefFoodIds.has(f.id)) s += 20;
    else if (prefCats.has(f.category)) s += 10;
    return s;
  };

  const scoreRecipe = (r: Recipe): number => {
    let s = calculateRecipeScore(r, patient).anhScore.totalScore;
    if (templateRecipes.includes(r.id)) s += 25;
    return s;
  };

  type MealTimeKey = 'breakfast' | 'lunch' | 'dinner' | 'snack';
  const byMealType = (mt: MealTimeKey) => {
    const valid = allRecipes.filter(r => r.mealTypes.includes(mt) && isRecipeAllowed(r) && isFoodAllowed === isFoodAllowed);
    return valid
      .map(r => ({ recipe: r, score: scoreRecipe(r) }))
      .sort((a, b) => b.score - a.score);
  };

  const rankedBreakfast = byMealType('breakfast');
  const rankedLunch = byMealType('lunch');
  const rankedDinner = byMealType('dinner');
  const rankedSnack = byMealType('snack');

  const rankedSnackFoods = allFoods
    .filter(f => isFoodAllowed(f) && (f.category === 'fruits' || f.category === 'nuts_seeds' || f.category === 'beverages' || prefFoodIds.has(f.id)))
    .map(f => ({ food: f, score: scoreFood(f) }))
    .sort((a, b) => b.score - a.score);

  const rankedSideFoods = allFoods
    .filter(f => isFoodAllowed(f) && (f.category === 'vegetables' || f.category === 'pulses' || f.category === 'grains' || prefFoodIds.has(f.id)))
    .map(f => ({ food: f, score: scoreFood(f) }))
    .sort((a, b) => b.score - a.score);

  const pickFromRanked = <T,>(ranked: T[], dayIndex: number, poolSize: number): T | undefined => {
    if (ranked.length === 0) return undefined;
    const window = Math.min(poolSize, ranked.length);
    return ranked[dayIndex % window];
  };

  DAYS.forEach((day, dayIndex) => {
    plan[day] = emptyDayPlan();

    const bfRecipe = pickFromRanked(rankedBreakfast, dayIndex, rankedBreakfast.length);
    if (bfRecipe) plan[day].breakfast.items.push({ type: 'recipe', id: bfRecipe.recipe.id, portion: 1 });

    const lnRecipe = pickFromRanked(rankedLunch, dayIndex, rankedLunch.length);
    if (lnRecipe) plan[day].lunch.items.push({ type: 'recipe', id: lnRecipe.recipe.id, portion: 1 });

    const lnSide = pickFromRanked(rankedSideFoods, dayIndex * 2, rankedSideFoods.length);
    if (lnSide) plan[day].lunch.items.push({ type: 'food', id: lnSide.food.id, portion: 1 });

    const dnRecipe = pickFromRanked(rankedDinner, dayIndex + 2, rankedDinner.length);
    if (dnRecipe) plan[day].dinner.items.push({ type: 'recipe', id: dnRecipe.recipe.id, portion: 1 });

    const dnSide = pickFromRanked(rankedSideFoods, dayIndex * 2 + 1, rankedSideFoods.length);
    if (dnSide) plan[day].dinner.items.push({ type: 'food', id: dnSide.food.id, portion: 1 });

    const snackR = pickFromRanked(rankedSnack, dayIndex, rankedSnack.length);
    if (snackR) {
      plan[day].snacks.items.push({ type: 'recipe', id: snackR.recipe.id, portion: 1 });
    }
    const snackF = pickFromRanked(rankedSnackFoods, dayIndex, rankedSnackFoods.length);
    if (snackF) {
      plan[day].snacks.items.push({ type: 'food', id: snackF.food.id, portion: 1 });
    }
  });

  return plan;
}
