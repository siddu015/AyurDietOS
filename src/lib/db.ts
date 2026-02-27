import Database from 'better-sqlite3';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const DB_PATH = path.join(process.cwd(), 'ayurdiet.db');

let _db: Database.Database | null = null;

function getDb(): Database.Database {
    if (!_db) {
        _db = new Database(DB_PATH);
        _db.pragma('journal_mode = WAL');
        _db.pragma('foreign_keys = ON');
        initSchema();
    }
    return _db;
}

function initSchema() {
    const database = _db!;

    database.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      age INTEGER,
      gender TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS prakriti (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL REFERENCES users(id),
      vata INTEGER NOT NULL,
      pitta INTEGER NOT NULL,
      kapha INTEGER NOT NULL,
      dominant TEXT NOT NULL,
      secondary TEXT,
      assessed_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS user_health (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL REFERENCES users(id),
      conditions TEXT DEFAULT '[]',
      allergies TEXT DEFAULT '[]',
      dietary_preferences TEXT DEFAULT '[]',
      weight_goal TEXT DEFAULT 'maintain',
      calorie_target INTEGER,
      protein_target INTEGER
    );

    CREATE TABLE IF NOT EXISTS chat_messages (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL REFERENCES users(id),
      role TEXT NOT NULL,
      content TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS meal_logs (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL REFERENCES users(id),
      meal_type TEXT NOT NULL,
      food_items TEXT NOT NULL DEFAULT '[]',
      total_calories REAL DEFAULT 0,
      total_protein REAL DEFAULT 0,
      total_carbs REAL DEFAULT 0,
      total_fat REAL DEFAULT 0,
      notes TEXT,
      logged_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS diet_plans (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL REFERENCES users(id),
      name TEXT NOT NULL,
      plan_data TEXT NOT NULL,
      condition TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);
}

// ── User CRUD ──

export function createUser(data: { name: string; email: string; age?: number; gender?: string }) {
    const database = getDb();
    const id = uuidv4();
    database.prepare(
        'INSERT INTO users (id, name, email, age, gender) VALUES (?, ?, ?, ?, ?)'
    ).run(id, data.name, data.email, data.age ?? null, data.gender ?? null);
    return { id, ...data };
}

export function getUserByEmail(email: string) {
    const database = getDb();
    return database.prepare('SELECT * FROM users WHERE email = ?').get(email) as Record<string, unknown> | undefined;
}

export function getUserById(id: string) {
    const database = getDb();
    return database.prepare('SELECT * FROM users WHERE id = ?').get(id) as Record<string, unknown> | undefined;
}

export function updateUser(id: string, data: { name?: string; age?: number; gender?: string }) {
    const database = getDb();
    const fields: string[] = [];
    const values: unknown[] = [];
    if (data.name !== undefined) { fields.push('name = ?'); values.push(data.name); }
    if (data.age !== undefined) { fields.push('age = ?'); values.push(data.age); }
    if (data.gender !== undefined) { fields.push('gender = ?'); values.push(data.gender); }
    if (fields.length === 0) return;
    values.push(id);
    database.prepare(`UPDATE users SET ${fields.join(', ')} WHERE id = ?`).run(...values);
}

// ── Prakriti CRUD ──

export function savePrakriti(data: {
    userId: string; vata: number; pitta: number; kapha: number;
    dominant: string; secondary?: string;
}) {
    const database = getDb();
    const id = uuidv4();
    database.prepare(
        'INSERT INTO prakriti (id, user_id, vata, pitta, kapha, dominant, secondary) VALUES (?, ?, ?, ?, ?, ?, ?)'
    ).run(id, data.userId, data.vata, data.pitta, data.kapha, data.dominant, data.secondary ?? null);
    return id;
}

export function getLatestPrakriti(userId: string) {
    const database = getDb();
    return database.prepare(
        'SELECT * FROM prakriti WHERE user_id = ? ORDER BY assessed_at DESC LIMIT 1'
    ).get(userId) as Record<string, unknown> | undefined;
}

// ── Health CRUD ──

export function saveUserHealth(data: {
    userId: string; conditions?: string[]; allergies?: string[];
    dietaryPreferences?: string[]; weightGoal?: string;
    calorieTarget?: number; proteinTarget?: number;
}) {
    const database = getDb();
    const existing = database.prepare('SELECT id FROM user_health WHERE user_id = ?').get(data.userId) as { id: string } | undefined;

    if (existing) {
        database.prepare(`
      UPDATE user_health SET conditions = ?, allergies = ?, dietary_preferences = ?,
      weight_goal = ?, calorie_target = ?, protein_target = ? WHERE user_id = ?
    `).run(
            JSON.stringify(data.conditions ?? []), JSON.stringify(data.allergies ?? []),
            JSON.stringify(data.dietaryPreferences ?? []), data.weightGoal ?? 'maintain',
            data.calorieTarget ?? null, data.proteinTarget ?? null, data.userId
        );
    } else {
        const id = uuidv4();
        database.prepare(`
      INSERT INTO user_health (id, user_id, conditions, allergies, dietary_preferences, weight_goal, calorie_target, protein_target)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
            id, data.userId, JSON.stringify(data.conditions ?? []), JSON.stringify(data.allergies ?? []),
            JSON.stringify(data.dietaryPreferences ?? []), data.weightGoal ?? 'maintain',
            data.calorieTarget ?? null, data.proteinTarget ?? null
        );
    }
}

export function getUserHealth(userId: string) {
    const database = getDb();
    const row = database.prepare('SELECT * FROM user_health WHERE user_id = ?').get(userId) as Record<string, unknown> | undefined;
    if (!row) return null;
    return {
        ...row,
        conditions: JSON.parse(row.conditions as string),
        allergies: JSON.parse(row.allergies as string),
        dietary_preferences: JSON.parse(row.dietary_preferences as string),
    };
}

// ── Chat Messages ──

export function saveChatMessage(data: { userId: string; role: string; content: string }) {
    const database = getDb();
    const id = uuidv4();
    database.prepare(
        'INSERT INTO chat_messages (id, user_id, role, content) VALUES (?, ?, ?, ?)'
    ).run(id, data.userId, data.role, data.content);
    return id;
}

export function getChatHistory(userId: string, limit = 50) {
    const database = getDb();
    return database.prepare(
        'SELECT * FROM chat_messages WHERE user_id = ? ORDER BY created_at DESC LIMIT ?'
    ).all(userId, limit) as Record<string, unknown>[];
}

// ── Meal Logs ──

export function saveMealLog(data: {
    userId: string; mealType: string; foodItems: string;
    totalCalories?: number; totalProtein?: number;
    totalCarbs?: number; totalFat?: number; notes?: string;
}) {
    const database = getDb();
    const id = uuidv4();
    database.prepare(
        'INSERT INTO meal_logs (id, user_id, meal_type, food_items, total_calories, total_protein, total_carbs, total_fat, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
    ).run(id, data.userId, data.mealType, data.foodItems,
        data.totalCalories ?? 0, data.totalProtein ?? 0,
        data.totalCarbs ?? 0, data.totalFat ?? 0, data.notes ?? null);
    return id;
}

export function getMealLogs(userId: string, limit = 20) {
    const database = getDb();
    return database.prepare(
        'SELECT * FROM meal_logs WHERE user_id = ? ORDER BY logged_at DESC LIMIT ?'
    ).all(userId, limit) as Record<string, unknown>[];
}

// ── Direct DB access (for advanced queries) ──
export { getDb as getDatabase };
export const db = {
    prepare: (sql: string) => getDb().prepare(sql),
};

// ── Full Profile Helper ──

export function getFullProfile(userId: string) {
    const user = getUserById(userId);
    if (!user) return null;
    const prakriti = getLatestPrakriti(userId);
    const health = getUserHealth(userId);
    return { user, prakriti, health };
}
