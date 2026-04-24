import { Food } from '../types';

export const westernFoods: Food[] = [
  // ============ GRAINS (13 items) ============
  {
    id: "pasta_spaghetti",
    name: "Spaghetti Pasta",
    category: "grains",
    origin: "italian",
    ayurvedic: {
      rasa: ["madhura"],
      virya: "sheeta",
      vipaka: "madhura",
      doshaEffect: { vata: -1, pitta: -1, kapha: 2 },
      guna: ["guru", "snigdha"]
    },
    nutrition: { calories: 220, protein: 8, carbs: 43, fat: 1.3, fiber: 2.5 },
    servingSize: "1 cup cooked",
    servingGrams: 140,
    season: ["hemanta", "shishira"]
  },
  {
    id: "pasta_penne",
    name: "Penne Pasta",
    category: "grains",
    origin: "italian",
    ayurvedic: {
      rasa: ["madhura"],
      virya: "sheeta",
      vipaka: "madhura",
      doshaEffect: { vata: -1, pitta: -1, kapha: 2 },
      guna: ["guru", "snigdha"]
    },
    nutrition: { calories: 213, protein: 7.5, carbs: 42, fat: 1.2, fiber: 2.4 },
    servingSize: "1 cup cooked",
    servingGrams: 140,
    season: ["hemanta", "shishira"]
  },
  {
    id: "pasta_macaroni",
    name: "Macaroni",
    category: "grains",
    origin: "italian",
    ayurvedic: {
      rasa: ["madhura"],
      virya: "sheeta",
      vipaka: "madhura",
      doshaEffect: { vata: -1, pitta: -1, kapha: 2 },
      guna: ["guru", "snigdha"]
    },
    nutrition: { calories: 221, protein: 8.1, carbs: 43.2, fat: 1.3, fiber: 1.8 },
    servingSize: "1 cup cooked",
    servingGrams: 140,
    season: ["hemanta", "shishira"]
  },
  {
    id: "bread_sourdough",
    name: "Sourdough Bread",
    category: "grains",
    origin: "universal",
    ayurvedic: {
      rasa: ["madhura", "amla"],
      virya: "ushna",
      vipaka: "amla",
      doshaEffect: { vata: -1, pitta: 1, kapha: 1 },
      guna: ["guru", "snigdha"]
    },
    nutrition: { calories: 188, protein: 8, carbs: 37, fat: 1, fiber: 2, minerals: { iron: 2.5, selenium: 22 } },
    servingSize: "2 slices",
    servingGrams: 64,
    season: ["hemanta", "shishira"]
  },
  {
    id: "bread_baguette",
    name: "French Baguette",
    category: "grains",
    origin: "french",
    ayurvedic: {
      rasa: ["madhura"],
      virya: "sheeta",
      vipaka: "madhura",
      doshaEffect: { vata: -1, pitta: 0, kapha: 2 },
      guna: ["guru", "ruksha"]
    },
    nutrition: { calories: 185, protein: 7.5, carbs: 36, fat: 1.6, fiber: 1.6 },
    servingSize: "1/4 baguette",
    servingGrams: 68,
    season: ["hemanta", "shishira"]
  },
  {
    id: "bread_rye",
    name: "Rye Bread",
    category: "grains",
    origin: "german",
    ayurvedic: {
      rasa: ["madhura", "kashaya"],
      virya: "ushna",
      vipaka: "katu",
      doshaEffect: { vata: 0, pitta: 0, kapha: 0 },
      guna: ["guru", "ruksha"]
    },
    nutrition: { calories: 166, protein: 5.4, carbs: 31, fat: 2.1, fiber: 3.7, minerals: { iron: 1.5, manganese: 0.7 } },
    servingSize: "2 slices",
    servingGrams: 64,
    season: ["hemanta", "shishira"]
  },
  {
    id: "bread_croissant",
    name: "Croissant",
    category: "grains",
    origin: "french",
    ayurvedic: {
      rasa: ["madhura"],
      virya: "sheeta",
      vipaka: "madhura",
      doshaEffect: { vata: -1, pitta: 0, kapha: 2 },
      guna: ["guru", "snigdha"]
    },
    nutrition: { calories: 231, protein: 5, carbs: 26, fat: 12, fiber: 1.5 },
    servingSize: "1 croissant",
    servingGrams: 57,
    season: ["hemanta", "shishira"]
  },
  {
    id: "bread_ciabatta",
    name: "Ciabatta Bread",
    category: "grains",
    origin: "italian",
    ayurvedic: {
      rasa: ["madhura"],
      virya: "sheeta",
      vipaka: "madhura",
      doshaEffect: { vata: -1, pitta: 0, kapha: 2 },
      guna: ["guru", "snigdha"]
    },
    nutrition: { calories: 195, protein: 7, carbs: 38, fat: 2, fiber: 1.5 },
    servingSize: "1 slice",
    servingGrams: 70,
    season: ["hemanta", "shishira"]
  },
  {
    id: "oatmeal_western",
    name: "Oatmeal",
    category: "grains",
    origin: "british",
    ayurvedic: {
      rasa: ["madhura"],
      virya: "ushna",
      vipaka: "madhura",
      doshaEffect: { vata: -1, pitta: 0, kapha: 1 },
      guna: ["guru", "snigdha"]
    },
    nutrition: { calories: 154, protein: 5.4, carbs: 27, fat: 2.6, fiber: 4, minerals: { iron: 2, zinc: 1.5 } },
    servingSize: "1 cup cooked",
    servingGrams: 234,
    season: ["hemanta", "shishira"]
  },
  {
    id: "granola",
    name: "Granola",
    category: "grains",
    origin: "american",
    ayurvedic: {
      rasa: ["madhura"],
      virya: "ushna",
      vipaka: "madhura",
      doshaEffect: { vata: -1, pitta: 1, kapha: 1 },
      guna: ["guru", "snigdha", "ruksha"]
    },
    nutrition: { calories: 212, protein: 5, carbs: 34, fat: 7.5, fiber: 3, minerals: { iron: 1.6, magnesium: 45 } },
    servingSize: "1/2 cup",
    servingGrams: 55,
    season: ["hemanta", "shishira"]
  },
  {
    id: "cornbread",
    name: "Cornbread",
    category: "grains",
    origin: "american",
    ayurvedic: {
      rasa: ["madhura"],
      virya: "ushna",
      vipaka: "madhura",
      doshaEffect: { vata: -1, pitta: 1, kapha: 1 },
      guna: ["guru", "ruksha"]
    },
    nutrition: { calories: 198, protein: 4, carbs: 29, fat: 7, fiber: 1.4 },
    servingSize: "1 piece",
    servingGrams: 65,
    season: ["sharad", "hemanta"]
  },
  {
    id: "quinoa_western",
    name: "Quinoa",
    category: "grains",
    origin: "universal",
    ayurvedic: {
      rasa: ["madhura", "kashaya"],
      virya: "ushna",
      vipaka: "madhura",
      doshaEffect: { vata: 0, pitta: 0, kapha: -1 },
      guna: ["laghu", "ruksha"]
    },
    nutrition: { calories: 222, protein: 8.1, carbs: 39, fat: 3.5, fiber: 5.2, minerals: { iron: 2.8, magnesium: 118, phosphorus: 281 } },
    servingSize: "1 cup cooked",
    servingGrams: 185,
    season: ["vasanta", "grishma"]
  },
  {
    id: "couscous",
    name: "Couscous",
    category: "grains",
    origin: "universal",
    ayurvedic: {
      rasa: ["madhura"],
      virya: "sheeta",
      vipaka: "madhura",
      doshaEffect: { vata: -1, pitta: -1, kapha: 1 },
      guna: ["laghu", "ruksha"]
    },
    nutrition: { calories: 176, protein: 6, carbs: 36, fat: 0.3, fiber: 2.2 },
    servingSize: "1 cup cooked",
    servingGrams: 157,
    season: ["hemanta", "shishira"]
  },

  // ============ LEGUMES (6 items) ============
  {
    id: "beans_black",
    name: "Black Beans",
    category: "legumes",
    origin: "american",
    ayurvedic: {
      rasa: ["madhura", "kashaya"],
      virya: "sheeta",
      vipaka: "madhura",
      doshaEffect: { vata: 1, pitta: -1, kapha: 0 },
      guna: ["guru", "ruksha"]
    },
    nutrition: { calories: 227, protein: 15.2, carbs: 41, fat: 0.9, fiber: 15, minerals: { iron: 3.6, magnesium: 120, folate: 256 } },
    servingSize: "1 cup cooked",
    servingGrams: 172,
    season: ["hemanta", "shishira"]
  },
  {
    id: "beans_kidney",
    name: "Kidney Beans",
    category: "legumes",
    origin: "universal",
    ayurvedic: {
      rasa: ["madhura", "kashaya"],
      virya: "sheeta",
      vipaka: "madhura",
      doshaEffect: { vata: 1, pitta: -1, kapha: 0 },
      guna: ["guru", "ruksha"]
    },
    nutrition: { calories: 225, protein: 15.3, carbs: 40, fat: 0.9, fiber: 13.1, minerals: { iron: 3.9, potassium: 717 } },
    servingSize: "1 cup cooked",
    servingGrams: 177,
    season: ["hemanta", "shishira"]
  },
  {
    id: "beans_navy",
    name: "Navy Beans",
    category: "legumes",
    origin: "american",
    ayurvedic: {
      rasa: ["madhura", "kashaya"],
      virya: "sheeta",
      vipaka: "madhura",
      doshaEffect: { vata: 1, pitta: -1, kapha: 0 },
      guna: ["guru", "ruksha"]
    },
    nutrition: { calories: 255, protein: 15, carbs: 47, fat: 1.1, fiber: 19, minerals: { iron: 4.3, folate: 255 } },
    servingSize: "1 cup cooked",
    servingGrams: 182,
    season: ["hemanta", "shishira"]
  },
  {
    id: "beans_lima",
    name: "Lima Beans",
    category: "legumes",
    origin: "american",
    ayurvedic: {
      rasa: ["madhura", "kashaya"],
      virya: "sheeta",
      vipaka: "madhura",
      doshaEffect: { vata: 1, pitta: -1, kapha: 0 },
      guna: ["guru", "ruksha"]
    },
    nutrition: { calories: 216, protein: 14.7, carbs: 39, fat: 0.7, fiber: 13.2, minerals: { iron: 4.5, potassium: 955 } },
    servingSize: "1 cup cooked",
    servingGrams: 170,
    season: ["hemanta", "shishira"]
  },
  {
    id: "chickpeas_western",
    name: "Chickpeas",
    category: "legumes",
    origin: "universal",
    ayurvedic: {
      rasa: ["madhura", "kashaya"],
      virya: "sheeta",
      vipaka: "madhura",
      doshaEffect: { vata: 1, pitta: -1, kapha: 0 },
      guna: ["guru", "ruksha"]
    },
    nutrition: { calories: 269, protein: 14.5, carbs: 45, fat: 4.2, fiber: 12.5, minerals: { iron: 4.7, folate: 282 } },
    servingSize: "1 cup cooked",
    servingGrams: 164,
    season: ["hemanta", "shishira"]
  },
  {
    id: "lentils_western",
    name: "Lentils (Green/Brown)",
    category: "legumes",
    origin: "universal",
    ayurvedic: {
      rasa: ["madhura", "kashaya"],
      virya: "sheeta",
      vipaka: "madhura",
      doshaEffect: { vata: 1, pitta: -1, kapha: 0 },
      guna: ["guru", "ruksha"]
    },
    nutrition: { calories: 230, protein: 17.9, carbs: 40, fat: 0.8, fiber: 15.6, minerals: { iron: 6.6, folate: 358, potassium: 731 } },
    servingSize: "1 cup cooked",
    servingGrams: 198,
    season: ["hemanta", "shishira"]
  },

  // ============ VEGETABLES (14 items) ============
  {
    id: "broccoli",
    name: "Broccoli",
    category: "vegetables",
    origin: "italian",
    ayurvedic: {
      rasa: ["tikta", "kashaya"],
      virya: "sheeta",
      vipaka: "katu",
      doshaEffect: { vata: 1, pitta: -1, kapha: -1 },
      guna: ["laghu", "ruksha"]
    },
    nutrition: { calories: 55, protein: 3.7, carbs: 11, fat: 0.6, fiber: 5.1, vitamins: { C: 135, K: 245 }, minerals: { potassium: 457 } },
    servingSize: "1 cup chopped",
    servingGrams: 156,
    season: ["sharad", "hemanta"]
  },
  {
    id: "asparagus",
    name: "Asparagus",
    category: "vegetables",
    origin: "universal",
    ayurvedic: {
      rasa: ["madhura", "tikta"],
      virya: "sheeta",
      vipaka: "madhura",
      doshaEffect: { vata: 0, pitta: -1, kapha: -1 },
      guna: ["laghu", "snigdha"]
    },
    nutrition: { calories: 27, protein: 3, carbs: 5.2, fat: 0.2, fiber: 2.8, vitamins: { K: 70, A: 38 }, minerals: { folate: 70 } },
    servingSize: "6 spears",
    servingGrams: 134,
    season: ["vasanta"]
  },
  {
    id: "brussels_sprouts",
    name: "Brussels Sprouts",
    category: "vegetables",
    origin: "universal",
    ayurvedic: {
      rasa: ["tikta", "kashaya"],
      virya: "sheeta",
      vipaka: "katu",
      doshaEffect: { vata: 1, pitta: -1, kapha: -1 },
      guna: ["laghu", "ruksha"]
    },
    nutrition: { calories: 56, protein: 4, carbs: 11, fat: 0.8, fiber: 4.1, vitamins: { C: 125, K: 219 } },
    servingSize: "1 cup",
    servingGrams: 156,
    season: ["sharad", "hemanta"]
  },
  {
    id: "artichoke",
    name: "Artichoke",
    category: "vegetables",
    origin: "italian",
    ayurvedic: {
      rasa: ["tikta", "kashaya"],
      virya: "sheeta",
      vipaka: "katu",
      doshaEffect: { vata: 1, pitta: -1, kapha: -1 },
      guna: ["laghu", "ruksha"]
    },
    nutrition: { calories: 60, protein: 4.2, carbs: 13, fat: 0.2, fiber: 6.9, minerals: { magnesium: 77, potassium: 474, folate: 107 } },
    servingSize: "1 medium",
    servingGrams: 128,
    season: ["vasanta", "sharad"]
  },
  {
    id: "kale",
    name: "Kale",
    category: "vegetables",
    origin: "universal",
    ayurvedic: {
      rasa: ["tikta", "kashaya"],
      virya: "sheeta",
      vipaka: "katu",
      doshaEffect: { vata: 1, pitta: -1, kapha: -2 },
      guna: ["laghu", "ruksha"]
    },
    nutrition: { calories: 33, protein: 2.9, carbs: 6, fat: 0.6, fiber: 1.3, vitamins: { K: 547, A: 206, C: 80 }, minerals: { calcium: 94 } },
    servingSize: "1 cup chopped",
    servingGrams: 67,
    season: ["sharad", "hemanta", "shishira"]
  },
  {
    id: "zucchini",
    name: "Zucchini",
    category: "vegetables",
    origin: "italian",
    ayurvedic: {
      rasa: ["madhura"],
      virya: "sheeta",
      vipaka: "madhura",
      doshaEffect: { vata: 0, pitta: -1, kapha: 0 },
      guna: ["laghu", "snigdha"]
    },
    nutrition: { calories: 21, protein: 1.5, carbs: 3.9, fat: 0.4, fiber: 1.4, vitamins: { C: 22 }, minerals: { potassium: 324 } },
    servingSize: "1 medium",
    servingGrams: 196,
    season: ["grishma", "varsha"]
  },
  {
    id: "bell_pepper",
    name: "Bell Pepper",
    category: "vegetables",
    origin: "universal",
    ayurvedic: {
      rasa: ["madhura", "katu"],
      virya: "ushna",
      vipaka: "madhura",
      doshaEffect: { vata: -1, pitta: 1, kapha: -1 },
      guna: ["laghu", "ruksha"]
    },
    nutrition: { calories: 31, protein: 1, carbs: 6, fat: 0.3, fiber: 2.1, vitamins: { C: 152, A: 18 } },
    servingSize: "1 medium",
    servingGrams: 119,
    season: ["grishma", "varsha"]
  },
  {
    id: "corn_sweet",
    name: "Sweet Corn",
    category: "vegetables",
    origin: "american",
    ayurvedic: {
      rasa: ["madhura"],
      virya: "ushna",
      vipaka: "madhura",
      doshaEffect: { vata: -1, pitta: 0, kapha: 1 },
      guna: ["guru", "snigdha"]
    },
    nutrition: { calories: 96, protein: 3.4, carbs: 21, fat: 1.5, fiber: 2.4, vitamins: { B5: 0.7 }, minerals: { magnesium: 32 } },
    servingSize: "1 ear",
    servingGrams: 146,
    season: ["grishma", "varsha"]
  },
  {
    id: "celery",
    name: "Celery",
    category: "vegetables",
    origin: "universal",
    ayurvedic: {
      rasa: ["tikta", "kashaya"],
      virya: "sheeta",
      vipaka: "katu",
      doshaEffect: { vata: 1, pitta: -1, kapha: -1 },
      guna: ["laghu", "ruksha"]
    },
    nutrition: { calories: 16, protein: 0.7, carbs: 3, fat: 0.2, fiber: 1.6, vitamins: { K: 30 }, minerals: { potassium: 263 } },
    servingSize: "2 stalks",
    servingGrams: 110,
    season: ["grishma", "sharad"]
  },
  {
    id: "mushroom_portobello",
    name: "Portobello Mushroom",
    category: "vegetables",
    origin: "italian",
    ayurvedic: {
      rasa: ["madhura", "kashaya"],
      virya: "sheeta",
      vipaka: "katu",
      doshaEffect: { vata: 0, pitta: 0, kapha: -1 },
      guna: ["laghu", "ruksha"]
    },
    nutrition: { calories: 35, protein: 4, carbs: 5, fat: 0.5, fiber: 2.7, minerals: { selenium: 21, potassium: 521 } },
    servingSize: "1 cap",
    servingGrams: 121,
    season: ["sharad", "hemanta"]
  },
  {
    id: "sweet_potato_western",
    name: "Sweet Potato",
    category: "vegetables",
    origin: "american",
    ayurvedic: {
      rasa: ["madhura"],
      virya: "sheeta",
      vipaka: "madhura",
      doshaEffect: { vata: -1, pitta: -1, kapha: 1 },
      guna: ["guru", "snigdha"]
    },
    nutrition: { calories: 103, protein: 2.3, carbs: 24, fat: 0.1, fiber: 3.8, vitamins: { A: 438, C: 22 }, minerals: { potassium: 542 } },
    servingSize: "1 medium",
    servingGrams: 130,
    season: ["sharad", "hemanta"]
  },
  {
    id: "potato_western",
    name: "Potato",
    category: "vegetables",
    origin: "universal",
    ayurvedic: {
      rasa: ["madhura"],
      virya: "sheeta",
      vipaka: "madhura",
      doshaEffect: { vata: -1, pitta: 0, kapha: 1 },
      guna: ["guru", "snigdha"]
    },
    nutrition: { calories: 161, protein: 4.3, carbs: 37, fat: 0.2, fiber: 3.8, vitamins: { C: 28, B6: 0.5 }, minerals: { potassium: 926 } },
    servingSize: "1 medium",
    servingGrams: 213,
    season: ["hemanta", "shishira"]
  },
  {
    id: "beet",
    name: "Beet",
    category: "vegetables",
    origin: "universal",
    ayurvedic: {
      rasa: ["madhura"],
      virya: "ushna",
      vipaka: "madhura",
      doshaEffect: { vata: -1, pitta: 1, kapha: 0 },
      guna: ["guru", "snigdha"]
    },
    nutrition: { calories: 58, protein: 2.2, carbs: 13, fat: 0.2, fiber: 3.8, minerals: { folate: 148, manganese: 0.4, potassium: 442 } },
    servingSize: "1 cup",
    servingGrams: 136,
    season: ["sharad", "hemanta"]
  },
  {
    id: "mushroom_shiitake",
    name: "Shiitake Mushroom",
    category: "vegetables",
    origin: "universal",
    ayurvedic: {
      rasa: ["madhura", "kashaya"],
      virya: "sheeta",
      vipaka: "katu",
      doshaEffect: { vata: 0, pitta: -1, kapha: -1 },
      guna: ["laghu", "ruksha"]
    },
    nutrition: { calories: 81, protein: 2.3, carbs: 21, fat: 0.3, fiber: 3, vitamins: { D: 18 }, minerals: { selenium: 36, copper: 0.9 } },
    servingSize: "1 cup cooked",
    servingGrams: 145,
    season: ["sharad", "hemanta"]
  },

  // ============ FRUITS (12 items) ============
  {
    id: "blueberry",
    name: "Blueberries",
    category: "fruits",
    origin: "american",
    ayurvedic: {
      rasa: ["madhura", "kashaya"],
      virya: "sheeta",
      vipaka: "madhura",
      doshaEffect: { vata: 0, pitta: -1, kapha: -1 },
      guna: ["laghu", "ruksha"]
    },
    nutrition: { calories: 84, protein: 1.1, carbs: 21, fat: 0.5, fiber: 3.6, vitamins: { C: 14, K: 28 }, minerals: { manganese: 0.5 } },
    servingSize: "1 cup",
    servingGrams: 148,
    season: ["grishma"]
  },
  {
    id: "strawberry",
    name: "Strawberries",
    category: "fruits",
    origin: "universal",
    ayurvedic: {
      rasa: ["madhura", "amla"],
      virya: "sheeta",
      vipaka: "madhura",
      doshaEffect: { vata: 0, pitta: -1, kapha: 0 },
      guna: ["laghu", "snigdha"]
    },
    nutrition: { calories: 49, protein: 1, carbs: 12, fat: 0.5, fiber: 3, vitamins: { C: 89, folate: 36 }, minerals: { manganese: 0.6 } },
    servingSize: "1 cup",
    servingGrams: 152,
    season: ["vasanta", "grishma"]
  },
  {
    id: "raspberry",
    name: "Raspberries",
    category: "fruits",
    origin: "universal",
    ayurvedic: {
      rasa: ["madhura", "amla", "kashaya"],
      virya: "sheeta",
      vipaka: "madhura",
      doshaEffect: { vata: 0, pitta: -1, kapha: -1 },
      guna: ["laghu", "ruksha"]
    },
    nutrition: { calories: 64, protein: 1.5, carbs: 15, fat: 0.8, fiber: 8, vitamins: { C: 32 }, minerals: { manganese: 0.8 } },
    servingSize: "1 cup",
    servingGrams: 123,
    season: ["grishma"]
  },
  {
    id: "cranberry",
    name: "Cranberries",
    category: "fruits",
    origin: "american",
    ayurvedic: {
      rasa: ["amla", "kashaya"],
      virya: "sheeta",
      vipaka: "katu",
      doshaEffect: { vata: 1, pitta: 0, kapha: -1 },
      guna: ["laghu", "ruksha"]
    },
    nutrition: { calories: 46, protein: 0.4, carbs: 12, fat: 0.1, fiber: 4.6, vitamins: { C: 14, E: 1.2 } },
    servingSize: "1 cup",
    servingGrams: 100,
    season: ["sharad"]
  },
  {
    id: "cherry",
    name: "Cherries",
    category: "fruits",
    origin: "universal",
    ayurvedic: {
      rasa: ["madhura", "amla"],
      virya: "sheeta",
      vipaka: "madhura",
      doshaEffect: { vata: -1, pitta: -1, kapha: 0 },
      guna: ["laghu", "snigdha"]
    },
    nutrition: { calories: 87, protein: 1.5, carbs: 22, fat: 0.3, fiber: 2.9, vitamins: { C: 10, A: 12 }, minerals: { potassium: 306 } },
    servingSize: "1 cup",
    servingGrams: 138,
    season: ["grishma"]
  },
  {
    id: "peach",
    name: "Peach",
    category: "fruits",
    origin: "universal",
    ayurvedic: {
      rasa: ["madhura", "amla"],
      virya: "sheeta",
      vipaka: "madhura",
      doshaEffect: { vata: -1, pitta: -1, kapha: 0 },
      guna: ["laghu", "snigdha"]
    },
    nutrition: { calories: 59, protein: 1.4, carbs: 14, fat: 0.4, fiber: 2.3, vitamins: { C: 10, A: 11 }, minerals: { potassium: 285 } },
    servingSize: "1 medium",
    servingGrams: 150,
    season: ["grishma"]
  },
  {
    id: "pear",
    name: "Pear",
    category: "fruits",
    origin: "universal",
    ayurvedic: {
      rasa: ["madhura", "kashaya"],
      virya: "sheeta",
      vipaka: "madhura",
      doshaEffect: { vata: 0, pitta: -1, kapha: 0 },
      guna: ["guru", "snigdha"]
    },
    nutrition: { calories: 101, protein: 0.7, carbs: 27, fat: 0.2, fiber: 5.5, vitamins: { C: 8, K: 8 }, minerals: { potassium: 206 } },
    servingSize: "1 medium",
    servingGrams: 178,
    season: ["sharad"]
  },
  {
    id: "plum",
    name: "Plum",
    category: "fruits",
    origin: "universal",
    ayurvedic: {
      rasa: ["madhura", "amla"],
      virya: "sheeta",
      vipaka: "amla",
      doshaEffect: { vata: -1, pitta: 0, kapha: 0 },
      guna: ["laghu", "snigdha"]
    },
    nutrition: { calories: 46, protein: 0.7, carbs: 11, fat: 0.3, fiber: 1.4, vitamins: { C: 10, A: 5 }, minerals: { potassium: 157 } },
    servingSize: "1 medium",
    servingGrams: 66,
    season: ["grishma", "sharad"]
  },
  {
    id: "grape",
    name: "Grapes",
    category: "fruits",
    origin: "universal",
    ayurvedic: {
      rasa: ["madhura", "amla"],
      virya: "sheeta",
      vipaka: "madhura",
      doshaEffect: { vata: -1, pitta: -1, kapha: 1 },
      guna: ["guru", "snigdha"]
    },
    nutrition: { calories: 104, protein: 1.1, carbs: 27, fat: 0.2, fiber: 1.4, vitamins: { C: 16, K: 22 }, minerals: { potassium: 288 } },
    servingSize: "1 cup",
    servingGrams: 151,
    season: ["grishma", "sharad"]
  },
  {
    id: "avocado",
    name: "Avocado",
    category: "fruits",
    origin: "american",
    ayurvedic: {
      rasa: ["madhura"],
      virya: "sheeta",
      vipaka: "madhura",
      doshaEffect: { vata: -2, pitta: -1, kapha: 1 },
      guna: ["guru", "snigdha"]
    },
    nutrition: { calories: 234, protein: 2.9, carbs: 12, fat: 21, fiber: 10, vitamins: { K: 29, E: 3 }, minerals: { potassium: 690, folate: 121 } },
    servingSize: "1 medium",
    servingGrams: 146,
    season: ["vasanta", "grishma"]
  },
  {
    id: "grapefruit",
    name: "Grapefruit",
    category: "fruits",
    origin: "american",
    ayurvedic: {
      rasa: ["amla", "tikta"],
      virya: "sheeta",
      vipaka: "amla",
      doshaEffect: { vata: 0, pitta: 1, kapha: -1 },
      guna: ["laghu", "ruksha"]
    },
    nutrition: { calories: 52, protein: 1, carbs: 13, fat: 0.2, fiber: 2, vitamins: { C: 38, A: 28 } },
    servingSize: "1/2 fruit",
    servingGrams: 123,
    season: ["hemanta", "shishira"]
  },
  {
    id: "fig",
    name: "Fig",
    category: "fruits",
    origin: "greek",
    ayurvedic: {
      rasa: ["madhura"],
      virya: "sheeta",
      vipaka: "madhura",
      doshaEffect: { vata: -1, pitta: -1, kapha: 1 },
      guna: ["guru", "snigdha"]
    },
    nutrition: { calories: 74, protein: 0.8, carbs: 19, fat: 0.3, fiber: 2.9, minerals: { potassium: 232, calcium: 35, magnesium: 17 } },
    servingSize: "2 medium",
    servingGrams: 100,
    season: ["grishma", "sharad"]
  },

  // ============ DAIRY (9 items) ============
  {
    id: "cheese_cheddar",
    name: "Cheddar Cheese",
    category: "dairy",
    origin: "british",
    ayurvedic: {
      rasa: ["madhura", "amla", "lavana"],
      virya: "sheeta",
      vipaka: "amla",
      doshaEffect: { vata: -1, pitta: 1, kapha: 2 },
      guna: ["guru", "snigdha"]
    },
    nutrition: { calories: 113, protein: 7, carbs: 0.4, fat: 9.3, fiber: 0, minerals: { calcium: 200, phosphorus: 145 } },
    servingSize: "1 oz",
    servingGrams: 28,
    season: ["hemanta", "shishira"]
  },
  {
    id: "cheese_parmesan",
    name: "Parmesan Cheese",
    category: "dairy",
    origin: "italian",
    ayurvedic: {
      rasa: ["madhura", "amla", "lavana"],
      virya: "ushna",
      vipaka: "amla",
      doshaEffect: { vata: -1, pitta: 1, kapha: 2 },
      guna: ["guru", "snigdha", "ushna"]
    },
    nutrition: { calories: 110, protein: 10, carbs: 0.9, fat: 7.3, fiber: 0, minerals: { calcium: 336, phosphorus: 197, sodium: 390 } },
    servingSize: "1 oz",
    servingGrams: 28,
    season: ["hemanta", "shishira"]
  },
  {
    id: "cheese_mozzarella",
    name: "Mozzarella Cheese",
    category: "dairy",
    origin: "italian",
    ayurvedic: {
      rasa: ["madhura"],
      virya: "sheeta",
      vipaka: "madhura",
      doshaEffect: { vata: -1, pitta: 0, kapha: 2 },
      guna: ["guru", "snigdha"]
    },
    nutrition: { calories: 85, protein: 6.3, carbs: 0.7, fat: 6.3, fiber: 0, minerals: { calcium: 143, phosphorus: 105 } },
    servingSize: "1 oz",
    servingGrams: 28,
    season: ["hemanta", "shishira"]
  },
  {
    id: "cheese_brie",
    name: "Brie Cheese",
    category: "dairy",
    origin: "french",
    ayurvedic: {
      rasa: ["madhura", "amla"],
      virya: "sheeta",
      vipaka: "amla",
      doshaEffect: { vata: -1, pitta: 1, kapha: 2 },
      guna: ["guru", "snigdha"]
    },
    nutrition: { calories: 95, protein: 5.9, carbs: 0.1, fat: 7.9, fiber: 0, minerals: { calcium: 52, phosphorus: 53 } },
    servingSize: "1 oz",
    servingGrams: 28,
    season: ["hemanta", "shishira"]
  },
  {
    id: "cheese_cream",
    name: "Cream Cheese",
    category: "dairy",
    origin: "american",
    ayurvedic: {
      rasa: ["madhura", "amla"],
      virya: "sheeta",
      vipaka: "amla",
      doshaEffect: { vata: -1, pitta: 1, kapha: 2 },
      guna: ["guru", "snigdha"]
    },
    nutrition: { calories: 99, protein: 1.7, carbs: 1.6, fat: 9.8, fiber: 0, minerals: { calcium: 28 } },
    servingSize: "1 oz",
    servingGrams: 28,
    season: ["hemanta", "shishira"]
  },
  {
    id: "yogurt_greek",
    name: "Greek Yogurt",
    category: "dairy",
    origin: "greek",
    ayurvedic: {
      rasa: ["madhura", "amla"],
      virya: "sheeta",
      vipaka: "amla",
      doshaEffect: { vata: -1, pitta: 1, kapha: 1 },
      guna: ["guru", "snigdha"]
    },
    nutrition: { calories: 100, protein: 17, carbs: 6, fat: 0.7, fiber: 0, minerals: { calcium: 187, potassium: 240 } },
    servingSize: "3/4 cup",
    servingGrams: 170,
    season: ["grishma", "sharad"]
  },
  {
    id: "butter_western",
    name: "Butter",
    category: "dairy",
    origin: "universal",
    ayurvedic: {
      rasa: ["madhura"],
      virya: "sheeta",
      vipaka: "madhura",
      doshaEffect: { vata: -2, pitta: -1, kapha: 2 },
      guna: ["guru", "snigdha"]
    },
    nutrition: { calories: 102, protein: 0.1, carbs: 0, fat: 11.5, fiber: 0, vitamins: { A: 11 } },
    servingSize: "1 tbsp",
    servingGrams: 14,
    season: ["hemanta", "shishira"]
  },
  {
    id: "cream_heavy",
    name: "Heavy Cream",
    category: "dairy",
    origin: "universal",
    ayurvedic: {
      rasa: ["madhura"],
      virya: "sheeta",
      vipaka: "madhura",
      doshaEffect: { vata: -2, pitta: -1, kapha: 2 },
      guna: ["guru", "snigdha"]
    },
    nutrition: { calories: 51, protein: 0.4, carbs: 0.4, fat: 5.4, fiber: 0, vitamins: { A: 6 } },
    servingSize: "1 tbsp",
    servingGrams: 15,
    season: ["hemanta", "shishira"]
  },
  {
    id: "cottage_cheese_western",
    name: "Cottage Cheese",
    category: "dairy",
    origin: "american",
    ayurvedic: {
      rasa: ["madhura", "amla"],
      virya: "sheeta",
      vipaka: "amla",
      doshaEffect: { vata: -1, pitta: 0, kapha: 1 },
      guna: ["guru", "snigdha"]
    },
    nutrition: { calories: 206, protein: 28, carbs: 6, fat: 9, fiber: 0, minerals: { calcium: 187, sodium: 706 } },
    servingSize: "1 cup",
    servingGrams: 226,
    season: ["grishma", "sharad"]
  },

  // ============ MEAT (9 items) ============
  {
    id: "beef_steak",
    name: "Beef Steak (Sirloin)",
    category: "meat",
    origin: "american",
    ayurvedic: {
      rasa: ["madhura"],
      virya: "ushna",
      vipaka: "katu",
      doshaEffect: { vata: -2, pitta: 2, kapha: 1 },
      guna: ["guru", "snigdha", "ushna"]
    },
    nutrition: { calories: 271, protein: 26, carbs: 0, fat: 18, fiber: 0, minerals: { iron: 2.6, zinc: 4.8, B12: 2.5 } },
    servingSize: "6 oz cooked",
    servingGrams: 170,
    season: ["hemanta", "shishira"]
  },
  {
    id: "beef_ground",
    name: "Ground Beef (85% lean)",
    category: "meat",
    origin: "american",
    ayurvedic: {
      rasa: ["madhura"],
      virya: "ushna",
      vipaka: "katu",
      doshaEffect: { vata: -2, pitta: 2, kapha: 1 },
      guna: ["guru", "snigdha", "ushna"]
    },
    nutrition: { calories: 218, protein: 24, carbs: 0, fat: 13, fiber: 0, minerals: { iron: 2.4, zinc: 5.4 } },
    servingSize: "4 oz cooked",
    servingGrams: 113,
    season: ["hemanta", "shishira"]
  },
  {
    id: "pork_chop",
    name: "Pork Chop",
    category: "meat",
    origin: "universal",
    ayurvedic: {
      rasa: ["madhura"],
      virya: "ushna",
      vipaka: "katu",
      doshaEffect: { vata: -1, pitta: 2, kapha: 1 },
      guna: ["guru", "snigdha", "ushna"]
    },
    nutrition: { calories: 231, protein: 27, carbs: 0, fat: 13, fiber: 0, minerals: { zinc: 2.4, selenium: 33 } },
    servingSize: "1 chop",
    servingGrams: 137,
    season: ["hemanta", "shishira"]
  },
  {
    id: "bacon",
    name: "Bacon",
    category: "meat",
    origin: "american",
    ayurvedic: {
      rasa: ["madhura", "lavana"],
      virya: "ushna",
      vipaka: "katu",
      doshaEffect: { vata: -1, pitta: 2, kapha: 2 },
      guna: ["guru", "snigdha", "ushna"]
    },
    nutrition: { calories: 161, protein: 12, carbs: 0.6, fat: 12, fiber: 0, minerals: { sodium: 581, selenium: 17 } },
    servingSize: "3 slices",
    servingGrams: 34,
    season: ["hemanta", "shishira"]
  },
  {
    id: "ham",
    name: "Ham",
    category: "meat",
    origin: "universal",
    ayurvedic: {
      rasa: ["madhura", "lavana"],
      virya: "ushna",
      vipaka: "katu",
      doshaEffect: { vata: -1, pitta: 1, kapha: 1 },
      guna: ["guru", "snigdha"]
    },
    nutrition: { calories: 145, protein: 21, carbs: 1.5, fat: 5.5, fiber: 0, minerals: { sodium: 1275, zinc: 2 } },
    servingSize: "3 oz",
    servingGrams: 85,
    season: ["hemanta", "shishira"]
  },
  {
    id: "turkey_breast",
    name: "Turkey Breast",
    category: "meat",
    origin: "american",
    ayurvedic: {
      rasa: ["madhura"],
      virya: "ushna",
      vipaka: "katu",
      doshaEffect: { vata: -1, pitta: 1, kapha: 0 },
      guna: ["laghu", "ruksha"]
    },
    nutrition: { calories: 135, protein: 30, carbs: 0, fat: 1, fiber: 0, minerals: { selenium: 27, phosphorus: 217 } },
    servingSize: "4 oz cooked",
    servingGrams: 113,
    season: ["sharad", "hemanta"]
  },
  {
    id: "lamb_chop",
    name: "Lamb Chop",
    category: "meat",
    origin: "british",
    ayurvedic: {
      rasa: ["madhura"],
      virya: "ushna",
      vipaka: "katu",
      doshaEffect: { vata: -2, pitta: 2, kapha: 1 },
      guna: ["guru", "snigdha", "ushna"]
    },
    nutrition: { calories: 250, protein: 21, carbs: 0, fat: 18, fiber: 0, minerals: { iron: 1.7, zinc: 3.6, B12: 2.1 } },
    servingSize: "1 chop",
    servingGrams: 113,
    season: ["hemanta", "shishira"]
  },
  {
    id: "sausage_western",
    name: "Pork Sausage",
    category: "meat",
    origin: "german",
    ayurvedic: {
      rasa: ["madhura", "lavana", "katu"],
      virya: "ushna",
      vipaka: "katu",
      doshaEffect: { vata: -1, pitta: 2, kapha: 2 },
      guna: ["guru", "snigdha", "ushna"]
    },
    nutrition: { calories: 286, protein: 16, carbs: 1, fat: 24, fiber: 0, minerals: { sodium: 749, iron: 1.2 } },
    servingSize: "2 links",
    servingGrams: 84,
    season: ["hemanta", "shishira"]
  },
  {
    id: "chicken_breast_western",
    name: "Chicken Breast (Grilled)",
    category: "meat",
    origin: "universal",
    ayurvedic: {
      rasa: ["madhura"],
      virya: "ushna",
      vipaka: "katu",
      doshaEffect: { vata: -1, pitta: 1, kapha: 0 },
      guna: ["laghu", "snigdha"]
    },
    nutrition: { calories: 165, protein: 31, carbs: 0, fat: 3.6, fiber: 0, minerals: { selenium: 24, phosphorus: 228 } },
    servingSize: "4 oz cooked",
    servingGrams: 113,
    season: ["sharad", "hemanta"]
  },

  // ============ SEAFOOD (8 items) ============
  {
    id: "salmon_fillet",
    name: "Salmon Fillet",
    category: "seafood",
    origin: "universal",
    ayurvedic: {
      rasa: ["madhura"],
      virya: "ushna",
      vipaka: "katu",
      doshaEffect: { vata: -2, pitta: 1, kapha: 1 },
      guna: ["guru", "snigdha", "ushna"]
    },
    nutrition: { calories: 208, protein: 28, carbs: 0, fat: 10, fiber: 0, minerals: { selenium: 40 }, vitamins: { D: 14, B12: 4.8 } },
    servingSize: "4 oz cooked",
    servingGrams: 113,
    season: ["hemanta", "shishira"]
  },
  {
    id: "tuna_steak",
    name: "Tuna Steak",
    category: "seafood",
    origin: "universal",
    ayurvedic: {
      rasa: ["madhura"],
      virya: "ushna",
      vipaka: "katu",
      doshaEffect: { vata: -1, pitta: 1, kapha: 0 },
      guna: ["laghu", "snigdha"]
    },
    nutrition: { calories: 184, protein: 30, carbs: 0, fat: 6.3, fiber: 0, minerals: { selenium: 92 }, vitamins: { B12: 9.4, D: 2 } },
    servingSize: "4 oz cooked",
    servingGrams: 113,
    season: ["hemanta", "shishira"]
  },
  {
    id: "shrimp",
    name: "Shrimp",
    category: "seafood",
    origin: "universal",
    ayurvedic: {
      rasa: ["madhura", "lavana"],
      virya: "ushna",
      vipaka: "katu",
      doshaEffect: { vata: -1, pitta: 1, kapha: 0 },
      guna: ["laghu", "snigdha"]
    },
    nutrition: { calories: 99, protein: 24, carbs: 0.2, fat: 0.3, fiber: 0, minerals: { selenium: 48, zinc: 1.6, phosphorus: 347 } },
    servingSize: "4 oz cooked",
    servingGrams: 113,
    season: ["hemanta", "shishira"]
  },
  {
    id: "lobster",
    name: "Lobster",
    category: "seafood",
    origin: "american",
    ayurvedic: {
      rasa: ["madhura", "lavana"],
      virya: "ushna",
      vipaka: "katu",
      doshaEffect: { vata: -1, pitta: 1, kapha: 1 },
      guna: ["guru", "snigdha"]
    },
    nutrition: { calories: 129, protein: 27, carbs: 0, fat: 1.3, fiber: 0, minerals: { selenium: 73, zinc: 4.1, copper: 1.9 } },
    servingSize: "4 oz cooked",
    servingGrams: 113,
    season: ["hemanta", "shishira"]
  },
  {
    id: "cod",
    name: "Cod",
    category: "seafood",
    origin: "british",
    ayurvedic: {
      rasa: ["madhura"],
      virya: "ushna",
      vipaka: "katu",
      doshaEffect: { vata: -1, pitta: 1, kapha: 0 },
      guna: ["laghu", "snigdha"]
    },
    nutrition: { calories: 93, protein: 20, carbs: 0, fat: 0.8, fiber: 0, minerals: { selenium: 37, phosphorus: 221 }, vitamins: { B12: 1 } },
    servingSize: "4 oz cooked",
    servingGrams: 113,
    season: ["hemanta", "shishira"]
  },
  {
    id: "sardines",
    name: "Sardines (Canned)",
    category: "seafood",
    origin: "spanish",
    ayurvedic: {
      rasa: ["madhura", "lavana"],
      virya: "ushna",
      vipaka: "katu",
      doshaEffect: { vata: -2, pitta: 1, kapha: 1 },
      guna: ["guru", "snigdha", "ushna"]
    },
    nutrition: { calories: 208, protein: 25, carbs: 0, fat: 11, fiber: 0, minerals: { calcium: 382, iron: 2.9 }, vitamins: { D: 4.8, B12: 8.9 } },
    servingSize: "1 can",
    servingGrams: 92,
    season: ["hemanta", "shishira"]
  },
  {
    id: "oysters",
    name: "Oysters",
    category: "seafood",
    origin: "french",
    ayurvedic: {
      rasa: ["madhura", "lavana"],
      virya: "ushna",
      vipaka: "katu",
      doshaEffect: { vata: -1, pitta: 1, kapha: 1 },
      guna: ["guru", "snigdha"]
    },
    nutrition: { calories: 68, protein: 7, carbs: 3.9, fat: 2.5, fiber: 0, minerals: { zinc: 32, copper: 2.7, selenium: 63, iron: 6 } },
    servingSize: "6 medium",
    servingGrams: 84,
    season: ["hemanta", "shishira"]
  },
  {
    id: "mussels",
    name: "Mussels",
    category: "seafood",
    origin: "french",
    ayurvedic: {
      rasa: ["madhura", "lavana"],
      virya: "ushna",
      vipaka: "katu",
      doshaEffect: { vata: -1, pitta: 1, kapha: 1 },
      guna: ["guru", "snigdha"]
    },
    nutrition: { calories: 172, protein: 24, carbs: 7.4, fat: 4.5, fiber: 0, minerals: { iron: 6.7, selenium: 90, B12: 20.4, manganese: 6.8 } },
    servingSize: "3 oz cooked",
    servingGrams: 85,
    season: ["hemanta", "shishira"]
  },

  // ============ BEVERAGES (7 items) ============
  {
    id: "coffee_brewed",
    name: "Brewed Coffee",
    category: "beverages",
    origin: "universal",
    ayurvedic: {
      rasa: ["tikta", "katu"],
      virya: "ushna",
      vipaka: "katu",
      doshaEffect: { vata: 1, pitta: 1, kapha: -1 },
      guna: ["laghu", "ruksha", "ushna"]
    },
    nutrition: { calories: 2, protein: 0.3, carbs: 0, fat: 0, fiber: 0, minerals: { potassium: 116, magnesium: 7 } },
    servingSize: "1 cup",
    servingGrams: 237,
    season: ["hemanta", "shishira"]
  },
  {
    id: "espresso",
    name: "Espresso",
    category: "beverages",
    origin: "italian",
    ayurvedic: {
      rasa: ["tikta", "katu"],
      virya: "ushna",
      vipaka: "katu",
      doshaEffect: { vata: 2, pitta: 1, kapha: -2 },
      guna: ["laghu", "ruksha", "ushna"]
    },
    nutrition: { calories: 3, protein: 0.1, carbs: 0.5, fat: 0, fiber: 0, minerals: { potassium: 34, magnesium: 24 } },
    servingSize: "1 shot",
    servingGrams: 30,
    season: ["hemanta", "shishira"]
  },
  {
    id: "tea_english_black",
    name: "English Black Tea",
    category: "beverages",
    origin: "british",
    ayurvedic: {
      rasa: ["tikta", "kashaya"],
      virya: "ushna",
      vipaka: "katu",
      doshaEffect: { vata: 1, pitta: 1, kapha: -1 },
      guna: ["laghu", "ruksha"]
    },
    nutrition: { calories: 2, protein: 0, carbs: 0.7, fat: 0, fiber: 0, minerals: { potassium: 88, manganese: 0.5 } },
    servingSize: "1 cup",
    servingGrams: 237,
    season: ["hemanta", "shishira", "varsha"]
  },
  {
    id: "orange_juice",
    name: "Orange Juice",
    category: "beverages",
    origin: "american",
    ayurvedic: {
      rasa: ["madhura", "amla"],
      virya: "ushna",
      vipaka: "amla",
      doshaEffect: { vata: -1, pitta: 1, kapha: 1 },
      guna: ["laghu", "snigdha"]
    },
    nutrition: { calories: 112, protein: 1.7, carbs: 26, fat: 0.5, fiber: 0.5, vitamins: { C: 124 }, minerals: { potassium: 496, folate: 74 } },
    servingSize: "1 cup",
    servingGrams: 248,
    season: ["hemanta", "shishira"]
  },
  {
    id: "apple_cider",
    name: "Apple Cider",
    category: "beverages",
    origin: "american",
    ayurvedic: {
      rasa: ["madhura", "amla"],
      virya: "ushna",
      vipaka: "amla",
      doshaEffect: { vata: -1, pitta: 1, kapha: 1 },
      guna: ["laghu", "snigdha"]
    },
    nutrition: { calories: 117, protein: 0.2, carbs: 29, fat: 0.3, fiber: 0.5, minerals: { potassium: 230 } },
    servingSize: "1 cup",
    servingGrams: 248,
    season: ["sharad", "hemanta"]
  },
  {
    id: "hot_chocolate",
    name: "Hot Chocolate",
    category: "beverages",
    origin: "universal",
    ayurvedic: {
      rasa: ["madhura", "tikta"],
      virya: "ushna",
      vipaka: "madhura",
      doshaEffect: { vata: -1, pitta: 1, kapha: 1 },
      guna: ["guru", "snigdha"]
    },
    nutrition: { calories: 192, protein: 9, carbs: 27, fat: 6, fiber: 1.3, minerals: { calcium: 263, potassium: 480 } },
    servingSize: "1 cup",
    servingGrams: 250,
    season: ["hemanta", "shishira"]
  },
  {
    id: "kombucha",
    name: "Kombucha",
    category: "beverages",
    origin: "universal",
    ayurvedic: {
      rasa: ["amla", "madhura"],
      virya: "ushna",
      vipaka: "amla",
      doshaEffect: { vata: 0, pitta: 1, kapha: -1 },
      guna: ["laghu", "ruksha"]
    },
    nutrition: { calories: 30, protein: 0, carbs: 7, fat: 0, fiber: 0, vitamins: { B1: 0.02, B6: 0.02, B12: 0.04 } },
    servingSize: "1 cup",
    servingGrams: 240,
    season: ["vasanta", "grishma"]
  },

  // ============ SWEETS (9 items) ============
  {
    id: "chocolate_dark",
    name: "Dark Chocolate (70%)",
    category: "sweets",
    origin: "universal",
    ayurvedic: {
      rasa: ["tikta", "madhura"],
      virya: "ushna",
      vipaka: "katu",
      doshaEffect: { vata: 0, pitta: 1, kapha: 0 },
      guna: ["guru", "snigdha"]
    },
    nutrition: { calories: 170, protein: 2.2, carbs: 13, fat: 12, fiber: 3.1, minerals: { iron: 3.4, magnesium: 64, copper: 0.5 } },
    servingSize: "1 oz",
    servingGrams: 28,
    season: ["hemanta", "shishira"]
  },
  {
    id: "cheesecake",
    name: "Cheesecake",
    category: "sweets",
    origin: "american",
    ayurvedic: {
      rasa: ["madhura", "amla"],
      virya: "sheeta",
      vipaka: "madhura",
      doshaEffect: { vata: -1, pitta: 1, kapha: 2 },
      guna: ["guru", "snigdha"]
    },
    nutrition: { calories: 321, protein: 5.5, carbs: 26, fat: 22, fiber: 0.3, minerals: { calcium: 41 } },
    servingSize: "1 slice",
    servingGrams: 113,
    season: ["hemanta", "shishira"]
  },
  {
    id: "brownie",
    name: "Brownie",
    category: "sweets",
    origin: "american",
    ayurvedic: {
      rasa: ["madhura"],
      virya: "sheeta",
      vipaka: "madhura",
      doshaEffect: { vata: -1, pitta: 1, kapha: 2 },
      guna: ["guru", "snigdha"]
    },
    nutrition: { calories: 227, protein: 2.7, carbs: 36, fat: 9, fiber: 1.2 },
    servingSize: "1 piece",
    servingGrams: 56,
    season: ["hemanta", "shishira"]
  },
  {
    id: "apple_pie",
    name: "Apple Pie",
    category: "sweets",
    origin: "american",
    ayurvedic: {
      rasa: ["madhura", "amla"],
      virya: "sheeta",
      vipaka: "madhura",
      doshaEffect: { vata: -1, pitta: 0, kapha: 2 },
      guna: ["guru", "snigdha"]
    },
    nutrition: { calories: 296, protein: 2.4, carbs: 43, fat: 14, fiber: 1.6, minerals: { potassium: 80 } },
    servingSize: "1 slice",
    servingGrams: 125,
    season: ["sharad", "hemanta"]
  },
  {
    id: "ice_cream_vanilla",
    name: "Vanilla Ice Cream",
    category: "sweets",
    origin: "american",
    ayurvedic: {
      rasa: ["madhura"],
      virya: "sheeta",
      vipaka: "madhura",
      doshaEffect: { vata: -1, pitta: -1, kapha: 2 },
      guna: ["guru", "snigdha", "sheeta"]
    },
    nutrition: { calories: 207, protein: 3.5, carbs: 24, fat: 11, fiber: 0.7, minerals: { calcium: 128, potassium: 199 } },
    servingSize: "2/3 cup",
    servingGrams: 88,
    season: ["grishma"]
  },
  {
    id: "cookies_chocolate_chip",
    name: "Chocolate Chip Cookies",
    category: "sweets",
    origin: "american",
    ayurvedic: {
      rasa: ["madhura"],
      virya: "sheeta",
      vipaka: "madhura",
      doshaEffect: { vata: -1, pitta: 0, kapha: 2 },
      guna: ["guru", "snigdha"]
    },
    nutrition: { calories: 221, protein: 2, carbs: 30, fat: 11, fiber: 0.7 },
    servingSize: "2 cookies",
    servingGrams: 46,
    season: ["hemanta", "shishira"]
  },
  {
    id: "maple_syrup",
    name: "Maple Syrup",
    category: "sweets",
    origin: "american",
    ayurvedic: {
      rasa: ["madhura"],
      virya: "ushna",
      vipaka: "madhura",
      doshaEffect: { vata: -1, pitta: 0, kapha: 1 },
      guna: ["guru", "snigdha"]
    },
    nutrition: { calories: 52, protein: 0, carbs: 13, fat: 0, fiber: 0, minerals: { manganese: 0.7, zinc: 0.3 } },
    servingSize: "1 tbsp",
    servingGrams: 20,
    season: ["hemanta", "shishira"]
  },
  {
    id: "honey_western",
    name: "Honey",
    category: "sweets",
    origin: "universal",
    ayurvedic: {
      rasa: ["madhura", "kashaya"],
      virya: "ushna",
      vipaka: "katu",
      doshaEffect: { vata: 0, pitta: 0, kapha: -1 },
      guna: ["laghu", "ruksha"]
    },
    nutrition: { calories: 64, protein: 0.1, carbs: 17, fat: 0, fiber: 0 },
    servingSize: "1 tbsp",
    servingGrams: 21,
    season: ["vasanta", "hemanta", "shishira"]
  },
  {
    id: "pancake",
    name: "Pancake",
    category: "sweets",
    origin: "american",
    ayurvedic: {
      rasa: ["madhura"],
      virya: "sheeta",
      vipaka: "madhura",
      doshaEffect: { vata: -1, pitta: 0, kapha: 2 },
      guna: ["guru", "snigdha"]
    },
    nutrition: { calories: 175, protein: 5, carbs: 22, fat: 7, fiber: 0.8, minerals: { calcium: 83 } },
    servingSize: "2 medium",
    servingGrams: 77,
    season: ["hemanta", "shishira"]
  },

  // ============ OILS (3 items) ============
  {
    id: "oil_olive",
    name: "Extra Virgin Olive Oil",
    category: "oils",
    origin: "italian",
    ayurvedic: {
      rasa: ["madhura"],
      virya: "ushna",
      vipaka: "madhura",
      doshaEffect: { vata: -2, pitta: 0, kapha: 1 },
      guna: ["guru", "snigdha", "ushna"]
    },
    nutrition: { calories: 119, protein: 0, carbs: 0, fat: 14, fiber: 0, vitamins: { E: 1.9, K: 8.1 } },
    servingSize: "1 tbsp",
    servingGrams: 14,
    season: ["hemanta", "shishira", "vasanta"]
  },
  {
    id: "oil_canola",
    name: "Canola Oil",
    category: "oils",
    origin: "universal",
    ayurvedic: {
      rasa: ["madhura"],
      virya: "ushna",
      vipaka: "madhura",
      doshaEffect: { vata: -1, pitta: 0, kapha: 1 },
      guna: ["guru", "snigdha"]
    },
    nutrition: { calories: 124, protein: 0, carbs: 0, fat: 14, fiber: 0, vitamins: { E: 2.4, K: 10 } },
    servingSize: "1 tbsp",
    servingGrams: 14,
    season: ["hemanta", "shishira"]
  },
  {
    id: "oil_flaxseed",
    name: "Flaxseed Oil",
    category: "oils",
    origin: "universal",
    ayurvedic: {
      rasa: ["madhura"],
      virya: "ushna",
      vipaka: "madhura",
      doshaEffect: { vata: -2, pitta: 0, kapha: 1 },
      guna: ["guru", "snigdha"]
    },
    nutrition: { calories: 120, protein: 0, carbs: 0, fat: 14, fiber: 0, vitamins: { E: 0.1 } },
    servingSize: "1 tbsp",
    servingGrams: 14,
    season: ["hemanta", "shishira"]
  },

  // ============ NUTS & SEEDS (7 items) ============
  {
    id: "almonds_western",
    name: "Almonds",
    category: "nuts_seeds",
    origin: "universal",
    ayurvedic: {
      rasa: ["madhura"],
      virya: "ushna",
      vipaka: "madhura",
      doshaEffect: { vata: -2, pitta: 0, kapha: 1 },
      guna: ["guru", "snigdha"]
    },
    nutrition: { calories: 164, protein: 6, carbs: 6, fat: 14, fiber: 3.5, vitamins: { E: 7.3 }, minerals: { magnesium: 76, calcium: 76 } },
    servingSize: "1 oz (23 nuts)",
    servingGrams: 28,
    season: ["hemanta", "shishira"]
  },
  {
    id: "walnuts",
    name: "Walnuts",
    category: "nuts_seeds",
    origin: "universal",
    ayurvedic: {
      rasa: ["madhura"],
      virya: "ushna",
      vipaka: "madhura",
      doshaEffect: { vata: -2, pitta: 1, kapha: 1 },
      guna: ["guru", "snigdha", "ushna"]
    },
    nutrition: { calories: 185, protein: 4.3, carbs: 3.9, fat: 18.5, fiber: 1.9, minerals: { manganese: 1, copper: 0.5 } },
    servingSize: "1 oz (14 halves)",
    servingGrams: 28,
    season: ["hemanta", "shishira"]
  },
  {
    id: "pecans",
    name: "Pecans",
    category: "nuts_seeds",
    origin: "american",
    ayurvedic: {
      rasa: ["madhura"],
      virya: "ushna",
      vipaka: "madhura",
      doshaEffect: { vata: -2, pitta: 1, kapha: 1 },
      guna: ["guru", "snigdha"]
    },
    nutrition: { calories: 196, protein: 2.6, carbs: 3.9, fat: 20, fiber: 2.7, minerals: { manganese: 1.3, copper: 0.3, zinc: 1.3 } },
    servingSize: "1 oz (19 halves)",
    servingGrams: 28,
    season: ["hemanta", "shishira"]
  },
  {
    id: "chia_seeds",
    name: "Chia Seeds",
    category: "nuts_seeds",
    origin: "universal",
    ayurvedic: {
      rasa: ["madhura"],
      virya: "sheeta",
      vipaka: "madhura",
      doshaEffect: { vata: -1, pitta: -1, kapha: 0 },
      guna: ["guru", "snigdha"]
    },
    nutrition: { calories: 137, protein: 4.4, carbs: 12, fat: 8.7, fiber: 10.6, minerals: { calcium: 177, phosphorus: 265, manganese: 0.8 } },
    servingSize: "1 oz",
    servingGrams: 28,
    season: ["grishma", "vasanta"]
  },
  {
    id: "flaxseeds",
    name: "Flaxseeds",
    category: "nuts_seeds",
    origin: "universal",
    ayurvedic: {
      rasa: ["madhura"],
      virya: "ushna",
      vipaka: "katu",
      doshaEffect: { vata: -2, pitta: 0, kapha: 0 },
      guna: ["guru", "snigdha"]
    },
    nutrition: { calories: 150, protein: 5.1, carbs: 8.1, fat: 11.8, fiber: 7.6, minerals: { magnesium: 110, phosphorus: 180, manganese: 0.7 } },
    servingSize: "2 tbsp",
    servingGrams: 28,
    season: ["hemanta", "shishira"]
  },
  {
    id: "sunflower_seeds",
    name: "Sunflower Seeds",
    category: "nuts_seeds",
    origin: "universal",
    ayurvedic: {
      rasa: ["madhura"],
      virya: "ushna",
      vipaka: "madhura",
      doshaEffect: { vata: -1, pitta: 1, kapha: 1 },
      guna: ["guru", "snigdha"]
    },
    nutrition: { calories: 165, protein: 5.5, carbs: 6.5, fat: 14, fiber: 3.2, vitamins: { E: 7.4 }, minerals: { selenium: 22, magnesium: 36 } },
    servingSize: "1 oz",
    servingGrams: 28,
    season: ["hemanta", "shishira"]
  },
  {
    id: "pumpkin_seeds",
    name: "Pumpkin Seeds",
    category: "nuts_seeds",
    origin: "universal",
    ayurvedic: {
      rasa: ["madhura", "tikta"],
      virya: "ushna",
      vipaka: "katu",
      doshaEffect: { vata: -1, pitta: 0, kapha: 0 },
      guna: ["laghu", "snigdha"]
    },
    nutrition: { calories: 151, protein: 7, carbs: 5, fat: 13, fiber: 1.7, minerals: { magnesium: 156, zinc: 2.2, iron: 2.3 } },
    servingSize: "1 oz",
    servingGrams: 28,
    season: ["sharad", "hemanta"]
  },

  // ============ CONDIMENTS (6 items) ============
  {
    id: "ketchup",
    name: "Ketchup",
    category: "condiments",
    origin: "american",
    ayurvedic: {
      rasa: ["madhura", "amla"],
      virya: "ushna",
      vipaka: "amla",
      doshaEffect: { vata: -1, pitta: 1, kapha: 1 },
      guna: ["guru", "snigdha"]
    },
    nutrition: { calories: 20, protein: 0.2, carbs: 5.3, fat: 0, fiber: 0, minerals: { sodium: 160 } },
    servingSize: "1 tbsp",
    servingGrams: 17,
    season: ["hemanta", "shishira"]
  },
  {
    id: "mustard",
    name: "Yellow Mustard",
    category: "condiments",
    origin: "universal",
    ayurvedic: {
      rasa: ["katu", "tikta"],
      virya: "ushna",
      vipaka: "katu",
      doshaEffect: { vata: -1, pitta: 1, kapha: -1 },
      guna: ["laghu", "ruksha", "ushna"]
    },
    nutrition: { calories: 3, protein: 0.2, carbs: 0.3, fat: 0.2, fiber: 0.2, minerals: { sodium: 55 } },
    servingSize: "1 tsp",
    servingGrams: 5,
    season: ["hemanta", "shishira"]
  },
  {
    id: "mayonnaise",
    name: "Mayonnaise",
    category: "condiments",
    origin: "french",
    ayurvedic: {
      rasa: ["madhura", "amla"],
      virya: "sheeta",
      vipaka: "amla",
      doshaEffect: { vata: -1, pitta: 1, kapha: 2 },
      guna: ["guru", "snigdha"]
    },
    nutrition: { calories: 94, protein: 0.1, carbs: 0.1, fat: 10, fiber: 0, minerals: { sodium: 88 } },
    servingSize: "1 tbsp",
    servingGrams: 14,
    season: ["hemanta", "shishira"]
  },
  {
    id: "hot_sauce",
    name: "Hot Sauce",
    category: "condiments",
    origin: "american",
    ayurvedic: {
      rasa: ["katu"],
      virya: "ushna",
      vipaka: "katu",
      doshaEffect: { vata: -1, pitta: 2, kapha: -2 },
      guna: ["laghu", "ruksha", "ushna"]
    },
    nutrition: { calories: 1, protein: 0, carbs: 0, fat: 0, fiber: 0, minerals: { sodium: 124 } },
    servingSize: "1 tsp",
    servingGrams: 5,
    season: ["hemanta", "shishira", "varsha"]
  },
  {
    id: "bbq_sauce",
    name: "BBQ Sauce",
    category: "condiments",
    origin: "american",
    ayurvedic: {
      rasa: ["madhura", "katu", "amla"],
      virya: "ushna",
      vipaka: "katu",
      doshaEffect: { vata: -1, pitta: 1, kapha: 1 },
      guna: ["guru", "snigdha"]
    },
    nutrition: { calories: 29, protein: 0.1, carbs: 7, fat: 0.1, fiber: 0.2, minerals: { sodium: 175 } },
    servingSize: "1 tbsp",
    servingGrams: 17,
    season: ["hemanta", "shishira"]
  },
  {
    id: "vinaigrette",
    name: "Balsamic Vinaigrette",
    category: "condiments",
    origin: "italian",
    ayurvedic: {
      rasa: ["amla", "madhura"],
      virya: "ushna",
      vipaka: "amla",
      doshaEffect: { vata: -1, pitta: 1, kapha: -1 },
      guna: ["laghu", "snigdha"]
    },
    nutrition: { calories: 43, protein: 0, carbs: 3, fat: 3.5, fiber: 0, minerals: { sodium: 120 } },
    servingSize: "1 tbsp",
    servingGrams: 15,
    season: ["vasanta", "grishma"]
  },
];
