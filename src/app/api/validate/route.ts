import { NextRequest, NextResponse } from 'next/server';
import { 
  checkFoodPairCompatibility, 
  checkMealCompatibility,
  checkFoodAddition,
  getCompatibilitySummary 
} from '@/lib/algorithms';
import { getFoodById } from '@/lib/data';
import { Food, Meal, MealItem } from '@/lib/types';

/**
 * Viruddha Aahara (Food Compatibility) Validation API
 * 
 * POST /api/validate
 * 
 * Check food combinations for Ayurvedic incompatibilities.
 * This endpoint is designed as a swap point for future ML model integration.
 * 
 * Request Body (for pair check):
 * {
 *   type: 'pair',
 *   food1Id: string,
 *   food2Id: string
 * }
 * 
 * Request Body (for meal check):
 * {
 *   type: 'meal',
 *   foods: Array<{ foodId: string, quantity: number }>
 * }
 * 
 * Request Body (for addition check):
 * {
 *   type: 'addition',
 *   existingFoods: string[],  // Array of food IDs
 *   newFoodId: string
 * }
 * 
 * Response:
 * {
 *   success: boolean,
 *   data: {
 *     isCompatible: boolean,
 *     warnings: ViruddhaWarning[],
 *     summary: string
 *   }
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type } = body;

    if (!type) {
      return NextResponse.json(
        { success: false, error: 'Missing required field: type' },
        { status: 400 }
      );
    }

    let result;

    switch (type) {
      case 'pair': {
        const { food1Id, food2Id } = body;
        
        if (!food1Id || !food2Id) {
          return NextResponse.json(
            { success: false, error: 'Missing required fields: food1Id and food2Id' },
            { status: 400 }
          );
        }

        const food1 = getFoodById(food1Id);
        const food2 = getFoodById(food2Id);

        if (!food1 || !food2) {
          return NextResponse.json(
            { success: false, error: 'One or both foods not found' },
            { status: 404 }
          );
        }

        // FUTURE: Replace with ML model call for advanced compatibility prediction
        // Example:
        // result = await mlCompatibilityModel.checkPair({ food1, food2 });
        
        result = checkFoodPairCompatibility(food1, food2);
        break;
      }

      case 'meal': {
        const { foods: mealFoods } = body;
        
        if (!mealFoods || !Array.isArray(mealFoods)) {
          return NextResponse.json(
            { success: false, error: 'Missing required field: foods (array)' },
            { status: 400 }
          );
        }

        // Build meal object
        const mealItems: MealItem[] = mealFoods
          .map((item: { foodId: string; quantity: number }) => {
            const food = getFoodById(item.foodId);
            return food ? {
              foodId: item.foodId,
              food,
              quantity: item.quantity || 1,
              unit: food.servingSize,
            } : null;
          })
          .filter(Boolean) as MealItem[];

        const meal: Meal = {
          id: 'validation_temp',
          name: 'Validation',
          type: 'lunch',
          foods: mealItems,
          totalNutrition: { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 },
          rasaCoverage: [],
          overallDoshaEffect: { vata: 0, pitta: 0, kapha: 0 },
        };

        result = checkMealCompatibility(meal);
        break;
      }

      case 'addition': {
        const { existingFoods, newFoodId } = body;
        
        if (!existingFoods || !newFoodId) {
          return NextResponse.json(
            { success: false, error: 'Missing required fields: existingFoods and newFoodId' },
            { status: 400 }
          );
        }

        const existingFoodObjects = existingFoods
          .map((id: string) => getFoodById(id))
          .filter(Boolean) as Food[];

        const newFood = getFoodById(newFoodId);
        
        if (!newFood) {
          return NextResponse.json(
            { success: false, error: `New food not found: ${newFoodId}` },
            { status: 404 }
          );
        }

        result = checkFoodAddition(existingFoodObjects, newFood);
        break;
      }

      default:
        return NextResponse.json(
          { success: false, error: `Invalid type. Must be: pair, meal, or addition` },
          { status: 400 }
        );
    }

    return NextResponse.json({
      success: true,
      data: {
        isCompatible: result.isCompatible,
        warnings: result.warnings.map(w => ({
          food1: w.food1,
          food2: w.food2,
          severity: w.rule.severity,
          type: w.rule.type,
          reason: w.rule.reason,
          reference: w.rule.reference,
        })),
        counts: {
          severe: result.severeCount,
          moderate: result.moderateCount,
          mild: result.mildCount,
        },
        summary: getCompatibilitySummary(result),
      },
      _meta: {
        algorithm: 'graph-lookup-v1',
        timestamp: new Date().toISOString(),
      }
    });

  } catch (error) {
    console.error('Validate API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/validate/rules
 * 
 * Get all viruddha rules for reference.
 */
export async function GET(request: NextRequest) {
  try {
    const { viruddhaRules } = await import('@/lib/data');

    return NextResponse.json({
      success: true,
      data: viruddhaRules.map(rule => ({
        id: rule.id,
        food1: rule.food1,
        food2: rule.food2,
        category1: rule.category1,
        category2: rule.category2,
        type: rule.type,
        severity: rule.severity,
        reason: rule.reason,
        reference: rule.reference,
      })),
      total: viruddhaRules.length,
    });

  } catch (error) {
    console.error('Validate API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

