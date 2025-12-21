// ANH-Score Algorithm
export {
  calculateANHScore,
  rankFoodsForPatient,
  getTopRecommendations,
  filterByMinScore,
} from './anhScore';

// Meal Composition Engine
export {
  composeMeal,
  generateDailyPlan,
  optimizeMeal,
} from './mealComposer';

// Viruddha Aahara Checker
export {
  checkFoodPairCompatibility,
  checkMealCompatibility,
  checkFoodAddition,
  getFoodIncompatibilities,
  getCategoryIncompatibilities,
  checkTimeBasedRules,
  getCompatibilitySummary,
  getViruddhaGraph,
} from './viruddhaCheck';

// Recipe Scoring
export {
  calculateRecipeScore,
  getTopRecipesForPatient,
  filterRecipesByPreference,
  getRecipesForCondition,
} from './recipeScore';
export type { RecipeScoreResult, RecipeNutrition, RecipeAyurvedicProfile } from './recipeScore';

// Food Substitution Engine
export {
  findSubstitutes,
  getRecipeSubstitutions,
  suggestAllergySubstitutes,
  getDoshaSubstitutes,
} from './substitution';
export type { SubstitutionResult, SubstitutionReason } from './substitution';

