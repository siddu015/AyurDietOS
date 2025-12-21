import { Food, PatientProfile, FoodCategory, DoshaType } from '../types';
import { foods, getFoodById } from '../data';
import { calculateANHScore } from './anhScore';

export interface SubstitutionRule {
  originalFoodId?: string;
  originalCategory?: FoodCategory;
  reason: SubstitutionReason;
  alternatives: string[]; // Food IDs
  note?: string;
}

export type SubstitutionReason = 
  | 'dairy_free'
  | 'gluten_free'
  | 'nut_free'
  | 'vegan'
  | 'low_calorie'
  | 'low_carb'
  | 'high_protein'
  | 'pitta_pacifying'
  | 'vata_pacifying'
  | 'kapha_pacifying'
  | 'diabetes_friendly'
  | 'heart_friendly'
  | 'allergy';

export interface SubstitutionResult {
  original: Food;
  alternatives: Array<{
    food: Food;
    similarityScore: number;
    anhScore: number;
    reasons: string[];
  }>;
  reason: SubstitutionReason;
}

// Pre-defined substitution mappings
const substitutionMappings: SubstitutionRule[] = [
  // Dairy substitutions
  {
    originalFoodId: 'milk_cow',
    reason: 'dairy_free',
    alternatives: ['coconut_water', 'rice_white'], // Would ideally have almond milk, oat milk
    note: 'Use coconut milk or rice milk as alternatives'
  },
  {
    originalFoodId: 'yogurt',
    reason: 'dairy_free',
    alternatives: ['buttermilk', 'coconut_fresh'],
    note: 'Coconut yogurt is a good vegan alternative'
  },
  {
    originalFoodId: 'paneer',
    reason: 'dairy_free',
    alternatives: ['soybean', 'chhole'],
    note: 'Tofu or chickpea-based alternatives'
  },
  {
    originalFoodId: 'ghee',
    reason: 'dairy_free',
    alternatives: ['coconut_oil', 'sesame_oil'],
    note: 'Use coconut oil for similar sattvic qualities'
  },
  
  // Grain substitutions (gluten-free)
  {
    originalFoodId: 'wheat_roti',
    reason: 'gluten_free',
    alternatives: ['ragi', 'jowar', 'bajra', 'rice_white'],
    note: 'Millet rotis are excellent gluten-free alternatives'
  },
  {
    originalFoodId: 'semolina',
    reason: 'gluten_free',
    alternatives: ['poha', 'sabudana', 'rice_white'],
    note: 'Rice-based alternatives work well'
  },
  {
    originalFoodId: 'daliya',
    reason: 'gluten_free',
    alternatives: ['barnyard_millet', 'foxtail_millet', 'quinoa'],
    note: 'Use millets for similar texture'
  },
  
  // Low-carb alternatives
  {
    originalFoodId: 'rice_white',
    reason: 'low_carb',
    alternatives: ['gobhi', 'lauki'],
    note: 'Cauliflower rice or bottle gourd are low-carb options'
  },
  {
    originalFoodId: 'aloo',
    reason: 'low_carb',
    alternatives: ['gobhi', 'mooli', 'lauki'],
    note: 'Use non-starchy vegetables'
  },
  
  // Diabetes-friendly
  {
    originalFoodId: 'rice_white',
    reason: 'diabetes_friendly',
    alternatives: ['rice_brown', 'quinoa', 'foxtail_millet', 'barnyard_millet'],
    note: 'Low GI grains are better for blood sugar'
  },
  {
    originalFoodId: 'jaggery',
    reason: 'diabetes_friendly',
    alternatives: ['stevia', 'dates'],
    note: 'Use natural low-GI sweeteners in moderation'
  },
  {
    originalFoodId: 'banana',
    reason: 'diabetes_friendly',
    alternatives: ['apple', 'guava', 'jamun'],
    note: 'Low GI fruits are preferable'
  },
  
  // Protein alternatives (for vegetarians)
  {
    originalFoodId: 'chicken',
    reason: 'vegan',
    alternatives: ['paneer', 'soybean', 'chhole', 'rajma'],
    note: 'Plant-based protein sources'
  },
  {
    originalFoodId: 'egg',
    reason: 'vegan',
    alternatives: ['soybean', 'paneer', 'moong_dal'],
    note: 'Soy and legumes provide complete protein'
  },
  
  // Category-based substitutions
  {
    originalCategory: 'dairy',
    reason: 'vegan',
    alternatives: ['coconut_fresh', 'soybean', 'almonds', 'sesame_seeds'],
    note: 'Plant-based alternatives for dairy'
  },
  {
    originalCategory: 'meat',
    reason: 'vegan',
    alternatives: ['soybean', 'rajma', 'chhole', 'paneer'],
    note: 'High-protein plant foods'
  },
];

