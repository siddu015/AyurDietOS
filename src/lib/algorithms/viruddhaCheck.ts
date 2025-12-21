import { Food, ViruddhaRule, Meal, MealItem } from '../types';
import { viruddhaRules, getFoodById } from '../data';

interface ViruddhaWarning {
  rule: ViruddhaRule;
  food1: string;
  food2: string;
  message: string;
}

interface ViruddhaCheckResult {
  isCompatible: boolean;
  warnings: ViruddhaWarning[];
  severeCount: number;
  moderateCount: number;
  mildCount: number;
}

/**
 * Viruddha Aahara Checker
 * Detects incompatible food combinations based on Ayurvedic principles
 */

// Build adjacency list for O(1) lookup
const incompatibilityGraph = buildIncompatibilityGraph();

function buildIncompatibilityGraph(): Map<string, ViruddhaRule[]> {
  const graph = new Map<string, ViruddhaRule[]>();

  viruddhaRules.forEach(rule => {
    // Add both directions for easy lookup
    const key1 = `${rule.food1}_${rule.food2}`;
    const key2 = `${rule.food2}_${rule.food1}`;

    if (!graph.has(rule.food1)) graph.set(rule.food1, []);
    if (!graph.has(rule.food2)) graph.set(rule.food2, []);

    graph.get(rule.food1)!.push(rule);
    graph.get(rule.food2)!.push(rule);

    // Also index by category if specified
    if (rule.category1) {
      if (!graph.has(rule.category1)) graph.set(rule.category1, []);
      graph.get(rule.category1)!.push(rule);
    }
    if (rule.category2) {
      if (!graph.has(rule.category2)) graph.set(rule.category2, []);
      graph.get(rule.category2)!.push(rule);
    }
  });

  return graph;
}

/**
 * Check if two foods are compatible
 */
export function checkFoodPairCompatibility(
  food1: Food | string,
  food2: Food | string
): ViruddhaCheckResult {
  const f1 = typeof food1 === 'string' ? getFoodById(food1) : food1;
  const f2 = typeof food2 === 'string' ? getFoodById(food2) : food2;

  if (!f1 || !f2) {
    return {
      isCompatible: true,
      warnings: [],
      severeCount: 0,
      moderateCount: 0,
      mildCount: 0,
    };
  }

  const warnings: ViruddhaWarning[] = [];

  // Check direct food-to-food incompatibility
  const directRules = findMatchingRules(f1, f2);
  directRules.forEach(rule => {
    warnings.push({
      rule,
      food1: f1.name,
      food2: f2.name,
      message: formatWarningMessage(rule, f1.name, f2.name),
    });
  });

  // Check category-based incompatibility
  const categoryRules = findCategoryRules(f1, f2);
  categoryRules.forEach(rule => {
    // Avoid duplicates
    if (!warnings.some(w => w.rule.id === rule.id)) {
      warnings.push({
        rule,
        food1: f1.name,
        food2: f2.name,
        message: formatWarningMessage(rule, f1.name, f2.name),
      });
    }
  });

  return {
    isCompatible: warnings.length === 0,
    warnings,
    severeCount: warnings.filter(w => w.rule.severity === 'severe').length,
    moderateCount: warnings.filter(w => w.rule.severity === 'moderate').length,
    mildCount: warnings.filter(w => w.rule.severity === 'mild').length,
  };
}

function findMatchingRules(food1: Food, food2: Food): ViruddhaRule[] {
  const rules: ViruddhaRule[] = [];

  // Get all rules associated with food1
  const food1Rules = incompatibilityGraph.get(food1.id) || [];

  food1Rules.forEach(rule => {
    // Check if this rule applies to food2
    if (
      rule.food1 === food2.id ||
      rule.food2 === food2.id ||
      rule.category1 === food2.category ||
      rule.category2 === food2.category
    ) {
      rules.push(rule);
    }
  });

  return rules;
}

function findCategoryRules(food1: Food, food2: Food): ViruddhaRule[] {
  const rules: ViruddhaRule[] = [];

  // Check rules based on categories
  const cat1Rules = incompatibilityGraph.get(food1.category) || [];
  const cat2Rules = incompatibilityGraph.get(food2.category) || [];

  [...cat1Rules, ...cat2Rules].forEach(rule => {
    if (
      (rule.category1 === food1.category && rule.category2 === food2.category) ||
      (rule.category1 === food2.category && rule.category2 === food1.category)
    ) {
      rules.push(rule);
    }
  });

  return rules;
}

function formatWarningMessage(rule: ViruddhaRule, food1: string, food2: string): string {
  const severityEmoji = {
    severe: 'SEVERE',
    moderate: 'MODERATE',
    mild: 'MILD',
  };

  return `[${severityEmoji[rule.severity]}] ${food1} + ${food2}: ${rule.reason}`;
}

