import {
  Food,
  Meal,
  MealItem,
  MealType,
  MealCompositionConstraints,
  PatientProfile,
  Rasa,
  DoshaEffect,
  NutritionalInfo,
} from '../types';
import { calculateANHScore } from './anhScore';
import { foods as allFoods } from '../data';

interface ComposedMeal {
  meal: Meal;
  totalANHScore: number;
  constraintsSatisfied: boolean;
  constraintDetails: {
    caloriesOk: boolean;
    proteinOk: boolean;
    rasaOk: boolean;
    doshaOk: boolean;
  };
}

const DEFAULT_CONSTRAINTS: MealCompositionConstraints = {
  maxCalories: 500,
  minProtein: 20,
  minRasaCount: 4,
  targetDosha: 'vata',
  viryaPreference: undefined,
  excludeFoods: [],
  includeCategories: [],
  excludeCategories: [],
};

/**
 * Dynamic Meal Composition Engine
 * Uses a greedy/constraint satisfaction approach to build balanced meals
 */
export function composeMeal(
  patient: PatientProfile,
  mealType: MealType,
  constraints: Partial<MealCompositionConstraints> = {}
): ComposedMeal {
  const cfg: MealCompositionConstraints = {
    ...DEFAULT_CONSTRAINTS,
    targetDosha: patient.prakriti.dominant,
    ...constraints,
  };

  // Filter available foods based on constraints
  let availableFoods = filterFoods(allFoods, cfg, patient);

  // Score all foods for this patient
  const scoredFoods = availableFoods.map(food => ({
    food,
    score: calculateANHScore(food, patient),
  }));

  // Sort by ANH score
  scoredFoods.sort((a, b) => b.score.totalScore - a.score.totalScore);

  // Greedy meal composition
  const selectedItems: MealItem[] = [];
  let currentCalories = 0;
  let currentProtein = 0;
  const currentRasas = new Set<Rasa>();
  const currentDoshaEffect: DoshaEffect = { vata: 0, pitta: 0, kapha: 0 };

  // Strategy: Pick items that maximize constraints satisfaction
  for (const { food, score } of scoredFoods) {
    // Check if adding this food would exceed calorie limit
    if (currentCalories + food.nutrition.calories > cfg.maxCalories) {
      continue;
    }

    // Calculate benefit of adding this food
    const rasaBenefit = food.ayurvedic.rasa.filter(r => !currentRasas.has(r)).length;
    const proteinBenefit = food.nutrition.protein;

    // Prioritize foods that add new rasas or protein if needed
    const needMoreRasa = currentRasas.size < cfg.minRasaCount;
    const needMoreProtein = currentProtein < cfg.minProtein;

    // Add food if it provides benefit
    if (
      score.totalScore >= 40 && // Minimum acceptable score
      (rasaBenefit > 0 || proteinBenefit > 5 || selectedItems.length < 3)
    ) {
      // Calculate portion size (default: 1 serving)
      const quantity = calculateOptimalPortion(
        food,
        cfg.maxCalories - currentCalories,
        cfg.minProtein - currentProtein
      );

      selectedItems.push({
        foodId: food.id,
        food,
        quantity,
        unit: food.servingSize,
      });

      // Update running totals
      currentCalories += food.nutrition.calories * quantity;
      currentProtein += food.nutrition.protein * quantity;
      food.ayurvedic.rasa.forEach(r => currentRasas.add(r));
      
      // Update dosha effect
      currentDoshaEffect.vata += food.ayurvedic.doshaEffect.vata;
      currentDoshaEffect.pitta += food.ayurvedic.doshaEffect.pitta;
      currentDoshaEffect.kapha += food.ayurvedic.doshaEffect.kapha;
    }

    // Stop if we have enough items and constraints are satisfied
    if (
      selectedItems.length >= 5 &&
      currentRasas.size >= cfg.minRasaCount &&
      currentProtein >= cfg.minProtein
    ) {
      break;
    }
  }

  // Create the meal object
  const meal = createMealFromItems(selectedItems, mealType);

  // Calculate overall ANH score for the meal
  const totalANHScore = calculateMealANHScore(selectedItems, patient);

  // Check constraints satisfaction
  const constraintDetails = {
    caloriesOk: currentCalories <= cfg.maxCalories,
    proteinOk: currentProtein >= cfg.minProtein,
    rasaOk: currentRasas.size >= cfg.minRasaCount,
    doshaOk: currentDoshaEffect[cfg.targetDosha] <= 0, // Should pacify or be neutral
  };

  return {
    meal,
    totalANHScore,
    constraintsSatisfied: Object.values(constraintDetails).every(Boolean),
    constraintDetails,
  };
}

