// Pre-built diet templates for common health conditions

import { MealType, DoshaType, FoodCategory } from '../types';

export interface MealTemplate {
  id: string;
  name: string;
  nameHindi: string;
  targetCondition: string;
  description: string;
  duration: '1_week' | '2_weeks' | '1_month';
  dailyCalorieTarget: number;
  macroTargets: {
    protein: { min: number; max: number };
    carbs: { min: number; max: number };
    fat: { min: number; max: number };
    fiber: { min: number; max: number };
  };
  preferredCategories: FoodCategory[];
  avoidCategories: FoodCategory[];
  preferredFoods: string[];
  avoidFoods: string[];
  doshaFocus: DoshaType;
  mealStructure: {
    breakfast: MealTemplateSlot;
    morningSnack?: MealTemplateSlot;
    lunch: MealTemplateSlot;
    eveningSnack?: MealTemplateSlot;
    dinner: MealTemplateSlot;
  };
  guidelines: string[];
  dosList: string[];
  dontsList: string[];
}

export interface MealTemplateSlot {
  calorieRange: { min: number; max: number };
  requiredCategories: FoodCategory[];
  optionalCategories: FoodCategory[];
  suggestedRecipes: string[];
  notes?: string;
}

export const mealTemplates: MealTemplate[] = [
  {
    id: 'diabetes_management',
    name: 'Diabetes Management Plan',
    nameHindi: 'Madhumeha Ahara',
    targetCondition: 'diabetes',
    description: 'Low glycemic index diet focusing on blood sugar control through Ayurvedic principles',
    duration: '1_month',
    dailyCalorieTarget: 1600,
    macroTargets: {
      protein: { min: 60, max: 80 },
      carbs: { min: 120, max: 180 },
      fat: { min: 40, max: 60 },
      fiber: { min: 30, max: 45 },
    },
    preferredCategories: ['vegetables', 'pulses', 'spices'],
    avoidCategories: ['sweets'],
    preferredFoods: [
      'karela', 'methi_leaves', 'jamun', 'amla', 'turmeric', 'cinnamon',
      'moong_dal', 'chana_dal', 'barley', 'ragi', 'foxtail_millet'
    ],
    avoidFoods: [
      'rice_white', 'aloo', 'banana', 'mango', 'jaggery', 'honey', 'sabudana'
    ],
    doshaFocus: 'kapha',
    mealStructure: {
      breakfast: {
        calorieRange: { min: 300, max: 400 },
        requiredCategories: ['grains'],
        optionalCategories: ['vegetables', 'pulses'],
        suggestedRecipes: ['ragi_dosa', 'daliya_khichdi', 'oats_porridge'],
        notes: 'Include fiber-rich options'
      },
      morningSnack: {
        calorieRange: { min: 100, max: 150 },
        requiredCategories: ['fruits'],
        optionalCategories: ['nuts_seeds'],
        suggestedRecipes: ['sprouts_chaat'],
        notes: 'Low GI fruits only - jamun, apple, guava'
      },
      lunch: {
        calorieRange: { min: 450, max: 550 },
        requiredCategories: ['grains', 'pulses', 'vegetables'],
        optionalCategories: [],
        suggestedRecipes: ['moong_dal', 'karela_sabzi', 'methi_aloo'],
        notes: 'Include bitter vegetables'
      },
      eveningSnack: {
        calorieRange: { min: 100, max: 150 },
        requiredCategories: ['beverages'],
        optionalCategories: ['nuts_seeds'],
        suggestedRecipes: ['green_chutney'],
        notes: 'Herbal tea or buttermilk'
      },
      dinner: {
        calorieRange: { min: 350, max: 450 },
        requiredCategories: ['pulses', 'vegetables'],
        optionalCategories: ['grains'],
        suggestedRecipes: ['lauki_sabzi', 'moong_dal'],
        notes: 'Light dinner, avoid grains if possible'
      }
    },
    guidelines: [
      'Eat at regular intervals - every 3-4 hours',
      'Never skip breakfast',
      'Include bitter foods daily',
      'Take fenugreek seeds soaked overnight',
      'Walk for 30 minutes after meals'
    ],
    dosList: [
      'Bitter gourd (karela) - at least 3 times a week',
      'Fenugreek (methi) - daily',
      'Amla - 1 daily',
      'Millets instead of rice',
      'Cinnamon in warm water morning'
    ],
    dontsList: [
      'White rice',
      'Potatoes',
      'Sweet fruits (mango, banana, grapes)',
      'Jaggery, honey in excess',
      'Fried foods',
      'Late night eating'
    ]
  },
  {
    id: 'weight_loss_kapha',
    name: 'Weight Loss Plan (Kapha)',
    nameHindi: 'Sthaulya Nashak Ahara',
    targetCondition: 'obesity',
    description: 'Kapha-reducing diet for healthy weight loss with metabolism boost',
    duration: '1_month',
    dailyCalorieTarget: 1400,
    macroTargets: {
      protein: { min: 70, max: 90 },
      carbs: { min: 100, max: 150 },
      fat: { min: 35, max: 50 },
      fiber: { min: 35, max: 50 },
    },
    preferredCategories: ['vegetables', 'pulses', 'spices'],
    avoidCategories: ['sweets', 'oils', 'dairy'],
    preferredFoods: [
      'moong_dal', 'kulthi', 'karela', 'methi_leaves', 'ginger', 'black_pepper',
      'barley', 'ragi', 'honey', 'buttermilk'
    ],
    avoidFoods: [
      'rice_white', 'wheat_roti', 'ghee', 'paneer', 'banana', 'milk_cow',
      'jaggery', 'cashews', 'sabudana'
    ],
    doshaFocus: 'kapha',
    mealStructure: {
      breakfast: {
        calorieRange: { min: 250, max: 350 },
        requiredCategories: ['grains'],
        optionalCategories: ['vegetables'],
        suggestedRecipes: ['poha', 'upma', 'ragi_dosa'],
        notes: 'Light breakfast, avoid heavy foods'
      },
      lunch: {
        calorieRange: { min: 400, max: 500 },
        requiredCategories: ['pulses', 'vegetables'],
        optionalCategories: ['grains'],
        suggestedRecipes: ['moong_dal', 'palak_paneer', 'karela_sabzi'],
        notes: 'Largest meal of the day'
      },
      eveningSnack: {
        calorieRange: { min: 50, max: 100 },
        requiredCategories: ['beverages'],
        optionalCategories: [],
        suggestedRecipes: [],
        notes: 'Ginger tea or green tea only'
      },
      dinner: {
        calorieRange: { min: 300, max: 400 },
        requiredCategories: ['vegetables'],
        optionalCategories: ['pulses'],
        suggestedRecipes: ['lauki_sabzi', 'moong_dal'],
        notes: 'Very light, before 7 PM'
      }
    },
    guidelines: [
      'Eat only when hungry',
      'Avoid snacking between meals',
      'Drink warm water with honey and lemon morning',
      'No eating after sunset',
      'Exercise vigorously daily'
    ],
    dosList: [
      'Warm water throughout the day',
      'Ginger and black pepper',
      'Light, dry foods',
      'Fasting once a week',
      'Early dinner'
    ],
    dontsList: [
      'Cold foods and drinks',
      'Heavy dairy products',
      'Fried foods',
      'Sleeping during day',
      'Sweet foods',
      'Large portions'
    ]
  },
  {
    id: 'pcod_management',
    name: 'PCOD Management Plan',
    nameHindi: 'PCOD Ahara',
    targetCondition: 'pcod',
    description: 'Hormone-balancing diet for PCOD with focus on reducing Kapha and Vata',
    duration: '1_month',
    dailyCalorieTarget: 1500,
    macroTargets: {
      protein: { min: 65, max: 85 },
      carbs: { min: 120, max: 160 },
      fat: { min: 45, max: 60 },
      fiber: { min: 30, max: 40 },
    },
    preferredCategories: ['vegetables', 'pulses', 'spices', 'nuts_seeds'],
    avoidCategories: ['dairy', 'sweets'],
    preferredFoods: [
      'flaxseeds', 'sesame_seeds', 'methi_seeds', 'turmeric', 'cinnamon',
      'moong_dal', 'palak', 'karela', 'amla', 'tulsi_tea'
    ],
    avoidFoods: [
      'milk_cow', 'paneer', 'yogurt', 'rice_white', 'aloo', 
      'banana', 'jaggery', 'soybean'
    ],
    doshaFocus: 'kapha',
    mealStructure: {
      breakfast: {
        calorieRange: { min: 300, max: 400 },
        requiredCategories: ['grains'],
        optionalCategories: ['nuts_seeds'],
        suggestedRecipes: ['daliya_khichdi', 'ragi_dosa'],
        notes: 'Include seeds daily'
      },
      morningSnack: {
        calorieRange: { min: 100, max: 150 },
        requiredCategories: ['fruits'],
        optionalCategories: [],
        suggestedRecipes: [],
        notes: 'Apple, guava, or berries'
      },
      lunch: {
        calorieRange: { min: 450, max: 550 },
        requiredCategories: ['pulses', 'vegetables'],
        optionalCategories: ['grains'],
        suggestedRecipes: ['moong_dal', 'palak_paneer', 'methi_aloo'],
        notes: 'Balanced meal with greens'
      },
      dinner: {
        calorieRange: { min: 350, max: 450 },
        requiredCategories: ['vegetables', 'pulses'],
        optionalCategories: [],
        suggestedRecipes: ['lauki_sabzi', 'khichdi'],
        notes: 'Light dinner before 7 PM'
      }
    },
    guidelines: [
      'Include flaxseeds or sesame daily',
      'Take fenugreek water morning',
      'Avoid dairy completely',
      'Regular exercise is essential',
      'Manage stress through yoga'
    ],
    dosList: [
      'Flaxseeds (1 tbsp daily)',
      'Cinnamon in warm water',
      'Green leafy vegetables',
      'Bitter foods',
      'Spearmint tea'
    ],
    dontsList: [
      'All dairy products',
      'Soy products',
      'Refined carbohydrates',
      'Sugar and sweets',
      'Processed foods',
      'Late night eating'
    ]
  },
  {
    id: 'vata_balancing',
    name: 'Vata Balancing Plan',
    nameHindi: 'Vata Shamak Ahara',
    targetCondition: 'vata_imbalance',
    description: 'Warm, grounding diet to pacify Vata dosha',
    duration: '2_weeks',
    dailyCalorieTarget: 1800,
    macroTargets: {
      protein: { min: 55, max: 75 },
      carbs: { min: 200, max: 260 },
      fat: { min: 60, max: 80 },
      fiber: { min: 25, max: 35 },
    },
    preferredCategories: ['grains', 'dairy', 'oils', 'nuts_seeds'],
    avoidCategories: [],
    preferredFoods: [
      'ghee', 'sesame_oil', 'rice_white', 'wheat_roti', 'milk_cow',
      'almonds', 'dates', 'banana', 'ginger', 'cumin'
    ],
    avoidFoods: [
      'karela', 'patta_gobhi', 'beans_french', 'corn', 'popcorn',
      'cold_drinks', 'raw_salads'
    ],
    doshaFocus: 'vata',
    mealStructure: {
      breakfast: {
        calorieRange: { min: 400, max: 500 },
        requiredCategories: ['grains', 'dairy'],
        optionalCategories: ['fruits'],
        suggestedRecipes: ['oats_porridge', 'upma'],
        notes: 'Warm, nourishing breakfast'
      },
      morningSnack: {
        calorieRange: { min: 150, max: 200 },
        requiredCategories: ['nuts_seeds'],
        optionalCategories: ['fruits'],
        suggestedRecipes: [],
        notes: 'Soaked almonds or dates'
      },
      lunch: {
        calorieRange: { min: 500, max: 600 },
        requiredCategories: ['grains', 'pulses', 'vegetables'],
        optionalCategories: ['dairy'],
        suggestedRecipes: ['khichdi', 'dal_tadka', 'aloo_gobhi'],
        notes: 'Well-cooked, warm food with ghee'
      },
      eveningSnack: {
        calorieRange: { min: 150, max: 200 },
        requiredCategories: ['beverages'],
        optionalCategories: ['dairy'],
        suggestedRecipes: [],
        notes: 'Warm milk with spices'
      },
      dinner: {
        calorieRange: { min: 400, max: 500 },
        requiredCategories: ['grains', 'vegetables'],
        optionalCategories: ['pulses'],
        suggestedRecipes: ['jeera_rice', 'lauki_sabzi'],
        notes: 'Warm, easy to digest'
      }
    },
    guidelines: [
      'Eat at regular times daily',
      'Avoid cold and raw foods',
      'Include ghee in every meal',
      'Stay warm, avoid wind and cold',
      'Practice calming routines'
    ],
    dosList: [
      'Warm, cooked foods',
      'Ghee and oils',
      'Sweet, sour, salty tastes',
      'Regular meal times',
      'Warm water and drinks'
    ],
    dontsList: [
      'Raw salads',
      'Cold foods and drinks',
      'Bitter and astringent foods',
      'Irregular eating',
      'Dry, light foods',
      'Fasting'
    ]
  },
  {
    id: 'pitta_cooling',
    name: 'Pitta Cooling Plan',
    nameHindi: 'Pitta Shamak Ahara',
    targetCondition: 'pitta_imbalance',
    description: 'Cooling diet to pacify Pitta dosha and reduce heat',
    duration: '2_weeks',
    dailyCalorieTarget: 1700,
    macroTargets: {
      protein: { min: 55, max: 70 },
      carbs: { min: 200, max: 250 },
      fat: { min: 50, max: 65 },
      fiber: { min: 30, max: 40 },
    },
    preferredCategories: ['vegetables', 'fruits', 'dairy', 'grains'],
    avoidCategories: ['spices'],
    preferredFoods: [
      'rice_white', 'ghee', 'coconut_fresh', 'cucumber', 'lauki',
      'coriander', 'fennel', 'milk_cow', 'pomegranate', 'watermelon'
    ],
    avoidFoods: [
      'ginger', 'black_pepper', 'mustard_oil', 'tomato', 'yogurt',
      'mango', 'citrus', 'lehsun', 'pyaz'
    ],
    doshaFocus: 'pitta',
    mealStructure: {
      breakfast: {
        calorieRange: { min: 350, max: 450 },
        requiredCategories: ['grains'],
        optionalCategories: ['fruits', 'dairy'],
        suggestedRecipes: ['poha', 'oats_porridge'],
        notes: 'Cool or room temperature'
      },
      morningSnack: {
        calorieRange: { min: 100, max: 150 },
        requiredCategories: ['fruits'],
        optionalCategories: [],
        suggestedRecipes: [],
        notes: 'Sweet fruits - pomegranate, apple'
      },
      lunch: {
        calorieRange: { min: 500, max: 600 },
        requiredCategories: ['grains', 'pulses', 'vegetables'],
        optionalCategories: ['dairy'],
        suggestedRecipes: ['curd_rice', 'moong_dal', 'lauki_sabzi'],
        notes: 'Cooling foods, avoid spicy'
      },
      eveningSnack: {
        calorieRange: { min: 100, max: 150 },
        requiredCategories: ['beverages'],
        optionalCategories: [],
        suggestedRecipes: [],
        notes: 'Coconut water or sweet lassi'
      },
      dinner: {
        calorieRange: { min: 400, max: 500 },
        requiredCategories: ['vegetables', 'grains'],
        optionalCategories: ['pulses'],
        suggestedRecipes: ['khichdi', 'lauki_sabzi'],
        notes: 'Light, cooling dinner'
      }
    },
    guidelines: [
      'Avoid hot and spicy foods',
      'Eat when calm, not angry',
      'Include cooling foods daily',
      'Avoid direct sun exposure',
      'Stay cool and calm'
    ],
    dosList: [
      'Cooling foods',
      'Sweet, bitter, astringent tastes',
      'Coconut and ghee',
      'Room temperature or cool foods',
      'Green leafy vegetables'
    ],
    dontsList: [
      'Hot, spicy foods',
      'Sour foods (except lime)',
      'Fermented foods',
      'Alcohol',
      'Deep fried foods',
      'Eating when angry'
    ]
  },
  {
    id: 'digestive_health',
    name: 'Digestive Health Plan',
    nameHindi: 'Pachana Ahara',
    targetCondition: 'digestive_issues',
    description: 'Easy to digest diet for improving Agni (digestive fire)',
    duration: '1_week',
    dailyCalorieTarget: 1500,
    macroTargets: {
      protein: { min: 50, max: 65 },
      carbs: { min: 180, max: 220 },
      fat: { min: 40, max: 55 },
      fiber: { min: 20, max: 30 },
    },
    preferredCategories: ['grains', 'pulses', 'spices'],
    avoidCategories: [],
    preferredFoods: [
      'moong_dal', 'rice_white', 'ghee', 'ginger', 'cumin', 'ajwain',
      'buttermilk', 'lauki', 'khichdi'
    ],
    avoidFoods: [
      'rajma', 'chhole', 'patta_gobhi', 'urad_dal', 'yogurt',
      'cold_drinks', 'heavy_foods'
    ],
    doshaFocus: 'vata',
    mealStructure: {
      breakfast: {
        calorieRange: { min: 300, max: 400 },
        requiredCategories: ['grains'],
        optionalCategories: [],
        suggestedRecipes: ['daliya_khichdi', 'poha'],
        notes: 'Light, warm breakfast'
      },
      lunch: {
        calorieRange: { min: 500, max: 600 },
        requiredCategories: ['grains', 'pulses'],
        optionalCategories: ['vegetables'],
        suggestedRecipes: ['khichdi', 'moong_dal'],
        notes: 'Simple, well-cooked food'
      },
      dinner: {
        calorieRange: { min: 350, max: 450 },
        requiredCategories: ['grains'],
        optionalCategories: ['vegetables'],
        suggestedRecipes: ['khichdi', 'lauki_sabzi'],
        notes: 'Very light, early dinner'
      }
    },
    guidelines: [
      'Eat khichdi for at least one meal',
      'Chew food thoroughly',
      'Drink warm water between meals',
      'Take buttermilk with lunch',
      'Avoid overeating'
    ],
    dosList: [
      'Warm, freshly cooked food',
      'Ginger before meals',
      'Cumin and ajwain',
      'Buttermilk after lunch',
      'Early light dinner'
    ],
    dontsList: [
      'Cold and raw foods',
      'Heavy legumes',
      'Leftover food',
      'Eating between meals',
      'Drinking with meals',
      'Late eating'
    ]
  }
];

export function getTemplateById(id: string): MealTemplate | undefined {
  return mealTemplates.find(t => t.id === id);
}

export function getTemplatesForCondition(conditionId: string): MealTemplate[] {
  return mealTemplates.filter(t => 
    t.targetCondition === conditionId || 
    t.id.includes(conditionId)
  );
}

export function getTemplatesForDosha(dosha: DoshaType): MealTemplate[] {
  return mealTemplates.filter(t => t.doshaFocus === dosha);
}

