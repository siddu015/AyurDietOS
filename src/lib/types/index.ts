// Ayurvedic Types
export type Rasa = 'madhura' | 'amla' | 'lavana' | 'katu' | 'tikta' | 'kashaya';
// Sweet, Sour, Salty, Pungent, Bitter, Astringent

export type Virya = 'ushna' | 'sheeta';
// Heating, Cooling

export type Vipaka = 'madhura' | 'amla' | 'katu';
// Sweet, Sour, Pungent (post-digestive effect)

export type DoshaType = 'vata' | 'pitta' | 'kapha';

export interface DoshaEffect {
  vata: number;   // -2 to +2 (negative = pacifies, positive = aggravates)
  pitta: number;
  kapha: number;
}

export interface AyurvedicProperties {
  rasa: Rasa[];
  virya: Virya;
  vipaka: Vipaka;
  doshaEffect: DoshaEffect;
  guna?: string[];  // Qualities like laghu (light), guru (heavy), snigdha (oily), etc.
}

export interface NutritionalInfo {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  vitamins?: Record<string, number>;
  minerals?: Record<string, number>;
}

export interface Food {
  id: string;
  name: string;
  nameHindi?: string;
  category: FoodCategory;
  ayurvedic: AyurvedicProperties;
  nutrition: NutritionalInfo;
  servingSize: string;
  servingGrams: number;
  season?: Season[];
  contraindications?: string[];
}

export type FoodCategory = 
  | 'grains'
  | 'pulses'
  | 'vegetables'
  | 'fruits'
  | 'dairy'
  | 'spices'
  | 'oils'
  | 'nuts_seeds'
  | 'beverages'
  | 'meat'
  | 'seafood'
  | 'sweets';

export type Season = 'vasanta' | 'grishma' | 'varsha' | 'sharad' | 'hemanta' | 'shishira';
// Spring, Summer, Monsoon, Autumn, Early Winter, Late Winter

// Patient/User Types
export interface PatientProfile {
  id: string;
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  prakriti: DoshaPrakriti;
  vikriti?: DoshaPrakriti;  // Current imbalance
  conditions: string[];    // Health condition IDs
  allergies: string[];
  dietaryPreferences: DietaryPreference[];
  goals: {
    weightGoal: 'lose' | 'maintain' | 'gain';
    dailyCalorieTarget?: number;
    proteinTarget?: number;
    dietGoals?: DietGoal[];  // Additional goals
  };
}

export interface DoshaPrakriti {
  vata: number;   // 0-100 percentage
  pitta: number;
  kapha: number;
  dominant: DoshaType;
  secondary?: DoshaType;
}

export type DietaryPreference = 
  | 'vegetarian'
  | 'vegan'
  | 'eggetarian'
  | 'non-vegetarian'
  | 'jain'
  | 'sattvic';

export type DietGoal = 
  | 'weight_loss'
  | 'weight_gain'
  | 'muscle_building'
  | 'diabetes_management'
  | 'heart_health'
  | 'digestive_health'
  | 'energy_boost'
  | 'immunity'
  | 'skin_health'
  | 'mental_clarity';

// Health Conditions
export interface HealthCondition {
  id: string;
  name: string;
  nameAyurvedic?: string;
  description: string;
  affectedDoshas: DoshaType[];
  recommendedNutrients: NutrientRecommendation[];
  avoidFoodCategories: FoodCategory[];
  recommendedFoodCategories: FoodCategory[];
  dietaryGuidelines: string[];
}

export interface NutrientRecommendation {
  nutrient: string;
  direction: 'increase' | 'decrease' | 'maintain';
  targetRange?: { min: number; max: number };
  unit: string;
}

// Viruddha Aahara (Incompatible Foods)
export interface ViruddhaRule {
  id: string;
  food1: string;
  food2: string;
  category1?: string;
  category2?: string;
  type: ViruddhaType;
  severity: 'mild' | 'moderate' | 'severe';
  reason: string;
  reference?: string;
}

export type ViruddhaType = 
  | 'samyoga'      // Combination
  | 'krama'        // Sequence
  | 'desha'        // Place
  | 'kala'         // Time
  | 'matra'        // Quantity
  | 'satmya'       // Habit
  | 'dosha'        // Constitution
  | 'samskara'     // Processing
  | 'virya'        // Potency
  | 'kostha'       // Bowel
  | 'avastha'      // State of health
  | 'paka';        // Cooking

// Meal Planning Types
export interface Meal {
  id: string;
  name: string;
  type: MealType;
  foods: MealItem[];
  totalNutrition: NutritionalInfo;
  rasaCoverage: Rasa[];
  overallDoshaEffect: DoshaEffect;
  anhScore?: number;
}

export interface MealItem {
  foodId: string;
  food: Food;
  quantity: number;
  unit: string;
}

export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';

export interface DietPlan {
  id: string;
  patientId: string;
  createdBy: string;
  createdAt: Date;
  validFrom: Date;
  validTo: Date;
  meals: DailyMealPlan[];
  notes: string;
  restrictions: string[];
}

export interface DailyMealPlan {
  day: number;
  breakfast: Meal;
  morningSnack?: Meal;
  lunch: Meal;
  eveningSnack?: Meal;
  dinner: Meal;
}

// Scoring Types
export interface ANHScoreResult {
  totalScore: number;
  ayurvedicScore: number;
  nutritionalScore: number;
  breakdown: {
    doshaBalance: number;
    viryaMatch: number;
    rasaDiversity: number;
    caloriesFit: number;
    proteinFit: number;
    micronutrientDensity: number;
  };
  recommendations: string[];
  warnings: string[];
}

export interface MealCompositionConstraints {
  maxCalories: number;
  minProtein: number;
  minRasaCount: number;
  targetDosha: DoshaType;
  viryaPreference?: Virya;
  excludeFoods?: string[];
  includeCategories?: FoodCategory[];
  excludeCategories?: FoodCategory[];
}

// Prakriti Quiz Types
export interface PrakritiQuestion {
  id: string;
  question: string;
  category: 'physical' | 'mental' | 'behavioral' | 'digestive';
  options: PrakritiOption[];
}

export interface PrakritiOption {
  text: string;
  vataScore: number;
  pittaScore: number;
  kaphaScore: number;
}

export interface PrakritiQuizResult {
  totalVata: number;
  totalPitta: number;
  totalKapha: number;
  prakriti: DoshaPrakriti;
  description: string;
  recommendations: string[];
}

// Knowledge Graph Types
export interface KnowledgeNode {
  id: string;
  type: 'food' | 'dosha' | 'condition' | 'nutrient' | 'rasa';
  label: string;
  data?: Record<string, unknown>;
}

export interface KnowledgeEdge {
  source: string;
  target: string;
  relationship: string;
  weight?: number;
}

export interface KnowledgeGraph {
  nodes: KnowledgeNode[];
  edges: KnowledgeEdge[];
}