function filterFoods(
  foods: Food[],
  constraints: MealCompositionConstraints,
  patient: PatientProfile
): Food[] {
  return foods.filter(food => {
    // Exclude specific foods
    if (constraints.excludeFoods?.includes(food.id)) return false;

    // Exclude categories
    if (constraints.excludeCategories?.includes(food.category)) return false;

    // Include only specific categories if specified
    if (
      constraints.includeCategories &&
      constraints.includeCategories.length > 0 &&
      !constraints.includeCategories.includes(food.category)
    ) {
      return false;
    }

    // Virya preference
    if (
      constraints.viryaPreference &&
      food.ayurvedic.virya !== constraints.viryaPreference
    ) {
      return false;
    }

    // Check patient allergies (simplified check)
    if (patient.allergies.some(allergy => 
      food.name.toLowerCase().includes(allergy.toLowerCase()) ||
      food.category.includes(allergy.toLowerCase())
    )) {
      return false;
    }

    // Check dietary preferences
    if (patient.dietaryPreferences.includes('vegetarian')) {
      if (food.category === 'meat' || food.category === 'seafood') {
        return false;
      }
    }

    if (patient.dietaryPreferences.includes('vegan')) {
      if (['meat', 'seafood', 'dairy'].includes(food.category)) {
        return false;
      }
    }

    return true;
  });
}

function calculateOptimalPortion(
  food: Food,
  remainingCalories: number,
  remainingProtein: number
): number {
  // Calculate how much of this food we can add
  const maxByCalories = remainingCalories / food.nutrition.calories;
  
  // If we need protein, try to add more
  let targetPortion = 1;
  if (remainingProtein > 0 && food.nutrition.protein > 5) {
    targetPortion = Math.min(maxByCalories, remainingProtein / food.nutrition.protein);
  }

  // Round to reasonable portions (0.5, 1, 1.5, 2)
  return Math.min(2, Math.max(0.5, Math.round(targetPortion * 2) / 2));
}

function createMealFromItems(items: MealItem[], mealType: MealType): Meal {
  // Calculate total nutrition
  const totalNutrition: NutritionalInfo = {
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    fiber: 0,
  };

  const allRasas = new Set<Rasa>();
  const overallDoshaEffect: DoshaEffect = { vata: 0, pitta: 0, kapha: 0 };

  items.forEach(item => {
    const multiplier = item.quantity;
    totalNutrition.calories += item.food.nutrition.calories * multiplier;
    totalNutrition.protein += item.food.nutrition.protein * multiplier;
    totalNutrition.carbs += item.food.nutrition.carbs * multiplier;
    totalNutrition.fat += item.food.nutrition.fat * multiplier;
    totalNutrition.fiber += item.food.nutrition.fiber * multiplier;

    item.food.ayurvedic.rasa.forEach(r => allRasas.add(r));
    
    overallDoshaEffect.vata += item.food.ayurvedic.doshaEffect.vata;
    overallDoshaEffect.pitta += item.food.ayurvedic.doshaEffect.pitta;
    overallDoshaEffect.kapha += item.food.ayurvedic.doshaEffect.kapha;
  });

  // Generate meal name based on type and items
  const mealNames: Record<MealType, string> = {
    breakfast: 'Morning Meal',
    lunch: 'Afternoon Meal',
    dinner: 'Evening Meal',
    snack: 'Light Snack',
  };

  return {
    id: `meal_${Date.now()}`,
    name: mealNames[mealType],
    type: mealType,
    foods: items,
    totalNutrition,
    rasaCoverage: Array.from(allRasas),
    overallDoshaEffect,
  };
}

