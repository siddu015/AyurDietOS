import { NextRequest, NextResponse } from 'next/server';
import { composeMeal, generateDailyPlan } from '@/lib/algorithms';
import { PatientProfile, MealType, MealCompositionConstraints } from '@/lib/types';

/**
 * Meal Composition API Endpoint
 * 
 * POST /api/meal
 * 
 * Generate a balanced meal using the constraint satisfaction algorithm.
 * This endpoint is designed as a swap point for future ML model integration.
 * 
 * Request Body:
 * {
 *   patient: PatientProfile,
 *   mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack',
 *   constraints?: MealCompositionConstraints
 * }
 * 
 * Response:
 * {
 *   success: boolean,
 *   data: ComposedMeal
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { patient, mealType, constraints } = body;

    // Validate required fields
    if (!patient || !mealType) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: patient and mealType' },
        { status: 400 }
      );
    }

    // Validate meal type
    const validMealTypes: MealType[] = ['breakfast', 'lunch', 'dinner', 'snack'];
    if (!validMealTypes.includes(mealType)) {
      return NextResponse.json(
        { success: false, error: `Invalid mealType. Must be one of: ${validMealTypes.join(', ')}` },
        { status: 400 }
      );
    }

    // Generate meal
    // FUTURE: Replace with ML model call
    // Example:
    // const composedMeal = await mlMealGenerator.generate({ patient, mealType, constraints });
    
    const composedMeal = composeMeal(
      patient as PatientProfile, 
      mealType as MealType, 
      constraints
    );

    return NextResponse.json({
      success: true,
      data: {
        meal: {
          id: composedMeal.meal.id,
          name: composedMeal.meal.name,
          type: composedMeal.meal.type,
          foods: composedMeal.meal.foods.map(item => ({
            foodId: item.foodId,
            name: item.food.name,
            quantity: item.quantity,
            unit: item.unit,
            nutrition: item.food.nutrition,
          })),
          totalNutrition: composedMeal.meal.totalNutrition,
          rasaCoverage: composedMeal.meal.rasaCoverage,
          overallDoshaEffect: composedMeal.meal.overallDoshaEffect,
        },
        anhScore: composedMeal.totalANHScore,
        constraintsSatisfied: composedMeal.constraintsSatisfied,
        constraintDetails: composedMeal.constraintDetails,
      },
      _meta: {
        algorithm: 'csp-greedy-v1',
        timestamp: new Date().toISOString(),
      }
    });

  } catch (error) {
    console.error('Meal API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/meal/daily?patient=...
 * 
 * Generate a full daily meal plan.
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const patientJson = searchParams.get('patient');

    if (!patientJson) {
      return NextResponse.json(
        { success: false, error: 'Missing patient query parameter' },
        { status: 400 }
      );
    }

    const patient: PatientProfile = JSON.parse(patientJson);

    // Generate daily plan
    const dailyPlan = generateDailyPlan(patient);

    // Transform response
    const transformMeal = (composed: typeof dailyPlan.breakfast) => ({
      meal: {
        id: composed.meal.id,
        name: composed.meal.name,
        type: composed.meal.type,
        foods: composed.meal.foods.map(item => ({
          foodId: item.foodId,
          name: item.food.name,
          quantity: item.quantity,
          unit: item.unit,
        })),
        totalNutrition: composed.meal.totalNutrition,
        rasaCoverage: composed.meal.rasaCoverage,
      },
      anhScore: composed.totalANHScore,
      constraintsSatisfied: composed.constraintsSatisfied,
    });

    return NextResponse.json({
      success: true,
      data: {
        breakfast: transformMeal(dailyPlan.breakfast),
        lunch: transformMeal(dailyPlan.lunch),
        dinner: transformMeal(dailyPlan.dinner),
        snack: dailyPlan.snack ? transformMeal(dailyPlan.snack) : null,
      },
      _meta: {
        algorithm: 'csp-greedy-v1',
        timestamp: new Date().toISOString(),
      }
    });

  } catch (error) {
    console.error('Meal API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

