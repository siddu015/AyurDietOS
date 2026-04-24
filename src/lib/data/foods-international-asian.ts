import { Food } from '../types';

export const asianFoods: Food[] = [
  // ============ GRAINS & NOODLES (9 items) ============
  {
    id: 'rice_sushi',
    name: 'Sushi Rice',
    category: 'grains',
    origin: 'japanese',
    ayurvedic: {
      rasa: ['madhura'],
      virya: 'sheeta',
      vipaka: 'madhura',
      doshaEffect: { vata: -1, pitta: -1, kapha: 1 },
      guna: ['guru', 'snigdha']
    },
    nutrition: { calories: 169, protein: 3.5, carbs: 37, fat: 0.3, fiber: 0.9 },
    servingSize: '1 cup cooked',
    servingGrams: 155,
    season: ['varsha', 'sharad']
  },
  {
    id: 'rice_jasmine',
    name: 'Jasmine Rice',
    category: 'grains',
    origin: 'thai',
    ayurvedic: {
      rasa: ['madhura'],
      virya: 'sheeta',
      vipaka: 'madhura',
      doshaEffect: { vata: -1, pitta: -1, kapha: 1 },
      guna: ['laghu', 'snigdha']
    },
    nutrition: { calories: 181, protein: 3.5, carbs: 39, fat: 0.3, fiber: 0.6 },
    servingSize: '1 cup cooked',
    servingGrams: 158,
    season: ['varsha', 'sharad']
  },
  {
    id: 'rice_sticky',
    name: 'Sticky Rice (Glutinous)',
    category: 'grains',
    origin: 'thai',
    ayurvedic: {
      rasa: ['madhura'],
      virya: 'sheeta',
      vipaka: 'madhura',
      doshaEffect: { vata: -1, pitta: -1, kapha: 2 },
      guna: ['guru', 'snigdha', 'picchila']
    },
    nutrition: { calories: 169, protein: 3.5, carbs: 37, fat: 0.3, fiber: 1.7 },
    servingSize: '1 cup cooked',
    servingGrams: 155,
    season: ['hemanta', 'shishira']
  },
  {
    id: 'noodle_rice',
    name: 'Rice Noodles',
    category: 'grains',
    origin: 'vietnamese',
    ayurvedic: {
      rasa: ['madhura'],
      virya: 'sheeta',
      vipaka: 'madhura',
      doshaEffect: { vata: -1, pitta: -1, kapha: 1 },
      guna: ['laghu', 'snigdha']
    },
    nutrition: { calories: 192, protein: 1.6, carbs: 44, fat: 0.4, fiber: 1.8 },
    servingSize: '1 cup cooked',
    servingGrams: 176,
    season: ['grishma', 'sharad']
  },
  {
    id: 'noodle_udon',
    name: 'Udon Noodles',
    category: 'grains',
    origin: 'japanese',
    ayurvedic: {
      rasa: ['madhura'],
      virya: 'sheeta',
      vipaka: 'madhura',
      doshaEffect: { vata: -1, pitta: -1, kapha: 1 },
      guna: ['guru', 'snigdha']
    },
    nutrition: { calories: 228, protein: 7, carbs: 48, fat: 0.6, fiber: 1.8 },
    servingSize: '1 cup cooked',
    servingGrams: 198,
    season: ['hemanta', 'shishira']
  },
  {
    id: 'noodle_soba',
    name: 'Soba Noodles (Buckwheat)',
    category: 'grains',
    origin: 'japanese',
    ayurvedic: {
      rasa: ['madhura', 'kashaya'],
      virya: 'ushna',
      vipaka: 'katu',
      doshaEffect: { vata: 0, pitta: 0, kapha: -1 },
      guna: ['laghu', 'ruksha']
    },
    nutrition: { calories: 113, protein: 5.8, carbs: 24, fat: 0.1, fiber: 3 },
    servingSize: '1 cup cooked',
    servingGrams: 114,
    season: ['vasanta', 'grishma']
  },
  {
    id: 'noodle_ramen',
    name: 'Ramen Noodles',
    category: 'grains',
    origin: 'japanese',
    ayurvedic: {
      rasa: ['madhura', 'lavana'],
      virya: 'ushna',
      vipaka: 'madhura',
      doshaEffect: { vata: -1, pitta: 1, kapha: 1 },
      guna: ['guru', 'snigdha']
    },
    nutrition: { calories: 190, protein: 5, carbs: 27, fat: 7, fiber: 0.9 },
    servingSize: '1 serving',
    servingGrams: 85,
    season: ['hemanta', 'shishira']
  },
  {
    id: 'noodle_glass',
    name: 'Glass Noodles (Cellophane)',
    category: 'grains',
    origin: 'korean',
    ayurvedic: {
      rasa: ['madhura'],
      virya: 'sheeta',
      vipaka: 'madhura',
      doshaEffect: { vata: -1, pitta: -1, kapha: 1 },
      guna: ['laghu', 'snigdha']
    },
    nutrition: { calories: 160, protein: 0.1, carbs: 39, fat: 0, fiber: 0 },
    servingSize: '1 cup cooked',
    servingGrams: 140,
    season: ['grishma', 'sharad']
  },
  {
    id: 'mochi_plain',
    name: 'Mochi (Rice Cake)',
    category: 'grains',
    origin: 'japanese',
    ayurvedic: {
      rasa: ['madhura'],
      virya: 'sheeta',
      vipaka: 'madhura',
      doshaEffect: { vata: -1, pitta: -1, kapha: 2 },
      guna: ['guru', 'snigdha', 'picchila']
    },
    nutrition: { calories: 96, protein: 1, carbs: 22, fat: 0.2, fiber: 0.5 },
    servingSize: '1 piece',
    servingGrams: 44,
    season: ['hemanta', 'shishira']
  },

  // ============ LEGUMES & SOY (7 items) ============
  {
    id: 'tofu_firm',
    name: 'Firm Tofu',
    category: 'legumes',
    origin: 'chinese',
    ayurvedic: {
      rasa: ['madhura', 'kashaya'],
      virya: 'sheeta',
      vipaka: 'madhura',
      doshaEffect: { vata: 0, pitta: -1, kapha: 0 },
      guna: ['guru', 'snigdha']
    },
    nutrition: { calories: 144, protein: 17, carbs: 3, fat: 8, fiber: 2.3, minerals: { calcium: 683, iron: 2.7 } },
    servingSize: '1/2 cup',
    servingGrams: 126,
    season: ['grishma', 'sharad']
  },
  {
    id: 'tofu_silken',
    name: 'Silken Tofu',
    category: 'legumes',
    origin: 'japanese',
    ayurvedic: {
      rasa: ['madhura', 'kashaya'],
      virya: 'sheeta',
      vipaka: 'madhura',
      doshaEffect: { vata: -1, pitta: -1, kapha: 1 },
      guna: ['guru', 'snigdha', 'picchila']
    },
    nutrition: { calories: 55, protein: 5, carbs: 2.4, fat: 2.7, fiber: 0.1 },
    servingSize: '1/2 cup',
    servingGrams: 124,
    season: ['grishma', 'sharad']
  },
  {
    id: 'tempeh',
    name: 'Tempeh',
    category: 'legumes',
    origin: 'indonesian',
    ayurvedic: {
      rasa: ['madhura', 'kashaya', 'amla'],
      virya: 'ushna',
      vipaka: 'madhura',
      doshaEffect: { vata: -1, pitta: 0, kapha: 0 },
      guna: ['guru', 'snigdha']
    },
    nutrition: { calories: 192, protein: 20, carbs: 8, fat: 11, fiber: 7, minerals: { calcium: 111, iron: 2.7, magnesium: 81 } },
    servingSize: '100g',
    servingGrams: 100,
    season: ['hemanta', 'shishira']
  },
  {
    id: 'edamame',
    name: 'Edamame',
    category: 'legumes',
    origin: 'japanese',
    ayurvedic: {
      rasa: ['madhura', 'kashaya'],
      virya: 'sheeta',
      vipaka: 'madhura',
      doshaEffect: { vata: -1, pitta: -1, kapha: 0 },
      guna: ['guru', 'snigdha']
    },
    nutrition: { calories: 188, protein: 18, carbs: 14, fat: 8, fiber: 8, minerals: { calcium: 98, iron: 3.5 }, vitamins: { C: 9.5, K: 41 } },
    servingSize: '1 cup shelled',
    servingGrams: 155,
    season: ['grishma', 'varsha']
  },
  {
    id: 'miso_paste',
    name: 'Miso Paste',
    category: 'condiments',
    origin: 'japanese',
    ayurvedic: {
      rasa: ['amla', 'lavana', 'madhura'],
      virya: 'ushna',
      vipaka: 'amla',
      doshaEffect: { vata: -2, pitta: 1, kapha: 0 },
      guna: ['guru', 'snigdha']
    },
    nutrition: { calories: 34, protein: 2, carbs: 4.3, fat: 1, fiber: 0.9, minerals: { sodium: 634, zinc: 0.4 } },
    servingSize: '1 tbsp',
    servingGrams: 17,
    season: ['hemanta', 'shishira', 'vasanta']
  },
  {
    id: 'natto',
    name: 'Natto',
    category: 'legumes',
    origin: 'japanese',
    ayurvedic: {
      rasa: ['amla', 'madhura', 'kashaya'],
      virya: 'ushna',
      vipaka: 'amla',
      doshaEffect: { vata: -2, pitta: 1, kapha: -1 },
      guna: ['guru', 'snigdha', 'picchila']
    },
    nutrition: { calories: 212, protein: 18, carbs: 14, fat: 11, fiber: 5.4, minerals: { calcium: 217, iron: 8.6 }, vitamins: { K: 1103 } },
    servingSize: '100g',
    servingGrams: 100,
    season: ['hemanta', 'shishira']
  },
  {
    id: 'soy_milk',
    name: 'Soy Milk',
    category: 'beverages',
    origin: 'chinese',
    ayurvedic: {
      rasa: ['madhura', 'kashaya'],
      virya: 'sheeta',
      vipaka: 'madhura',
      doshaEffect: { vata: -1, pitta: -1, kapha: 1 },
      guna: ['guru', 'snigdha']
    },
    nutrition: { calories: 80, protein: 7, carbs: 4, fat: 4, fiber: 1, minerals: { calcium: 300, potassium: 300 } },
    servingSize: '1 cup',
    servingGrams: 240,
    season: ['grishma', 'sharad']
  },

  // ============ VEGETABLES (14 items) ============
  {
    id: 'bok_choy',
    name: 'Bok Choy',
    category: 'vegetables',
    origin: 'chinese',
    ayurvedic: {
      rasa: ['tikta', 'madhura'],
      virya: 'sheeta',
      vipaka: 'katu',
      doshaEffect: { vata: 0, pitta: -1, kapha: -1 },
      guna: ['laghu', 'ruksha']
    },
    nutrition: { calories: 9, protein: 1, carbs: 1.5, fat: 0.1, fiber: 0.7, minerals: { calcium: 74, potassium: 176 }, vitamins: { A: 3128, C: 31.5 } },
    servingSize: '1 cup shredded',
    servingGrams: 70,
    season: ['vasanta', 'sharad']
  },
  {
    id: 'napa_cabbage',
    name: 'Napa Cabbage',
    category: 'vegetables',
    origin: 'chinese',
    ayurvedic: {
      rasa: ['madhura', 'tikta'],
      virya: 'sheeta',
      vipaka: 'katu',
      doshaEffect: { vata: 1, pitta: -1, kapha: -1 },
      guna: ['laghu', 'ruksha']
    },
    nutrition: { calories: 13, protein: 1.2, carbs: 2.2, fat: 0.2, fiber: 1, vitamins: { C: 18.8, K: 32 } },
    servingSize: '1 cup shredded',
    servingGrams: 76,
    season: ['sharad', 'hemanta']
  },
  {
    id: 'daikon',
    name: 'Daikon Radish',
    category: 'vegetables',
    origin: 'japanese',
    ayurvedic: {
      rasa: ['katu', 'madhura'],
      virya: 'ushna',
      vipaka: 'katu',
      doshaEffect: { vata: -1, pitta: 1, kapha: -2 },
      guna: ['laghu', 'ruksha', 'tikshna']
    },
    nutrition: { calories: 18, protein: 0.6, carbs: 4.1, fat: 0.1, fiber: 1.6, vitamins: { C: 22 } },
    servingSize: '1 cup sliced',
    servingGrams: 116,
    season: ['hemanta', 'shishira']
  },
  {
    id: 'bamboo_shoots',
    name: 'Bamboo Shoots',
    category: 'vegetables',
    origin: 'chinese',
    ayurvedic: {
      rasa: ['madhura', 'kashaya'],
      virya: 'sheeta',
      vipaka: 'madhura',
      doshaEffect: { vata: 0, pitta: -1, kapha: -1 },
      guna: ['laghu', 'ruksha']
    },
    nutrition: { calories: 27, protein: 2.6, carbs: 5.2, fat: 0.3, fiber: 2.2, minerals: { potassium: 533 } },
    servingSize: '1 cup sliced',
    servingGrams: 120,
    season: ['vasanta', 'grishma']
  },
  {
    id: 'water_chestnuts',
    name: 'Water Chestnuts',
    category: 'vegetables',
    origin: 'chinese',
    ayurvedic: {
      rasa: ['madhura'],
      virya: 'sheeta',
      vipaka: 'madhura',
      doshaEffect: { vata: -1, pitta: -1, kapha: 0 },
      guna: ['laghu', 'snigdha']
    },
    nutrition: { calories: 60, protein: 0.9, carbs: 14.8, fat: 0.1, fiber: 1.8, minerals: { potassium: 362 } },
    servingSize: '1/2 cup sliced',
    servingGrams: 62,
    season: ['grishma', 'varsha']
  },
  {
    id: 'bean_sprouts',
    name: 'Bean Sprouts (Mung)',
    category: 'vegetables',
    origin: 'chinese',
    ayurvedic: {
      rasa: ['madhura', 'kashaya'],
      virya: 'sheeta',
      vipaka: 'madhura',
      doshaEffect: { vata: 0, pitta: -1, kapha: -1 },
      guna: ['laghu', 'ruksha']
    },
    nutrition: { calories: 31, protein: 3, carbs: 6.2, fat: 0.2, fiber: 1.8, vitamins: { C: 13.7 } },
    servingSize: '1 cup',
    servingGrams: 104,
    season: ['vasanta', 'grishma']
  },
  {
    id: 'lotus_root',
    name: 'Lotus Root',
    category: 'vegetables',
    origin: 'chinese',
    ayurvedic: {
      rasa: ['madhura', 'kashaya'],
      virya: 'sheeta',
      vipaka: 'madhura',
      doshaEffect: { vata: -1, pitta: -1, kapha: 0 },
      guna: ['guru', 'snigdha']
    },
    nutrition: { calories: 79, protein: 2.6, carbs: 19.3, fat: 0.1, fiber: 4.9, vitamins: { C: 44, B6: 0.3 } },
    servingSize: '1 cup sliced',
    servingGrams: 120,
    season: ['sharad', 'hemanta']
  },
  {
    id: 'mushroom_shiitake',
    name: 'Shiitake Mushroom',
    category: 'vegetables',
    origin: 'japanese',
    ayurvedic: {
      rasa: ['madhura', 'kashaya'],
      virya: 'sheeta',
      vipaka: 'madhura',
      doshaEffect: { vata: -1, pitta: 0, kapha: -1 },
      guna: ['laghu', 'ruksha']
    },
    nutrition: { calories: 34, protein: 2.2, carbs: 6.8, fat: 0.5, fiber: 2.5, minerals: { selenium: 5.7, copper: 0.9 }, vitamins: { D: 18 } },
    servingSize: '1/2 cup cooked',
    servingGrams: 72,
    season: ['sharad', 'hemanta']
  },
  {
    id: 'mushroom_enoki',
    name: 'Enoki Mushroom',
    category: 'vegetables',
    origin: 'japanese',
    ayurvedic: {
      rasa: ['madhura'],
      virya: 'sheeta',
      vipaka: 'madhura',
      doshaEffect: { vata: -1, pitta: -1, kapha: -1 },
      guna: ['laghu', 'ruksha']
    },
    nutrition: { calories: 24, protein: 1.7, carbs: 5.1, fat: 0.2, fiber: 1.8, vitamins: { B3: 3.6 } },
    servingSize: '1 cup',
    servingGrams: 65,
    season: ['hemanta', 'shishira']
  },
  {
    id: 'kabocha_squash',
    name: 'Kabocha Squash',
    category: 'vegetables',
    origin: 'japanese',
    ayurvedic: {
      rasa: ['madhura'],
      virya: 'sheeta',
      vipaka: 'madhura',
      doshaEffect: { vata: -1, pitta: -1, kapha: 1 },
      guna: ['guru', 'snigdha']
    },
    nutrition: { calories: 40, protein: 1.5, carbs: 9, fat: 0.2, fiber: 2.7, vitamins: { A: 4388, C: 11 }, minerals: { potassium: 364 } },
    servingSize: '1 cup cubed',
    servingGrams: 116,
    season: ['sharad', 'hemanta']
  },
  {
    id: 'bitter_melon',
    name: 'Bitter Melon (Karela)',
    category: 'vegetables',
    origin: 'chinese',
    ayurvedic: {
      rasa: ['tikta', 'katu'],
      virya: 'ushna',
      vipaka: 'katu',
      doshaEffect: { vata: 1, pitta: -2, kapha: -2 },
      guna: ['laghu', 'ruksha']
    },
    nutrition: { calories: 17, protein: 1, carbs: 3.7, fat: 0.2, fiber: 2.8, vitamins: { C: 84 } },
    servingSize: '1 cup sliced',
    servingGrams: 93,
    season: ['grishma', 'varsha']
  },
  {
    id: 'chinese_broccoli',
    name: 'Chinese Broccoli (Gai Lan)',
    category: 'vegetables',
    origin: 'chinese',
    ayurvedic: {
      rasa: ['tikta', 'kashaya'],
      virya: 'sheeta',
      vipaka: 'katu',
      doshaEffect: { vata: 1, pitta: -1, kapha: -1 },
      guna: ['laghu', 'ruksha']
    },
    nutrition: { calories: 26, protein: 1.2, carbs: 4, fat: 0.6, fiber: 2.6, vitamins: { A: 2622, C: 28 }, minerals: { calcium: 88 } },
    servingSize: '1 cup chopped',
    servingGrams: 88,
    season: ['sharad', 'hemanta']
  },
  {
    id: 'morning_glory',
    name: 'Morning Glory (Water Spinach)',
    category: 'vegetables',
    origin: 'thai',
    ayurvedic: {
      rasa: ['madhura', 'tikta'],
      virya: 'sheeta',
      vipaka: 'madhura',
      doshaEffect: { vata: 0, pitta: -1, kapha: -1 },
      guna: ['laghu', 'ruksha']
    },
    nutrition: { calories: 19, protein: 2.6, carbs: 3.1, fat: 0.2, fiber: 2, vitamins: { A: 6300, C: 55 }, minerals: { iron: 1.7 } },
    servingSize: '1 cup chopped',
    servingGrams: 56,
    season: ['grishma', 'varsha']
  },
  {
    id: 'taro_root',
    name: 'Taro Root',
    category: 'vegetables',
    origin: 'indonesian',
    ayurvedic: {
      rasa: ['madhura'],
      virya: 'sheeta',
      vipaka: 'madhura',
      doshaEffect: { vata: -1, pitta: -1, kapha: 1 },
      guna: ['guru', 'snigdha']
    },
    nutrition: { calories: 187, protein: 0.7, carbs: 46, fat: 0.1, fiber: 6.7, minerals: { potassium: 615, magnesium: 33 } },
    servingSize: '1 cup cooked',
    servingGrams: 132,
    season: ['hemanta', 'shishira']
  },

  // ============ FRUITS (10 items) ============
  {
    id: 'fruit_lychee',
    name: 'Lychee',
    category: 'fruits',
    origin: 'chinese',
    ayurvedic: {
      rasa: ['madhura', 'amla'],
      virya: 'sheeta',
      vipaka: 'madhura',
      doshaEffect: { vata: -1, pitta: -1, kapha: 1 },
      guna: ['laghu', 'snigdha']
    },
    nutrition: { calories: 63, protein: 0.8, carbs: 16, fat: 0.4, fiber: 1.3, vitamins: { C: 72 } },
    servingSize: '100g',
    servingGrams: 100,
    season: ['grishma']
  },
  {
    id: 'fruit_longan',
    name: 'Longan',
    category: 'fruits',
    origin: 'chinese',
    ayurvedic: {
      rasa: ['madhura'],
      virya: 'ushna',
      vipaka: 'madhura',
      doshaEffect: { vata: -1, pitta: 1, kapha: 1 },
      guna: ['laghu', 'snigdha']
    },
    nutrition: { calories: 60, protein: 1.3, carbs: 15, fat: 0.1, fiber: 1.1, vitamins: { C: 84 } },
    servingSize: '100g',
    servingGrams: 100,
    season: ['grishma', 'varsha']
  },
  {
    id: 'fruit_dragon',
    name: 'Dragon Fruit (Pitaya)',
    category: 'fruits',
    origin: 'vietnamese',
    ayurvedic: {
      rasa: ['madhura'],
      virya: 'sheeta',
      vipaka: 'madhura',
      doshaEffect: { vata: -1, pitta: -1, kapha: 0 },
      guna: ['laghu', 'snigdha']
    },
    nutrition: { calories: 60, protein: 1.2, carbs: 13, fat: 0.4, fiber: 3, vitamins: { C: 9.2 }, minerals: { iron: 1.9, magnesium: 40 } },
    servingSize: '1 medium fruit',
    servingGrams: 170,
    season: ['grishma', 'varsha']
  },
  {
    id: 'fruit_persimmon',
    name: 'Persimmon',
    category: 'fruits',
    origin: 'japanese',
    ayurvedic: {
      rasa: ['madhura', 'kashaya'],
      virya: 'sheeta',
      vipaka: 'madhura',
      doshaEffect: { vata: -1, pitta: -1, kapha: 1 },
      guna: ['guru', 'snigdha']
    },
    nutrition: { calories: 118, protein: 1, carbs: 31, fat: 0.3, fiber: 6, vitamins: { A: 2733, C: 12.6 } },
    servingSize: '1 medium fruit',
    servingGrams: 168,
    season: ['sharad', 'hemanta']
  },
  {
    id: 'fruit_yuzu',
    name: 'Yuzu',
    category: 'fruits',
    origin: 'japanese',
    ayurvedic: {
      rasa: ['amla', 'tikta'],
      virya: 'ushna',
      vipaka: 'amla',
      doshaEffect: { vata: -1, pitta: 1, kapha: -1 },
      guna: ['laghu', 'tikshna']
    },
    nutrition: { calories: 53, protein: 0.8, carbs: 14, fat: 0.3, fiber: 1.8, vitamins: { C: 150 } },
    servingSize: '1 fruit',
    servingGrams: 120,
    season: ['hemanta', 'shishira']
  },
  {
    id: 'fruit_starfruit',
    name: 'Starfruit (Carambola)',
    category: 'fruits',
    origin: 'indonesian',
    ayurvedic: {
      rasa: ['amla', 'madhura'],
      virya: 'sheeta',
      vipaka: 'amla',
      doshaEffect: { vata: -1, pitta: 0, kapha: -1 },
      guna: ['laghu', 'ruksha']
    },
    nutrition: { calories: 28, protein: 1, carbs: 6.1, fat: 0.3, fiber: 2.8, vitamins: { C: 34 } },
    servingSize: '1 medium fruit',
    servingGrams: 91,
    season: ['grishma', 'varsha']
  },
  {
    id: 'fruit_jackfruit',
    name: 'Jackfruit',
    category: 'fruits',
    origin: 'indonesian',
    ayurvedic: {
      rasa: ['madhura'],
      virya: 'sheeta',
      vipaka: 'madhura',
      doshaEffect: { vata: -1, pitta: 0, kapha: 2 },
      guna: ['guru', 'snigdha', 'picchila']
    },
    nutrition: { calories: 155, protein: 2.8, carbs: 40, fat: 0.6, fiber: 2.6, vitamins: { C: 22.6 }, minerals: { potassium: 739 } },
    servingSize: '1 cup sliced',
    servingGrams: 165,
    season: ['grishma', 'varsha']
  },
  {
    id: 'fruit_durian',
    name: 'Durian',
    category: 'fruits',
    origin: 'indonesian',
    ayurvedic: {
      rasa: ['madhura'],
      virya: 'ushna',
      vipaka: 'madhura',
      doshaEffect: { vata: -2, pitta: 1, kapha: 2 },
      guna: ['guru', 'snigdha']
    },
    nutrition: { calories: 357, protein: 3.6, carbs: 66, fat: 13, fiber: 9.2, vitamins: { C: 48, B6: 0.8 }, minerals: { potassium: 1060 } },
    servingSize: '1 cup chopped',
    servingGrams: 243,
    season: ['grishma']
  },
  {
    id: 'fruit_rambutan',
    name: 'Rambutan',
    category: 'fruits',
    origin: 'indonesian',
    ayurvedic: {
      rasa: ['madhura', 'amla'],
      virya: 'sheeta',
      vipaka: 'madhura',
      doshaEffect: { vata: -1, pitta: -1, kapha: 1 },
      guna: ['laghu', 'snigdha']
    },
    nutrition: { calories: 68, protein: 0.9, carbs: 16, fat: 0.3, fiber: 0.9, vitamins: { C: 36 } },
    servingSize: '100g',
    servingGrams: 100,
    season: ['grishma']
  },
  {
    id: 'fruit_mangosteen',
    name: 'Mangosteen',
    category: 'fruits',
    origin: 'indonesian',
    ayurvedic: {
      rasa: ['madhura', 'amla', 'kashaya'],
      virya: 'sheeta',
      vipaka: 'madhura',
      doshaEffect: { vata: -1, pitta: -1, kapha: 0 },
      guna: ['laghu', 'snigdha']
    },
    nutrition: { calories: 73, protein: 0.4, carbs: 18, fat: 0.6, fiber: 1.8, vitamins: { C: 12 } },
    servingSize: '1 cup',
    servingGrams: 196,
    season: ['grishma', 'varsha']
  },

  // ============ SEAFOOD (9 items) ============
  {
    id: 'sashimi_tuna',
    name: 'Tuna Sashimi',
    category: 'seafood',
    origin: 'japanese',
    ayurvedic: {
      rasa: ['madhura', 'lavana'],
      virya: 'ushna',
      vipaka: 'madhura',
      doshaEffect: { vata: -2, pitta: 1, kapha: 0 },
      guna: ['guru', 'snigdha']
    },
    nutrition: { calories: 122, protein: 26, carbs: 0, fat: 1.4, fiber: 0, minerals: { selenium: 42, iron: 1.1 }, vitamins: { B12: 2.1, D: 5.7 } },
    servingSize: '100g',
    servingGrams: 100,
    season: ['hemanta', 'shishira']
  },
  {
    id: 'sashimi_salmon',
    name: 'Salmon Sashimi',
    category: 'seafood',
    origin: 'japanese',
    ayurvedic: {
      rasa: ['madhura', 'lavana'],
      virya: 'ushna',
      vipaka: 'madhura',
      doshaEffect: { vata: -2, pitta: 1, kapha: 1 },
      guna: ['guru', 'snigdha']
    },
    nutrition: { calories: 177, protein: 25, carbs: 0, fat: 8, fiber: 0, minerals: { selenium: 37 }, vitamins: { D: 11, B12: 3.2 } },
    servingSize: '100g',
    servingGrams: 100,
    season: ['hemanta', 'shishira']
  },
  {
    id: 'shrimp_tempura',
    name: 'Shrimp Tempura',
    category: 'seafood',
    origin: 'japanese',
    ayurvedic: {
      rasa: ['madhura', 'lavana'],
      virya: 'ushna',
      vipaka: 'madhura',
      doshaEffect: { vata: -1, pitta: 1, kapha: 1 },
      guna: ['guru', 'snigdha']
    },
    nutrition: { calories: 230, protein: 14, carbs: 17, fat: 12, fiber: 0.5, minerals: { selenium: 22 } },
    servingSize: '4 pieces',
    servingGrams: 120,
    season: ['hemanta', 'shishira']
  },
  {
    id: 'squid',
    name: 'Squid (Calamari)',
    category: 'seafood',
    origin: 'japanese',
    ayurvedic: {
      rasa: ['madhura', 'lavana'],
      virya: 'sheeta',
      vipaka: 'madhura',
      doshaEffect: { vata: -1, pitta: 0, kapha: 0 },
      guna: ['laghu', 'snigdha']
    },
    nutrition: { calories: 92, protein: 15.6, carbs: 3.1, fat: 1.4, fiber: 0, minerals: { selenium: 44, zinc: 1.5 } },
    servingSize: '100g',
    servingGrams: 100,
    season: ['sharad', 'hemanta']
  },
  {
    id: 'octopus',
    name: 'Octopus',
    category: 'seafood',
    origin: 'korean',
    ayurvedic: {
      rasa: ['madhura', 'lavana'],
      virya: 'sheeta',
      vipaka: 'madhura',
      doshaEffect: { vata: -1, pitta: 0, kapha: 0 },
      guna: ['guru', 'snigdha']
    },
    nutrition: { calories: 82, protein: 15, carbs: 2.2, fat: 1, fiber: 0, minerals: { iron: 5.3, selenium: 45 }, vitamins: { B12: 20 } },
    servingSize: '100g',
    servingGrams: 100,
    season: ['sharad', 'hemanta']
  },
  {
    id: 'sea_bass',
    name: 'Sea Bass',
    category: 'seafood',
    origin: 'japanese',
    ayurvedic: {
      rasa: ['madhura'],
      virya: 'sheeta',
      vipaka: 'madhura',
      doshaEffect: { vata: -1, pitta: 0, kapha: 0 },
      guna: ['laghu', 'snigdha']
    },
    nutrition: { calories: 124, protein: 24, carbs: 0, fat: 2.6, fiber: 0, minerals: { selenium: 36 }, vitamins: { D: 6.8 } },
    servingSize: '1 fillet',
    servingGrams: 124,
    season: ['sharad', 'hemanta']
  },
  {
    id: 'mackerel',
    name: 'Mackerel (Saba)',
    category: 'seafood',
    origin: 'japanese',
    ayurvedic: {
      rasa: ['madhura', 'lavana'],
      virya: 'ushna',
      vipaka: 'madhura',
      doshaEffect: { vata: -2, pitta: 1, kapha: 1 },
      guna: ['guru', 'snigdha']
    },
    nutrition: { calories: 230, protein: 21, carbs: 0, fat: 16, fiber: 0, minerals: { selenium: 44 }, vitamins: { D: 16, B12: 8.7 } },
    servingSize: '1 fillet',
    servingGrams: 112,
    season: ['hemanta', 'shishira']
  },
  {
    id: 'eel_unagi',
    name: 'Eel (Unagi)',
    category: 'seafood',
    origin: 'japanese',
    ayurvedic: {
      rasa: ['madhura', 'lavana'],
      virya: 'ushna',
      vipaka: 'madhura',
      doshaEffect: { vata: -2, pitta: 1, kapha: 1 },
      guna: ['guru', 'snigdha']
    },
    nutrition: { calories: 236, protein: 24, carbs: 0, fat: 15, fiber: 0, vitamins: { A: 3477, D: 23, B12: 3.4 } },
    servingSize: '100g',
    servingGrams: 100,
    season: ['hemanta', 'shishira']
  },
  {
    id: 'crab_meat',
    name: 'Crab Meat',
    category: 'seafood',
    origin: 'korean',
    ayurvedic: {
      rasa: ['madhura', 'lavana'],
      virya: 'sheeta',
      vipaka: 'madhura',
      doshaEffect: { vata: -1, pitta: 0, kapha: 0 },
      guna: ['laghu', 'snigdha']
    },
    nutrition: { calories: 87, protein: 18, carbs: 0, fat: 1.5, fiber: 0, minerals: { zinc: 6.5, selenium: 37 }, vitamins: { B12: 9 } },
    servingSize: '100g',
    servingGrams: 100,
    season: ['sharad', 'hemanta']
  },

  // ============ MEAT (5 items) ============
  {
    id: 'chicken_teriyaki',
    name: 'Teriyaki Chicken',
    category: 'meat',
    origin: 'japanese',
    ayurvedic: {
      rasa: ['madhura', 'lavana'],
      virya: 'ushna',
      vipaka: 'madhura',
      doshaEffect: { vata: -1, pitta: 1, kapha: 1 },
      guna: ['guru', 'snigdha']
    },
    nutrition: { calories: 213, protein: 29, carbs: 8, fat: 7, fiber: 0, minerals: { sodium: 680 } },
    servingSize: '1 thigh',
    servingGrams: 140,
    season: ['hemanta', 'shishira']
  },
  {
    id: 'pork_char_siu',
    name: 'Char Siu Pork',
    category: 'meat',
    origin: 'chinese',
    ayurvedic: {
      rasa: ['madhura', 'lavana'],
      virya: 'ushna',
      vipaka: 'madhura',
      doshaEffect: { vata: -2, pitta: 1, kapha: 2 },
      guna: ['guru', 'snigdha']
    },
    nutrition: { calories: 270, protein: 22, carbs: 14, fat: 14, fiber: 0, minerals: { sodium: 590, iron: 1.2 } },
    servingSize: '100g',
    servingGrams: 100,
    season: ['hemanta', 'shishira']
  },
  {
    id: 'beef_korean_bbq',
    name: 'Korean BBQ Beef (Bulgogi)',
    category: 'meat',
    origin: 'korean',
    ayurvedic: {
      rasa: ['madhura', 'lavana'],
      virya: 'ushna',
      vipaka: 'madhura',
      doshaEffect: { vata: -2, pitta: 2, kapha: 1 },
      guna: ['guru', 'snigdha']
    },
    nutrition: { calories: 259, protein: 24, carbs: 10, fat: 14, fiber: 0.3, minerals: { iron: 2.5, zinc: 5.3 } },
    servingSize: '100g',
    servingGrams: 100,
    season: ['hemanta', 'shishira']
  },
  {
    id: 'duck_peking',
    name: 'Peking Duck',
    category: 'meat',
    origin: 'chinese',
    ayurvedic: {
      rasa: ['madhura', 'lavana'],
      virya: 'ushna',
      vipaka: 'madhura',
      doshaEffect: { vata: -2, pitta: 1, kapha: 2 },
      guna: ['guru', 'snigdha']
    },
    nutrition: { calories: 337, protein: 19, carbs: 0, fat: 28, fiber: 0, minerals: { iron: 2.7, zinc: 1.9 }, vitamins: { B3: 5.3 } },
    servingSize: '100g',
    servingGrams: 100,
    season: ['hemanta', 'shishira']
  },
  {
    id: 'pork_belly',
    name: 'Pork Belly (Samgyeopsal)',
    category: 'meat',
    origin: 'korean',
    ayurvedic: {
      rasa: ['madhura', 'lavana'],
      virya: 'ushna',
      vipaka: 'madhura',
      doshaEffect: { vata: -2, pitta: 2, kapha: 2 },
      guna: ['guru', 'snigdha']
    },
    nutrition: { calories: 518, protein: 9, carbs: 0, fat: 53, fiber: 0, minerals: { selenium: 11, zinc: 1.2 } },
    servingSize: '100g',
    servingGrams: 100,
    season: ['hemanta', 'shishira']
  },

  // ============ CONDIMENTS & SAUCES (12 items) ============
  {
    id: 'soy_sauce',
    name: 'Soy Sauce',
    category: 'condiments',
    origin: 'chinese',
    ayurvedic: {
      rasa: ['lavana', 'amla'],
      virya: 'ushna',
      vipaka: 'amla',
      doshaEffect: { vata: -1, pitta: 1, kapha: 0 },
      guna: ['laghu', 'tikshna']
    },
    nutrition: { calories: 8, protein: 1.3, carbs: 0.8, fat: 0, fiber: 0, minerals: { sodium: 879 } },
    servingSize: '1 tbsp',
    servingGrams: 16,
    season: ['hemanta', 'shishira', 'varsha']
  },
  {
    id: 'fish_sauce',
    name: 'Fish Sauce',
    category: 'condiments',
    origin: 'thai',
    ayurvedic: {
      rasa: ['lavana', 'amla'],
      virya: 'ushna',
      vipaka: 'amla',
      doshaEffect: { vata: -2, pitta: 2, kapha: 0 },
      guna: ['laghu', 'tikshna']
    },
    nutrition: { calories: 6, protein: 0.9, carbs: 0.7, fat: 0, fiber: 0, minerals: { sodium: 1413 } },
    servingSize: '1 tbsp',
    servingGrams: 18,
    season: ['hemanta', 'shishira']
  },
  {
    id: 'oyster_sauce',
    name: 'Oyster Sauce',
    category: 'condiments',
    origin: 'chinese',
    ayurvedic: {
      rasa: ['madhura', 'lavana'],
      virya: 'ushna',
      vipaka: 'madhura',
      doshaEffect: { vata: -1, pitta: 1, kapha: 1 },
      guna: ['guru', 'snigdha']
    },
    nutrition: { calories: 9, protein: 0.2, carbs: 2, fat: 0, fiber: 0, minerals: { sodium: 437 } },
    servingSize: '1 tbsp',
    servingGrams: 16,
    season: ['hemanta', 'shishira']
  },
  {
    id: 'sriracha',
    name: 'Sriracha Sauce',
    category: 'condiments',
    origin: 'thai',
    ayurvedic: {
      rasa: ['katu', 'amla', 'lavana'],
      virya: 'ushna',
      vipaka: 'katu',
      doshaEffect: { vata: -1, pitta: 2, kapha: -2 },
      guna: ['laghu', 'tikshna']
    },
    nutrition: { calories: 5, protein: 0.1, carbs: 1, fat: 0.1, fiber: 0.1, minerals: { sodium: 100 } },
    servingSize: '1 tsp',
    servingGrams: 5,
    season: ['hemanta', 'shishira']
  },
  {
    id: 'wasabi',
    name: 'Wasabi',
    category: 'condiments',
    origin: 'japanese',
    ayurvedic: {
      rasa: ['katu'],
      virya: 'ushna',
      vipaka: 'katu',
      doshaEffect: { vata: -1, pitta: 2, kapha: -2 },
      guna: ['laghu', 'tikshna', 'ruksha']
    },
    nutrition: { calories: 46, protein: 0.1, carbs: 10.1, fat: 0.6, fiber: 0.5 },
    servingSize: '1 tsp',
    servingGrams: 5,
    season: ['hemanta', 'shishira']
  },
  {
    id: 'gochujang',
    name: 'Gochujang (Korean Chili Paste)',
    category: 'condiments',
    origin: 'korean',
    ayurvedic: {
      rasa: ['katu', 'madhura', 'lavana'],
      virya: 'ushna',
      vipaka: 'katu',
      doshaEffect: { vata: -1, pitta: 2, kapha: -1 },
      guna: ['guru', 'snigdha', 'tikshna']
    },
    nutrition: { calories: 15, protein: 0.5, carbs: 3, fat: 0.2, fiber: 0.4, minerals: { sodium: 228 } },
    servingSize: '1 tsp',
    servingGrams: 6,
    season: ['hemanta', 'shishira']
  },
  {
    id: 'hoisin_sauce',
    name: 'Hoisin Sauce',
    category: 'condiments',
    origin: 'chinese',
    ayurvedic: {
      rasa: ['madhura', 'lavana', 'katu'],
      virya: 'ushna',
      vipaka: 'madhura',
      doshaEffect: { vata: -1, pitta: 1, kapha: 1 },
      guna: ['guru', 'snigdha']
    },
    nutrition: { calories: 35, protein: 0.5, carbs: 7, fat: 0.5, fiber: 0.4, minerals: { sodium: 258 } },
    servingSize: '1 tbsp',
    servingGrams: 16,
    season: ['hemanta', 'shishira']
  },
  {
    id: 'rice_vinegar',
    name: 'Rice Vinegar',
    category: 'condiments',
    origin: 'japanese',
    ayurvedic: {
      rasa: ['amla'],
      virya: 'ushna',
      vipaka: 'amla',
      doshaEffect: { vata: -1, pitta: 1, kapha: -1 },
      guna: ['laghu', 'tikshna']
    },
    nutrition: { calories: 2, protein: 0, carbs: 0, fat: 0, fiber: 0 },
    servingSize: '1 tbsp',
    servingGrams: 15
  },
  {
    id: 'sesame_oil',
    name: 'Sesame Oil',
    category: 'oils',
    origin: 'chinese',
    ayurvedic: {
      rasa: ['madhura', 'tikta', 'kashaya'],
      virya: 'ushna',
      vipaka: 'madhura',
      doshaEffect: { vata: -2, pitta: 0, kapha: 1 },
      guna: ['guru', 'snigdha', 'tikshna']
    },
    nutrition: { calories: 120, protein: 0, carbs: 0, fat: 14, fiber: 0, vitamins: { E: 0.2, K: 1.8 } },
    servingSize: '1 tbsp',
    servingGrams: 14,
    season: ['hemanta', 'shishira']
  },
  {
    id: 'coconut_aminos',
    name: 'Coconut Aminos',
    category: 'condiments',
    origin: 'indonesian',
    ayurvedic: {
      rasa: ['madhura', 'lavana'],
      virya: 'sheeta',
      vipaka: 'madhura',
      doshaEffect: { vata: -1, pitta: -1, kapha: 1 },
      guna: ['laghu', 'snigdha']
    },
    nutrition: { calories: 5, protein: 0, carbs: 1, fat: 0, fiber: 0, minerals: { sodium: 90 } },
    servingSize: '1 tsp',
    servingGrams: 5
  },
  {
    id: 'mirin',
    name: 'Mirin (Sweet Rice Wine)',
    category: 'condiments',
    origin: 'japanese',
    ayurvedic: {
      rasa: ['madhura'],
      virya: 'ushna',
      vipaka: 'madhura',
      doshaEffect: { vata: -1, pitta: 1, kapha: 1 },
      guna: ['guru', 'snigdha']
    },
    nutrition: { calories: 35, protein: 0, carbs: 8, fat: 0, fiber: 0 },
    servingSize: '1 tbsp',
    servingGrams: 15,
    season: ['hemanta', 'shishira']
  },
  {
    id: 'curry_paste_thai',
    name: 'Thai Curry Paste (Red)',
    category: 'condiments',
    origin: 'thai',
    ayurvedic: {
      rasa: ['katu', 'amla', 'lavana'],
      virya: 'ushna',
      vipaka: 'katu',
      doshaEffect: { vata: -1, pitta: 2, kapha: -2 },
      guna: ['laghu', 'tikshna', 'ruksha']
    },
    nutrition: { calories: 15, protein: 0.4, carbs: 2, fat: 0.7, fiber: 0.5 },
    servingSize: '1 tbsp',
    servingGrams: 16,
    season: ['hemanta', 'shishira', 'varsha']
  },

  // ============ BEVERAGES (5 items) ============
  {
    id: 'tea_matcha',
    name: 'Matcha Green Tea',
    category: 'beverages',
    origin: 'japanese',
    ayurvedic: {
      rasa: ['tikta', 'kashaya'],
      virya: 'sheeta',
      vipaka: 'katu',
      doshaEffect: { vata: 0, pitta: -1, kapha: -1 },
      guna: ['laghu', 'ruksha']
    },
    nutrition: { calories: 3, protein: 0.3, carbs: 0.4, fat: 0, fiber: 0, vitamins: { C: 1.6 }, minerals: { potassium: 27 } },
    servingSize: '1 cup',
    servingGrams: 240,
    season: ['vasanta', 'grishma', 'sharad']
  },
  {
    id: 'tea_oolong',
    name: 'Oolong Tea',
    category: 'beverages',
    origin: 'chinese',
    ayurvedic: {
      rasa: ['tikta', 'kashaya'],
      virya: 'sheeta',
      vipaka: 'katu',
      doshaEffect: { vata: 0, pitta: -1, kapha: -1 },
      guna: ['laghu', 'ruksha']
    },
    nutrition: { calories: 2, protein: 0, carbs: 0.4, fat: 0, fiber: 0, minerals: { potassium: 12 } },
    servingSize: '1 cup',
    servingGrams: 240,
    season: ['vasanta', 'grishma', 'sharad']
  },
  {
    id: 'sake',
    name: 'Sake (Rice Wine)',
    category: 'beverages',
    origin: 'japanese',
    ayurvedic: {
      rasa: ['madhura', 'amla'],
      virya: 'ushna',
      vipaka: 'amla',
      doshaEffect: { vata: -1, pitta: 2, kapha: 1 },
      guna: ['laghu', 'tikshna']
    },
    nutrition: { calories: 134, protein: 0.5, carbs: 5, fat: 0, fiber: 0 },
    servingSize: '1 cup',
    servingGrams: 180,
    season: ['hemanta', 'shishira']
  },
  {
    id: 'bubble_tea',
    name: 'Bubble Tea (Boba)',
    category: 'beverages',
    origin: 'chinese',
    ayurvedic: {
      rasa: ['madhura'],
      virya: 'sheeta',
      vipaka: 'madhura',
      doshaEffect: { vata: -1, pitta: -1, kapha: 2 },
      guna: ['guru', 'snigdha']
    },
    nutrition: { calories: 240, protein: 2, carbs: 56, fat: 3, fiber: 0 },
    servingSize: '1 cup (16 oz)',
    servingGrams: 480,
    season: ['grishma']
  },
  {
    id: 'coconut_water',
    name: 'Coconut Water',
    category: 'beverages',
    origin: 'thai',
    ayurvedic: {
      rasa: ['madhura'],
      virya: 'sheeta',
      vipaka: 'madhura',
      doshaEffect: { vata: -1, pitta: -2, kapha: 0 },
      guna: ['laghu', 'snigdha']
    },
    nutrition: { calories: 46, protein: 1.7, carbs: 9, fat: 0.5, fiber: 2.6, minerals: { potassium: 600, sodium: 252 } },
    servingSize: '1 cup',
    servingGrams: 240,
    season: ['grishma', 'varsha']
  },

  // ============ SWEETS (4 items) ============
  {
    id: 'red_bean_paste',
    name: 'Red Bean Paste (Anko)',
    category: 'sweets',
    origin: 'japanese',
    ayurvedic: {
      rasa: ['madhura'],
      virya: 'sheeta',
      vipaka: 'madhura',
      doshaEffect: { vata: -1, pitta: -1, kapha: 1 },
      guna: ['guru', 'snigdha']
    },
    nutrition: { calories: 130, protein: 3.5, carbs: 28, fat: 0.2, fiber: 3, minerals: { iron: 1.6 } },
    servingSize: '2 tbsp',
    servingGrams: 40,
    season: ['sharad', 'hemanta']
  },
  {
    id: 'mochi_ice_cream',
    name: 'Mochi Ice Cream',
    category: 'sweets',
    origin: 'japanese',
    ayurvedic: {
      rasa: ['madhura'],
      virya: 'sheeta',
      vipaka: 'madhura',
      doshaEffect: { vata: -1, pitta: -1, kapha: 2 },
      guna: ['guru', 'snigdha', 'sheeta']
    },
    nutrition: { calories: 100, protein: 1.5, carbs: 16, fat: 3.5, fiber: 0 },
    servingSize: '1 piece',
    servingGrams: 47,
    season: ['grishma']
  },
  {
    id: 'taiyaki',
    name: 'Taiyaki (Fish-shaped Cake)',
    category: 'sweets',
    origin: 'japanese',
    ayurvedic: {
      rasa: ['madhura'],
      virya: 'ushna',
      vipaka: 'madhura',
      doshaEffect: { vata: -1, pitta: 0, kapha: 2 },
      guna: ['guru', 'snigdha']
    },
    nutrition: { calories: 200, protein: 4, carbs: 38, fat: 4, fiber: 1.5 },
    servingSize: '1 piece',
    servingGrams: 90,
    season: ['hemanta', 'shishira']
  },
  {
    id: 'coconut_dessert_thai',
    name: 'Thai Coconut Dessert (Khanom)',
    category: 'sweets',
    origin: 'thai',
    ayurvedic: {
      rasa: ['madhura'],
      virya: 'sheeta',
      vipaka: 'madhura',
      doshaEffect: { vata: -1, pitta: -1, kapha: 2 },
      guna: ['guru', 'snigdha']
    },
    nutrition: { calories: 180, protein: 2, carbs: 24, fat: 9, fiber: 1 },
    servingSize: '1 serving',
    servingGrams: 100,
    season: ['grishma']
  },

  // ============ SEAWEED (4 items) ============
  {
    id: 'seaweed_nori',
    name: 'Nori (Seaweed Sheet)',
    category: 'vegetables',
    origin: 'japanese',
    ayurvedic: {
      rasa: ['lavana', 'madhura'],
      virya: 'sheeta',
      vipaka: 'madhura',
      doshaEffect: { vata: -1, pitta: 0, kapha: -1 },
      guna: ['laghu', 'ruksha']
    },
    nutrition: { calories: 5, protein: 1, carbs: 1, fat: 0, fiber: 0.3, minerals: { iodine: 16, iron: 0.3 }, vitamins: { A: 260, C: 4 } },
    servingSize: '1 sheet',
    servingGrams: 3,
    season: ['vasanta', 'grishma', 'sharad', 'hemanta']
  },
  {
    id: 'seaweed_wakame',
    name: 'Wakame Seaweed',
    category: 'vegetables',
    origin: 'japanese',
    ayurvedic: {
      rasa: ['lavana', 'madhura'],
      virya: 'sheeta',
      vipaka: 'madhura',
      doshaEffect: { vata: -1, pitta: 0, kapha: -1 },
      guna: ['laghu', 'snigdha']
    },
    nutrition: { calories: 5, protein: 0.5, carbs: 0.9, fat: 0.1, fiber: 0.1, minerals: { iodine: 93, calcium: 15, magnesium: 11 } },
    servingSize: '2 tbsp',
    servingGrams: 10,
    season: ['vasanta', 'grishma', 'sharad', 'hemanta']
  },
  {
    id: 'seaweed_kombu',
    name: 'Kombu (Kelp)',
    category: 'vegetables',
    origin: 'japanese',
    ayurvedic: {
      rasa: ['lavana', 'madhura'],
      virya: 'sheeta',
      vipaka: 'madhura',
      doshaEffect: { vata: -1, pitta: 0, kapha: -1 },
      guna: ['guru', 'snigdha']
    },
    nutrition: { calories: 6, protein: 0.2, carbs: 1.3, fat: 0.1, fiber: 0.2, minerals: { iodine: 1350, calcium: 17 } },
    servingSize: '1 strip (3")',
    servingGrams: 5,
    season: ['vasanta', 'grishma', 'sharad', 'hemanta']
  },
  {
    id: 'seaweed_dulse',
    name: 'Dulse Seaweed',
    category: 'vegetables',
    origin: 'korean',
    ayurvedic: {
      rasa: ['lavana', 'madhura'],
      virya: 'sheeta',
      vipaka: 'madhura',
      doshaEffect: { vata: -1, pitta: 0, kapha: -1 },
      guna: ['laghu', 'ruksha']
    },
    nutrition: { calories: 5, protein: 0.5, carbs: 0.8, fat: 0, fiber: 0.2, minerals: { iodine: 72, iron: 0.6, potassium: 68 } },
    servingSize: '1 tbsp dried',
    servingGrams: 5,
    season: ['vasanta', 'grishma', 'sharad', 'hemanta']
  },

  // ============ SPICES & AROMATICS (5 items) ============
  {
    id: 'spice_lemongrass',
    name: 'Lemongrass',
    category: 'spices',
    origin: 'thai',
    ayurvedic: {
      rasa: ['katu', 'tikta'],
      virya: 'ushna',
      vipaka: 'katu',
      doshaEffect: { vata: -1, pitta: 1, kapha: -2 },
      guna: ['laghu', 'tikshna', 'ruksha']
    },
    nutrition: { calories: 5, protein: 0.2, carbs: 1.2, fat: 0, fiber: 0.3 },
    servingSize: '1 stalk',
    servingGrams: 12,
    season: ['grishma', 'varsha']
  },
  {
    id: 'spice_galangal',
    name: 'Galangal',
    category: 'spices',
    origin: 'thai',
    ayurvedic: {
      rasa: ['katu'],
      virya: 'ushna',
      vipaka: 'katu',
      doshaEffect: { vata: -2, pitta: 1, kapha: -2 },
      guna: ['laghu', 'tikshna']
    },
    nutrition: { calories: 15, protein: 0.3, carbs: 3, fat: 0.2, fiber: 0.5 },
    servingSize: '1 inch piece',
    servingGrams: 15,
    season: ['hemanta', 'shishira', 'varsha']
  },
  {
    id: 'spice_star_anise',
    name: 'Star Anise',
    category: 'spices',
    origin: 'chinese',
    ayurvedic: {
      rasa: ['madhura', 'katu'],
      virya: 'ushna',
      vipaka: 'madhura',
      doshaEffect: { vata: -2, pitta: 1, kapha: -1 },
      guna: ['laghu', 'snigdha']
    },
    nutrition: { calories: 5, protein: 0.3, carbs: 0.8, fat: 0.3, fiber: 0.2 },
    servingSize: '1 whole star',
    servingGrams: 3,
    season: ['hemanta', 'shishira']
  },
  {
    id: 'spice_five_spice',
    name: 'Chinese Five Spice',
    category: 'spices',
    origin: 'chinese',
    ayurvedic: {
      rasa: ['katu', 'madhura', 'tikta'],
      virya: 'ushna',
      vipaka: 'katu',
      doshaEffect: { vata: -2, pitta: 1, kapha: -1 },
      guna: ['laghu', 'tikshna']
    },
    nutrition: { calories: 10, protein: 0.3, carbs: 2, fat: 0.4, fiber: 0.6 },
    servingSize: '1 tsp',
    servingGrams: 3,
    season: ['hemanta', 'shishira']
  },
  {
    id: 'spice_gochugaru',
    name: 'Gochugaru (Korean Chili Flakes)',
    category: 'spices',
    origin: 'korean',
    ayurvedic: {
      rasa: ['katu', 'madhura'],
      virya: 'ushna',
      vipaka: 'katu',
      doshaEffect: { vata: -1, pitta: 2, kapha: -2 },
      guna: ['laghu', 'tikshna', 'ruksha']
    },
    nutrition: { calories: 15, protein: 0.6, carbs: 2.5, fat: 0.7, fiber: 1.2, vitamins: { A: 1490, C: 3.6 } },
    servingSize: '1 tbsp',
    servingGrams: 5,
    season: ['hemanta', 'shishira']
  },

  // ============ FERMENTED & PICKLED (2 items) ============
  {
    id: 'kimchi',
    name: 'Kimchi',
    category: 'vegetables',
    origin: 'korean',
    ayurvedic: {
      rasa: ['amla', 'lavana', 'katu'],
      virya: 'ushna',
      vipaka: 'amla',
      doshaEffect: { vata: -2, pitta: 1, kapha: -1 },
      guna: ['laghu', 'tikshna']
    },
    nutrition: { calories: 15, protein: 1.1, carbs: 2.4, fat: 0.5, fiber: 1.6, vitamins: { C: 18, K: 43 }, minerals: { sodium: 498 } },
    servingSize: '1/2 cup',
    servingGrams: 75,
    season: ['hemanta', 'shishira', 'varsha']
  },
  {
    id: 'pickled_ginger',
    name: 'Pickled Ginger (Gari)',
    category: 'condiments',
    origin: 'japanese',
    ayurvedic: {
      rasa: ['katu', 'amla'],
      virya: 'ushna',
      vipaka: 'katu',
      doshaEffect: { vata: -1, pitta: 1, kapha: -1 },
      guna: ['laghu', 'tikshna']
    },
    nutrition: { calories: 20, protein: 0.1, carbs: 4.5, fat: 0, fiber: 0.2, minerals: { sodium: 340 } },
    servingSize: '1 tbsp',
    servingGrams: 15,
    season: ['hemanta', 'shishira']
  }
];
