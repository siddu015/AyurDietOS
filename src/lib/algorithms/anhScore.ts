import {
  Food,
  PatientProfile,
  ANHScoreResult,
  DoshaType,
  Rasa,
  Virya,
  NutritionalInfo,
} from '../types';
import { getDoshaInfo, getCurrentSeason, getSeasonInfo } from '../data';

interface ANHConfig {
  ayurvedicWeight: number;  // Default 0.5
  nutritionalWeight: number; // Default 0.5
  calorieTarget?: number;
  proteinTarget?: number;
}

const DEFAULT_CONFIG: ANHConfig = {
  ayurvedicWeight: 0.5,
  nutritionalWeight: 0.5,
  calorieTarget: 500,  // per meal
  proteinTarget: 20,   // grams per meal
};

/**
 * ANH-Score: Ayur-Nutri Hybrid Scoring Algorithm
 * Calculates a compatibility score (0-100) for a food item based on:
 * 1. Ayurvedic Compatibility (Dosha balance, Virya match, Rasa diversity)
 * 2. Nutritional Compatibility (Calorie fit, Protein fit, Micronutrient density)
 */
export function calculateANHScore(
  food: Food,
  patient: PatientProfile,
  config: Partial<ANHConfig> = {}
): ANHScoreResult {
  const cfg = { ...DEFAULT_CONFIG, ...config };
  
  // Calculate Ayurvedic Score (0-100)
  const ayurvedicBreakdown = calculateAyurvedicScore(food, patient);
  const ayurvedicScore = 
    (ayurvedicBreakdown.doshaBalance * 0.5) +
    (ayurvedicBreakdown.viryaMatch * 0.3) +
    (ayurvedicBreakdown.rasaDiversity * 0.2);

  // Calculate Nutritional Score (0-100)
  const nutritionalBreakdown = calculateNutritionalScore(
    food, 
    cfg.calorieTarget!, 
    cfg.proteinTarget!
  );
  const nutritionalScore = 
    (nutritionalBreakdown.caloriesFit * 0.4) +
    (nutritionalBreakdown.proteinFit * 0.4) +
    (nutritionalBreakdown.micronutrientDensity * 0.2);

  // Calculate total ANH Score
  const totalScore = 
    (cfg.ayurvedicWeight * ayurvedicScore) + 
    (cfg.nutritionalWeight * nutritionalScore);

  // Generate recommendations and warnings
  const { recommendations, warnings } = generateInsights(
    food, 
    patient, 
    ayurvedicBreakdown, 
    nutritionalBreakdown
  );

  return {
    totalScore: Math.round(totalScore),
    ayurvedicScore: Math.round(ayurvedicScore),
    nutritionalScore: Math.round(nutritionalScore),
    breakdown: {
      ...ayurvedicBreakdown,
      ...nutritionalBreakdown,
    },
    recommendations,
    warnings,
  };
}

interface AyurvedicBreakdown {
  doshaBalance: number;
  viryaMatch: number;
  rasaDiversity: number;
}

function calculateAyurvedicScore(food: Food, patient: PatientProfile): AyurvedicBreakdown {
  // 1. Dosha Balance Score (0-100)
  // Higher score if food pacifies the dominant dosha
  const doshaBalance = calculateDoshaBalanceScore(food, patient);

  // 2. Virya Match Score (0-100)
  // Based on current season and patient constitution
  const viryaMatch = calculateViryaMatchScore(food, patient);

  // 3. Rasa Diversity Score (0-100)
  // Bonus for foods with multiple tastes (Ayurveda recommends 6 tastes)
  const rasaDiversity = calculateRasaDiversityScore(food.ayurvedic.rasa);

  return {
    doshaBalance: Math.round(doshaBalance),
    viryaMatch: Math.round(viryaMatch),
    rasaDiversity: Math.round(rasaDiversity),
  };
}

function calculateDoshaBalanceScore(food: Food, patient: PatientProfile): number {
  const { doshaEffect } = food.ayurvedic;
  const dominantDosha = patient.prakriti.dominant;
  
  // Get current imbalance if exists, otherwise use prakriti
  const targetDosha = patient.vikriti?.dominant || dominantDosha;
  
  // Score based on how well the food pacifies the dominant/imbalanced dosha
  // Negative effect = pacifies = good
  // Positive effect = aggravates = bad
  
  let score = 50; // Base score
  
  // Primary effect on dominant dosha
  const primaryEffect = doshaEffect[targetDosha];
  score -= primaryEffect * 25; // -2 effect = +50, +2 effect = -50
  
  // Clamp to 0-100
  return Math.max(0, Math.min(100, score));
}

function calculateViryaMatchScore(food: Food, patient: PatientProfile): number {
  const currentSeason = getCurrentSeason();
  const seasonInfo = getSeasonInfo(currentSeason);
  const dominantDosha = patient.prakriti.dominant;
  
  // Get preferred virya based on dosha and season
  const preferredVirya = getPreferredVirya(dominantDosha, currentSeason);
  
  let score = 70; // Base score
  
  if (food.ayurvedic.virya === preferredVirya) {
    score = 100;
  } else {
    // Opposite virya
    score = 40;
  }
  
  // Seasonal bonus: if food is in season
  if (food.season?.includes(currentSeason as never)) {
    score = Math.min(100, score + 15);
  }
  
  return score;
}

