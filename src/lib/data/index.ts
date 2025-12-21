import { Food, HealthCondition, ViruddhaRule, PrakritiQuestion } from '../types';
import { allFoods, foodsByCategory, categoryCounts } from './allFoods';
import { recipes, Recipe, getRecipesByType, getRecipesForMeal, getRecipesByCategory, getRecipesByRegion, cookingMethodModifiers } from './recipes';
import doshasData from './doshas.json';
import conditionsData from './conditions.json';
import viruddhaData from './viruddha.json';
import prakritiQuizData from './prakritiQuiz.json';

// Use expanded foods database (105+ items)
export const foods: Food[] = allFoods;
export { foodsByCategory, categoryCounts };

// Export recipes (35+ items)
export { recipes, getRecipesByType, getRecipesForMeal, getRecipesByCategory, getRecipesByRegion, cookingMethodModifiers };
export type { Recipe };

// Export meal templates (condition-specific presets)
export { mealTemplates, getTemplateById, getTemplatesForCondition, getTemplatesForDosha } from './mealTemplates';
export type { MealTemplate } from './mealTemplates';

export const doshas = doshasData;
export const conditions: HealthCondition[] = conditionsData as HealthCondition[];
export const viruddhaRules: ViruddhaRule[] = viruddhaData as ViruddhaRule[];
export const prakritiQuiz = prakritiQuizData as {
  questions: PrakritiQuestion[];
  interpretations: Record<string, { description: string; recommendations: string[] }>;
};

// Helper functions
export function getFoodById(id: string): Food | undefined {
  return foods.find(f => f.id === id);
}

export function getFoodsByCategory(category: string): Food[] {
  return foods.filter(f => f.category === category);
}

export function getConditionById(id: string): HealthCondition | undefined {
  return conditions.find(c => c.id === id);
}

export function getDoshaInfo(doshaType: 'vata' | 'pitta' | 'kapha') {
  return doshas.doshas.find(d => d.type === doshaType);
}

export function getRasaInfo(rasaName: string) {
  return doshas.rasas.find(r => r.name === rasaName);
}

export function getSeasonInfo(seasonName: string) {
  return doshas.seasons.find(s => s.name === seasonName);
}

export function getCurrentSeason(): string {
  const month = new Date().getMonth();
  // Map months to Ayurvedic seasons
  const seasonMap: Record<number, string> = {
    0: 'shishira',  // January
    1: 'shishira',  // February
    2: 'vasanta',   // March
    3: 'vasanta',   // April
    4: 'grishma',   // May
    5: 'grishma',   // June
    6: 'varsha',    // July
    7: 'varsha',    // August
    8: 'sharad',    // September
    9: 'sharad',    // October
    10: 'hemanta',  // November
    11: 'hemanta',  // December
  };
  return seasonMap[month];
}

