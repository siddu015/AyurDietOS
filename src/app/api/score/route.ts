import { NextRequest, NextResponse } from 'next/server';
import { calculateANHScore, rankFoodsForPatient } from '@/lib/algorithms';
import { getFoodById, foods } from '@/lib/data';
import { PatientProfile, Food } from '@/lib/types';

/**
 * ANH-Score API Endpoint
 * 
 * POST /api/score
 * 
 * Calculate ANH score for a food item based on patient profile.
 * This endpoint is designed as a swap point for future ML model integration.
 * 
 * Request Body:
 * {
 *   foodId: string,           // Food ID to score
 *   patient: PatientProfile,  // Patient data
 *   config?: {                // Optional scoring configuration
 *     ayurvedicWeight?: number,
 *     nutritionalWeight?: number,
 *     calorieTarget?: number,
 *     proteinTarget?: number
 *   }
 * }
 * 
 * Response:
 * {
 *   success: boolean,
 *   data: ANHScoreResult
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { foodId, patient, config } = body;

    // Validate required fields
    if (!foodId || !patient) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: foodId and patient' },
        { status: 400 }
      );
    }

    // Get food from database
    const food = getFoodById(foodId);
    if (!food) {
      return NextResponse.json(
        { success: false, error: `Food not found: ${foodId}` },
        { status: 404 }
      );
    }

    // Calculate ANH score
    // FUTURE: This is where you'd call your trained ML model API instead
    // Example:
    // const score = await mlModelClient.predict({ food, patient, config });
    
    const score = calculateANHScore(food, patient as PatientProfile, config);

    return NextResponse.json({
      success: true,
      data: score,
      // Metadata for debugging/monitoring
      _meta: {
        algorithm: 'rule-based-v1',
        timestamp: new Date().toISOString(),
        // FUTURE: Add model version, inference time, etc.
      }
    });

  } catch (error) {
    console.error('Score API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/score?patient=...
 * 
 * Get ranked list of all foods for a patient.
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const patientJson = searchParams.get('patient');
    const limit = parseInt(searchParams.get('limit') || '20');

    if (!patientJson) {
      return NextResponse.json(
        { success: false, error: 'Missing patient query parameter' },
        { status: 400 }
      );
    }

    const patient: PatientProfile = JSON.parse(patientJson);

    // Rank all foods for patient
    const rankedFoods = rankFoodsForPatient(foods, patient)
      .slice(0, limit)
      .map(({ food, score }) => ({
        foodId: food.id,
        name: food.name,
        category: food.category,
        score: score.totalScore,
        ayurvedicScore: score.ayurvedicScore,
        nutritionalScore: score.nutritionalScore,
      }));

    return NextResponse.json({
      success: true,
      data: rankedFoods,
      total: foods.length,
      limit,
    });

  } catch (error) {
    console.error('Score API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