/**
 * Find substitutes for a food item
 */
export function findSubstitutes(
  foodId: string,
  reason: SubstitutionReason,
  patient?: PatientProfile,
  count: number = 5
): SubstitutionResult | null {
  const originalFood = getFoodById(foodId);
  if (!originalFood) return null;

  // Find specific mappings first
  const specificMapping = substitutionMappings.find(
    m => m.originalFoodId === foodId && m.reason === reason
  );

  // Find category mappings
  const categoryMapping = substitutionMappings.find(
    m => m.originalCategory === originalFood.category && m.reason === reason
  );

  // Combine predefined alternatives
  const predefinedAlternatives = new Set<string>();
  if (specificMapping) {
    specificMapping.alternatives.forEach(id => predefinedAlternatives.add(id));
  }
  if (categoryMapping) {
    categoryMapping.alternatives.forEach(id => predefinedAlternatives.add(id));
  }

  // Also find similar foods algorithmically
  const algorithmicAlternatives = findSimilarFoods(originalFood, reason, patient);

  // Combine and deduplicate
  const allAlternativeIds = new Set([
    ...predefinedAlternatives,
    ...algorithmicAlternatives.map(f => f.id)
  ]);

  // Score and rank alternatives
  const rankedAlternatives = Array.from(allAlternativeIds)
    .map(id => getFoodById(id))
    .filter((f): f is Food => f !== undefined && f !== null && f.id !== foodId)
    .map(food => {
      const similarity = calculateSimilarity(originalFood, food);
      const anhScore = patient 
        ? calculateANHScore(food, patient).totalScore 
        : 50;
      const reasons = getSubstitutionReasons(originalFood, food, reason);

      return {
        food,
        similarityScore: similarity,
        anhScore,
        reasons,
      };
    })
    .sort((a, b) => {
      // Sort by combined score (weighted)
      const scoreA = a.similarityScore * 0.3 + a.anhScore * 0.7;
      const scoreB = b.similarityScore * 0.3 + b.anhScore * 0.7;
      return scoreB - scoreA;
    })
    .slice(0, count);

  return {
    original: originalFood,
    alternatives: rankedAlternatives,
    reason,
  };
}

/**
 * Find foods similar to the original based on various criteria
 */
function findSimilarFoods(
  original: Food,
  reason: SubstitutionReason,
  patient?: PatientProfile
): Food[] {
  return foods.filter(food => {
    // Exclude the original
    if (food.id === original.id) return false;

    // Apply reason-specific filters
    switch (reason) {
      case 'dairy_free':
        if (food.category === 'dairy') return false;
        break;
      case 'gluten_free':
        if (['wheat_roti', 'semolina', 'daliya', 'oats'].includes(food.id)) return false;
        break;
      case 'nut_free':
        if (food.category === 'nuts_seeds' || food.id.includes('nut')) return false;
        break;
      case 'vegan':
        if (['dairy', 'meat', 'seafood'].includes(food.category)) return false;
        break;
      case 'low_calorie':
        if (food.nutrition.calories > original.nutrition.calories * 0.7) return false;
        break;
      case 'low_carb':
        if (food.nutrition.carbs > 10) return false;
        break;
      case 'high_protein':
        if (food.nutrition.protein < original.nutrition.protein) return false;
        break;
      case 'diabetes_friendly':
        // Prefer low GI foods
        if (food.category === 'sweets') return false;
        if (food.id === 'rice_white' || food.id === 'aloo') return false;
        break;
    }

    // Prefer same or similar category
    if (food.category === original.category) return true;

    // For protein sources, allow cross-category
    if (original.nutrition.protein > 10 && food.nutrition.protein > 10) return true;

    // For Ayurvedic compatibility
    if (patient) {
      const dominantDosha = patient.prakriti.dominant;
      // Prefer foods that pacify the same dosha
      if (food.ayurvedic.doshaEffect[dominantDosha] < 0 && 
          original.ayurvedic.doshaEffect[dominantDosha] < 0) {
        return true;
      }
    }

    return false;
  });
}

/**
 * Calculate similarity between two foods (0-100)
 */
