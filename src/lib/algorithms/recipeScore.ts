import {
  PatientProfile,
  ANHScoreResult,
  NutritionalInfo,
  DoshaEffect,
  Rasa,
  Virya,
  Food,
} from '../types';
import { Recipe, cookingMethodModifiers } from '../data/recipes';
import { getFoodById } from '../data';
import { calculateANHScore } from './anhScore';

export interface RecipeNutrition extends NutritionalInfo {
  perServing: NutritionalInfo;
}

export interface RecipeAyurvedicProfile {
  rasas: Rasa[];
  dominantVirya: Virya;
  doshaEffect: DoshaEffect;
  gunas: string[];
}

export interface RecipeScoreResult {
  recipe: Recipe;
  totalNutrition: RecipeNutrition;
  ayurvedicProfile: RecipeAyurvedicProfile;
  anhScore: ANHScoreResult;
  ingredientScores: Array<{ foodId: string; name: string; score: number; quantity: number }>;
  warnings: string[];
  recommendations: string[];
}

/**
 * Calculate comprehensive score for a recipe
 */
export function calculateRecipeScore(
  recipe: Recipe,
  patient: PatientProfile
): RecipeScoreResult {
  // Calculate total nutrition from ingredients
  const totalNutrition = calculateRecipeNutrition(recipe);
  
  // Calculate Ayurvedic profile from ingredients + cooking method
  const ayurvedicProfile = calculateRecipeAyurvedicProfile(recipe);
  
  // Calculate individual ingredient scores
  const ingredientScores = calculateIngredientScores(recipe, patient);
  
  // Create a "virtual food" representing the recipe for ANH scoring
  const virtualFood = createVirtualFood(recipe, totalNutrition, ayurvedicProfile);
  
  // Calculate ANH score for the recipe
  const anhScore = calculateANHScore(virtualFood, patient);
  
  // Generate recommendations and warnings
  const { warnings, recommendations } = generateRecipeInsights(
    recipe, 
    patient, 
    ayurvedicProfile, 
    ingredientScores
  );

  return {
    recipe,
    totalNutrition,
    ayurvedicProfile,
    anhScore,
    ingredientScores,
    warnings: [...anhScore.warnings, ...warnings],
    recommendations: [...anhScore.recommendations, ...recommendations],
  };
}

/**
 * Calculate total nutrition from all ingredients
 */
function calculateRecipeNutrition(recipe: Recipe): RecipeNutrition {
  const total: NutritionalInfo = {
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    fiber: 0,
  };

  recipe.ingredients.forEach(ingredient => {
    const food = getFoodById(ingredient.foodId);
    if (!food) return;

    // Convert quantity to grams equivalent
    const gramsMultiplier = getGramsMultiplier(ingredient.quantity, ingredient.unit, food);
    const servingRatio = gramsMultiplier / food.servingGrams;

    total.calories += food.nutrition.calories * servingRatio;
    total.protein += food.nutrition.protein * servingRatio;
    total.carbs += food.nutrition.carbs * servingRatio;
    total.fat += food.nutrition.fat * servingRatio;
    total.fiber += food.nutrition.fiber * servingRatio;
  });

  // Per serving
  const perServing: NutritionalInfo = {
    calories: Math.round(total.calories / recipe.servings),
    protein: Math.round(total.protein * 10 / recipe.servings) / 10,
    carbs: Math.round(total.carbs * 10 / recipe.servings) / 10,
    fat: Math.round(total.fat * 10 / recipe.servings) / 10,
    fiber: Math.round(total.fiber * 10 / recipe.servings) / 10,
  };

  return {
    ...total,
    perServing,
  };
}

/**
 * Calculate Ayurvedic properties aggregated from ingredients
 */
