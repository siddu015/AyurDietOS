import { NextRequest, NextResponse } from 'next/server';
import { saveMealLog, getMealLogs, db } from '@/lib/db';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { userId, mealType, foodItems, totalCalories, totalProtein, totalCarbs, totalFat, notes } = body;

        if (!userId || !mealType || !foodItems) {
            return NextResponse.json({ error: 'userId, mealType, and foodItems are required' }, { status: 400 });
        }

        const id = saveMealLog({
            userId,
            mealType,
            foodItems: typeof foodItems === 'string' ? foodItems : JSON.stringify(foodItems),
            totalCalories: totalCalories || 0,
            totalProtein: totalProtein || 0,
            totalCarbs: totalCarbs || 0,
            totalFat: totalFat || 0,
            notes: notes || '',
        });

        return NextResponse.json({ success: true, id });
    } catch (error) {
        console.error('Meal log save error:', error);
        return NextResponse.json({ error: 'Failed to save meal log' }, { status: 500 });
    }
}

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId');
        const date = searchParams.get('date'); // YYYY-MM-DD format
        const limit = parseInt(searchParams.get('limit') || '20');

        if (!userId) {
            return NextResponse.json({ error: 'userId is required' }, { status: 400 });
        }

        if (date) {
            // Get logs for a specific date
            const stmt = db.prepare(`
        SELECT * FROM meal_logs 
        WHERE user_id = ? AND DATE(logged_at) = ?
        ORDER BY logged_at DESC
      `);
            const logs = stmt.all(userId, date);
            const parsed = logs.map((log: any) => ({
                ...log,
                food_items: JSON.parse(log.food_items || '[]'),
            }));

            // Calculate daily totals
            const totals = parsed.reduce((acc: any, log: any) => ({
                calories: acc.calories + (log.total_calories || 0),
                protein: acc.protein + (log.total_protein || 0),
                carbs: acc.carbs + (log.total_carbs || 0),
                fat: acc.fat + (log.total_fat || 0),
            }), { calories: 0, protein: 0, carbs: 0, fat: 0 });

            return NextResponse.json({ logs: parsed, totals, date });
        }

        // Get recent logs
        const logs = getMealLogs(userId, limit);
        const parsed = logs.map((log: any) => ({
            ...log,
            food_items: JSON.parse(log.food_items || '[]'),
        }));

        return NextResponse.json({ logs: parsed });
    } catch (error) {
        console.error('Meal log fetch error:', error);
        return NextResponse.json({ error: 'Failed to fetch meal logs' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'id is required' }, { status: 400 });
        }

        const stmt = db.prepare('DELETE FROM meal_logs WHERE id = ?');
        stmt.run(id);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Meal log delete error:', error);
        return NextResponse.json({ error: 'Failed to delete meal log' }, { status: 500 });
    }
}