function calculateSimilarity(original: Food, alternative: Food): number {
  let score = 0;
  
  // Category match (30 points)
  if (original.category === alternative.category) {
    score += 30;
  }

  // Nutritional similarity (30 points)
  const calDiff = Math.abs(original.nutrition.calories - alternative.nutrition.calories);
  const protDiff = Math.abs(original.nutrition.protein - alternative.nutrition.protein);
  const carbDiff = Math.abs(original.nutrition.carbs - alternative.nutrition.carbs);
  
  score += Math.max(0, 10 - calDiff / 20);
  score += Math.max(0, 10 - protDiff);
  score += Math.max(0, 10 - carbDiff / 5);

  // Ayurvedic similarity (40 points)
  // Rasa overlap
  const originalRasas = new Set(original.ayurvedic.rasa);
  const altRasas = new Set(alternative.ayurvedic.rasa);
  const rasaOverlap = [...originalRasas].filter(r => altRasas.has(r)).length;
  score += rasaOverlap * 5;

  // Virya match
  if (original.ayurvedic.virya === alternative.ayurvedic.virya) {
    score += 10;
  }

  // Dosha effect similarity
  const vataMatch = Math.sign(original.ayurvedic.doshaEffect.vata) === 
                    Math.sign(alternative.ayurvedic.doshaEffect.vata);
  const pittaMatch = Math.sign(original.ayurvedic.doshaEffect.pitta) === 
                     Math.sign(alternative.ayurvedic.doshaEffect.pitta);
  const kaphaMatch = Math.sign(original.ayurvedic.doshaEffect.kapha) === 
                     Math.sign(alternative.ayurvedic.doshaEffect.kapha);
  
  if (vataMatch) score += 5;
  if (pittaMatch) score += 5;
  if (kaphaMatch) score += 5;

  return Math.min(100, Math.round(score));
}

/**
 * Get human-readable reasons why this is a good substitute
 */
function getSubstitutionReasons(
  original: Food,
  alternative: Food,
  reason: SubstitutionReason
): string[] {
  const reasons: string[] = [];

  // Primary reason
  const reasonLabels: Record<SubstitutionReason, string> = {
    dairy_free: 'Dairy-free alternative',
    gluten_free: 'Gluten-free alternative',
    nut_free: 'Nut-free alternative',
    vegan: 'Plant-based alternative',
    low_calorie: 'Lower calorie option',
    low_carb: 'Lower carbohydrate option',
    high_protein: 'Higher protein option',
    pitta_pacifying: 'Cooling for Pitta',
    vata_pacifying: 'Grounding for Vata',
    kapha_pacifying: 'Stimulating for Kapha',
    diabetes_friendly: 'Diabetes-friendly option',
    heart_friendly: 'Heart-healthy option',
    allergy: 'Allergy-safe alternative',
  };
  reasons.push(reasonLabels[reason]);

  // Additional benefits
  if (alternative.nutrition.protein > original.nutrition.protein) {
    reasons.push('Higher protein');
  }
  if (alternative.nutrition.fiber > original.nutrition.fiber) {
    reasons.push('More fiber');
  }
  if (alternative.nutrition.calories < original.nutrition.calories) {
    reasons.push('Fewer calories');
  }
  if (original.ayurvedic.virya === alternative.ayurvedic.virya) {
    reasons.push(`Same ${alternative.ayurvedic.virya === 'ushna' ? 'heating' : 'cooling'} nature`);
  }

  return reasons;
}

/**
 * Get substitutes for all foods in a recipe
 */
export function getRecipeSubstitutions(
  ingredientIds: string[],
  reason: SubstitutionReason,
  patient?: PatientProfile
): Map<string, SubstitutionResult | null> {
  const results = new Map<string, SubstitutionResult | null>();
  
  ingredientIds.forEach(id => {
    results.set(id, findSubstitutes(id, reason, patient));
  });

  return results;
}

/**
 * Suggest substitutes based on patient allergies
 */
export function suggestAllergySubstitutes(
  foodId: string,
  patient: PatientProfile
): SubstitutionResult | null {
  const food = getFoodById(foodId);
  if (!food) return null;

  // Determine reason based on allergies
  let reason: SubstitutionReason = 'allergy';
  
  for (const allergy of patient.allergies) {
    const allergyLower = allergy.toLowerCase();
    if (allergyLower.includes('dairy') || allergyLower.includes('milk')) {
      if (food.category === 'dairy') {
        reason = 'dairy_free';
        break;
      }
    }
    if (allergyLower.includes('gluten') || allergyLower.includes('wheat')) {
      if (['wheat_roti', 'semolina', 'daliya'].includes(food.id)) {
        reason = 'gluten_free';
        break;
      }
    }
    if (allergyLower.includes('nut')) {
      if (food.category === 'nuts_seeds') {
        reason = 'nut_free';
        break;
      }
    }
  }

  return findSubstitutes(foodId, reason, patient);
}

/**
 * Get dosha-specific substitutes
 */
export function getDoshaSubstitutes(
  foodId: string,
  targetDosha: DoshaType,
  patient?: PatientProfile
): SubstitutionResult | null {
  const reasonMap: Record<DoshaType, SubstitutionReason> = {
    vata: 'vata_pacifying',
    pitta: 'pitta_pacifying',
    kapha: 'kapha_pacifying',
  };

  return findSubstitutes(foodId, reasonMap[targetDosha], patient);
}