function calculateRecipeAyurvedicProfile(recipe: Recipe): RecipeAyurvedicProfile {
  const rasaCount: Record<Rasa, number> = {
    madhura: 0, amla: 0, lavana: 0, katu: 0, tikta: 0, kashaya: 0
  };
  
  let viryaScore = 0; // positive = heating, negative = cooling
  const doshaEffect: DoshaEffect = { vata: 0, pitta: 0, kapha: 0 };
  const allGunas = new Set<string>();

  let totalWeight = 0;

  recipe.ingredients.forEach(ingredient => {
    const food = getFoodById(ingredient.foodId);
    if (!food) return;

    const weight = ingredient.quantity;
    totalWeight += weight;

    // Count rasas
    food.ayurvedic.rasa.forEach(rasa => {
      rasaCount[rasa] += weight;
    });

    // Virya weighted average
    viryaScore += (food.ayurvedic.virya === 'ushna' ? 1 : -1) * weight;

    // Dosha effects
    doshaEffect.vata += food.ayurvedic.doshaEffect.vata * weight;
    doshaEffect.pitta += food.ayurvedic.doshaEffect.pitta * weight;
    doshaEffect.kapha += food.ayurvedic.doshaEffect.kapha * weight;

    // Collect gunas
    food.ayurvedic.guna?.forEach(g => allGunas.add(g));
  });

  // Normalize dosha effects
  if (totalWeight > 0) {
    doshaEffect.vata = Math.round(doshaEffect.vata / totalWeight * 10) / 10;
    doshaEffect.pitta = Math.round(doshaEffect.pitta / totalWeight * 10) / 10;
    doshaEffect.kapha = Math.round(doshaEffect.kapha / totalWeight * 10) / 10;
  }

  // Apply cooking method modifiers
  const cookingModifier = cookingMethodModifiers[recipe.preparationMethod];
  if (cookingModifier) {
    viryaScore += cookingModifier.viryaShift * totalWeight * 0.3;
    doshaEffect.vata += cookingModifier.doshaModifier.vata;
    doshaEffect.pitta += cookingModifier.doshaModifier.pitta;
    doshaEffect.kapha += cookingModifier.doshaModifier.kapha;
    cookingModifier.gunaChange.forEach(g => allGunas.add(g));
  }

  // Determine dominant rasas (those with significant presence)
  const threshold = totalWeight * 0.1;
  const dominantRasas = (Object.entries(rasaCount) as [Rasa, number][])
    .filter(([_, count]) => count > threshold)
    .map(([rasa, _]) => rasa);

  return {
    rasas: dominantRasas.length > 0 ? dominantRasas : ['madhura'],
    dominantVirya: viryaScore > 0 ? 'ushna' : 'sheeta',
    doshaEffect: {
      vata: Math.round(doshaEffect.vata),
      pitta: Math.round(doshaEffect.pitta),
      kapha: Math.round(doshaEffect.kapha),
    },
    gunas: Array.from(allGunas),
  };
}

/**
 * Calculate individual scores for each ingredient
 */