function getPreferredVirya(dosha: DoshaType, season: string): Virya {
  // Vata: prefer warming (ushna)
  // Pitta: prefer cooling (sheeta)
  // Kapha: prefer warming (ushna)
  
  const doshaVirya: Record<DoshaType, Virya> = {
    vata: 'ushna',
    pitta: 'sheeta',
    kapha: 'ushna',
  };
  
  // Override based on season (summer needs cooling regardless)
  if (season === 'grishma') return 'sheeta';
  if (season === 'hemanta' || season === 'shishira') return 'ushna';
  
  return doshaVirya[dosha];
}

function calculateRasaDiversityScore(rasas: Rasa[]): number {
  // More tastes = better (Ayurveda recommends 6 tastes)
  // 1 rasa = 40 points
  // Each additional rasa adds 15 points
  const baseScore = 40;
  const additionalScore = (rasas.length - 1) * 15;
  return Math.min(100, baseScore + additionalScore);
}

interface NutritionalBreakdown {
  caloriesFit: number;
  proteinFit: number;
  micronutrientDensity: number;
}

function calculateNutritionalScore(
  food: Food, 
  calorieTarget: number, 
  proteinTarget: number
): NutritionalBreakdown {
  const { nutrition } = food;
  
  // 1. Calories Fit Score (0-100)
  // Penalize if calories too high for target
  const calorieRatio = nutrition.calories / calorieTarget;
  let caloriesFit = 100;
  if (calorieRatio > 0.5) {
    caloriesFit = Math.max(0, 100 - (calorieRatio - 0.5) * 100);
  }
  
  // 2. Protein Fit Score (0-100)
  // Higher protein per calorie = better
  const proteinPerCal = nutrition.protein / Math.max(1, nutrition.calories) * 100;
  const proteinFit = Math.min(100, proteinPerCal * 10);
  
  // 3. Micronutrient Density Score (0-100)
  // Based on presence of vitamins and minerals
  const micronutrientDensity = calculateMicronutrientDensity(nutrition);
  
  return {
    caloriesFit: Math.round(caloriesFit),
    proteinFit: Math.round(proteinFit),
    micronutrientDensity: Math.round(micronutrientDensity),
  };
}

function calculateMicronutrientDensity(nutrition: NutritionalInfo): number {
  let score = 50; // Base score
  
  // Fiber bonus
  if (nutrition.fiber > 2) score += 10;
  if (nutrition.fiber > 5) score += 10;
  
  // Vitamins bonus
  if (nutrition.vitamins) {
    score += Math.min(20, Object.keys(nutrition.vitamins).length * 5);
  }
  
  // Minerals bonus
  if (nutrition.minerals) {
    score += Math.min(20, Object.keys(nutrition.minerals).length * 5);
  }
  
  return Math.min(100, score);
}

function generateInsights(
  food: Food,
  patient: PatientProfile,
  ayurvedicBreakdown: AyurvedicBreakdown,
  nutritionalBreakdown: NutritionalBreakdown
): { recommendations: string[]; warnings: string[] } {
  const recommendations: string[] = [];
  const warnings: string[] = [];
  
  const dominantDosha = patient.prakriti.dominant;
  const { doshaEffect } = food.ayurvedic;
  
  // Check if food aggravates dominant dosha
  if (doshaEffect[dominantDosha] > 0) {
    warnings.push(
      `${food.name} may aggravate your ${dominantDosha} dosha. Consume in moderation.`
    );
  } else if (doshaEffect[dominantDosha] < 0) {
    recommendations.push(
      `${food.name} helps balance your ${dominantDosha} dosha.`
    );
  }
  
  // Virya recommendations
  const currentSeason = getCurrentSeason();
  if (currentSeason === 'grishma' && food.ayurvedic.virya === 'ushna') {
    warnings.push(
      `${food.name} is heating. Consider cooling alternatives in summer.`
    );
  }
  
  // Seasonal recommendations
  if (food.season && !food.season.includes(currentSeason as never)) {
    recommendations.push(
      `${food.name} is best consumed in its natural season for optimal benefits.`
    );
  }
  
  // Nutritional insights
  if (nutritionalBreakdown.proteinFit > 70) {
    recommendations.push(`${food.name} is a good protein source.`);
  }
  
  if (food.nutrition.fiber > 5) {
    recommendations.push(`${food.name} is high in fiber, good for digestion.`);
  }
  
  // Contraindications
  if (food.contraindications && food.contraindications.length > 0) {
    warnings.push(
      `Note: ${food.name} should be avoided in: ${food.contraindications.join(', ')}`
    );
  }
  
  return { recommendations, warnings };
}

/**
 * Calculate ANH scores for multiple foods and rank them
 */
export function rankFoodsForPatient(
  foods: Food[],
  patient: PatientProfile,
  config?: Partial<ANHConfig>
): Array<{ food: Food; score: ANHScoreResult }> {
  const scored = foods.map(food => ({
    food,
    score: calculateANHScore(food, patient, config),
  }));
  
  // Sort by total score descending
  return scored.sort((a, b) => b.score.totalScore - a.score.totalScore);
}

/**
 * Get top N recommended foods for a patient
 */
export function getTopRecommendations(
  foods: Food[],
  patient: PatientProfile,
  count: number = 10,
  config?: Partial<ANHConfig>
): Array<{ food: Food; score: ANHScoreResult }> {
  return rankFoodsForPatient(foods, patient, config).slice(0, count);
}

/**
 * Filter foods by minimum ANH score
 */
export function filterByMinScore(
  foods: Food[],
  patient: PatientProfile,
  minScore: number = 50,
  config?: Partial<ANHConfig>
): Array<{ food: Food; score: ANHScoreResult }> {
  return rankFoodsForPatient(foods, patient, config)
    .filter(item => item.score.totalScore >= minScore);
}

