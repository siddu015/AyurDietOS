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
        migrate();
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
      password_hash TEXT,
      age INTEGER,
      gender TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS prakriti (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      vata INTEGER NOT NULL,
      pitta INTEGER NOT NULL,
      kapha INTEGER NOT NULL,
      dominant TEXT NOT NULL,
      secondary TEXT,
      assessed_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS user_health (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      conditions TEXT DEFAULT '[]',
      allergies TEXT DEFAULT '[]',
      dietary_preferences TEXT DEFAULT '[]',
      weight_goal TEXT DEFAULT 'maintain',
      calorie_target INTEGER,
      protein_target INTEGER
    );

    CREATE TABLE IF NOT EXISTS chat_messages (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      role TEXT NOT NULL,
      content TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS meal_logs (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      meal_type TEXT NOT NULL,
      food_items TEXT NOT NULL DEFAULT '[]',
      total_calories REAL DEFAULT 0,
      total_protein REAL DEFAULT 0,
      total_carbs REAL DEFAULT 0,
      total_fat REAL DEFAULT 0,
      notes TEXT,
      logged_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS sessions (
      token TEXT PRIMARY KEY,
      user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      expires_at DATETIME NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_prakriti_user_id ON prakriti(user_id);
    CREATE INDEX IF NOT EXISTS idx_prakriti_assessed_at ON prakriti(user_id, assessed_at DESC);
    CREATE INDEX IF NOT EXISTS idx_user_health_user_id ON user_health(user_id);
    CREATE INDEX IF NOT EXISTS idx_chat_messages_user_id ON chat_messages(user_id, created_at DESC);
    CREATE INDEX IF NOT EXISTS idx_meal_logs_user_id ON meal_logs(user_id, logged_at DESC);
    CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id);
    CREATE INDEX IF NOT EXISTS idx_sessions_expires_at ON sessions(expires_at);
  `);
}

/** Ensure columns added after initial release exist on older DBs. */
function migrate() {
    const database = _db!;
    const cols = database.prepare(`PRAGMA table_info(users)`).all() as { name: string }[];
    if (!cols.some(c => c.name === 'password_hash')) {
        database.exec(`ALTER TABLE users ADD COLUMN password_hash TEXT`);
    }
    // Drop legacy unused diet_plans table if present
    try {
        database.exec(`DROP TABLE IF EXISTS diet_plans`);
    } catch {
        // ignore
    }
}

// ── User CRUD ──

export function createUser(data: {
    name: string; email: string; passwordHash?: string; age?: number; gender?: string;
}) {
    const database = getDb();
    const id = uuidv4();
    database.prepare(
        'INSERT INTO users (id, name, email, password_hash, age, gender) VALUES (?, ?, ?, ?, ?, ?)'
    ).run(id, data.name, data.email, data.passwordHash ?? null, data.age ?? null, data.gender ?? null);
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
    const safeParse = <T>(v: unknown, fallback: T): T => {
        if (typeof v !== 'string') return fallback;
        try { return JSON.parse(v) as T; } catch { return fallback; }
    };
    return {
        ...row,
        conditions: safeParse<string[]>(row.conditions, []),
        allergies: safeParse<string[]>(row.allergies, []),
        dietary_preferences: safeParse<string[]>(row.dietary_preferences, []),
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

// ── Sessions ──

export function createSession(userId: string, token: string, ttlMs: number) {
    const database = getDb();
    const expiresAt = new Date(Date.now() + ttlMs).toISOString();
    database.prepare(
        'INSERT INTO sessions (token, user_id, expires_at) VALUES (?, ?, ?)'
    ).run(token, userId, expiresAt);
}

export function getSession(token: string): { userId: string; expiresAt: string } | null {
    const database = getDb();
    const row = database.prepare(
        'SELECT user_id, expires_at FROM sessions WHERE token = ?'
    ).get(token) as { user_id: string; expires_at: string } | undefined;
    if (!row) return null;
    if (new Date(row.expires_at).getTime() < Date.now()) {
        deleteSession(token);
        return null;
    }
    return { userId: row.user_id, expiresAt: row.expires_at };
}

export function deleteSession(token: string) {
    const database = getDb();
    database.prepare('DELETE FROM sessions WHERE token = ?').run(token);
}

export function purgeExpiredSessions() {
    const database = getDb();
    database.prepare('DELETE FROM sessions WHERE expires_at < ?').run(new Date().toISOString());
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
    // Never expose the password hash in responses
    if (user && 'password_hash' in user) {
        const { password_hash: _ignored, ...safeUser } = user;
        void _ignored;
        return { user: safeUser, prakriti, health };
    }
    return { user, prakriti, health };
}
