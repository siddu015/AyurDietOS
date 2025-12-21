'use client';

import { useState, useMemo } from 'react';
import { Food, PatientProfile } from '@/lib/types';
import { Recipe } from '@/lib/data/recipes';
import { calculateANHScore, calculateRecipeScore } from '@/lib/algorithms';
import { ScoreCircle } from './ui/ScoreCircle';

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

const emptyMealSlot = (): MealSlot => ({ id: crypto.randomUUID(), items: [] });
const emptyDayPlan = (): DayPlan => ({
  breakfast: emptyMealSlot(),
  lunch: emptyMealSlot(),
  dinner: emptyMealSlot(),
  snacks: emptyMealSlot(),
});

interface WeeklyPlannerProps {
  patient: PatientProfile;
  foods: Food[];
  recipes: Recipe[];
  initialPlan?: WeeklyPlan;
  onPlanChange?: (plan: WeeklyPlan) => void;
}

export function WeeklyPlanner({ 
  patient, 
  foods, 
  recipes, 
  initialPlan,
  onPlanChange 
}: WeeklyPlannerProps) {
  const [plan, setPlan] = useState<WeeklyPlan>(() => {
    if (initialPlan) return initialPlan;
    return DAYS.reduce((acc, day) => ({ ...acc, [day]: emptyDayPlan() }), {});
  });

  const [selectedDay, setSelectedDay] = useState(DAYS[0]);
  const [selectedMeal, setSelectedMeal] = useState<typeof MEALS[number]>('breakfast');
  const [showAddModal, setShowAddModal] = useState(false);

  // Calculate daily totals
  const dailyTotals = useMemo(() => {
    const totals: Record<string, { calories: number; protein: number; avgScore: number }> = {};
    
    DAYS.forEach(day => {
      const dayPlan = plan[day];
      let calories = 0;
      let protein = 0;
      let scoreSum = 0;
      let itemCount = 0;

      MEALS.forEach(meal => {
        dayPlan[meal].items.forEach(item => {
          if (item.type === 'food') {
            const food = foods.find(f => f.id === item.id);
            if (food) {
              calories += food.nutrition.calories * item.portion;
              protein += food.nutrition.protein * item.portion;
              scoreSum += calculateANHScore(food, patient).totalScore;
              itemCount++;
            }
          } else {
            const recipe = recipes.find(r => r.id === item.id);
            if (recipe) {
              const recipeScore = calculateRecipeScore(recipe, patient);
              calories += recipeScore.totalNutrition.perServing.calories * item.portion;
              protein += recipeScore.totalNutrition.perServing.protein * item.portion;
              scoreSum += recipeScore.anhScore.totalScore;
              itemCount++;
            }
          }
        });
      });

      totals[day] = {
        calories: Math.round(calories),
        protein: Math.round(protein),
        avgScore: itemCount > 0 ? Math.round(scoreSum / itemCount) : 0,
      };
    });

    return totals;
  }, [plan, foods, recipes, patient]);

  // Weekly average
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

  // Check variety (no same item 3 days in a row)
  const varietyWarnings = useMemo(() => {
    const warnings: string[] = [];
    const itemsByDay: Record<string, Set<string>> = {};
    
    DAYS.forEach(day => {
      itemsByDay[day] = new Set();
      const dayPlan = plan[day];
      MEALS.forEach(meal => {
        dayPlan[meal].items.forEach(item => {
          itemsByDay[day].add(`${item.type}:${item.id}`);
        });
      });
    });

    // Check for 3+ consecutive days with same item
    for (let i = 0; i < DAYS.length - 2; i++) {
      const day1Items = itemsByDay[DAYS[i]];
      const day2Items = itemsByDay[DAYS[i + 1]];
      const day3Items = itemsByDay[DAYS[i + 2]];

      day1Items.forEach(item => {
        if (day2Items.has(item) && day3Items.has(item)) {
          const [type, id] = item.split(':');
          const name = type === 'food' 
            ? foods.find(f => f.id === id)?.name 
            : recipes.find(r => r.id === id)?.name;
          if (name) {
            warnings.push(`${name} is repeated for 3+ consecutive days`);
          }
        }
      });
    }

    return [...new Set(warnings)];
  }, [plan, foods, recipes]);

  const addItemToMeal = (type: 'food' | 'recipe', id: string) => {
    const newPlan = { ...plan };
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
  };

  const removeItemFromMeal = (day: string, meal: typeof MEALS[number], index: number) => {
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

  return (
    <div className="space-y-6">
      {/* Weekly Overview */}
      <div className="card p-4">
        <h2 className="text-lg font-semibold mb-4">Weekly Overview</h2>
        <div className="grid grid-cols-7 gap-2">
          {DAYS.map(day => (
            <div 
              key={day}
              className={`p-3 rounded-lg cursor-pointer transition-all ${
                selectedDay === day 
                  ? 'bg-primary text-white' 
                  : 'bg-sand hover:bg-clay'
              }`}
              onClick={() => setSelectedDay(day)}
            >
              <div className="text-xs font-medium">{day.slice(0, 3)}</div>
              <div className="text-lg font-bold mt-1">
                {dailyTotals[day].calories || '-'}
              </div>
              <div className="text-xs opacity-75">kcal</div>
            </div>
          ))}
        </div>

        {/* Weekly Average */}
        <div className="mt-4 p-3 bg-sand rounded-lg flex justify-between items-center">
          <div>
            <span className="text-sm text-stone">Weekly Average:</span>
            <span className="ml-2 font-semibold">{weeklyAverage.calories} kcal</span>
            <span className="mx-2 text-stone">|</span>
            <span className="font-semibold">{weeklyAverage.protein}g protein</span>
          </div>
          <ScoreCircle score={weeklyAverage.avgScore} size="sm" />
        </div>

        {/* Variety Warnings */}
        {varietyWarnings.length > 0 && (
          <div className="mt-4 p-3 bg-moderate/10 rounded-lg">
            <h4 className="text-sm font-medium text-moderate mb-2">Variety Suggestions</h4>
            <ul className="text-sm text-stone space-y-1">
              {varietyWarnings.map((warning, i) => (
                <li key={i}>- {warning}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Day Detail */}
      <div className="card p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">{selectedDay}</h2>
          <div className="flex gap-2">
            <button
              onClick={() => clearDay(selectedDay)}
              className="px-3 py-1 text-sm bg-sand rounded hover:bg-clay"
            >
              Clear Day
            </button>
            <select 
              className="px-3 py-1 text-sm bg-sand rounded"
              onChange={(e) => copyDayTo(e.target.value, selectedDay)}
              value=""
            >
              <option value="">Copy from...</option>
              {DAYS.filter(d => d !== selectedDay).map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Meal Slots */}
        <div className="space-y-4">
          {MEALS.map(meal => (
            <div key={meal} className="border border-clay rounded-lg p-3">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium capitalize">{meal}</h3>
                <button
                  onClick={() => { setSelectedMeal(meal); setShowAddModal(true); }}
                  className="px-3 py-1 text-sm bg-primary text-white rounded hover:bg-primary-dark"
                >
                  + Add
                </button>
              </div>

              {plan[selectedDay][meal].items.length === 0 ? (
                <p className="text-sm text-stone italic">No items added</p>
              ) : (
                <div className="space-y-2">
                  {plan[selectedDay][meal].items.map((item, index) => {
                    const itemData = item.type === 'food'
                      ? foods.find(f => f.id === item.id)
                      : recipes.find(r => r.id === item.id);
                    if (!itemData) return null;

                    return (
                      <div key={index} className="flex justify-between items-center p-2 bg-sand rounded">
                        <div>
                          <span className="font-medium">{itemData.name}</span>
                          <span className="text-sm text-stone ml-2">
                            x{item.portion}
                          </span>
                        </div>
                        <button
                          onClick={() => removeItemFromMeal(selectedDay, meal, index)}
                          className="text-stone hover:text-red-500"
                        >
                          x
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Add Item Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg max-h-[80vh] overflow-hidden">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                Add to {selectedMeal}
              </h3>
              <button 
                onClick={() => setShowAddModal(false)}
                className="text-stone hover:text-dark"
              >
                x
              </button>
            </div>

            <div className="overflow-y-auto max-h-[60vh]">
              <h4 className="font-medium mb-2">Recipes</h4>
              <div className="grid grid-cols-2 gap-2 mb-4">
                {recipes.slice(0, 10).map(recipe => (
                  <button
                    key={recipe.id}
                    onClick={() => addItemToMeal('recipe', recipe.id)}
                    className="p-2 text-left bg-sand rounded hover:bg-clay"
                  >
                    <div className="font-medium text-sm">{recipe.name}</div>
                    <div className="text-xs text-stone">{recipe.nameHindi}</div>
                  </button>
                ))}
              </div>

              <h4 className="font-medium mb-2">Individual Foods</h4>
              <div className="grid grid-cols-2 gap-2">
                {foods.slice(0, 20).map(food => (
                  <button
                    key={food.id}
                    onClick={() => addItemToMeal('food', food.id)}
                    className="p-2 text-left bg-sand rounded hover:bg-clay"
                  >
                    <div className="font-medium text-sm">{food.name}</div>
                    <div className="text-xs text-stone">{food.nameHindi}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Generate a sample weekly plan based on template
export function generateWeeklyPlanFromTemplate(
  templateFoods: string[],
  templateRecipes: string[],
  foods: Food[],
  recipes: Recipe[],
  patient: PatientProfile
): WeeklyPlan {
  const plan: WeeklyPlan = {};

  DAYS.forEach((day, dayIndex) => {
    plan[day] = emptyDayPlan();
    
    // Rotate foods and recipes for variety
    const breakfastRecipe = templateRecipes[(dayIndex) % templateRecipes.length];
    const lunchRecipe = templateRecipes[(dayIndex + 1) % templateRecipes.length];
    const dinnerRecipe = templateRecipes[(dayIndex + 2) % templateRecipes.length];

    if (breakfastRecipe) {
      plan[day].breakfast.items.push({ type: 'recipe', id: breakfastRecipe, portion: 1 });
    }
    if (lunchRecipe) {
      plan[day].lunch.items.push({ type: 'recipe', id: lunchRecipe, portion: 1 });
    }
    if (dinnerRecipe) {
      plan[day].dinner.items.push({ type: 'recipe', id: dinnerRecipe, portion: 1 });
    }
    
    // Add a snack food
    const snackFood = templateFoods[dayIndex % templateFoods.length];
    if (snackFood) {
      plan[day].snacks.items.push({ type: 'food', id: snackFood, portion: 1 });
    }
  });

  return plan;
}

