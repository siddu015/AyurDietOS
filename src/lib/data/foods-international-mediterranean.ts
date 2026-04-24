import { Food } from '../types';

export const mediterraneanFoods: Food[] = [
  // ============ GRAINS (9 items) ============
  {
    id: "grain_bulgur_wheat",
    name: "Bulgur Wheat",
    category: "grains",
    origin: "turkish",
    ayurvedic: {
      rasa: ["madhura"],
      virya: "sheeta",
      vipaka: "madhura",
      doshaEffect: { vata: -1, pitta: -1, kapha: 1 },
      guna: ["laghu", "ruksha"]
    },
    nutrition: { calories: 151, protein: 5.6, carbs: 34, fat: 0.4, fiber: 8.2, minerals: { iron: 1.7, magnesium: 58 } },
    servingSize: "1 cup cooked",
    servingGrams: 182,
    season: ["hemanta", "shishira"]
  },
  {
    id: "grain_freekeh",
    name: "Freekeh",
    category: "grains",
    origin: "lebanese",
    ayurvedic: {
      rasa: ["madhura"],
      virya: "sheeta",
      vipaka: "madhura",
      doshaEffect: { vata: -1, pitta: -1, kapha: 1 },
      guna: ["laghu", "ruksha"]
    },
    nutrition: { calories: 130, protein: 8, carbs: 24, fat: 0.5, fiber: 8, minerals: { iron: 1.5, zinc: 1.3 } },
    servingSize: "1 cup cooked",
    servingGrams: 160,
    season: ["hemanta", "shishira"]
  },
  {
    id: "grain_couscous",
    name: "Couscous",
    category: "grains",
    origin: "moroccan",
    ayurvedic: {
      rasa: ["madhura"],
      virya: "sheeta",
      vipaka: "madhura",
      doshaEffect: { vata: -1, pitta: -1, kapha: 1 },
      guna: ["laghu", "snigdha"]
    },
    nutrition: { calories: 176, protein: 6, carbs: 36, fat: 0.3, fiber: 2.2, minerals: { selenium: 43 } },
    servingSize: "1 cup cooked",
    servingGrams: 157,
    season: ["hemanta", "shishira"]
  },
  {
    id: "bread_pita",
    name: "Pita Bread",
    category: "grains",
    origin: "lebanese",
    ayurvedic: {
      rasa: ["madhura"],
      virya: "sheeta",
      vipaka: "madhura",
      doshaEffect: { vata: -1, pitta: 0, kapha: 1 },
      guna: ["guru", "snigdha"]
    },
    nutrition: { calories: 165, protein: 5.5, carbs: 33, fat: 0.7, fiber: 1.3 },
    servingSize: "1 pita (6.5 inch)",
    servingGrams: 60,
    season: ["hemanta", "shishira"]
  },
  {
    id: "bread_lavash",
    name: "Lavash",
    category: "grains",
    origin: "persian",
    ayurvedic: {
      rasa: ["madhura"],
      virya: "sheeta",
      vipaka: "madhura",
      doshaEffect: { vata: -1, pitta: 0, kapha: 1 },
      guna: ["laghu", "ruksha"]
    },
    nutrition: { calories: 120, protein: 4, carbs: 24, fat: 1, fiber: 1.1 },
    servingSize: "1 piece",
    servingGrams: 45,
    season: ["hemanta", "shishira"]
  },
  {
    id: "grain_injera",
    name: "Injera",
    category: "grains",
    origin: "ethiopian",
    ayurvedic: {
      rasa: ["madhura", "amla"],
      virya: "sheeta",
      vipaka: "amla",
      doshaEffect: { vata: -1, pitta: 1, kapha: 0 },
      guna: ["laghu", "snigdha"]
    },
    nutrition: { calories: 130, protein: 5, carbs: 25, fat: 1, fiber: 2.5, minerals: { iron: 5.4, calcium: 60 } },
    servingSize: "1 piece (6 inch)",
    servingGrams: 80,
    season: ["varsha", "sharad"]
  },
  {
    id: "grain_teff",
    name: "Teff",
    category: "grains",
    origin: "ethiopian",
    ayurvedic: {
      rasa: ["madhura"],
      virya: "sheeta",
      vipaka: "madhura",
      doshaEffect: { vata: -1, pitta: -1, kapha: 0 },
      guna: ["laghu", "ruksha"]
    },
    nutrition: { calories: 255, protein: 9.8, carbs: 50, fat: 1.8, fiber: 8, minerals: { iron: 7.6, calcium: 180, magnesium: 184 } },
    servingSize: "1 cup cooked",
    servingGrams: 252,
    season: ["hemanta", "shishira"]
  },
  {
    id: "grain_farro",
    name: "Farro",
    category: "grains",
    origin: "italian",
    ayurvedic: {
      rasa: ["madhura"],
      virya: "sheeta",
      vipaka: "madhura",
      doshaEffect: { vata: -1, pitta: -1, kapha: 1 },
      guna: ["guru", "snigdha"]
    },
    nutrition: { calories: 200, protein: 7, carbs: 40, fat: 1.5, fiber: 7, minerals: { magnesium: 60, iron: 2 } },
    servingSize: "1 cup cooked",
    servingGrams: 170,
    season: ["hemanta", "shishira"]
  },
  {
    id: "bread_flatbread_mediterranean",
    name: "Mediterranean Flatbread",
    category: "grains",
    origin: "greek",
    ayurvedic: {
      rasa: ["madhura"],
      virya: "sheeta",
      vipaka: "madhura",
      doshaEffect: { vata: -1, pitta: 0, kapha: 1 },
      guna: ["guru", "snigdha"]
    },
    nutrition: { calories: 150, protein: 4.5, carbs: 28, fat: 2.5, fiber: 1.5 },
    servingSize: "1 piece",
    servingGrams: 55,
    season: ["hemanta", "shishira"]
  },

  // ============ LEGUMES (5 items) ============
  {
    id: "hummus_classic",
    name: "Hummus",
    category: "legumes",
    origin: "lebanese",
    ayurvedic: {
      rasa: ["madhura", "kashaya"],
      virya: "sheeta",
      vipaka: "madhura",
      doshaEffect: { vata: -1, pitta: -1, kapha: 1 },
      guna: ["guru", "snigdha"]
    },
    nutrition: { calories: 166, protein: 7.9, carbs: 14.3, fat: 9.6, fiber: 6, minerals: { iron: 2.4, phosphorus: 176 } },
    servingSize: "100g",
    servingGrams: 100,
    season: ["hemanta", "shishira", "vasanta"]
  },
  {
    id: "legume_falafel",
    name: "Falafel",
    category: "legumes",
    origin: "egyptian",
    ayurvedic: {
      rasa: ["madhura", "kashaya", "katu"],
      virya: "ushna",
      vipaka: "katu",
      doshaEffect: { vata: -1, pitta: 1, kapha: 0 },
      guna: ["guru", "ruksha"]
    },
    nutrition: { calories: 333, protein: 13.3, carbs: 31.8, fat: 17.8, fiber: 4.9, minerals: { iron: 3.4, magnesium: 82 } },
    servingSize: "6 pieces (100g)",
    servingGrams: 100,
    season: ["hemanta", "shishira"]
  },
  {
    id: "legume_ful_medames",
    name: "Ful Medames",
    category: "legumes",
    origin: "egyptian",
    ayurvedic: {
      rasa: ["madhura", "kashaya"],
      virya: "sheeta",
      vipaka: "madhura",
      doshaEffect: { vata: 0, pitta: -1, kapha: 1 },
      guna: ["guru", "snigdha"]
    },
    nutrition: { calories: 187, protein: 13, carbs: 30, fat: 1, fiber: 9, minerals: { iron: 3.5, potassium: 460 } },
    servingSize: "1 cup cooked",
    servingGrams: 170,
    season: ["hemanta", "shishira"]
  },
  {
    id: "legume_white_beans_cannellini",
    name: "White Beans (Cannellini)",
    category: "legumes",
    origin: "italian",
    ayurvedic: {
      rasa: ["madhura", "kashaya"],
      virya: "sheeta",
      vipaka: "madhura",
      doshaEffect: { vata: 1, pitta: -1, kapha: 1 },
      guna: ["guru", "ruksha"]
    },
    nutrition: { calories: 225, protein: 15.4, carbs: 40, fat: 0.9, fiber: 11, minerals: { iron: 5.2, magnesium: 113 } },
    servingSize: "1 cup cooked",
    servingGrams: 179,
    season: ["hemanta", "shishira"]
  },
  {
    id: "legume_split_peas_mediterranean",
    name: "Split Peas (Fava)",
    category: "legumes",
    origin: "greek",
    ayurvedic: {
      rasa: ["madhura", "kashaya"],
      virya: "sheeta",
      vipaka: "madhura",
      doshaEffect: { vata: 1, pitta: -1, kapha: 0 },
      guna: ["laghu", "ruksha"]
    },
    nutrition: { calories: 231, protein: 16.3, carbs: 41, fat: 0.8, fiber: 16.3, minerals: { iron: 2.5, potassium: 710 } },
    servingSize: "1 cup cooked",
    servingGrams: 196,
    season: ["hemanta", "shishira"]
  },

  // ============ VEGETABLES (8 items) ============
  {
    id: "veg_eggplant_babaganoush",
    name: "Eggplant (Baba Ganoush Style)",
    category: "vegetables",
    origin: "lebanese",
    ayurvedic: {
      rasa: ["tikta", "kashaya"],
      virya: "ushna",
      vipaka: "katu",
      doshaEffect: { vata: 1, pitta: 1, kapha: -1 },
      guna: ["laghu", "ruksha"]
    },
    nutrition: { calories: 130, protein: 3, carbs: 12, fat: 8, fiber: 4, minerals: { potassium: 220, manganese: 0.4 } },
    servingSize: "100g",
    servingGrams: 100,
    season: ["grishma", "sharad"]
  },
  {
    id: "veg_artichoke",
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
    nutrition: { calories: 47, protein: 3.3, carbs: 10.5, fat: 0.2, fiber: 5.4, minerals: { magnesium: 60, potassium: 370 }, vitamins: { C: 11.7, K: 14.8 } },
    servingSize: "1 medium",
    servingGrams: 120,
    season: ["vasanta", "sharad"]
  },
  {
    id: "veg_sundried_tomato",
    name: "Sun-Dried Tomatoes",
    category: "vegetables",
    origin: "italian",
    ayurvedic: {
      rasa: ["amla", "madhura"],
      virya: "ushna",
      vipaka: "amla",
      doshaEffect: { vata: -1, pitta: 2, kapha: -1 },
      guna: ["laghu", "ruksha"]
    },
    nutrition: { calories: 258, protein: 14.1, carbs: 55.8, fat: 2.9, fiber: 12.3, minerals: { potassium: 3427, iron: 9.1 }, vitamins: { C: 39.2, K: 43.0 } },
    servingSize: "100g",
    servingGrams: 100,
    season: ["grishma", "sharad"]
  },
  {
    id: "veg_roasted_pepper",
    name: "Roasted Red Pepper",
    category: "vegetables",
    origin: "turkish",
    ayurvedic: {
      rasa: ["madhura", "katu"],
      virya: "ushna",
      vipaka: "madhura",
      doshaEffect: { vata: -1, pitta: 1, kapha: -1 },
      guna: ["laghu", "snigdha"]
    },
    nutrition: { calories: 26, protein: 0.9, carbs: 6, fat: 0.2, fiber: 1.7, vitamins: { C: 128, A: 3131 } },
    servingSize: "1 medium",
    servingGrams: 119,
    season: ["grishma", "sharad"]
  },
  {
    id: "veg_okra_mediterranean",
    name: "Okra (Bamia)",
    category: "vegetables",
    origin: "egyptian",
    ayurvedic: {
      rasa: ["madhura", "kashaya"],
      virya: "sheeta",
      vipaka: "madhura",
      doshaEffect: { vata: -1, pitta: -1, kapha: 0 },
      guna: ["laghu", "snigdha"]
    },
    nutrition: { calories: 33, protein: 1.9, carbs: 7, fat: 0.2, fiber: 3.2, minerals: { calcium: 82, magnesium: 57 }, vitamins: { C: 23, K: 31.3 } },
    servingSize: "1 cup (100g)",
    servingGrams: 100,
    season: ["grishma", "varsha"]
  },
  {
    id: "veg_grape_leaves",
    name: "Grape Leaves (Stuffed/Dolma)",
    category: "vegetables",
    origin: "turkish",
    ayurvedic: {
      rasa: ["kashaya", "tikta"],
      virya: "sheeta",
      vipaka: "katu",
      doshaEffect: { vata: 1, pitta: -1, kapha: -1 },
      guna: ["laghu", "ruksha"]
    },
    nutrition: { calories: 93, protein: 2, carbs: 15, fat: 3, fiber: 2, minerals: { calcium: 40, iron: 1.5 } },
    servingSize: "5 pieces",
    servingGrams: 100,
    season: ["grishma", "sharad"]
  },
  {
    id: "veg_olives_green",
    name: "Green Olives",
    category: "vegetables",
    origin: "greek",
    ayurvedic: {
      rasa: ["lavana", "tikta"],
      virya: "ushna",
      vipaka: "katu",
      doshaEffect: { vata: -1, pitta: 1, kapha: 1 },
      guna: ["guru", "snigdha"]
    },
    nutrition: { calories: 145, protein: 1, carbs: 3.8, fat: 15.3, fiber: 3.3, minerals: { sodium: 1556, iron: 0.5 } },
    servingSize: "100g",
    servingGrams: 100,
    season: ["sharad", "hemanta"]
  },
  {
    id: "veg_olives_kalamata",
    name: "Kalamata Olives",
    category: "vegetables",
    origin: "greek",
    ayurvedic: {
      rasa: ["lavana", "tikta", "amla"],
      virya: "ushna",
      vipaka: "katu",
      doshaEffect: { vata: -1, pitta: 1, kapha: 1 },
      guna: ["guru", "snigdha"]
    },
    nutrition: { calories: 235, protein: 1.6, carbs: 6, fat: 22, fiber: 3, minerals: { sodium: 1250, iron: 3.3 } },
    servingSize: "100g",
    servingGrams: 100,
    season: ["sharad", "hemanta"]
  },

  // ============ FRUITS (8 items) ============
  {
    id: "fruit_dates_medjool",
    name: "Medjool Dates",
    category: "fruits",
    origin: "egyptian",
    ayurvedic: {
      rasa: ["madhura"],
      virya: "sheeta",
      vipaka: "madhura",
      doshaEffect: { vata: -2, pitta: -1, kapha: 2 },
      guna: ["guru", "snigdha"]
    },
    nutrition: { calories: 277, protein: 1.8, carbs: 75, fat: 0.2, fiber: 6.7, minerals: { potassium: 696, magnesium: 54, copper: 0.4 } },
    servingSize: "100g (~4 dates)",
    servingGrams: 100,
    season: ["hemanta", "shishira"]
  },
  {
    id: "fruit_figs_fresh",
    name: "Fresh Figs",
    category: "fruits",
    origin: "turkish",
    ayurvedic: {
      rasa: ["madhura"],
      virya: "sheeta",
      vipaka: "madhura",
      doshaEffect: { vata: -2, pitta: -1, kapha: 1 },
      guna: ["guru", "snigdha"]
    },
    nutrition: { calories: 74, protein: 0.8, carbs: 19.2, fat: 0.3, fiber: 2.9, minerals: { potassium: 232, calcium: 35, magnesium: 17 } },
    servingSize: "100g (~2 medium)",
    servingGrams: 100,
    season: ["grishma", "sharad"]
  },
  {
    id: "fruit_pomegranate",
    name: "Pomegranate",
    category: "fruits",
    origin: "persian",
    ayurvedic: {
      rasa: ["madhura", "amla", "kashaya"],
      virya: "sheeta",
      vipaka: "madhura",
      doshaEffect: { vata: -1, pitta: -1, kapha: 0 },
      guna: ["laghu", "snigdha"]
    },
    nutrition: { calories: 83, protein: 1.7, carbs: 18.7, fat: 1.2, fiber: 4, minerals: { potassium: 236 }, vitamins: { C: 10.2, K: 16.4 } },
    servingSize: "100g seeds",
    servingGrams: 100,
    season: ["sharad", "hemanta"]
  },
  {
    id: "fruit_apricot_fresh",
    name: "Fresh Apricot",
    category: "fruits",
    origin: "turkish",
    ayurvedic: {
      rasa: ["madhura", "amla"],
      virya: "sheeta",
      vipaka: "madhura",
      doshaEffect: { vata: -1, pitta: 0, kapha: 0 },
      guna: ["laghu", "snigdha"]
    },
    nutrition: { calories: 48, protein: 1.4, carbs: 11, fat: 0.4, fiber: 2, minerals: { potassium: 259 }, vitamins: { A: 1926, C: 10 } },
    servingSize: "100g (~3 small)",
    servingGrams: 100,
    season: ["grishma", "vasanta"]
  },
  {
    id: "fruit_quince",
    name: "Quince",
    category: "fruits",
    origin: "persian",
    ayurvedic: {
      rasa: ["kashaya", "amla"],
      virya: "sheeta",
      vipaka: "katu",
      doshaEffect: { vata: 1, pitta: -1, kapha: -1 },
      guna: ["laghu", "ruksha"]
    },
    nutrition: { calories: 57, protein: 0.4, carbs: 15.3, fat: 0.1, fiber: 1.9, minerals: { potassium: 197, copper: 0.1 }, vitamins: { C: 15 } },
    servingSize: "1 medium",
    servingGrams: 92,
    season: ["sharad", "hemanta"]
  },
  {
    id: "fruit_blood_orange",
    name: "Blood Orange",
    category: "fruits",
    origin: "italian",
    ayurvedic: {
      rasa: ["madhura", "amla"],
      virya: "sheeta",
      vipaka: "madhura",
      doshaEffect: { vata: -1, pitta: 0, kapha: 0 },
      guna: ["laghu", "snigdha"]
    },
    nutrition: { calories: 50, protein: 1, carbs: 12, fat: 0.2, fiber: 2, vitamins: { C: 60, A: 400 } },
    servingSize: "1 medium",
    servingGrams: 130,
    season: ["hemanta", "shishira"]
  },
  {
    id: "fruit_prickly_pear",
    name: "Prickly Pear (Cactus Fruit)",
    category: "fruits",
    origin: "moroccan",
    ayurvedic: {
      rasa: ["madhura"],
      virya: "sheeta",
      vipaka: "madhura",
      doshaEffect: { vata: -1, pitta: -1, kapha: 0 },
      guna: ["laghu", "snigdha"]
    },
    nutrition: { calories: 41, protein: 0.7, carbs: 9.6, fat: 0.5, fiber: 3.6, minerals: { calcium: 56, magnesium: 85 }, vitamins: { C: 14 } },
    servingSize: "1 fruit",
    servingGrams: 103,
    season: ["grishma", "sharad"]
  },
  {
    id: "veg_capers",
    name: "Capers",
    category: "vegetables",
    origin: "italian",
    ayurvedic: {
      rasa: ["lavana", "tikta", "katu"],
      virya: "ushna",
      vipaka: "katu",
      doshaEffect: { vata: -1, pitta: 1, kapha: -1 },
      guna: ["laghu", "ruksha"]
    },
    nutrition: { calories: 23, protein: 2.4, carbs: 1.7, fat: 0.9, fiber: 3.2, minerals: { sodium: 2348, iron: 1.7 } },
    servingSize: "1 tbsp",
    servingGrams: 9,
    season: ["grishma", "sharad"]
  },

  // ============ DAIRY (5 items) ============
  {
    id: "dairy_feta_cheese",
    name: "Feta Cheese",
    category: "dairy",
    origin: "greek",
    ayurvedic: {
      rasa: ["amla", "lavana"],
      virya: "sheeta",
      vipaka: "amla",
      doshaEffect: { vata: -1, pitta: 1, kapha: 1 },
      guna: ["guru", "snigdha"]
    },
    nutrition: { calories: 264, protein: 14.2, carbs: 4.1, fat: 21.3, fiber: 0, minerals: { calcium: 493, sodium: 1116, phosphorus: 337 } },
    servingSize: "100g",
    servingGrams: 100,
    season: ["hemanta", "shishira"]
  },
  {
    id: "dairy_labneh",
    name: "Labneh (Strained Yogurt)",
    category: "dairy",
    origin: "lebanese",
    ayurvedic: {
      rasa: ["amla", "madhura"],
      virya: "sheeta",
      vipaka: "amla",
      doshaEffect: { vata: -1, pitta: 0, kapha: 1 },
      guna: ["guru", "snigdha"]
    },
    nutrition: { calories: 160, protein: 8, carbs: 6, fat: 12, fiber: 0, minerals: { calcium: 200, phosphorus: 150 } },
    servingSize: "100g",
    servingGrams: 100,
    season: ["grishma", "sharad"]
  },
  {
    id: "dairy_halloumi",
    name: "Halloumi Cheese",
    category: "dairy",
    origin: "greek",
    ayurvedic: {
      rasa: ["lavana", "madhura"],
      virya: "sheeta",
      vipaka: "amla",
      doshaEffect: { vata: -1, pitta: 1, kapha: 2 },
      guna: ["guru", "snigdha"]
    },
    nutrition: { calories: 321, protein: 25, carbs: 2.6, fat: 24, fiber: 0, minerals: { calcium: 700, sodium: 1230 } },
    servingSize: "100g",
    servingGrams: 100,
    season: ["hemanta", "shishira"]
  },
  {
    id: "dairy_goat_cheese",
    name: "Goat Cheese (Chèvre)",
    category: "dairy",
    origin: "greek",
    ayurvedic: {
      rasa: ["amla", "lavana"],
      virya: "sheeta",
      vipaka: "amla",
      doshaEffect: { vata: -1, pitta: 1, kapha: 1 },
      guna: ["guru", "snigdha"]
    },
    nutrition: { calories: 364, protein: 21.6, carbs: 0.1, fat: 29.8, fiber: 0, minerals: { calcium: 140, phosphorus: 256, sodium: 515 } },
    servingSize: "100g",
    servingGrams: 100,
    season: ["hemanta", "shishira"]
  },
  {
    id: "dairy_ayran",
    name: "Ayran (Yogurt Drink)",
    category: "dairy",
    origin: "turkish",
    ayurvedic: {
      rasa: ["amla", "lavana"],
      virya: "sheeta",
      vipaka: "amla",
      doshaEffect: { vata: -1, pitta: 0, kapha: 1 },
      guna: ["laghu", "snigdha"]
    },
    nutrition: { calories: 42, protein: 2.5, carbs: 3.5, fat: 2, fiber: 0, minerals: { calcium: 90, sodium: 160 } },
    servingSize: "1 cup",
    servingGrams: 240,
    season: ["grishma", "sharad"]
  },

  // ============ MEAT (5 items) ============
  {
    id: "meat_lamb_kebab",
    name: "Lamb Kebab",
    category: "meat",
    origin: "turkish",
    ayurvedic: {
      rasa: ["madhura"],
      virya: "ushna",
      vipaka: "madhura",
      doshaEffect: { vata: -2, pitta: 2, kapha: 1 },
      guna: ["guru", "snigdha"]
    },
    nutrition: { calories: 258, protein: 24, carbs: 0, fat: 17, fiber: 0, minerals: { iron: 2.3, zinc: 5.3, phosphorus: 190 } },
    servingSize: "100g",
    servingGrams: 100,
    season: ["hemanta", "shishira"]
  },
  {
    id: "meat_shawarma_chicken",
    name: "Chicken Shawarma",
    category: "meat",
    origin: "lebanese",
    ayurvedic: {
      rasa: ["madhura", "lavana"],
      virya: "ushna",
      vipaka: "madhura",
      doshaEffect: { vata: -1, pitta: 1, kapha: 0 },
      guna: ["guru", "snigdha"]
    },
    nutrition: { calories: 190, protein: 22, carbs: 4, fat: 9, fiber: 0.5, minerals: { sodium: 540, iron: 1.2 } },
    servingSize: "100g",
    servingGrams: 100,
    season: ["hemanta", "shishira"]
  },
  {
    id: "meat_kofta",
    name: "Kofta (Spiced Meat Patties)",
    category: "meat",
    origin: "turkish",
    ayurvedic: {
      rasa: ["madhura", "katu"],
      virya: "ushna",
      vipaka: "madhura",
      doshaEffect: { vata: -1, pitta: 2, kapha: 1 },
      guna: ["guru", "snigdha"]
    },
    nutrition: { calories: 270, protein: 18, carbs: 5, fat: 20, fiber: 0.5, minerals: { iron: 2.5, zinc: 4.8 } },
    servingSize: "2 patties (100g)",
    servingGrams: 100,
    season: ["hemanta", "shishira"]
  },
  {
    id: "meat_merguez_sausage",
    name: "Merguez Sausage",
    category: "meat",
    origin: "moroccan",
    ayurvedic: {
      rasa: ["madhura", "katu", "lavana"],
      virya: "ushna",
      vipaka: "katu",
      doshaEffect: { vata: -1, pitta: 2, kapha: 1 },
      guna: ["guru", "snigdha"]
    },
    nutrition: { calories: 295, protein: 16, carbs: 2, fat: 25, fiber: 0.5, minerals: { sodium: 850, iron: 2.8 } },
    servingSize: "2 sausages (100g)",
    servingGrams: 100,
    season: ["hemanta", "shishira"]
  },
  {
    id: "meat_souvlaki",
    name: "Souvlaki (Grilled Pork Skewer)",
    category: "meat",
    origin: "greek",
    ayurvedic: {
      rasa: ["madhura"],
      virya: "ushna",
      vipaka: "madhura",
      doshaEffect: { vata: -1, pitta: 1, kapha: 1 },
      guna: ["guru", "snigdha"]
    },
    nutrition: { calories: 220, protein: 26, carbs: 1, fat: 12, fiber: 0, minerals: { zinc: 2.5, phosphorus: 200 } },
    servingSize: "1 skewer (100g)",
    servingGrams: 100,
    season: ["hemanta", "shishira"]
  },

  // ============ SEAFOOD (4 items) ============
  {
    id: "seafood_grilled_octopus",
    name: "Grilled Octopus",
    category: "seafood",
    origin: "greek",
    ayurvedic: {
      rasa: ["madhura", "lavana"],
      virya: "sheeta",
      vipaka: "madhura",
      doshaEffect: { vata: -1, pitta: 0, kapha: 0 },
      guna: ["guru", "snigdha"]
    },
    nutrition: { calories: 164, protein: 30, carbs: 4.4, fat: 2.1, fiber: 0, minerals: { selenium: 44.8, iron: 9.5, zinc: 3 } },
    servingSize: "100g",
    servingGrams: 100,
    season: ["hemanta", "shishira"]
  },
  {
    id: "seafood_sardines_mediterranean",
    name: "Mediterranean Sardines",
    category: "seafood",
    origin: "italian",
    ayurvedic: {
      rasa: ["madhura", "lavana"],
      virya: "ushna",
      vipaka: "madhura",
      doshaEffect: { vata: -2, pitta: 1, kapha: 0 },
      guna: ["guru", "snigdha"]
    },
    nutrition: { calories: 208, protein: 24.6, carbs: 0, fat: 11.5, fiber: 0, minerals: { calcium: 382, selenium: 52.7, phosphorus: 490 } },
    servingSize: "1 can drained (100g)",
    servingGrams: 100,
    season: ["hemanta", "shishira"]
  },
  {
    id: "seafood_sea_bream",
    name: "Sea Bream (Dorade)",
    category: "seafood",
    origin: "greek",
    ayurvedic: {
      rasa: ["madhura"],
      virya: "sheeta",
      vipaka: "madhura",
      doshaEffect: { vata: -1, pitta: 0, kapha: 0 },
      guna: ["laghu", "snigdha"]
    },
    nutrition: { calories: 135, protein: 26.4, carbs: 0, fat: 2.9, fiber: 0, minerals: { selenium: 36.5, phosphorus: 220 } },
    servingSize: "1 fillet (100g)",
    servingGrams: 100,
    season: ["hemanta", "shishira"]
  },
  {
    id: "seafood_calamari",
    name: "Calamari (Fried Squid)",
    category: "seafood",
    origin: "italian",
    ayurvedic: {
      rasa: ["madhura", "lavana"],
      virya: "sheeta",
      vipaka: "madhura",
      doshaEffect: { vata: -1, pitta: 1, kapha: 1 },
      guna: ["guru", "snigdha"]
    },
    nutrition: { calories: 175, protein: 18, carbs: 7.8, fat: 7.5, fiber: 0, minerals: { selenium: 44.8, phosphorus: 213, zinc: 1.8 } },
    servingSize: "100g",
    servingGrams: 100,
    season: ["hemanta", "shishira"]
  },

  // ============ SPICES (8 items) ============
  {
    id: "spice_zaatar",
    name: "Za'atar Blend",
    category: "spices",
    origin: "lebanese",
    ayurvedic: {
      rasa: ["katu", "tikta"],
      virya: "ushna",
      vipaka: "katu",
      doshaEffect: { vata: -1, pitta: 1, kapha: -2 },
      guna: ["laghu", "ruksha"]
    },
    nutrition: { calories: 276, protein: 9, carbs: 42, fat: 7.4, fiber: 18, minerals: { iron: 30, calcium: 690, manganese: 3.4 } },
    servingSize: "1 tbsp",
    servingGrams: 5,
    season: ["hemanta", "shishira", "vasanta"]
  },
  {
    id: "spice_sumac",
    name: "Sumac",
    category: "spices",
    origin: "lebanese",
    ayurvedic: {
      rasa: ["amla", "kashaya"],
      virya: "sheeta",
      vipaka: "katu",
      doshaEffect: { vata: 0, pitta: -1, kapha: -1 },
      guna: ["laghu", "ruksha"]
    },
    nutrition: { calories: 239, protein: 5, carbs: 44, fat: 8.9, fiber: 15, minerals: { potassium: 540 } },
    servingSize: "1 tbsp",
    servingGrams: 5,
    season: ["grishma", "sharad"]
  },
  {
    id: "spice_harissa_dry",
    name: "Harissa Spice Mix",
    category: "spices",
    origin: "moroccan",
    ayurvedic: {
      rasa: ["katu", "tikta"],
      virya: "ushna",
      vipaka: "katu",
      doshaEffect: { vata: -1, pitta: 2, kapha: -2 },
      guna: ["laghu", "ruksha"]
    },
    nutrition: { calories: 282, protein: 12, carbs: 50, fat: 6, fiber: 25, minerals: { iron: 8, potassium: 500 }, vitamins: { A: 4000 } },
    servingSize: "1 tsp",
    servingGrams: 3,
    season: ["hemanta", "shishira"]
  },
  {
    id: "spice_ras_el_hanout",
    name: "Ras el Hanout",
    category: "spices",
    origin: "moroccan",
    ayurvedic: {
      rasa: ["katu", "tikta", "madhura"],
      virya: "ushna",
      vipaka: "katu",
      doshaEffect: { vata: -2, pitta: 1, kapha: -2 },
      guna: ["laghu", "ruksha"]
    },
    nutrition: { calories: 250, protein: 8, carbs: 45, fat: 7, fiber: 14, minerals: { iron: 15, manganese: 5 } },
    servingSize: "1 tsp",
    servingGrams: 3,
    season: ["hemanta", "shishira"]
  },
  {
    id: "spice_berbere",
    name: "Berbere Spice Blend",
    category: "spices",
    origin: "ethiopian",
    ayurvedic: {
      rasa: ["katu", "tikta"],
      virya: "ushna",
      vipaka: "katu",
      doshaEffect: { vata: -1, pitta: 2, kapha: -2 },
      guna: ["laghu", "ruksha"]
    },
    nutrition: { calories: 270, protein: 10, carbs: 48, fat: 6, fiber: 20, minerals: { iron: 16, calcium: 200 }, vitamins: { A: 5000 } },
    servingSize: "1 tsp",
    servingGrams: 3,
    season: ["hemanta", "shishira"]
  },
  {
    id: "spice_saffron",
    name: "Saffron",
    category: "spices",
    origin: "persian",
    ayurvedic: {
      rasa: ["tikta", "katu", "madhura"],
      virya: "ushna",
      vipaka: "madhura",
      doshaEffect: { vata: -1, pitta: 0, kapha: -1 },
      guna: ["laghu", "snigdha"]
    },
    nutrition: { calories: 310, protein: 11.4, carbs: 65, fat: 5.9, fiber: 3.9, minerals: { iron: 11.1, manganese: 28.4, magnesium: 264 } },
    servingSize: "1 pinch (0.1g)",
    servingGrams: 0.1,
    season: ["hemanta", "shishira", "vasanta"]
  },
  {
    id: "spice_nigella_seeds",
    name: "Nigella Seeds (Black Cumin)",
    category: "spices",
    origin: "egyptian",
    ayurvedic: {
      rasa: ["katu", "tikta"],
      virya: "ushna",
      vipaka: "katu",
      doshaEffect: { vata: -1, pitta: 1, kapha: -2 },
      guna: ["laghu", "ruksha"]
    },
    nutrition: { calories: 345, protein: 16, carbs: 44, fat: 15, fiber: 10, minerals: { iron: 7.6, calcium: 570 } },
    servingSize: "1 tsp",
    servingGrams: 3,
    season: ["hemanta", "shishira"]
  },
  {
    id: "spice_baharat",
    name: "Baharat Spice Mix",
    category: "spices",
    origin: "lebanese",
    ayurvedic: {
      rasa: ["katu", "tikta", "madhura"],
      virya: "ushna",
      vipaka: "katu",
      doshaEffect: { vata: -2, pitta: 1, kapha: -2 },
      guna: ["laghu", "ruksha"]
    },
    nutrition: { calories: 260, protein: 9, carbs: 44, fat: 8, fiber: 16, minerals: { iron: 12, manganese: 4 } },
    servingSize: "1 tsp",
    servingGrams: 3,
    season: ["hemanta", "shishira"]
  },

  // ============ OILS (3 items) ============
  {
    id: "oil_olive_extra_virgin",
    name: "Extra Virgin Olive Oil",
    category: "oils",
    origin: "greek",
    ayurvedic: {
      rasa: ["madhura"],
      virya: "sheeta",
      vipaka: "madhura",
      doshaEffect: { vata: -2, pitta: -1, kapha: 1 },
      guna: ["guru", "snigdha"]
    },
    nutrition: { calories: 884, protein: 0, carbs: 0, fat: 100, fiber: 0, vitamins: { E: 14.4, K: 60.2 } },
    servingSize: "1 tbsp",
    servingGrams: 14,
    season: ["hemanta", "shishira", "vasanta"]
  },
  {
    id: "oil_tahini",
    name: "Tahini (Sesame Paste)",
    category: "oils",
    origin: "lebanese",
    ayurvedic: {
      rasa: ["madhura", "tikta"],
      virya: "ushna",
      vipaka: "madhura",
      doshaEffect: { vata: -2, pitta: 1, kapha: 1 },
      guna: ["guru", "snigdha"]
    },
    nutrition: { calories: 595, protein: 17, carbs: 21.2, fat: 53.8, fiber: 9.3, minerals: { calcium: 426, iron: 8.9, phosphorus: 732, zinc: 4.6 } },
    servingSize: "2 tbsp",
    servingGrams: 30,
    season: ["hemanta", "shishira"]
  },
  {
    id: "oil_argan",
    name: "Argan Oil",
    category: "oils",
    origin: "moroccan",
    ayurvedic: {
      rasa: ["madhura"],
      virya: "sheeta",
      vipaka: "madhura",
      doshaEffect: { vata: -2, pitta: -1, kapha: 1 },
      guna: ["guru", "snigdha"]
    },
    nutrition: { calories: 900, protein: 0, carbs: 0, fat: 100, fiber: 0, vitamins: { E: 62 } },
    servingSize: "1 tbsp",
    servingGrams: 14,
    season: ["hemanta", "shishira"]
  },

  // ============ NUTS & SEEDS (4 items) ============
  {
    id: "nut_pine_nuts",
    name: "Pine Nuts",
    category: "nuts_seeds",
    origin: "italian",
    ayurvedic: {
      rasa: ["madhura"],
      virya: "ushna",
      vipaka: "madhura",
      doshaEffect: { vata: -2, pitta: 1, kapha: 1 },
      guna: ["guru", "snigdha"]
    },
    nutrition: { calories: 673, protein: 13.7, carbs: 13.1, fat: 68.4, fiber: 3.7, minerals: { magnesium: 251, zinc: 6.4, iron: 5.5, phosphorus: 575 } },
    servingSize: "1 oz (28g)",
    servingGrams: 28,
    season: ["hemanta", "shishira"]
  },
  {
    id: "nut_pistachios_middle_eastern",
    name: "Pistachios (Middle Eastern)",
    category: "nuts_seeds",
    origin: "persian",
    ayurvedic: {
      rasa: ["madhura"],
      virya: "ushna",
      vipaka: "madhura",
      doshaEffect: { vata: -1, pitta: 1, kapha: 1 },
      guna: ["guru", "snigdha"]
    },
    nutrition: { calories: 562, protein: 20.2, carbs: 27.2, fat: 45.3, fiber: 10.6, minerals: { potassium: 1025, phosphorus: 490, magnesium: 121 }, vitamins: { B6: 1.7 } },
    servingSize: "1 oz (28g)",
    servingGrams: 28,
    season: ["hemanta", "shishira"]
  },
  {
    id: "nut_hazelnuts",
    name: "Hazelnuts",
    category: "nuts_seeds",
    origin: "turkish",
    ayurvedic: {
      rasa: ["madhura"],
      virya: "ushna",
      vipaka: "madhura",
      doshaEffect: { vata: -2, pitta: 1, kapha: 1 },
      guna: ["guru", "snigdha"]
    },
    nutrition: { calories: 628, protein: 15, carbs: 16.7, fat: 60.8, fiber: 9.7, minerals: { manganese: 6.2, magnesium: 163, copper: 1.7 }, vitamins: { E: 15 } },
    servingSize: "1 oz (28g)",
    servingGrams: 28,
    season: ["hemanta", "shishira"]
  },
  {
    id: "seed_sesame",
    name: "Sesame Seeds",
    category: "nuts_seeds",
    origin: "egyptian",
    ayurvedic: {
      rasa: ["madhura", "tikta"],
      virya: "ushna",
      vipaka: "madhura",
      doshaEffect: { vata: -2, pitta: 1, kapha: 0 },
      guna: ["guru", "snigdha"]
    },
    nutrition: { calories: 573, protein: 17.7, carbs: 23.5, fat: 49.7, fiber: 11.8, minerals: { calcium: 975, iron: 14.6, magnesium: 351, zinc: 7.8 } },
    servingSize: "1 tbsp",
    servingGrams: 9,
    season: ["hemanta", "shishira"]
  },

  // ============ SWEETS (5 items) ============
  {
    id: "sweet_baklava",
    name: "Baklava",
    category: "sweets",
    origin: "turkish",
    ayurvedic: {
      rasa: ["madhura"],
      virya: "ushna",
      vipaka: "madhura",
      doshaEffect: { vata: -2, pitta: 1, kapha: 2 },
      guna: ["guru", "snigdha"]
    },
    nutrition: { calories: 428, protein: 6.3, carbs: 45, fat: 25.8, fiber: 2.3, minerals: { sodium: 272, iron: 1.7 } },
    servingSize: "1 piece (78g)",
    servingGrams: 78,
    season: ["hemanta", "shishira"]
  },
  {
    id: "sweet_halva",
    name: "Halva (Sesame)",
    category: "sweets",
    origin: "turkish",
    ayurvedic: {
      rasa: ["madhura"],
      virya: "ushna",
      vipaka: "madhura",
      doshaEffect: { vata: -2, pitta: 1, kapha: 2 },
      guna: ["guru", "snigdha"]
    },
    nutrition: { calories: 469, protein: 12.5, carbs: 54.3, fat: 21.7, fiber: 3.5, minerals: { calcium: 156, iron: 4.5, phosphorus: 220 } },
    servingSize: "50g slice",
    servingGrams: 50,
    season: ["hemanta", "shishira"]
  },
  {
    id: "sweet_turkish_delight",
    name: "Turkish Delight (Lokum)",
    category: "sweets",
    origin: "turkish",
    ayurvedic: {
      rasa: ["madhura"],
      virya: "sheeta",
      vipaka: "madhura",
      doshaEffect: { vata: -1, pitta: 0, kapha: 2 },
      guna: ["guru", "snigdha"]
    },
    nutrition: { calories: 350, protein: 0.5, carbs: 89, fat: 0.2, fiber: 0, minerals: { sodium: 5 } },
    servingSize: "2 pieces (40g)",
    servingGrams: 40,
    season: ["hemanta", "shishira"]
  },
  {
    id: "sweet_kunafa",
    name: "Kunafa (Knafeh)",
    category: "sweets",
    origin: "lebanese",
    ayurvedic: {
      rasa: ["madhura"],
      virya: "sheeta",
      vipaka: "madhura",
      doshaEffect: { vata: -2, pitta: 0, kapha: 2 },
      guna: ["guru", "snigdha"]
    },
    nutrition: { calories: 390, protein: 8, carbs: 48, fat: 18, fiber: 0.5, minerals: { calcium: 180, sodium: 200 } },
    servingSize: "1 piece (100g)",
    servingGrams: 100,
    season: ["hemanta", "shishira"]
  },
  {
    id: "sweet_basbousa",
    name: "Basbousa (Semolina Cake)",
    category: "sweets",
    origin: "egyptian",
    ayurvedic: {
      rasa: ["madhura"],
      virya: "sheeta",
      vipaka: "madhura",
      doshaEffect: { vata: -1, pitta: 0, kapha: 2 },
      guna: ["guru", "snigdha"]
    },
    nutrition: { calories: 340, protein: 4.5, carbs: 52, fat: 13, fiber: 1, minerals: { calcium: 50, sodium: 150 } },
    servingSize: "1 piece (80g)",
    servingGrams: 80,
    season: ["hemanta", "shishira"]
  },

  // ============ CONDIMENTS (6 items) ============
  {
    id: "condiment_tzatziki",
    name: "Tzatziki",
    category: "condiments",
    origin: "greek",
    ayurvedic: {
      rasa: ["amla", "madhura"],
      virya: "sheeta",
      vipaka: "amla",
      doshaEffect: { vata: -1, pitta: -1, kapha: 1 },
      guna: ["laghu", "snigdha"]
    },
    nutrition: { calories: 54, protein: 3.3, carbs: 4.2, fat: 2.7, fiber: 0.3, minerals: { calcium: 80, sodium: 210 } },
    servingSize: "2 tbsp (30g)",
    servingGrams: 30,
    season: ["grishma", "sharad"]
  },
  {
    id: "condiment_harissa_paste",
    name: "Harissa Paste",
    category: "condiments",
    origin: "moroccan",
    ayurvedic: {
      rasa: ["katu", "tikta"],
      virya: "ushna",
      vipaka: "katu",
      doshaEffect: { vata: -1, pitta: 2, kapha: -2 },
      guna: ["laghu", "ruksha"]
    },
    nutrition: { calories: 44, protein: 1.5, carbs: 5, fat: 2, fiber: 2, minerals: { sodium: 130 }, vitamins: { A: 1200, C: 14 } },
    servingSize: "1 tbsp",
    servingGrams: 15,
    season: ["hemanta", "shishira"]
  },
  {
    id: "condiment_preserved_lemon",
    name: "Preserved Lemon",
    category: "condiments",
    origin: "moroccan",
    ayurvedic: {
      rasa: ["amla", "lavana"],
      virya: "ushna",
      vipaka: "amla",
      doshaEffect: { vata: -1, pitta: 1, kapha: -1 },
      guna: ["laghu", "snigdha"]
    },
    nutrition: { calories: 15, protein: 0.5, carbs: 3, fat: 0.1, fiber: 1.5, minerals: { sodium: 680, potassium: 80 }, vitamins: { C: 25 } },
    servingSize: "1 wedge (15g)",
    servingGrams: 15,
    season: ["hemanta", "shishira", "vasanta"]
  },
  {
    id: "condiment_rose_water",
    name: "Rose Water",
    category: "condiments",
    origin: "persian",
    ayurvedic: {
      rasa: ["madhura", "tikta", "kashaya"],
      virya: "sheeta",
      vipaka: "madhura",
      doshaEffect: { vata: -1, pitta: -2, kapha: 0 },
      guna: ["laghu", "snigdha"]
    },
    nutrition: { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 },
    servingSize: "1 tsp",
    servingGrams: 5,
    season: ["grishma", "sharad"]
  },
  {
    id: "condiment_pomegranate_molasses",
    name: "Pomegranate Molasses",
    category: "condiments",
    origin: "lebanese",
    ayurvedic: {
      rasa: ["amla", "madhura", "kashaya"],
      virya: "sheeta",
      vipaka: "amla",
      doshaEffect: { vata: -1, pitta: 0, kapha: 0 },
      guna: ["guru", "snigdha"]
    },
    nutrition: { calories: 250, protein: 0.5, carbs: 63, fat: 0, fiber: 0, minerals: { potassium: 395, iron: 1 } },
    servingSize: "1 tbsp",
    servingGrams: 20,
    season: ["sharad", "hemanta"]
  },
  {
    id: "condiment_balsamic_vinegar",
    name: "Balsamic Vinegar",
    category: "condiments",
    origin: "italian",
    ayurvedic: {
      rasa: ["amla", "madhura"],
      virya: "ushna",
      vipaka: "amla",
      doshaEffect: { vata: -1, pitta: 1, kapha: -1 },
      guna: ["laghu", "ruksha"]
    },
    nutrition: { calories: 88, protein: 0.5, carbs: 17, fat: 0, fiber: 0, minerals: { potassium: 112, iron: 0.7 } },
    servingSize: "1 tbsp",
    servingGrams: 16,
    season: ["grishma", "sharad"]
  },

  // ============ BEVERAGES (5 items) ============
  {
    id: "beverage_turkish_coffee",
    name: "Turkish Coffee",
    category: "beverages",
    origin: "turkish",
    ayurvedic: {
      rasa: ["tikta", "kashaya"],
      virya: "ushna",
      vipaka: "katu",
      doshaEffect: { vata: 1, pitta: 2, kapha: -2 },
      guna: ["laghu", "ruksha"]
    },
    nutrition: { calories: 5, protein: 0.3, carbs: 0, fat: 0.2, fiber: 0, minerals: { potassium: 116, magnesium: 7 } },
    servingSize: "1 cup (60ml)",
    servingGrams: 60,
    season: ["hemanta", "shishira"]
  },
  {
    id: "beverage_moroccan_mint_tea",
    name: "Moroccan Mint Tea",
    category: "beverages",
    origin: "moroccan",
    ayurvedic: {
      rasa: ["madhura", "katu"],
      virya: "sheeta",
      vipaka: "katu",
      doshaEffect: { vata: 0, pitta: -1, kapha: -1 },
      guna: ["laghu", "ruksha"]
    },
    nutrition: { calories: 45, protein: 0, carbs: 11, fat: 0, fiber: 0, minerals: { manganese: 0.5 } },
    servingSize: "1 glass (200ml)",
    servingGrams: 200,
    season: ["grishma", "sharad"]
  },
  {
    id: "beverage_hibiscus_tea_karkade",
    name: "Hibiscus Tea (Karkade)",
    category: "beverages",
    origin: "egyptian",
    ayurvedic: {
      rasa: ["amla", "kashaya"],
      virya: "sheeta",
      vipaka: "katu",
      doshaEffect: { vata: 0, pitta: -2, kapha: -1 },
      guna: ["laghu", "ruksha"]
    },
    nutrition: { calories: 37, protein: 0.4, carbs: 7.4, fat: 0, fiber: 0, vitamins: { C: 18.4 }, minerals: { iron: 0.8 } },
    servingSize: "1 cup (240ml)",
    servingGrams: 240,
    season: ["grishma", "sharad"]
  },
  {
    id: "beverage_pomegranate_juice",
    name: "Pomegranate Juice",
    category: "beverages",
    origin: "persian",
    ayurvedic: {
      rasa: ["madhura", "amla", "kashaya"],
      virya: "sheeta",
      vipaka: "madhura",
      doshaEffect: { vata: -1, pitta: -1, kapha: 0 },
      guna: ["laghu", "snigdha"]
    },
    nutrition: { calories: 134, protein: 0.4, carbs: 33, fat: 0.7, fiber: 0.2, minerals: { potassium: 533 }, vitamins: { K: 10.4 } },
    servingSize: "1 cup (240ml)",
    servingGrams: 240,
    season: ["sharad", "hemanta"]
  },
  // ============ ADDITIONAL ITEMS (5 items) ============
  {
    id: "veg_tabbouleh",
    name: "Tabbouleh Salad",
    category: "vegetables",
    origin: "lebanese",
    ayurvedic: {
      rasa: ["amla", "katu", "tikta"],
      virya: "sheeta",
      vipaka: "katu",
      doshaEffect: { vata: 0, pitta: -1, kapha: -1 },
      guna: ["laghu", "ruksha"]
    },
    nutrition: { calories: 90, protein: 2.6, carbs: 14, fat: 3.5, fiber: 3.5, minerals: { iron: 1.5, potassium: 250 }, vitamins: { C: 20, K: 150 } },
    servingSize: "1 cup",
    servingGrams: 160,
    season: ["grishma", "sharad"]
  },
  {
    id: "legume_lentil_soup_turkish",
    name: "Turkish Red Lentil Soup (Mercimek)",
    category: "legumes",
    origin: "turkish",
    ayurvedic: {
      rasa: ["madhura", "kashaya"],
      virya: "ushna",
      vipaka: "madhura",
      doshaEffect: { vata: -1, pitta: 0, kapha: 0 },
      guna: ["laghu", "snigdha"]
    },
    nutrition: { calories: 145, protein: 9, carbs: 22, fat: 3.5, fiber: 5.5, minerals: { iron: 3.3, potassium: 365 } },
    servingSize: "1 cup (240ml)",
    servingGrams: 240,
    season: ["hemanta", "shishira", "vasanta"]
  },
  {
    id: "condiment_dukkah",
    name: "Dukkah (Egyptian Nut-Spice Blend)",
    category: "condiments",
    origin: "egyptian",
    ayurvedic: {
      rasa: ["katu", "madhura"],
      virya: "ushna",
      vipaka: "katu",
      doshaEffect: { vata: -1, pitta: 1, kapha: -1 },
      guna: ["laghu", "ruksha"]
    },
    nutrition: { calories: 490, protein: 16, carbs: 22, fat: 38, fiber: 8, minerals: { magnesium: 180, iron: 5 } },
    servingSize: "2 tbsp (20g)",
    servingGrams: 20,
    season: ["hemanta", "shishira"]
  },
  {
    id: "grain_manakeesh",
    name: "Manakeesh (Za'atar Flatbread)",
    category: "grains",
    origin: "lebanese",
    ayurvedic: {
      rasa: ["madhura", "katu"],
      virya: "ushna",
      vipaka: "madhura",
      doshaEffect: { vata: -1, pitta: 1, kapha: 1 },
      guna: ["guru", "snigdha"]
    },
    nutrition: { calories: 260, protein: 6, carbs: 35, fat: 11, fiber: 2.5, minerals: { calcium: 120, iron: 3 } },
    servingSize: "1 piece",
    servingGrams: 100,
    season: ["hemanta", "shishira"]
  },
  {
    id: "dairy_shanklish",
    name: "Shanklish (Aged Cheese Balls)",
    category: "dairy",
    origin: "lebanese",
    ayurvedic: {
      rasa: ["amla", "lavana", "katu"],
      virya: "ushna",
      vipaka: "amla",
      doshaEffect: { vata: -1, pitta: 2, kapha: 1 },
      guna: ["guru", "snigdha"]
    },
    nutrition: { calories: 350, protein: 20, carbs: 2, fat: 29, fiber: 0.5, minerals: { calcium: 400, sodium: 850 } },
    servingSize: "50g",
    servingGrams: 50,
    season: ["hemanta", "shishira"]
  },

  {
    id: "beverage_rooibos_tea",
    name: "Rooibos Tea",
    category: "beverages",
    origin: "moroccan",
    ayurvedic: {
      rasa: ["madhura", "kashaya"],
      virya: "sheeta",
      vipaka: "madhura",
      doshaEffect: { vata: -1, pitta: -1, kapha: 0 },
      guna: ["laghu", "ruksha"]
    },
    nutrition: { calories: 2, protein: 0, carbs: 0.5, fat: 0, fiber: 0, minerals: { calcium: 1, fluoride: 0.2 } },
    servingSize: "1 cup (240ml)",
    servingGrams: 240,
    season: ["grishma", "sharad", "vasanta"]
  },
];
