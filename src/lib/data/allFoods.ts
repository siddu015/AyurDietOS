// Combined foods database - 105 items
// This exports the merged array from both expanded files

import { expandedFoods } from './foods-expanded';
import { moreFoods } from './foods-expanded-2';
import { Food } from '../types';

// Merge and deduplicate by id
const foodMap = new Map<string, Food>();

// Add base foods first
expandedFoods.forEach(food => {
  foodMap.set(food.id, food);
});

// Add/override with more foods
moreFoods.forEach(food => {
  foodMap.set(food.id, food);
});

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