function calculateIngredientScores(
  recipe: Recipe, 
  patient: PatientProfile
): Array<{ foodId: string; name: string; score: number; quantity: number }> {
  return recipe.ingredients
    .map(ingredient => {
      const food = getFoodById(ingredient.foodId);
      if (!food) return null;

      const score = calculateANHScore(food, patient);
      return {
        foodId: ingredient.foodId,
        name: food.name,
        score: score.totalScore,
        quantity: ingredient.quantity,
      };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);
}

/**
 * Create a virtual Food object representing the recipe
 */
function createVirtualFood(
  recipe: Recipe,
  nutrition: RecipeNutrition,
  ayurvedicProfile: RecipeAyurvedicProfile
): Food {
  return {
    id: `recipe_${recipe.id}`,
    name: recipe.name,
    nameHindi: recipe.nameHindi,
    category: 'grains', // Default category for recipes
    ayurvedic: {
      rasa: ayurvedicProfile.rasas,
      virya: ayurvedicProfile.dominantVirya,
      vipaka: 'madhura', // Default
      doshaEffect: ayurvedicProfile.doshaEffect,
      guna: ayurvedicProfile.gunas,
    },
    nutrition: nutrition.perServing,
    servingSize: `1 serving`,
    servingGrams: 200, // Average serving
    season: recipe.season as any,
  };
}

/**
 * Generate recipe-specific insights
 */
function generateRecipeInsights(
  recipe: Recipe,
  patient: PatientProfile,
  profile: RecipeAyurvedicProfile,
  ingredientScores: Array<{ foodId: string; name: string; score: number; quantity: number }>
): { warnings: string[]; recommendations: string[] } {
  const warnings: string[] = [];
  const recommendations: string[] = [];

  // Check for low-scoring ingredients
  const lowScoreIngredients = ingredientScores.filter(i => i.score < 40);
  if (lowScoreIngredients.length > 0) {
    warnings.push(
      `Some ingredients may not be ideal for your constitution: ${lowScoreIngredients.map(i => i.name).join(', ')}`
    );
  }

  // Check cooking method suitability
  const cookingModifier = cookingMethodModifiers[recipe.preparationMethod];
  if (cookingModifier) {
    if (patient.prakriti.dominant === 'pitta' && cookingModifier.viryaShift > 0) {
      warnings.push(
        `${recipe.preparationMethod} cooking adds heat - consider lighter preparation methods for Pitta`
      );
    }
    if (patient.prakriti.dominant === 'kapha' && recipe.preparationMethod === 'fried') {
      warnings.push(
        'Fried foods may aggravate Kapha - consider roasted or steamed alternatives'
      );
    }
    if (patient.prakriti.dominant === 'vata' && recipe.preparationMethod === 'raw') {
      warnings.push(
        'Raw foods may aggravate Vata - consider cooked or warm preparations'
      );
    }
  }

  // Positive recommendations
  if (profile.rasas.length >= 4) {
    recommendations.push(
      `This recipe has ${profile.rasas.length} tastes - good for balanced nutrition!`
    );
  }

  // Check if recipe suits the dominant dosha
  const dominantDosha = patient.prakriti.dominant;
  if (profile.doshaEffect[dominantDosha] < 0) {
    recommendations.push(
      `This recipe helps pacify your ${dominantDosha} dosha`
    );
  }

  // Season recommendation
  if (recipe.season && recipe.season.length > 0) {
    recommendations.push(
      `Best consumed in: ${recipe.season.join(', ')}`
    );
  }

  // Health benefits
  if (recipe.healthBenefits && recipe.healthBenefits.length > 0) {
    recommendations.push(
      `Benefits: ${recipe.healthBenefits.slice(0, 3).join(', ')}`
    );
  }

  return { warnings, recommendations };
}

/**
 * Convert ingredient quantity/unit to grams
 */
function getGramsMultiplier(quantity: number, unit: string, food: Food): number {
  const unitToGrams: Record<string, number> = {
    g: 1,
    ml: 1, // Approximate for liquids
    tsp: 5,
    tbsp: 15,
    cup: 240,
    piece: food.servingGrams, // Use the food's serving size
  };

  return quantity * (unitToGrams[unit] || 1);
}

/**
 * Get top recommended recipes for a patient
 */
export function getTopRecipesForPatient(
  recipes: Recipe[],
  patient: PatientProfile,
  count: number = 10
): RecipeScoreResult[] {
  const scored = recipes.map(recipe => calculateRecipeScore(recipe, patient));
  
  // Sort by ANH score descending
  scored.sort((a, b) => b.anhScore.totalScore - a.anhScore.totalScore);
  
  return scored.slice(0, count);
}

/**
 * Filter recipes by dietary preference
 */
export function filterRecipesByPreference(
  recipes: Recipe[],
  preferences: PatientProfile['dietaryPreferences']
): Recipe[] {
  return recipes.filter(recipe => {
    if (preferences.includes('vegan')) {
      return recipe.category === 'vegan';
    }
    if (preferences.includes('vegetarian')) {
      return recipe.category === 'vegan' || recipe.category === 'vegetarian';
    }
    if (preferences.includes('eggetarian')) {
      return recipe.category !== 'non_vegetarian' || 
             recipe.ingredients.some(i => i.foodId === 'egg');
    }
    return true;
  });
}

/**
 * Get recipes suitable for a health condition
 */
export function getRecipesForCondition(
  recipes: Recipe[],
  conditionId: string
): Recipe[] {
  // Filter out recipes with contraindications for the condition
  return recipes.filter(recipe => {
    if (!recipe.contraindications) return true;
    return !recipe.contraindications.some(c => 
      c.toLowerCase().includes(conditionId.toLowerCase())
    );
  });
}