/**
 * Check a complete meal for incompatibilities
 */
export function checkMealCompatibility(meal: Meal): ViruddhaCheckResult {
  const warnings: ViruddhaWarning[] = [];
  const checkedPairs = new Set<string>();

  // Check all pairs of foods in the meal
  for (let i = 0; i < meal.foods.length; i++) {
    for (let j = i + 1; j < meal.foods.length; j++) {
      const food1 = meal.foods[i].food;
      const food2 = meal.foods[j].food;

      // Avoid checking the same pair twice
      const pairKey = [food1.id, food2.id].sort().join('_');
      if (checkedPairs.has(pairKey)) continue;
      checkedPairs.add(pairKey);

      const result = checkFoodPairCompatibility(food1, food2);
      warnings.push(...result.warnings);
    }
  }

  return {
    isCompatible: warnings.length === 0,
    warnings,
    severeCount: warnings.filter(w => w.rule.severity === 'severe').length,
    moderateCount: warnings.filter(w => w.rule.severity === 'moderate').length,
    mildCount: warnings.filter(w => w.rule.severity === 'mild').length,
  };
}

/**
 * Check if adding a food to a meal would create incompatibilities
 */
export function checkFoodAddition(
  existingFoods: (Food | MealItem)[],
  newFood: Food
): ViruddhaCheckResult {
  const warnings: ViruddhaWarning[] = [];

  existingFoods.forEach(item => {
    const food = 'food' in item ? item.food : item;
    const result = checkFoodPairCompatibility(food, newFood);
    warnings.push(...result.warnings);
  });

  return {
    isCompatible: warnings.length === 0,
    warnings,
    severeCount: warnings.filter(w => w.rule.severity === 'severe').length,
    moderateCount: warnings.filter(w => w.rule.severity === 'moderate').length,
    mildCount: warnings.filter(w => w.rule.severity === 'mild').length,
  };
}

/**
 * Get all known incompatibilities for a specific food
 */
export function getFoodIncompatibilities(foodId: string): ViruddhaRule[] {
  return incompatibilityGraph.get(foodId) || [];
}

/**
 * Get all incompatibilities for a food category
 */
export function getCategoryIncompatibilities(category: string): ViruddhaRule[] {
  return incompatibilityGraph.get(category) || [];
}

/**
 * Validate a diet plan for a specific time context
 */
export function checkTimeBasedRules(
  food: Food,
  timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night'
): ViruddhaWarning[] {
  const warnings: ViruddhaWarning[] = [];

  // Check yogurt at night rule
  if (food.id === 'yogurt' && timeOfDay === 'night') {
    const rule = viruddhaRules.find(r => r.id === 'yogurt_night');
    if (rule) {
      warnings.push({
        rule,
        food1: food.name,
        food2: 'Night time',
        message: `${food.name} should not be consumed at ${timeOfDay}. ${rule.reason}`,
      });
    }
  }

  return warnings;
}

/**
 * Get human-readable summary of incompatibility check
 */
export function getCompatibilitySummary(result: ViruddhaCheckResult): string {
  if (result.isCompatible) {
    return 'All foods in this combination are compatible according to Ayurvedic principles.';
  }

  const parts: string[] = [];

  if (result.severeCount > 0) {
    parts.push(`${result.severeCount} severe incompatibility(ies)`);
  }
  if (result.moderateCount > 0) {
    parts.push(`${result.moderateCount} moderate incompatibility(ies)`);
  }
  if (result.mildCount > 0) {
    parts.push(`${result.mildCount} mild incompatibility(ies)`);
  }

  return `Warning: Found ${parts.join(', ')}. Please review the detailed warnings.`;
}

/**
 * Export the graph for visualization
 */
export function getViruddhaGraph(): {
  nodes: Array<{ id: string; type: 'food' | 'category' }>;
  edges: Array<{ source: string; target: string; severity: string; type: string }>;
} {
  const nodes = new Map<string, { id: string; type: 'food' | 'category' }>();
  const edges: Array<{ source: string; target: string; severity: string; type: string }> = [];

  viruddhaRules.forEach(rule => {
    // Add nodes
    nodes.set(rule.food1, { id: rule.food1, type: 'food' });
    nodes.set(rule.food2, { id: rule.food2, type: 'food' });

    if (rule.category1) {
      nodes.set(rule.category1, { id: rule.category1, type: 'category' });
    }
    if (rule.category2) {
      nodes.set(rule.category2, { id: rule.category2, type: 'category' });
    }

    // Add edge
    edges.push({
      source: rule.food1,
      target: rule.food2,
      severity: rule.severity,
      type: rule.type,
    });
  });

  return {
    nodes: Array.from(nodes.values()),
    edges,
  };
}

