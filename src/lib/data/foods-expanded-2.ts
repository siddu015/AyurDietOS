// Foods Part 2: Fruits, Dairy, Spices, Oils, Nuts, Sweets, Meat, Beverages

import { Food } from '../types';

export const moreFoods: Food[] = [
  // ============ FRUITS (15 items) ============
  {
    id: "banana",
    name: "Banana",
    nameHindi: "Kela",
    category: "fruits",
    ayurvedic: {
      rasa: ["madhura"],
      virya: "sheeta",
      vipaka: "amla",
      doshaEffect: { vata: -2, pitta: -1, kapha: 2 },
      guna: ["guru", "snigdha"]
    },
    nutrition: { calories: 105, protein: 1.3, carbs: 27, fat: 0.4, fiber: 3.1, minerals: { potassium: 422 } },
    servingSize: "1 medium",
    servingGrams: 118,
    season: ["varsha", "sharad"]
  },
  {
    id: "apple",
    name: "Apple",
    nameHindi: "Seb",
    category: "fruits",
    ayurvedic: {
      rasa: ["madhura", "kashaya"],
      virya: "sheeta",
      vipaka: "madhura",
      doshaEffect: { vata: 0, pitta: -1, kapha: 0 },
      guna: ["laghu", "ruksha"]
    },
    nutrition: { calories: 95, protein: 0.5, carbs: 25, fat: 0.3, fiber: 4.4 },
    servingSize: "1 medium",
    servingGrams: 182,
    season: ["sharad", "hemanta"]
  },
  {
    id: "mango",
    name: "Mango (Ripe)",
    nameHindi: "Aam",
    category: "fruits",
    ayurvedic: {
      rasa: ["madhura", "amla"],
      virya: "ushna",
      vipaka: "madhura",
      doshaEffect: { vata: -2, pitta: 1, kapha: 1 },
      guna: ["guru", "snigdha"]
    },
    nutrition: { calories: 99, protein: 1.4, carbs: 25, fat: 0.6, fiber: 2.6, vitamins: { C: 60, A: 54 } },
    servingSize: "1 cup",
    servingGrams: 165,
    season: ["grishma"]
  },
  {
    id: "pomegranate",
    name: "Pomegranate",
    nameHindi: "Anar",
    category: "fruits",
    ayurvedic: {
      rasa: ["madhura", "amla", "kashaya"],
      virya: "sheeta",
      vipaka: "madhura",
      doshaEffect: { vata: -1, pitta: -1, kapha: 0 },
      guna: ["laghu", "snigdha"]
    },
    nutrition: { calories: 144, protein: 2.9, carbs: 33, fat: 2, fiber: 7 },
    servingSize: "1 cup arils",
    servingGrams: 174,
    season: ["sharad", "hemanta"]
  },
  {
    id: "papaya",
    name: "Papaya",
    nameHindi: "Papita",
    category: "fruits",
    ayurvedic: {
      rasa: ["madhura"],
      virya: "ushna",
      vipaka: "madhura",
      doshaEffect: { vata: -1, pitta: 1, kapha: -1 },
      guna: ["laghu", "snigdha"]
    },
    nutrition: { calories: 43, protein: 0.5, carbs: 11, fat: 0.3, fiber: 1.7, vitamins: { C: 62, A: 47 } },
    servingSize: "1 cup",
    servingGrams: 145,
    season: ["varsha", "sharad"]
  },
  {
    id: "chiku",
    name: "Sapodilla (Chiku)",
    nameHindi: "Chiku",
    category: "fruits",
    ayurvedic: {
      rasa: ["madhura"],
      virya: "sheeta",
      vipaka: "madhura",
      doshaEffect: { vata: -1, pitta: -1, kapha: 1 },
      guna: ["guru", "snigdha"]
    },
    nutrition: { calories: 83, protein: 0.4, carbs: 20, fat: 1.1, fiber: 5.3 },
    servingSize: "1 medium",
    servingGrams: 100,
    season: ["hemanta", "shishira"]
  },
  {
    id: "jamun",
    name: "Indian Blackberry (Jamun)",
    nameHindi: "Jamun",
    category: "fruits",
    ayurvedic: {
      rasa: ["kashaya", "madhura", "amla"],
      virya: "sheeta",
      vipaka: "katu",
      doshaEffect: { vata: 0, pitta: -1, kapha: -1 },
      guna: ["laghu", "ruksha"]
    },
    nutrition: { calories: 62, protein: 0.7, carbs: 16, fat: 0.2, fiber: 0.9 },
    servingSize: "100g",
    servingGrams: 100,
    season: ["grishma", "varsha"],
    contraindications: ["empty_stomach"]
  },
  {
    id: "amla",
    name: "Indian Gooseberry (Amla)",
    nameHindi: "Amla/Amalaki",
    category: "fruits",
    ayurvedic: {
      rasa: ["amla", "madhura", "katu", "tikta", "kashaya"],
      virya: "sheeta",
      vipaka: "madhura",
      doshaEffect: { vata: -1, pitta: -2, kapha: -1 },
      guna: ["laghu", "ruksha"]
    },
    nutrition: { calories: 44, protein: 0.9, carbs: 10, fat: 0.6, fiber: 4.3, vitamins: { C: 600 } },
    servingSize: "1 medium",
    servingGrams: 50,
    season: ["hemanta", "shishira"]
  },
  {
    id: "bael",
    name: "Wood Apple (Bael)",
    nameHindi: "Bael",
    category: "fruits",
    ayurvedic: {
      rasa: ["kashaya", "madhura"],
      virya: "ushna",
      vipaka: "katu",
      doshaEffect: { vata: -1, pitta: 0, kapha: -1 },
      guna: ["laghu", "ruksha"]
    },
    nutrition: { calories: 137, protein: 1.8, carbs: 32, fat: 0.3, fiber: 2.9 },
    servingSize: "100g pulp",
    servingGrams: 100,
    season: ["grishma"]
  },
  {
    id: "grapes",
    name: "Grapes",
    nameHindi: "Angoor",
    category: "fruits",
    ayurvedic: {
      rasa: ["madhura", "amla"],
      virya: "sheeta",
      vipaka: "madhura",
      doshaEffect: { vata: -1, pitta: -1, kapha: 1 },
      guna: ["guru", "snigdha"]
    },
    nutrition: { calories: 69, protein: 0.7, carbs: 18, fat: 0.2, fiber: 0.9 },
    servingSize: "1 cup",
    servingGrams: 151,
    season: ["sharad", "hemanta"]
  },
  {
    id: "orange",
    name: "Orange",
    nameHindi: "Santra",
    category: "fruits",
    ayurvedic: {
      rasa: ["amla", "madhura"],
      virya: "ushna",
      vipaka: "amla",
      doshaEffect: { vata: -1, pitta: 1, kapha: -1 },
      guna: ["laghu", "snigdha"]
    },
    nutrition: { calories: 62, protein: 1.2, carbs: 15, fat: 0.2, fiber: 3.1, vitamins: { C: 70 } },
    servingSize: "1 medium",
    servingGrams: 131,
    season: ["hemanta", "shishira"]
  },
  {
    id: "guava",
    name: "Guava",
    nameHindi: "Amrood",
    category: "fruits",
    ayurvedic: {
      rasa: ["kashaya", "madhura"],
      virya: "sheeta",
      vipaka: "madhura",
      doshaEffect: { vata: 1, pitta: -1, kapha: -1 },
      guna: ["laghu", "ruksha"]
    },
    nutrition: { calories: 68, protein: 2.6, carbs: 14, fat: 1, fiber: 5.4, vitamins: { C: 228 } },
    servingSize: "1 medium",
    servingGrams: 100,
    season: ["hemanta", "shishira"]
  },
  {
    id: "watermelon",
    name: "Watermelon",
    nameHindi: "Tarbooz",
    category: "fruits",
    ayurvedic: {
      rasa: ["madhura"],
      virya: "sheeta",
      vipaka: "madhura",
      doshaEffect: { vata: -1, pitta: -2, kapha: 1 },
      guna: ["guru", "snigdha"]
    },
    nutrition: { calories: 30, protein: 0.6, carbs: 7.6, fat: 0.2, fiber: 0.4 },
    servingSize: "1 cup diced",
    servingGrams: 152,
    season: ["grishma"],
    contraindications: ["water_immediately_after"]
  },
  {
    id: "coconut_fresh",
    name: "Fresh Coconut",
    nameHindi: "Nariyal",
    category: "fruits",
    ayurvedic: {
      rasa: ["madhura"],
      virya: "sheeta",
      vipaka: "madhura",
      doshaEffect: { vata: -1, pitta: -2, kapha: 1 },
      guna: ["guru", "snigdha"]
    },
    nutrition: { calories: 354, protein: 3.3, carbs: 15, fat: 33, fiber: 9 },
    servingSize: "1 cup shredded",
    servingGrams: 80,
    season: ["grishma", "varsha"]
  },
  {
    id: "dates",
    name: "Dates (Khajoor)",
    nameHindi: "Khajoor",
    category: "fruits",
    ayurvedic: {
      rasa: ["madhura"],
      virya: "sheeta",
      vipaka: "madhura",
      doshaEffect: { vata: -2, pitta: -1, kapha: 1 },
      guna: ["guru", "snigdha"]
    },
    nutrition: { calories: 282, protein: 2.5, carbs: 75, fat: 0.4, fiber: 8, minerals: { potassium: 656, iron: 1 } },
    servingSize: "4 dates",
    servingGrams: 40,
    season: ["hemanta", "shishira"]
  },

  // ============ DAIRY (8 items) ============
  {
    id: "milk_cow",
    name: "Cow's Milk",
    nameHindi: "Gai ka Doodh",
    category: "dairy",
    ayurvedic: {
      rasa: ["madhura"],
      virya: "sheeta",
      vipaka: "madhura",
      doshaEffect: { vata: -2, pitta: -1, kapha: 1 },
      guna: ["guru", "snigdha"]
    },
    nutrition: { calories: 149, protein: 8, carbs: 12, fat: 8, fiber: 0, minerals: { calcium: 276 } },
    servingSize: "1 cup",
    servingGrams: 244,
    season: ["hemanta", "shishira"]
  },
  {
    id: "yogurt",
    name: "Yogurt (Curd)",
    nameHindi: "Dahi",
    category: "dairy",
    ayurvedic: {
      rasa: ["amla", "madhura"],
      virya: "ushna",
      vipaka: "amla",
      doshaEffect: { vata: -1, pitta: 1, kapha: 1 },
      guna: ["guru", "snigdha"]
    },
    nutrition: { calories: 149, protein: 8.5, carbs: 11.4, fat: 8, fiber: 0, minerals: { calcium: 296 } },
    servingSize: "1 cup",
    servingGrams: 245,
    season: ["grishma"],
    contraindications: ["night_consumption", "fever"]
  },
  {
    id: "paneer",
    name: "Paneer (Cottage Cheese)",
    nameHindi: "Paneer",
    category: "dairy",
    ayurvedic: {
      rasa: ["madhura", "amla"],
      virya: "sheeta",
      vipaka: "madhura",
      doshaEffect: { vata: -1, pitta: 0, kapha: 1 },
      guna: ["guru", "snigdha"]
    },
    nutrition: { calories: 265, protein: 18.3, carbs: 1.2, fat: 20.8, fiber: 0, minerals: { calcium: 208 } },
    servingSize: "100g",
    servingGrams: 100,
    season: ["hemanta", "shishira"]
  },
  {
    id: "buttermilk",
    name: "Buttermilk (Chaas)",
    nameHindi: "Chaas/Mattha",
    category: "dairy",
    ayurvedic: {
      rasa: ["amla", "kashaya"],
      virya: "ushna",
      vipaka: "madhura",
      doshaEffect: { vata: -1, pitta: 0, kapha: -1 },
      guna: ["laghu", "ruksha"]
    },
    nutrition: { calories: 40, protein: 3.3, carbs: 4.8, fat: 0.9, fiber: 0 },
    servingSize: "1 cup",
    servingGrams: 245,
    season: ["grishma", "varsha"]
  },
  {
    id: "lassi_sweet",
    name: "Sweet Lassi",
    nameHindi: "Meethi Lassi",
    category: "dairy",
    ayurvedic: {
      rasa: ["madhura", "amla"],
      virya: "sheeta",
      vipaka: "madhura",
      doshaEffect: { vata: -1, pitta: -1, kapha: 1 },
      guna: ["guru", "snigdha"]
    },
    nutrition: { calories: 175, protein: 6, carbs: 26, fat: 5, fiber: 0 },
    servingSize: "1 glass",
    servingGrams: 250,
    season: ["grishma"]
  },
  {
    id: "khoya",
    name: "Khoya (Mawa)",
    nameHindi: "Khoya/Mawa",
    category: "dairy",
    ayurvedic: {
      rasa: ["madhura"],
      virya: "sheeta",
      vipaka: "madhura",
      doshaEffect: { vata: -2, pitta: -1, kapha: 2 },
      guna: ["guru", "snigdha"]
    },
    nutrition: { calories: 421, protein: 15, carbs: 24, fat: 30, fiber: 0 },
    servingSize: "50g",
    servingGrams: 50,
    season: ["hemanta", "shishira"]
  },
  {
    id: "milk_buffalo",
    name: "Buffalo Milk",
    nameHindi: "Bhains ka Doodh",
    category: "dairy",
    ayurvedic: {
      rasa: ["madhura"],
      virya: "sheeta",
      vipaka: "madhura",
      doshaEffect: { vata: -2, pitta: -1, kapha: 2 },
      guna: ["guru", "snigdha"]
    },
    nutrition: { calories: 237, protein: 9, carbs: 12.6, fat: 17, fiber: 0, minerals: { calcium: 412 } },
    servingSize: "1 cup",
    servingGrams: 244,
    season: ["hemanta", "shishira"]
  },
  {
    id: "cheese",
    name: "Cheese",
    nameHindi: "Cheese",
    category: "dairy",
    ayurvedic: {
      rasa: ["madhura", "amla", "lavana"],
      virya: "ushna",
      vipaka: "amla",
      doshaEffect: { vata: -1, pitta: 1, kapha: 2 },
      guna: ["guru", "snigdha"]
    },
    nutrition: { calories: 402, protein: 25, carbs: 1.3, fat: 33, fiber: 0, minerals: { calcium: 721 } },
    servingSize: "30g",
    servingGrams: 30,
    season: ["hemanta", "shishira"]
  },

  // ============ OILS (6 items) ============
  {
    id: "ghee",
    name: "Ghee (Clarified Butter)",
    nameHindi: "Ghee",
    category: "oils",
    ayurvedic: {
      rasa: ["madhura"],
      virya: "sheeta",
      vipaka: "madhura",
      doshaEffect: { vata: -2, pitta: -1, kapha: 1 },
      guna: ["snigdha", "mridu"]
    },
    nutrition: { calories: 112, protein: 0, carbs: 0, fat: 12.7, fiber: 0 },
    servingSize: "1 tbsp",
    servingGrams: 14,
    season: ["hemanta", "shishira", "vasanta"]
  },
  {
    id: "mustard_oil",
    name: "Mustard Oil",
    nameHindi: "Sarson ka Tel",
    category: "oils",
    ayurvedic: {
      rasa: ["katu", "tikta"],
      virya: "ushna",
      vipaka: "katu",
      doshaEffect: { vata: -1, pitta: 1, kapha: -2 },
      guna: ["tikshna", "laghu"]
    },
    nutrition: { calories: 124, protein: 0, carbs: 0, fat: 14, fiber: 0 },
    servingSize: "1 tbsp",
    servingGrams: 14,
    season: ["hemanta", "shishira"]
  },
  {
    id: "coconut_oil",
    name: "Coconut Oil",
    nameHindi: "Nariyal Tel",
    category: "oils",
    ayurvedic: {
      rasa: ["madhura"],
      virya: "sheeta",
      vipaka: "madhura",
      doshaEffect: { vata: -1, pitta: -1, kapha: 1 },
      guna: ["snigdha", "guru"]
    },
    nutrition: { calories: 121, protein: 0, carbs: 0, fat: 13.5, fiber: 0 },
    servingSize: "1 tbsp",
    servingGrams: 14,
    season: ["grishma", "varsha"]
  },
  {
    id: "sesame_oil",
    name: "Sesame Oil (Til)",
    nameHindi: "Til ka Tel",
    category: "oils",
    ayurvedic: {
      rasa: ["madhura", "tikta", "kashaya"],
      virya: "ushna",
      vipaka: "madhura",
      doshaEffect: { vata: -2, pitta: 1, kapha: 0 },
      guna: ["snigdha", "guru"]
    },
    nutrition: { calories: 120, protein: 0, carbs: 0, fat: 14, fiber: 0 },
    servingSize: "1 tbsp",
    servingGrams: 14,
    season: ["hemanta", "shishira"]
  },
  {
    id: "groundnut_oil",
    name: "Groundnut Oil",
    nameHindi: "Moongfali ka Tel",
    category: "oils",
    ayurvedic: {
      rasa: ["madhura"],
      virya: "ushna",
      vipaka: "madhura",
      doshaEffect: { vata: -1, pitta: 1, kapha: 1 },
      guna: ["snigdha", "guru"]
    },
    nutrition: { calories: 119, protein: 0, carbs: 0, fat: 13.5, fiber: 0 },
    servingSize: "1 tbsp",
    servingGrams: 14,
    season: ["hemanta", "shishira"]
  },
  {
    id: "olive_oil",
    name: "Olive Oil",
    nameHindi: "Jaitoon ka Tel",
    category: "oils",
    ayurvedic: {
      rasa: ["madhura"],
      virya: "sheeta",
      vipaka: "madhura",
      doshaEffect: { vata: -1, pitta: -1, kapha: 1 },
      guna: ["snigdha", "guru"]
    },
    nutrition: { calories: 119, protein: 0, carbs: 0, fat: 13.5, fiber: 0 },
    servingSize: "1 tbsp",
    servingGrams: 14,
    season: ["varsha", "sharad"]
  },

  // ============ SPICES (12 items) ============
  {
    id: "turmeric",
    name: "Turmeric",
    nameHindi: "Haldi",
    category: "spices",
    ayurvedic: {
      rasa: ["tikta", "katu"],
      virya: "ushna",
      vipaka: "katu",
      doshaEffect: { vata: -1, pitta: 0, kapha: -2 },
      guna: ["laghu", "ruksha"]
    },
    nutrition: { calories: 9, protein: 0.3, carbs: 2, fat: 0.1, fiber: 0.5 },
    servingSize: "1 tsp",
    servingGrams: 3,
    season: ["varsha", "sharad"]
  },
  {
    id: "ginger",
    name: "Ginger (Fresh)",
    nameHindi: "Adrak",
    category: "spices",
    ayurvedic: {
      rasa: ["katu"],
      virya: "ushna",
      vipaka: "madhura",
      doshaEffect: { vata: -1, pitta: 1, kapha: -2 },
      guna: ["laghu", "snigdha"]
    },
    nutrition: { calories: 5, protein: 0.1, carbs: 1, fat: 0, fiber: 0.1 },
    servingSize: "1 tsp grated",
    servingGrams: 6,
    season: ["hemanta", "shishira", "varsha"]
  },
  {
    id: "cumin",
    name: "Cumin Seeds",
    nameHindi: "Jeera",
    category: "spices",
    ayurvedic: {
      rasa: ["katu"],
      virya: "ushna",
      vipaka: "katu",
      doshaEffect: { vata: -1, pitta: 0, kapha: -1 },
      guna: ["laghu", "ruksha"]
    },
    nutrition: { calories: 8, protein: 0.4, carbs: 0.9, fat: 0.5, fiber: 0.2 },
    servingSize: "1 tsp",
    servingGrams: 2,
    season: ["varsha", "sharad"]
  },
  {
    id: "coriander",
    name: "Coriander Seeds",
    nameHindi: "Dhania",
    category: "spices",
    ayurvedic: {
      rasa: ["katu", "tikta", "madhura"],
      virya: "sheeta",
      vipaka: "madhura",
      doshaEffect: { vata: -1, pitta: -1, kapha: -1 },
      guna: ["laghu", "snigdha"]
    },
    nutrition: { calories: 5, protein: 0.2, carbs: 0.9, fat: 0.3, fiber: 0.7 },
    servingSize: "1 tsp",
    servingGrams: 2,
    season: ["grishma", "sharad"]
  },
  {
    id: "black_pepper",
    name: "Black Pepper",
    nameHindi: "Kali Mirch",
    category: "spices",
    ayurvedic: {
      rasa: ["katu"],
      virya: "ushna",
      vipaka: "katu",
      doshaEffect: { vata: -1, pitta: 1, kapha: -2 },
      guna: ["laghu", "tikshna"]
    },
    nutrition: { calories: 6, protein: 0.2, carbs: 1.5, fat: 0.1, fiber: 0.6 },
    servingSize: "1 tsp",
    servingGrams: 2.3,
    season: ["hemanta", "shishira"]
  },
  {
    id: "ajwain",
    name: "Carom Seeds (Ajwain)",
    nameHindi: "Ajwain",
    category: "spices",
    ayurvedic: {
      rasa: ["katu", "tikta"],
      virya: "ushna",
      vipaka: "katu",
      doshaEffect: { vata: -2, pitta: 1, kapha: -2 },
      guna: ["laghu", "ruksha", "tikshna"]
    },
    nutrition: { calories: 21, protein: 0.9, carbs: 2.5, fat: 1.1, fiber: 1.8 },
    servingSize: "1 tsp",
    servingGrams: 5,
    season: ["hemanta", "shishira", "varsha"]
  },
  {
    id: "hing",
    name: "Asafoetida (Hing)",
    nameHindi: "Hing",
    category: "spices",
    ayurvedic: {
      rasa: ["katu"],
      virya: "ushna",
      vipaka: "katu",
      doshaEffect: { vata: -2, pitta: 1, kapha: -2 },
      guna: ["laghu", "tikshna"]
    },
    nutrition: { calories: 4, protein: 0, carbs: 1, fat: 0, fiber: 0 },
    servingSize: "1 pinch",
    servingGrams: 0.5,
    season: ["varsha", "sharad"]
  },
  {
    id: "methi_seeds",
    name: "Fenugreek Seeds",
    nameHindi: "Methi Dana",
    category: "spices",
    ayurvedic: {
      rasa: ["tikta", "katu"],
      virya: "ushna",
      vipaka: "katu",
      doshaEffect: { vata: -1, pitta: 1, kapha: -2 },
      guna: ["laghu", "snigdha"]
    },
    nutrition: { calories: 35, protein: 2.5, carbs: 6, fat: 0.7, fiber: 2.7 },
    servingSize: "1 tsp",
    servingGrams: 11,
    season: ["hemanta", "shishira"]
  },
  {
    id: "cinnamon",
    name: "Cinnamon",
    nameHindi: "Dalchini",
    category: "spices",
    ayurvedic: {
      rasa: ["katu", "tikta", "madhura"],
      virya: "ushna",
      vipaka: "katu",
      doshaEffect: { vata: -1, pitta: 1, kapha: -2 },
      guna: ["laghu", "ruksha", "tikshna"]
    },
    nutrition: { calories: 6, protein: 0.1, carbs: 2, fat: 0, fiber: 1.3 },
    servingSize: "1 tsp",
    servingGrams: 2.6,
    season: ["hemanta", "shishira"]
  },
  {
    id: "cardamom",
    name: "Green Cardamom",
    nameHindi: "Elaichi",
    category: "spices",
    ayurvedic: {
      rasa: ["katu", "madhura"],
      virya: "sheeta",
      vipaka: "madhura",
      doshaEffect: { vata: -1, pitta: -1, kapha: -1 },
      guna: ["laghu", "ruksha"]
    },
    nutrition: { calories: 6, protein: 0.2, carbs: 1.4, fat: 0.1, fiber: 0.6 },
    servingSize: "2 pods",
    servingGrams: 2,
    season: ["grishma", "sharad"]
  },
  {
    id: "clove",
    name: "Clove",
    nameHindi: "Laung",
    category: "spices",
    ayurvedic: {
      rasa: ["katu", "tikta"],
      virya: "sheeta",
      vipaka: "katu",
      doshaEffect: { vata: -1, pitta: -1, kapha: -1 },
      guna: ["laghu", "snigdha"]
    },
    nutrition: { calories: 6, protein: 0.1, carbs: 1.3, fat: 0.3, fiber: 0.7 },
    servingSize: "3 cloves",
    servingGrams: 2,
    season: ["hemanta", "shishira"]
  },
  {
    id: "fennel",
    name: "Fennel Seeds (Saunf)",
    nameHindi: "Saunf",
    category: "spices",
    ayurvedic: {
      rasa: ["madhura", "katu"],
      virya: "sheeta",
      vipaka: "madhura",
      doshaEffect: { vata: -1, pitta: -1, kapha: 0 },
      guna: ["laghu", "snigdha"]
    },
    nutrition: { calories: 7, protein: 0.3, carbs: 1, fat: 0.3, fiber: 0.8 },
    servingSize: "1 tsp",
    servingGrams: 2,
    season: ["grishma", "sharad"]
  },

  // ============ NUTS & SEEDS (8 items) ============
  {
    id: "almonds",
    name: "Almonds",
    nameHindi: "Badam",
    category: "nuts_seeds",
    ayurvedic: {
      rasa: ["madhura"],
      virya: "ushna",
      vipaka: "madhura",
      doshaEffect: { vata: -2, pitta: 1, kapha: 1 },
      guna: ["guru", "snigdha"]
    },
    nutrition: { calories: 164, protein: 6, carbs: 6, fat: 14, fiber: 3.5 },
    servingSize: "1 oz (23 almonds)",
    servingGrams: 28,
    season: ["hemanta", "shishira"]
  },
  {
    id: "cashews",
    name: "Cashews",
    nameHindi: "Kaju",
    category: "nuts_seeds",
    ayurvedic: {
      rasa: ["madhura"],
      virya: "ushna",
      vipaka: "madhura",
      doshaEffect: { vata: -1, pitta: 1, kapha: 1 },
      guna: ["guru", "snigdha"]
    },
    nutrition: { calories: 157, protein: 5, carbs: 9, fat: 12, fiber: 0.9 },
    servingSize: "1 oz",
    servingGrams: 28,
    season: ["hemanta", "shishira"]
  },
  {
    id: "walnuts",
    name: "Walnuts",
    nameHindi: "Akhrot",
    category: "nuts_seeds",
    ayurvedic: {
      rasa: ["madhura", "tikta"],
      virya: "ushna",
      vipaka: "madhura",
      doshaEffect: { vata: -1, pitta: 1, kapha: 1 },
      guna: ["guru", "snigdha"]
    },
    nutrition: { calories: 185, protein: 4.3, carbs: 4, fat: 18.5, fiber: 1.9 },
    servingSize: "1 oz",
    servingGrams: 28,
    season: ["hemanta", "shishira"]
  },
  {
    id: "peanuts",
    name: "Peanuts",
    nameHindi: "Moongfali",
    category: "nuts_seeds",
    ayurvedic: {
      rasa: ["madhura"],
      virya: "ushna",
      vipaka: "madhura",
      doshaEffect: { vata: -1, pitta: 1, kapha: 1 },
      guna: ["guru", "snigdha"]
    },
    nutrition: { calories: 161, protein: 7, carbs: 5, fat: 14, fiber: 2.4 },
    servingSize: "1 oz",
    servingGrams: 28,
    season: ["hemanta", "shishira"]
  },
  {
    id: "flaxseeds",
    name: "Flaxseeds (Alsi)",
    nameHindi: "Alsi",
    category: "nuts_seeds",
    ayurvedic: {
      rasa: ["madhura"],
      virya: "ushna",
      vipaka: "katu",
      doshaEffect: { vata: -1, pitta: 1, kapha: -1 },
      guna: ["guru", "snigdha"]
    },
    nutrition: { calories: 55, protein: 1.9, carbs: 3, fat: 4.3, fiber: 2.8 },
    servingSize: "1 tbsp",
    servingGrams: 10,
    season: ["hemanta", "shishira"]
  },
  {
    id: "sesame_seeds",
    name: "Sesame Seeds (Til)",
    nameHindi: "Til",
    category: "nuts_seeds",
    ayurvedic: {
      rasa: ["madhura", "tikta", "kashaya"],
      virya: "ushna",
      vipaka: "madhura",
      doshaEffect: { vata: -2, pitta: 1, kapha: 0 },
      guna: ["guru", "snigdha"]
    },
    nutrition: { calories: 52, protein: 1.6, carbs: 2.1, fat: 4.5, fiber: 1.1, minerals: { calcium: 88 } },
    servingSize: "1 tbsp",
    servingGrams: 9,
    season: ["hemanta", "shishira"]
  },
  {
    id: "chia_seeds",
    name: "Chia Seeds",
    nameHindi: "Chia Seeds",
    category: "nuts_seeds",
    ayurvedic: {
      rasa: ["madhura"],
      virya: "sheeta",
      vipaka: "madhura",
      doshaEffect: { vata: -1, pitta: -1, kapha: 0 },
      guna: ["guru", "snigdha"]
    },
    nutrition: { calories: 58, protein: 2, carbs: 5, fat: 3.7, fiber: 4.1 },
    servingSize: "1 tbsp",
    servingGrams: 12,
    season: ["grishma", "varsha"]
  },
  {
    id: "pumpkin_seeds",
    name: "Pumpkin Seeds",
    nameHindi: "Kaddu ke Beej",
    category: "nuts_seeds",
    ayurvedic: {
      rasa: ["madhura", "tikta"],
      virya: "ushna",
      vipaka: "madhura",
      doshaEffect: { vata: -1, pitta: 0, kapha: 0 },
      guna: ["laghu", "snigdha"]
    },
    nutrition: { calories: 158, protein: 9, carbs: 3, fat: 14, fiber: 1.7, minerals: { zinc: 2.2, iron: 2.5 } },
    servingSize: "1 oz",
    servingGrams: 28,
    season: ["sharad", "hemanta"]
  },

  // ============ SWEETS & SWEETENERS (5 items) ============
  {
    id: "honey",
    name: "Honey",
    nameHindi: "Shahad",
    category: "sweets",
    ayurvedic: {
      rasa: ["madhura", "kashaya"],
      virya: "sheeta",
      vipaka: "madhura",
      doshaEffect: { vata: 0, pitta: 0, kapha: -2 },
      guna: ["laghu", "ruksha"]
    },
    nutrition: { calories: 64, protein: 0.1, carbs: 17, fat: 0, fiber: 0 },
    servingSize: "1 tbsp",
    servingGrams: 21,
    season: ["vasanta", "hemanta"],
    contraindications: ["heated_honey", "ghee_equal_quantity"]
  },
  {
    id: "jaggery",
    name: "Jaggery (Gur)",
    nameHindi: "Gur",
    category: "sweets",
    ayurvedic: {
      rasa: ["madhura"],
      virya: "ushna",
      vipaka: "madhura",
      doshaEffect: { vata: -1, pitta: 1, kapha: 1 },
      guna: ["guru", "snigdha"]
    },
    nutrition: { calories: 383, protein: 0.4, carbs: 95, fat: 0.1, fiber: 0, minerals: { iron: 11, calcium: 80 } },
    servingSize: "1 tbsp",
    servingGrams: 20,
    season: ["hemanta", "shishira"]
  },
  {
    id: "mishri",
    name: "Rock Sugar (Mishri)",
    nameHindi: "Mishri",
    category: "sweets",
    ayurvedic: {
      rasa: ["madhura"],
      virya: "sheeta",
      vipaka: "madhura",
      doshaEffect: { vata: -1, pitta: -1, kapha: 1 },
      guna: ["laghu", "snigdha"]
    },
    nutrition: { calories: 389, protein: 0, carbs: 100, fat: 0, fiber: 0 },
    servingSize: "1 tbsp",
    servingGrams: 15,
    season: ["grishma", "sharad"]
  },
  {
    id: "coconut_sugar",
    name: "Coconut Sugar",
    nameHindi: "Nariyal Shakkar",
    category: "sweets",
    ayurvedic: {
      rasa: ["madhura"],
      virya: "sheeta",
      vipaka: "madhura",
      doshaEffect: { vata: -1, pitta: -1, kapha: 0 },
      guna: ["laghu", "snigdha"]
    },
    nutrition: { calories: 375, protein: 1, carbs: 94, fat: 0.5, fiber: 0 },
    servingSize: "1 tbsp",
    servingGrams: 15,
    season: ["varsha", "sharad"]
  },
  {
    id: "stevia",
    name: "Stevia",
    nameHindi: "Stevia",
    category: "sweets",
    ayurvedic: {
      rasa: ["madhura", "tikta"],
      virya: "sheeta",
      vipaka: "madhura",
      doshaEffect: { vata: 0, pitta: -1, kapha: -1 },
      guna: ["laghu", "ruksha"]
    },
    nutrition: { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 },
    servingSize: "1 packet",
    servingGrams: 1,
    season: ["grishma", "sharad"]
  },

  // ============ MEAT & SEAFOOD (6 items) ============
  {
    id: "chicken",
    name: "Chicken Breast",
    nameHindi: "Murgh",
    category: "meat",
    ayurvedic: {
      rasa: ["madhura"],
      virya: "ushna",
      vipaka: "madhura",
      doshaEffect: { vata: -1, pitta: 1, kapha: 1 },
      guna: ["guru", "snigdha"]
    },
    nutrition: { calories: 165, protein: 31, carbs: 0, fat: 3.6, fiber: 0 },
    servingSize: "100g cooked",
    servingGrams: 100,
    season: ["hemanta", "shishira"]
  },
  {
    id: "mutton",
    name: "Mutton (Goat)",
    nameHindi: "Mutton/Bakra",
    category: "meat",
    ayurvedic: {
      rasa: ["madhura"],
      virya: "ushna",
      vipaka: "madhura",
      doshaEffect: { vata: -2, pitta: 1, kapha: 1 },
      guna: ["guru", "snigdha"]
    },
    nutrition: { calories: 143, protein: 27, carbs: 0, fat: 3, fiber: 0, minerals: { iron: 2.8, zinc: 4.5 } },
    servingSize: "100g cooked",
    servingGrams: 100,
    season: ["hemanta", "shishira"]
  },
  {
    id: "egg",
    name: "Egg (Whole)",
    nameHindi: "Anda",
    category: "meat",
    ayurvedic: {
      rasa: ["madhura"],
      virya: "ushna",
      vipaka: "madhura",
      doshaEffect: { vata: -1, pitta: 1, kapha: 1 },
      guna: ["guru", "snigdha"]
    },
    nutrition: { calories: 78, protein: 6, carbs: 0.6, fat: 5, fiber: 0 },
    servingSize: "1 large",
    servingGrams: 50,
    season: ["hemanta", "shishira"]
  },
  {
    id: "fish_rohu",
    name: "Rohu Fish",
    nameHindi: "Rohu Machli",
    category: "seafood",
    ayurvedic: {
      rasa: ["madhura"],
      virya: "ushna",
      vipaka: "madhura",
      doshaEffect: { vata: -1, pitta: 1, kapha: 1 },
      guna: ["guru", "snigdha"]
    },
    nutrition: { calories: 97, protein: 17, carbs: 0, fat: 2.8, fiber: 0 },
    servingSize: "100g cooked",
    servingGrams: 100,
    season: ["hemanta", "shishira"],
    contraindications: ["milk_combination"]
  },
  {
    id: "prawns",
    name: "Prawns (Shrimp)",
    nameHindi: "Jhinga",
    category: "seafood",
    ayurvedic: {
      rasa: ["madhura", "lavana"],
      virya: "ushna",
      vipaka: "madhura",
      doshaEffect: { vata: -1, pitta: 1, kapha: 1 },
      guna: ["guru", "snigdha"]
    },
    nutrition: { calories: 85, protein: 20, carbs: 0, fat: 0.5, fiber: 0 },
    servingSize: "100g cooked",
    servingGrams: 100,
    season: ["hemanta", "shishira"],
    contraindications: ["milk_combination"]
  },
  {
    id: "fish_pomfret",
    name: "Pomfret Fish",
    nameHindi: "Pomfret",
    category: "seafood",
    ayurvedic: {
      rasa: ["madhura"],
      virya: "ushna",
      vipaka: "madhura",
      doshaEffect: { vata: -1, pitta: 1, kapha: 0 },
      guna: ["laghu", "snigdha"]
    },
    nutrition: { calories: 96, protein: 19, carbs: 0, fat: 2, fiber: 0 },
    servingSize: "100g cooked",
    servingGrams: 100,
    season: ["hemanta", "shishira"],
    contraindications: ["milk_combination"]
  },

  // ============ BEVERAGES (6 items) ============
  {
    id: "green_tea",
    name: "Green Tea",
    nameHindi: "Green Chai",
    category: "beverages",
    ayurvedic: {
      rasa: ["tikta", "kashaya"],
      virya: "sheeta",
      vipaka: "katu",
      doshaEffect: { vata: 1, pitta: -1, kapha: -1 },
      guna: ["laghu", "ruksha"]
    },
    nutrition: { calories: 2, protein: 0, carbs: 0, fat: 0, fiber: 0 },
    servingSize: "1 cup",
    servingGrams: 245,
    season: ["grishma", "sharad"]
  },
  {
    id: "coconut_water",
    name: "Coconut Water",
    nameHindi: "Nariyal Pani",
    category: "beverages",
    ayurvedic: {
      rasa: ["madhura"],
      virya: "sheeta",
      vipaka: "madhura",
      doshaEffect: { vata: -1, pitta: -2, kapha: 0 },
      guna: ["laghu", "snigdha"]
    },
    nutrition: { calories: 46, protein: 1.7, carbs: 9, fat: 0.5, fiber: 2.6, minerals: { potassium: 600 } },
    servingSize: "1 cup",
    servingGrams: 240,
    season: ["grishma"]
  },
  {
    id: "sugarcane_juice",
    name: "Sugarcane Juice",
    nameHindi: "Ganne ka Ras",
    category: "beverages",
    ayurvedic: {
      rasa: ["madhura"],
      virya: "sheeta",
      vipaka: "madhura",
      doshaEffect: { vata: -1, pitta: -2, kapha: 1 },
      guna: ["guru", "snigdha"]
    },
    nutrition: { calories: 269, protein: 0.3, carbs: 73, fat: 0.4, fiber: 0 },
    servingSize: "1 glass",
    servingGrams: 250,
    season: ["grishma"]
  },
  {
    id: "masala_chai",
    name: "Masala Chai",
    nameHindi: "Masala Chai",
    category: "beverages",
    ayurvedic: {
      rasa: ["katu", "tikta", "madhura"],
      virya: "ushna",
      vipaka: "katu",
      doshaEffect: { vata: -1, pitta: 1, kapha: -1 },
      guna: ["laghu", "tikshna"]
    },
    nutrition: { calories: 120, protein: 3, carbs: 15, fat: 5, fiber: 0 },
    servingSize: "1 cup",
    servingGrams: 200,
    season: ["hemanta", "shishira", "varsha"]
  },
  {
    id: "lemon_water",
    name: "Lemon Water (Nimbu Pani)",
    nameHindi: "Nimbu Pani",
    category: "beverages",
    ayurvedic: {
      rasa: ["amla", "madhura"],
      virya: "ushna",
      vipaka: "madhura",
      doshaEffect: { vata: -1, pitta: 0, kapha: -1 },
      guna: ["laghu", "snigdha"]
    },
    nutrition: { calories: 29, protein: 0.4, carbs: 9, fat: 0, fiber: 0.3, vitamins: { C: 21 } },
    servingSize: "1 glass",
    servingGrams: 250,
    season: ["grishma", "varsha"]
  },
  {
    id: "tulsi_tea",
    name: "Tulsi (Holy Basil) Tea",
    nameHindi: "Tulsi Chai",
    category: "beverages",
    ayurvedic: {
      rasa: ["katu", "tikta"],
      virya: "ushna",
      vipaka: "katu",
      doshaEffect: { vata: -1, pitta: 0, kapha: -2 },
      guna: ["laghu", "ruksha"]
    },
    nutrition: { calories: 2, protein: 0, carbs: 0, fat: 0, fiber: 0 },
    servingSize: "1 cup",
    servingGrams: 245,
    season: ["varsha", "hemanta", "shishira"]
  },
];

