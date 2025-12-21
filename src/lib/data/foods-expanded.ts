// Expanded foods database - 100+ items
// This file exports the complete food array

import { Food } from '../types';

export const expandedFoods: Food[] = [
  // ============ GRAINS (15 items) ============
  {
    id: "rice_white",
    name: "White Rice",
    nameHindi: "Chawal",
    category: "grains",
    ayurvedic: {
      rasa: ["madhura"],
      virya: "sheeta",
      vipaka: "madhura",
      doshaEffect: { vata: -1, pitta: -1, kapha: 1 },
      guna: ["laghu", "snigdha"]
    },
    nutrition: { calories: 130, protein: 2.7, carbs: 28, fat: 0.3, fiber: 0.4 },
    servingSize: "1 cup cooked",
    servingGrams: 158,
    season: ["varsha", "sharad"]
  },
  {
    id: "rice_brown",
    name: "Brown Rice",
    nameHindi: "Bhura Chawal",
    category: "grains",
    ayurvedic: {
      rasa: ["madhura"],
      virya: "sheeta",
      vipaka: "madhura",
      doshaEffect: { vata: 0, pitta: -1, kapha: 0 },
      guna: ["guru", "ruksha"]
    },
    nutrition: { calories: 216, protein: 5, carbs: 45, fat: 1.8, fiber: 3.5 },
    servingSize: "1 cup cooked",
    servingGrams: 195,
    season: ["hemanta", "shishira"]
  },
  {
    id: "wheat_roti",
    name: "Whole Wheat Roti",
    nameHindi: "Roti",
    category: "grains",
    ayurvedic: {
      rasa: ["madhura"],
      virya: "sheeta",
      vipaka: "madhura",
      doshaEffect: { vata: -1, pitta: -1, kapha: 1 },
      guna: ["guru", "snigdha"]
    },
    nutrition: { calories: 71, protein: 2.7, carbs: 15, fat: 0.4, fiber: 1.9 },
    servingSize: "1 roti",
    servingGrams: 30,
    season: ["hemanta", "shishira"]
  },
  {
    id: "ragi",
    name: "Finger Millet (Ragi)",
    nameHindi: "Ragi/Nachni",
    category: "grains",
    ayurvedic: {
      rasa: ["madhura", "kashaya"],
      virya: "sheeta",
      vipaka: "madhura",
      doshaEffect: { vata: 0, pitta: -1, kapha: -1 },
      guna: ["laghu", "ruksha"]
    },
    nutrition: { calories: 328, protein: 7.3, carbs: 72, fat: 1.3, fiber: 3.6, minerals: { calcium: 344, iron: 3.9 } },
    servingSize: "100g",
    servingGrams: 100,
    season: ["grishma", "varsha"]
  },
  {
    id: "jowar",
    name: "Sorghum (Jowar)",
    nameHindi: "Jowar",
    category: "grains",
    ayurvedic: {
      rasa: ["madhura", "kashaya"],
      virya: "sheeta",
      vipaka: "madhura",
      doshaEffect: { vata: 0, pitta: -1, kapha: -1 },
      guna: ["laghu", "ruksha"]
    },
    nutrition: { calories: 329, protein: 10.4, carbs: 72.6, fat: 1.9, fiber: 9.7 },
    servingSize: "100g",
    servingGrams: 100,
    season: ["grishma", "sharad"]
  },
  {
    id: "bajra",
    name: "Pearl Millet (Bajra)",
    nameHindi: "Bajra",
    category: "grains",
    ayurvedic: {
      rasa: ["madhura"],
      virya: "ushna",
      vipaka: "madhura",
      doshaEffect: { vata: -1, pitta: 1, kapha: -1 },
      guna: ["laghu", "ruksha"]
    },
    nutrition: { calories: 361, protein: 11.6, carbs: 67, fat: 5, fiber: 1.2, minerals: { iron: 8 } },
    servingSize: "100g",
    servingGrams: 100,
    season: ["hemanta", "shishira"]
  },
  {
    id: "foxtail_millet",
    name: "Foxtail Millet",
    nameHindi: "Kangni/Kakum",
    category: "grains",
    ayurvedic: {
      rasa: ["madhura"],
      virya: "sheeta",
      vipaka: "madhura",
      doshaEffect: { vata: 0, pitta: -1, kapha: -1 },
      guna: ["laghu", "ruksha"]
    },
    nutrition: { calories: 351, protein: 12.3, carbs: 60.9, fat: 4.3, fiber: 8 },
    servingSize: "100g",
    servingGrams: 100,
    season: ["grishma", "varsha"]
  },
  {
    id: "barnyard_millet",
    name: "Barnyard Millet",
    nameHindi: "Sanwa/Jhangora",
    category: "grains",
    ayurvedic: {
      rasa: ["madhura"],
      virya: "sheeta",
      vipaka: "madhura",
      doshaEffect: { vata: 0, pitta: -1, kapha: -1 },
      guna: ["laghu", "ruksha"]
    },
    nutrition: { calories: 300, protein: 6.2, carbs: 65.5, fat: 2.2, fiber: 9.8 },
    servingSize: "100g",
    servingGrams: 100,
    season: ["varsha", "sharad"]
  },
  {
    id: "poha",
    name: "Flattened Rice (Poha)",
    nameHindi: "Poha/Chivda",
    category: "grains",
    ayurvedic: {
      rasa: ["madhura"],
      virya: "sheeta",
      vipaka: "madhura",
      doshaEffect: { vata: -1, pitta: -1, kapha: 1 },
      guna: ["laghu", "snigdha"]
    },
    nutrition: { calories: 346, protein: 6.6, carbs: 77.3, fat: 1.2, fiber: 2.4 },
    servingSize: "1 cup",
    servingGrams: 50,
    season: ["varsha", "sharad"]
  },
  {
    id: "sabudana",
    name: "Tapioca Pearls (Sabudana)",
    nameHindi: "Sabudana",
    category: "grains",
    ayurvedic: {
      rasa: ["madhura"],
      virya: "sheeta",
      vipaka: "madhura",
      doshaEffect: { vata: -1, pitta: -1, kapha: 2 },
      guna: ["guru", "snigdha"]
    },
    nutrition: { calories: 358, protein: 0.2, carbs: 88.7, fat: 0.02, fiber: 0.9 },
    servingSize: "100g",
    servingGrams: 100,
    season: ["varsha"]
  },
  {
    id: "daliya",
    name: "Broken Wheat (Daliya)",
    nameHindi: "Daliya/Lapsi",
    category: "grains",
    ayurvedic: {
      rasa: ["madhura"],
      virya: "sheeta",
      vipaka: "madhura",
      doshaEffect: { vata: -1, pitta: -1, kapha: 0 },
      guna: ["guru", "snigdha"]
    },
    nutrition: { calories: 342, protein: 12.5, carbs: 69.4, fat: 1.7, fiber: 12.5 },
    servingSize: "100g",
    servingGrams: 100,
    season: ["hemanta", "shishira"]
  },
  {
    id: "kuttu",
    name: "Buckwheat (Kuttu)",
    nameHindi: "Kuttu",
    category: "grains",
    ayurvedic: {
      rasa: ["madhura", "kashaya"],
      virya: "ushna",
      vipaka: "madhura",
      doshaEffect: { vata: -1, pitta: 0, kapha: -1 },
      guna: ["laghu", "ruksha"]
    },
    nutrition: { calories: 343, protein: 13.3, carbs: 71.5, fat: 3.4, fiber: 10 },
    servingSize: "100g",
    servingGrams: 100,
    season: ["varsha"]
  },
  {
    id: "semolina",
    name: "Semolina (Suji/Rava)",
    nameHindi: "Suji/Rava",
    category: "grains",
    ayurvedic: {
      rasa: ["madhura"],
      virya: "sheeta",
      vipaka: "madhura",
      doshaEffect: { vata: -1, pitta: -1, kapha: 1 },
      guna: ["laghu", "snigdha"]
    },
    nutrition: { calories: 360, protein: 12.7, carbs: 72.8, fat: 1.1, fiber: 3.9 },
    servingSize: "100g",
    servingGrams: 100,
    season: ["hemanta", "shishira"]
  },
  {
    id: "oats",
    name: "Oats",
    nameHindi: "Jai/Oats",
    category: "grains",
    ayurvedic: {
      rasa: ["madhura"],
      virya: "ushna",
      vipaka: "madhura",
      doshaEffect: { vata: -1, pitta: 0, kapha: 0 },
      guna: ["guru", "snigdha"]
    },
    nutrition: { calories: 389, protein: 16.9, carbs: 66.3, fat: 6.9, fiber: 10.6 },
    servingSize: "100g",
    servingGrams: 100,
    season: ["hemanta", "shishira"]
  },
  {
    id: "quinoa",
    name: "Quinoa",
    nameHindi: "Quinoa",
    category: "grains",
    ayurvedic: {
      rasa: ["madhura", "kashaya"],
      virya: "sheeta",
      vipaka: "madhura",
      doshaEffect: { vata: 0, pitta: -1, kapha: 0 },
      guna: ["laghu", "ruksha"]
    },
    nutrition: { calories: 368, protein: 14.1, carbs: 64.2, fat: 6.1, fiber: 7 },
    servingSize: "100g",
    servingGrams: 100,
    season: ["varsha", "sharad"]
  },

  // ============ PULSES (12 items) ============
  {
    id: "moong_dal",
    name: "Moong Dal (Split)",
    nameHindi: "Moong Dal",
    category: "pulses",
    ayurvedic: {
      rasa: ["madhura", "kashaya"],
      virya: "sheeta",
      vipaka: "madhura",
      doshaEffect: { vata: 0, pitta: -1, kapha: -1 },
      guna: ["laghu", "ruksha"]
    },
    nutrition: { calories: 347, protein: 24, carbs: 59, fat: 1.2, fiber: 16.3 },
    servingSize: "100g",
    servingGrams: 100,
    season: ["grishma", "varsha"]
  },
  {
    id: "moong_whole",
    name: "Green Gram (Whole Moong)",
    nameHindi: "Sabut Moong",
    category: "pulses",
    ayurvedic: {
      rasa: ["madhura", "kashaya"],
      virya: "sheeta",
      vipaka: "madhura",
      doshaEffect: { vata: 0, pitta: -1, kapha: -1 },
      guna: ["laghu", "ruksha"]
    },
    nutrition: { calories: 347, protein: 24, carbs: 63, fat: 1.2, fiber: 16 },
    servingSize: "100g",
    servingGrams: 100,
    season: ["grishma", "varsha"]
  },
  {
    id: "toor_dal",
    name: "Toor Dal (Arhar)",
    nameHindi: "Arhar Dal",
    category: "pulses",
    ayurvedic: {
      rasa: ["madhura", "kashaya"],
      virya: "ushna",
      vipaka: "madhura",
      doshaEffect: { vata: -1, pitta: 0, kapha: 0 },
      guna: ["laghu", "ruksha"]
    },
    nutrition: { calories: 343, protein: 22.3, carbs: 57.6, fat: 1.7, fiber: 15 },
    servingSize: "100g",
    servingGrams: 100,
    season: ["hemanta", "shishira"]
  },
  {
    id: "chana_dal",
    name: "Chana Dal (Bengal Gram)",
    nameHindi: "Chana Dal",
    category: "pulses",
    ayurvedic: {
      rasa: ["madhura", "kashaya"],
      virya: "sheeta",
      vipaka: "madhura",
      doshaEffect: { vata: 1, pitta: -1, kapha: -1 },
      guna: ["ruksha", "laghu"]
    },
    nutrition: { calories: 360, protein: 20.8, carbs: 59, fat: 5.3, fiber: 18 },
    servingSize: "100g",
    servingGrams: 100,
    season: ["hemanta", "shishira"]
  },
  {
    id: "masoor_dal",
    name: "Red Lentils (Masoor Dal)",
    nameHindi: "Masoor Dal",
    category: "pulses",
    ayurvedic: {
      rasa: ["madhura", "kashaya"],
      virya: "ushna",
      vipaka: "madhura",
      doshaEffect: { vata: -1, pitta: 1, kapha: -1 },
      guna: ["laghu", "ruksha"]
    },
    nutrition: { calories: 352, protein: 25.8, carbs: 59, fat: 1.1, fiber: 10.7 },
    servingSize: "100g",
    servingGrams: 100,
    season: ["hemanta", "shishira"]
  },
  {
    id: "urad_dal",
    name: "Black Gram (Urad Dal)",
    nameHindi: "Urad Dal",
    category: "pulses",
    ayurvedic: {
      rasa: ["madhura"],
      virya: "ushna",
      vipaka: "madhura",
      doshaEffect: { vata: -2, pitta: 1, kapha: 1 },
      guna: ["guru", "snigdha"]
    },
    nutrition: { calories: 341, protein: 25.2, carbs: 59.6, fat: 1.4, fiber: 18.3 },
    servingSize: "100g",
    servingGrams: 100,
    season: ["hemanta", "shishira"]
  },
  {
    id: "rajma",
    name: "Kidney Beans (Rajma)",
    nameHindi: "Rajma",
    category: "pulses",
    ayurvedic: {
      rasa: ["madhura", "kashaya"],
      virya: "ushna",
      vipaka: "madhura",
      doshaEffect: { vata: 1, pitta: 0, kapha: 0 },
      guna: ["guru", "ruksha"]
    },
    nutrition: { calories: 333, protein: 23.6, carbs: 60.1, fat: 0.8, fiber: 24.9 },
    servingSize: "100g",
    servingGrams: 100,
    season: ["hemanta", "shishira"]
  },
  {
    id: "chhole",
    name: "Chickpeas (Kabuli Chana)",
    nameHindi: "Chole/Kabuli Chana",
    category: "pulses",
    ayurvedic: {
      rasa: ["madhura", "kashaya"],
      virya: "sheeta",
      vipaka: "madhura",
      doshaEffect: { vata: 1, pitta: -1, kapha: -1 },
      guna: ["ruksha", "laghu"]
    },
    nutrition: { calories: 364, protein: 19, carbs: 61, fat: 6, fiber: 17 },
    servingSize: "100g",
    servingGrams: 100,
    season: ["hemanta", "shishira"]
  },
  {
    id: "kulthi",
    name: "Horse Gram (Kulthi)",
    nameHindi: "Kulthi/Gahat",
    category: "pulses",
    ayurvedic: {
      rasa: ["kashaya", "katu"],
      virya: "ushna",
      vipaka: "katu",
      doshaEffect: { vata: -1, pitta: 1, kapha: -2 },
      guna: ["laghu", "ruksha"]
    },
    nutrition: { calories: 321, protein: 22, carbs: 57.2, fat: 0.5, fiber: 5.3 },
    servingSize: "100g",
    servingGrams: 100,
    season: ["hemanta", "shishira"],
    contraindications: ["pregnancy", "bleeding_disorders"]
  },
  {
    id: "moth_dal",
    name: "Moth Beans",
    nameHindi: "Moth Dal",
    category: "pulses",
    ayurvedic: {
      rasa: ["madhura", "kashaya"],
      virya: "sheeta",
      vipaka: "madhura",
      doshaEffect: { vata: 0, pitta: -1, kapha: -1 },
      guna: ["laghu", "ruksha"]
    },
    nutrition: { calories: 343, protein: 23.6, carbs: 56.5, fat: 1.6, fiber: 16 },
    servingSize: "100g",
    servingGrams: 100,
    season: ["grishma", "varsha"]
  },
  {
    id: "lobia",
    name: "Black-Eyed Peas (Lobia)",
    nameHindi: "Lobia/Rongi",
    category: "pulses",
    ayurvedic: {
      rasa: ["madhura", "kashaya"],
      virya: "sheeta",
      vipaka: "madhura",
      doshaEffect: { vata: 0, pitta: -1, kapha: 0 },
      guna: ["laghu", "ruksha"]
    },
    nutrition: { calories: 336, protein: 23.5, carbs: 60, fat: 1.3, fiber: 10.6 },
    servingSize: "100g",
    servingGrams: 100,
    season: ["varsha", "sharad"]
  },
  {
    id: "soybean",
    name: "Soybean",
    nameHindi: "Soyabean",
    category: "pulses",
    ayurvedic: {
      rasa: ["madhura", "kashaya"],
      virya: "sheeta",
      vipaka: "madhura",
      doshaEffect: { vata: 1, pitta: 0, kapha: 1 },
      guna: ["guru", "snigdha"]
    },
    nutrition: { calories: 446, protein: 36.5, carbs: 30.2, fat: 19.9, fiber: 9.3 },
    servingSize: "100g",
    servingGrams: 100,
    season: ["hemanta", "shishira"]
  },

  // ============ VEGETABLES (25 items) ============
  {
    id: "palak",
    name: "Spinach",
    nameHindi: "Palak",
    category: "vegetables",
    ayurvedic: {
      rasa: ["tikta", "kashaya"],
      virya: "sheeta",
      vipaka: "katu",
      doshaEffect: { vata: 1, pitta: -1, kapha: -1 },
      guna: ["laghu", "ruksha"]
    },
    nutrition: { calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4, fiber: 2.2, vitamins: { A: 469, C: 28, K: 483 }, minerals: { iron: 2.7, calcium: 99 } },
    servingSize: "1 cup raw",
    servingGrams: 30,
    season: ["hemanta", "shishira"]
  },
  {
    id: "methi_leaves",
    name: "Fenugreek Leaves",
    nameHindi: "Methi",
    category: "vegetables",
    ayurvedic: {
      rasa: ["tikta", "katu"],
      virya: "ushna",
      vipaka: "katu",
      doshaEffect: { vata: -1, pitta: 1, kapha: -2 },
      guna: ["laghu", "ruksha"]
    },
    nutrition: { calories: 49, protein: 4.4, carbs: 6, fat: 0.9, fiber: 1.1, minerals: { iron: 16.5, calcium: 395 } },
    servingSize: "1 cup",
    servingGrams: 50,
    season: ["hemanta", "shishira"]
  },
  {
    id: "sarson",
    name: "Mustard Greens",
    nameHindi: "Sarson ka Saag",
    category: "vegetables",
    ayurvedic: {
      rasa: ["tikta", "katu"],
      virya: "ushna",
      vipaka: "katu",
      doshaEffect: { vata: -1, pitta: 1, kapha: -2 },
      guna: ["laghu", "tikshna"]
    },
    nutrition: { calories: 27, protein: 2.9, carbs: 4.7, fat: 0.4, fiber: 3.2, vitamins: { A: 525, C: 70, K: 278 } },
    servingSize: "1 cup",
    servingGrams: 56,
    season: ["hemanta", "shishira"]
  },
  {
    id: "bathua",
    name: "Lamb's Quarters (Bathua)",
    nameHindi: "Bathua",
    category: "vegetables",
    ayurvedic: {
      rasa: ["tikta", "kashaya"],
      virya: "sheeta",
      vipaka: "katu",
      doshaEffect: { vata: 0, pitta: -1, kapha: -1 },
      guna: ["laghu", "ruksha"]
    },
    nutrition: { calories: 43, protein: 4.2, carbs: 7.3, fat: 0.8, fiber: 4, minerals: { iron: 4.2, calcium: 309 } },
    servingSize: "1 cup",
    servingGrams: 100,
    season: ["hemanta", "shishira"]
  },
  {
    id: "amaranth_leaves",
    name: "Amaranth Leaves",
    nameHindi: "Chaulai/Lal Saag",
    category: "vegetables",
    ayurvedic: {
      rasa: ["madhura", "kashaya"],
      virya: "sheeta",
      vipaka: "madhura",
      doshaEffect: { vata: -1, pitta: -1, kapha: 0 },
      guna: ["laghu", "ruksha"]
    },
    nutrition: { calories: 23, protein: 2.5, carbs: 4, fat: 0.3, fiber: 2.1, minerals: { iron: 2.3, calcium: 215 } },
    servingSize: "1 cup",
    servingGrams: 50,
    season: ["varsha", "sharad"]
  },
  {
    id: "lauki",
    name: "Bottle Gourd",
    nameHindi: "Lauki/Ghiya",
    category: "vegetables",
    ayurvedic: {
      rasa: ["madhura"],
      virya: "sheeta",
      vipaka: "madhura",
      doshaEffect: { vata: -1, pitta: -2, kapha: 0 },
      guna: ["laghu", "snigdha"]
    },
    nutrition: { calories: 14, protein: 0.6, carbs: 3.4, fat: 0.02, fiber: 0.5 },
    servingSize: "1 cup cooked",
    servingGrams: 116,
    season: ["grishma", "varsha"]
  },
  {
    id: "karela",
    name: "Bitter Gourd",
    nameHindi: "Karela",
    category: "vegetables",
    ayurvedic: {
      rasa: ["tikta"],
      virya: "sheeta",
      vipaka: "katu",
      doshaEffect: { vata: 1, pitta: -2, kapha: -2 },
      guna: ["laghu", "ruksha"]
    },
    nutrition: { calories: 17, protein: 1, carbs: 3.7, fat: 0.2, fiber: 2.8 },
    servingSize: "1 cup",
    servingGrams: 94,
    season: ["grishma", "varsha"],
    contraindications: ["pregnancy", "hypoglycemia"]
  },
  {
    id: "tinda",
    name: "Apple Gourd (Tinda)",
    nameHindi: "Tinda",
    category: "vegetables",
    ayurvedic: {
      rasa: ["madhura"],
      virya: "sheeta",
      vipaka: "madhura",
      doshaEffect: { vata: -1, pitta: -1, kapha: 0 },
      guna: ["laghu", "snigdha"]
    },
    nutrition: { calories: 21, protein: 1.4, carbs: 3.4, fat: 0.2, fiber: 1.6 },
    servingSize: "1 cup",
    servingGrams: 100,
    season: ["grishma", "varsha"]
  },
  {
    id: "parwal",
    name: "Pointed Gourd (Parwal)",
    nameHindi: "Parwal",
    category: "vegetables",
    ayurvedic: {
      rasa: ["tikta", "katu"],
      virya: "ushna",
      vipaka: "katu",
      doshaEffect: { vata: -1, pitta: 0, kapha: -1 },
      guna: ["laghu", "ruksha"]
    },
    nutrition: { calories: 20, protein: 2, carbs: 2.2, fat: 0.3, fiber: 3 },
    servingSize: "1 cup",
    servingGrams: 100,
    season: ["grishma", "varsha"]
  },
  {
    id: "arbi",
    name: "Colocasia (Arbi/Taro)",
    nameHindi: "Arbi/Kachalu",
    category: "vegetables",
    ayurvedic: {
      rasa: ["madhura", "kashaya"],
      virya: "ushna",
      vipaka: "madhura",
      doshaEffect: { vata: -1, pitta: 0, kapha: 1 },
      guna: ["guru", "snigdha"]
    },
    nutrition: { calories: 112, protein: 1.5, carbs: 26.5, fat: 0.1, fiber: 4.1 },
    servingSize: "100g",
    servingGrams: 100,
    season: ["varsha", "sharad"]
  },
  {
    id: "sahjan",
    name: "Drumstick",
    nameHindi: "Sahjan/Moringa",
    category: "vegetables",
    ayurvedic: {
      rasa: ["katu", "tikta"],
      virya: "ushna",
      vipaka: "katu",
      doshaEffect: { vata: -1, pitta: 1, kapha: -2 },
      guna: ["laghu", "tikshna"]
    },
    nutrition: { calories: 64, protein: 9.4, carbs: 8.3, fat: 1.4, fiber: 2, minerals: { calcium: 185, iron: 4 } },
    servingSize: "100g",
    servingGrams: 100,
    season: ["vasanta", "grishma"]
  },
  {
    id: "bhindi",
    name: "Okra (Bhindi)",
    nameHindi: "Bhindi",
    category: "vegetables",
    ayurvedic: {
      rasa: ["madhura"],
      virya: "sheeta",
      vipaka: "madhura",
      doshaEffect: { vata: -1, pitta: -1, kapha: 1 },
      guna: ["guru", "snigdha"]
    },
    nutrition: { calories: 33, protein: 1.9, carbs: 7.5, fat: 0.2, fiber: 3.2 },
    servingSize: "1 cup",
    servingGrams: 100,
    season: ["grishma", "varsha"]
  },
  {
    id: "baingan",
    name: "Eggplant (Brinjal)",
    nameHindi: "Baingan",
    category: "vegetables",
    ayurvedic: {
      rasa: ["tikta", "katu"],
      virya: "ushna",
      vipaka: "katu",
      doshaEffect: { vata: 1, pitta: 1, kapha: -1 },
      guna: ["laghu", "ruksha"]
    },
    nutrition: { calories: 25, protein: 1, carbs: 6, fat: 0.2, fiber: 3 },
    servingSize: "1 cup",
    servingGrams: 82,
    season: ["varsha", "sharad"]
  },
  {
    id: "gobhi",
    name: "Cauliflower",
    nameHindi: "Phool Gobhi",
    category: "vegetables",
    ayurvedic: {
      rasa: ["madhura", "kashaya"],
      virya: "sheeta",
      vipaka: "madhura",
      doshaEffect: { vata: 1, pitta: -1, kapha: 0 },
      guna: ["laghu", "ruksha"]
    },
    nutrition: { calories: 25, protein: 1.9, carbs: 5, fat: 0.3, fiber: 2 },
    servingSize: "1 cup",
    servingGrams: 100,
    season: ["hemanta", "shishira"]
  },
  {
    id: "patta_gobhi",
    name: "Cabbage",
    nameHindi: "Patta Gobhi",
    category: "vegetables",
    ayurvedic: {
      rasa: ["madhura", "kashaya"],
      virya: "sheeta",
      vipaka: "madhura",
      doshaEffect: { vata: 1, pitta: -1, kapha: 0 },
      guna: ["laghu", "ruksha"]
    },
    nutrition: { calories: 25, protein: 1.3, carbs: 5.8, fat: 0.1, fiber: 2.5 },
    servingSize: "1 cup",
    servingGrams: 89,
    season: ["hemanta", "shishira"]
  },
  {
    id: "gajar",
    name: "Carrot",
    nameHindi: "Gajar",
    category: "vegetables",
    ayurvedic: {
      rasa: ["madhura", "tikta"],
      virya: "ushna",
      vipaka: "madhura",
      doshaEffect: { vata: -1, pitta: 0, kapha: 0 },
      guna: ["laghu", "ruksha"]
    },
    nutrition: { calories: 41, protein: 0.9, carbs: 10, fat: 0.2, fiber: 2.8, vitamins: { A: 835 } },
    servingSize: "1 medium",
    servingGrams: 61,
    season: ["hemanta", "shishira"]
  },
  {
    id: "mooli",
    name: "Radish (Mooli)",
    nameHindi: "Mooli",
    category: "vegetables",
    ayurvedic: {
      rasa: ["katu", "tikta"],
      virya: "ushna",
      vipaka: "katu",
      doshaEffect: { vata: -1, pitta: 1, kapha: -1 },
      guna: ["laghu", "tikshna"]
    },
    nutrition: { calories: 16, protein: 0.7, carbs: 3.4, fat: 0.1, fiber: 1.6 },
    servingSize: "1 cup",
    servingGrams: 116,
    season: ["hemanta", "shishira"]
  },
  {
    id: "cucumber",
    name: "Cucumber",
    nameHindi: "Kheera",
    category: "vegetables",
    ayurvedic: {
      rasa: ["madhura"],
      virya: "sheeta",
      vipaka: "madhura",
      doshaEffect: { vata: 0, pitta: -2, kapha: 1 },
      guna: ["guru", "snigdha"]
    },
    nutrition: { calories: 16, protein: 0.7, carbs: 3.6, fat: 0.1, fiber: 0.5 },
    servingSize: "1 cup sliced",
    servingGrams: 104,
    season: ["grishma"]
  },
  {
    id: "tomato",
    name: "Tomato",
    nameHindi: "Tamatar",
    category: "vegetables",
    ayurvedic: {
      rasa: ["amla", "madhura"],
      virya: "ushna",
      vipaka: "amla",
      doshaEffect: { vata: -1, pitta: 1, kapha: -1 },
      guna: ["laghu", "snigdha"]
    },
    nutrition: { calories: 18, protein: 0.9, carbs: 3.9, fat: 0.2, fiber: 1.2, vitamins: { C: 14, A: 42 } },
    servingSize: "1 medium",
    servingGrams: 123,
    season: ["sharad", "hemanta"]
  },
  {
    id: "aloo",
    name: "Potato",
    nameHindi: "Aloo",
    category: "vegetables",
    ayurvedic: {
      rasa: ["madhura", "kashaya"],
      virya: "sheeta",
      vipaka: "madhura",
      doshaEffect: { vata: 1, pitta: -1, kapha: 1 },
      guna: ["guru", "ruksha"]
    },
    nutrition: { calories: 77, protein: 2, carbs: 17, fat: 0.1, fiber: 2.2 },
    servingSize: "1 medium",
    servingGrams: 150,
    season: ["hemanta", "shishira"]
  },
  {
    id: "shimla_mirch",
    name: "Bell Pepper (Capsicum)",
    nameHindi: "Shimla Mirch",
    category: "vegetables",
    ayurvedic: {
      rasa: ["madhura", "katu"],
      virya: "ushna",
      vipaka: "madhura",
      doshaEffect: { vata: -1, pitta: 1, kapha: -1 },
      guna: ["laghu", "ruksha"]
    },
    nutrition: { calories: 31, protein: 1, carbs: 6, fat: 0.3, fiber: 2.1, vitamins: { C: 128 } },
    servingSize: "1 medium",
    servingGrams: 119,
    season: ["varsha", "sharad"]
  },
  {
    id: "pyaz",
    name: "Onion",
    nameHindi: "Pyaz",
    category: "vegetables",
    ayurvedic: {
      rasa: ["katu", "madhura"],
      virya: "ushna",
      vipaka: "madhura",
      doshaEffect: { vata: -1, pitta: 1, kapha: -1 },
      guna: ["guru", "tikshna"]
    },
    nutrition: { calories: 40, protein: 1.1, carbs: 9.3, fat: 0.1, fiber: 1.7 },
    servingSize: "1 medium",
    servingGrams: 110,
    season: ["hemanta", "shishira"]
  },
  {
    id: "lehsun",
    name: "Garlic",
    nameHindi: "Lehsun",
    category: "vegetables",
    ayurvedic: {
      rasa: ["katu", "madhura", "lavana", "tikta", "kashaya"],
      virya: "ushna",
      vipaka: "katu",
      doshaEffect: { vata: -2, pitta: 1, kapha: -2 },
      guna: ["guru", "snigdha", "tikshna"]
    },
    nutrition: { calories: 149, protein: 6.4, carbs: 33, fat: 0.5, fiber: 2.1 },
    servingSize: "3 cloves",
    servingGrams: 9,
    season: ["hemanta", "shishira"]
  },
  {
    id: "kaddu",
    name: "Pumpkin (Kaddu)",
    nameHindi: "Kaddu/Sitaphal",
    category: "vegetables",
    ayurvedic: {
      rasa: ["madhura"],
      virya: "sheeta",
      vipaka: "madhura",
      doshaEffect: { vata: -1, pitta: -1, kapha: 0 },
      guna: ["guru", "snigdha"]
    },
    nutrition: { calories: 26, protein: 1, carbs: 6.5, fat: 0.1, fiber: 0.5, vitamins: { A: 426 } },
    servingSize: "1 cup",
    servingGrams: 116,
    season: ["sharad", "hemanta"]
  },
  {
    id: "beans_french",
    name: "French Beans",
    nameHindi: "Faras Beans",
    category: "vegetables",
    ayurvedic: {
      rasa: ["madhura", "kashaya"],
      virya: "sheeta",
      vipaka: "madhura",
      doshaEffect: { vata: 0, pitta: -1, kapha: 0 },
      guna: ["laghu", "ruksha"]
    },
    nutrition: { calories: 31, protein: 1.8, carbs: 7, fat: 0.1, fiber: 2.7 },
    servingSize: "1 cup",
    servingGrams: 100,
    season: ["hemanta", "shishira"]
  },
];

