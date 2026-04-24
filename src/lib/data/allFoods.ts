// Combined foods database - 400+ items (Indian + International)

import { expandedFoods } from './foods-expanded';
import { moreFoods } from './foods-expanded-2';
import { westernFoods } from './foods-international-western';
import { asianFoods } from './foods-international-asian';
import { mediterraneanFoods } from './foods-international-mediterranean';
import { latamFoods } from './foods-international-latam';
import { Food } from '../types';

const allSources: Food[][] = [
  expandedFoods,
  moreFoods,
  westernFoods,
  asianFoods,
  mediterraneanFoods,
  latamFoods,
];

// Merge and deduplicate by id
const foodMap = new Map<string, Food>();
for (const source of allSources) {
  for (const food of source) {
    foodMap.set(food.id, food);
  }
}

// Export as array
export const allFoods: Food[] = Array.from(foodMap.values());

// Export count for verification
export const foodCount = allFoods.length;

// Export by category for convenience
export const foodsByCategory = allFoods.reduce((acc, food) => {
  if (!acc[food.category]) {
    acc[food.category] = [];
  }
  acc[food.category].push(food);
  return acc;
}, {} as Record<string, Food[]>);

// Category counts
export const categoryCounts = Object.entries(foodsByCategory).reduce((acc, [category, foods]) => {
  acc[category] = foods.length;
  return acc;
}, {} as Record<string, number>);

// Group by origin/cuisine
export const foodsByOrigin = allFoods.reduce((acc, food) => {
  const origin = food.origin || 'indian';
  if (!acc[origin]) {
    acc[origin] = [];
  }
  acc[origin].push(food);
  return acc;
}, {} as Record<string, Food[]>);