function calculateMealANHScore(items: MealItem[], patient: PatientProfile): number {
  if (items.length === 0) return 0;

  const scores = items.map(item => {
    const score = calculateANHScore(item.food, patient);
    return score.totalScore * item.quantity;
  });

  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  return Math.round(scores.reduce((a, b) => a + b, 0) / totalQuantity);
}

/**
 * Generate a full day's meal plan
 */
export function generateDailyPlan(
  patient: PatientProfile,
  constraints: Partial<MealCompositionConstraints> = {}
): {
  breakfast: ComposedMeal;
  lunch: ComposedMeal;
  dinner: ComposedMeal;
  snack?: ComposedMeal;
} {
  // Adjust constraints for each meal type
  const breakfastConstraints = {
    ...constraints,
    maxCalories: 400,
    minProtein: 15,
  };

  const lunchConstraints = {
    ...constraints,
    maxCalories: 600,
    minProtein: 25,
    minRasaCount: 5,
  };

  const dinnerConstraints = {
    ...constraints,
    maxCalories: 500,
    minProtein: 20,
    minRasaCount: 4,
  };

  const snackConstraints = {
    ...constraints,
    maxCalories: 200,
    minProtein: 5,
    minRasaCount: 2,
  };

  return {
    breakfast: composeMeal(patient, 'breakfast', breakfastConstraints),
    lunch: composeMeal(patient, 'lunch', lunchConstraints),
    dinner: composeMeal(patient, 'dinner', dinnerConstraints),
    snack: composeMeal(patient, 'snack', snackConstraints),
  };
}

/**
 * Optimize an existing meal by swapping items
 */
export function optimizeMeal(
  currentMeal: Meal,
  patient: PatientProfile,
  constraints: Partial<MealCompositionConstraints> = {}
): ComposedMeal {
  // Get current ANH score
  const currentScore = calculateMealANHScore(currentMeal.foods, patient);

  // Try to improve by swapping lowest-scored items
  const scoredItems = currentMeal.foods.map(item => ({
    item,
    score: calculateANHScore(item.food, patient).totalScore,
  }));

  scoredItems.sort((a, b) => a.score - b.score);

  // Get alternative foods
  const alternatives = filterFoods(allFoods, {
    ...DEFAULT_CONSTRAINTS,
    ...constraints,
  }, patient);

  const optimizedItems = [...currentMeal.foods];

  // Try to replace the lowest scoring item
  if (scoredItems.length > 0 && scoredItems[0].score < 50) {
    const worstItem = scoredItems[0].item;
    const worstIndex = optimizedItems.findIndex(i => i.foodId === worstItem.foodId);

    // Find a better alternative in the same category
    const betterAlternative = alternatives
      .filter(f => f.category === worstItem.food.category && f.id !== worstItem.foodId)
      .map(f => ({ food: f, score: calculateANHScore(f, patient).totalScore }))
      .sort((a, b) => b.score - a.score)[0];

    if (betterAlternative && betterAlternative.score > scoredItems[0].score) {
      optimizedItems[worstIndex] = {
        foodId: betterAlternative.food.id,
        food: betterAlternative.food,
        quantity: worstItem.quantity,
        unit: betterAlternative.food.servingSize,
      };
    }
  }

  const optimizedMeal = createMealFromItems(optimizedItems, currentMeal.type);
  const cfg = { ...DEFAULT_CONSTRAINTS, ...constraints };

  return {
    meal: optimizedMeal,
    totalANHScore: calculateMealANHScore(optimizedItems, patient),
    constraintsSatisfied: true,
    constraintDetails: {
      caloriesOk: optimizedMeal.totalNutrition.calories <= cfg.maxCalories,
      proteinOk: optimizedMeal.totalNutrition.protein >= cfg.minProtein,
      rasaOk: optimizedMeal.rasaCoverage.length >= cfg.minRasaCount,
      doshaOk: optimizedMeal.overallDoshaEffect[cfg.targetDosha] <= 0,
    },
  };
}

