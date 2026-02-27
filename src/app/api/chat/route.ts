import { NextRequest, NextResponse } from 'next/server';
import { getFullProfile, saveChatMessage, getChatHistory } from '@/lib/db';
import { calculateANHScore, rankFoodsForPatient } from '@/lib/algorithms/anhScore';
import { composeMeal } from '@/lib/algorithms/mealComposer';
import { checkFoodPairCompatibility } from '@/lib/algorithms/viruddhaCheck';
import { findSubstitutes, type SubstitutionReason } from '@/lib/algorithms/substitution';
import { foods, conditions } from '@/lib/data';
import type { PatientProfile, DietaryPreference, DoshaType } from '@/lib/types';

const SYSTEM_PROMPT = `You are AyurOS Agent, the intelligent Ayurvedic diet consultant inside AyurDiet OS.

ABOUT YOU:
You combine classical Ayurvedic nutrition (Prakriti, Rasa, Virya, Vipaka, Dosha theory, Viruddha Aahara) with modern evidence-based nutritional science. You have access to a database of 105+ Indian foods and 35+ recipes, each scored using the ANH-Score (Ayur-Nutri Hybrid Score) algorithm personalized to the user.

YOUR TOOLS (always use these -- never guess scores or make up numbers):
- get_food_score: Score any food for this patient (call this for every food the user asks about)
- score_top_foods: List the best foods for this patient's prakriti
- compose_meal: Build a balanced meal (breakfast/lunch/dinner/snack) with real foods
- check_compatibility: Check if two foods are safe together (Viruddha Aahara detection)
- find_substitutes: Suggest alternatives for a food (for allergies, preferences, or dosha)
- get_condition_info: Get dietary guidance for a health condition
- search_foods: Search the food database by name or category

PATIENT CONTEXT:
{PATIENT_CONTEXT}

HOW TO RESPOND:
1. ALWAYS call the appropriate tool first, then explain the result conversationally.
2. Reference the patient's Prakriti, conditions, and goals when explaining.
3. Explain in BOTH Ayurvedic terms AND modern nutrition terms (e.g. "Ghee pacifies Vata due to its snigdha (oily) quality, and provides healthy saturated fats for absorption").
4. When the user asks about any food, call get_food_score. When they ask "what should I eat", call compose_meal. When two foods are mentioned, call check_compatibility.
5. When the user asks a general question like "what issues do I have" or "what's wrong with my diet", look at their conditions and prakriti, then call get_condition_info for each condition and score_top_foods to give actionable advice.
6. For meal/day planning questions like "what should I eat tomorrow" or "plan my meals", call compose_meal for each meal type (breakfast, lunch, dinner, snack) separately.
7. Keep answers concise but complete. Use **bold** for emphasis, bullet points for lists.
8. If the user asks who you are, identify as "AyurOS Agent" and briefly describe your capabilities.
9. NEVER provide medical diagnoses. Always add a note to consult a physician for medical conditions.
10. Be warm, practical, and grounded. Avoid generic advice -- every suggestion must be backed by a tool call.`;

function buildPatientContext(profile: Record<string, unknown>): string {
    const user = profile.user as Record<string, unknown>;
    const prakriti = profile.prakriti as Record<string, unknown> | null;
    const health = profile.health as Record<string, unknown> | null;

    let ctx = `Name: ${user.name}, Age: ${user.age}, Gender: ${user.gender}`;
    if (prakriti) {
        ctx += `\nPrakriti: Vata ${prakriti.vata}%, Pitta ${prakriti.pitta}%, Kapha ${prakriti.kapha}% (Dominant: ${prakriti.dominant})`;
    }
    if (health) {
        const conds = health.conditions as string[];
        const allergies = health.allergies as string[];
        const prefs = health.dietary_preferences as string[];
        if (conds.length) ctx += `\nConditions: ${conds.join(', ')}`;
        if (allergies.length) ctx += `\nAllergies: ${allergies.join(', ')}`;
        if (prefs.length) ctx += `\nDiet Preferences: ${prefs.join(', ')}`;
        ctx += `\nGoals: ${health.weight_goal} weight, ${health.calorie_target} kcal/day, ${health.protein_target}g protein/day`;
    }
    return ctx;
}

function determineDominant(v: number, p: number, k: number): DoshaType {
    if (v >= p && v >= k) return 'vata';
    if (p >= v && p >= k) return 'pitta';
    return 'kapha';
}

function buildPatientProfile(profile: Record<string, unknown>): PatientProfile {
    const user = profile.user as Record<string, unknown>;
    const prakriti = profile.prakriti as Record<string, unknown> | null;
    const health = profile.health as Record<string, unknown> | null;

    const vataVal = ((prakriti?.vata as number) || 33) / 100;
    const pittaVal = ((prakriti?.pitta as number) || 33) / 100;
    const kaphaVal = ((prakriti?.kapha as number) || 34) / 100;
    const dominantDosha = (prakriti?.dominant as DoshaType) || determineDominant(vataVal, pittaVal, kaphaVal);

    const rawPrefs = (health?.dietary_preferences as string[]) || [];
    const validPrefs: DietaryPreference[] = rawPrefs.filter(
        (p): p is DietaryPreference => ['vegetarian', 'vegan', 'eggetarian', 'non-vegetarian', 'jain', 'sattvic'].includes(p)
    );

    return {
        id: user.id as string,
        name: user.name as string,
        age: user.age as number,
        gender: (user.gender as 'male' | 'female' | 'other') || 'other',
        prakriti: {
            vata: vataVal,
            pitta: pittaVal,
            kapha: kaphaVal,
            dominant: dominantDosha,
        },
        conditions: (health?.conditions as string[]) || [],
        allergies: (health?.allergies as string[]) || [],
        dietaryPreferences: validPrefs,
        goals: {
            weightGoal: (health?.weight_goal as 'lose' | 'maintain' | 'gain') || 'maintain',
            dailyCalorieTarget: (health?.calorie_target as number) || 2000,
            proteinTarget: (health?.protein_target as number) || 60,
        },
    };
}

function processToolCall(name: string, args: Record<string, unknown>, patientProfile: PatientProfile): string {
    try {
        switch (name) {
            case 'get_food_score': {
                const foodName = (args.food_name as string).toLowerCase();
                const food = foods.find((f) => f.name.toLowerCase().includes(foodName) || f.id.includes(foodName));
                if (!food) return `Food "${args.food_name}" not found in our database of 105+ Indian foods.`;
                const result = calculateANHScore(food, patientProfile);
                return `**${food.name}** (${food.category})
ANH Score: **${result.totalScore}/100**
• Ayurvedic Score: ${result.ayurvedicScore}/100
• Nutritional Score: ${result.nutritionalScore}/100
${result.recommendations.length > 0 ? '\n✅ ' + result.recommendations.join('\n✅ ') : ''}
${result.warnings.length > 0 ? '\n⚠️ ' + result.warnings.join('\n⚠️ ') : ''}`;
            }

            case 'score_top_foods': {
                const ranked = rankFoodsForPatient(foods.slice(0, 50), patientProfile).slice(0, 8);
                return 'Top recommended foods for your prakriti:\n\n' + ranked.map((r, i) =>
                    `${i + 1}. **${r.food.name}** — ${r.score.totalScore}/100`
                ).join('\n');
            }

            case 'compose_meal': {
                const mealType = (args.meal_type as string) || 'lunch';
                const maxCalories = (args.max_calories as number) || (patientProfile.goals.dailyCalorieTarget || 2000) / 3;
                try {
                    const result = composeMeal(
                        patientProfile,
                        mealType as 'breakfast' | 'lunch' | 'dinner' | 'snack',
                        { maxCalories, minProtein: (args.min_protein as number) || 15 }
                    );
                    if (!result || !result.meal || result.meal.foods.length === 0) {
                        return 'Could not compose a meal with current constraints. Try adjusting your targets.';
                    }
                    return `**${mealType.charAt(0).toUpperCase() + mealType.slice(1)} Suggestion**\n\n` +
                        result.meal.foods.map((item) => `• ${item.food.name} (${item.quantity} ${item.unit})`).join('\n') +
                        `\n\n📊 ANH Score: ${result.totalANHScore}/100`;
                } catch {
                    return 'Could not compose a meal right now. Please try again.';
                }
            }

            case 'check_compatibility': {
                const food1Name = (args.food1 as string).toLowerCase();
                const food2Name = (args.food2 as string).toLowerCase();
                const f1 = foods.find((f) => f.name.toLowerCase().includes(food1Name));
                const f2 = foods.find((f) => f.name.toLowerCase().includes(food2Name));
                if (!f1 || !f2) return `Could not find one or both foods ("${args.food1}", "${args.food2}") in the database.`;
                const viruddha = checkFoodPairCompatibility(f1, f2);
                if (viruddha.isCompatible) {
                    return `✅ **${f1.name}** and **${f2.name}** are compatible — no Viruddha Aahara detected.`;
                }
                return `⚠️ **Viruddha Aahara Detected!**\n\n` + viruddha.warnings.map((w) =>
                    `• **${w.rule.type}**: ${w.message}\n  Severity: ${w.rule.severity}`
                ).join('\n\n');
            }

            case 'find_substitutes': {
                const foodName = (args.food_name as string).toLowerCase();
                const food = foods.find((f) => f.name.toLowerCase().includes(foodName));
                if (!food) return `Food "${args.food_name}" not found.`;
                const subs = findSubstitutes(food.id, ((args.reason as string) || 'allergy') as SubstitutionReason, patientProfile);
                if (!subs || subs.alternatives.length === 0) return `No substitutes found for ${food.name}.`;
                return `Substitutes for **${food.name}**:\n\n` + subs.alternatives.slice(0, 5).map((s, i) =>
                    `${i + 1}. **${s.food.name}** — ANH Score: ${s.anhScore}/100`
                ).join('\n');
            }

            case 'get_condition_info': {
                const condId = (args.condition as string).toLowerCase();
                const condition = conditions.find((c) => c.id.includes(condId) || c.name.toLowerCase().includes(condId));
                if (!condition) return `Condition "${args.condition}" not found.`;
                return `**${condition.name}**\n\n${condition.description}\n\n` +
                    `Recommended food categories: ${condition.recommendedFoodCategories.join(', ')}\n` +
                    `Avoid: ${condition.avoidFoodCategories.join(', ')}`;
            }

            case 'search_foods': {
                const query = (args.query as string).toLowerCase();
                const matches = foods.filter((f) =>
                    f.name.toLowerCase().includes(query) || f.category.toLowerCase().includes(query)
                ).slice(0, 10);
                if (matches.length === 0) return `No foods found matching "${args.query}".`;
                return `Foods matching "${args.query}":\n\n` + matches.map((f) =>
                    `• **${f.name}** (${f.category}) — ${f.nutrition.calories} kcal/serving`
                ).join('\n');
            }

            default:
                return `Unknown tool: ${name}`;
        }
    } catch (error) {
        console.error(`Tool ${name} error:`, error);
        return `Error executing ${name}. Please try rephrasing your question.`;
    }
}

const TOOLS_DEFINITION = [
    { name: 'get_food_score', description: 'Get the ANH-Score (Ayur-Nutri Hybrid Score) for a specific food based on the patient\'s prakriti', parameters: { type: 'object', properties: { food_name: { type: 'string', description: 'Name of the food to score' } }, required: ['food_name'] } },
    { name: 'score_top_foods', description: 'Get top-scored foods for the patient\'s prakriti', parameters: { type: 'object', properties: {} } },
    { name: 'compose_meal', description: 'Generate a balanced meal suggestion', parameters: { type: 'object', properties: { meal_type: { type: 'string', enum: ['breakfast', 'lunch', 'dinner', 'snack'] }, max_calories: { type: 'number' }, min_protein: { type: 'number' } } } },
    { name: 'check_compatibility', description: 'Check if two foods are compatible (Viruddha Aahara)', parameters: { type: 'object', properties: { food1: { type: 'string' }, food2: { type: 'string' } }, required: ['food1', 'food2'] } },
    { name: 'find_substitutes', description: 'Find substitute foods for a given food', parameters: { type: 'object', properties: { food_name: { type: 'string' }, reason: { type: 'string', enum: ['allergy', 'preference', 'dosha'] } }, required: ['food_name'] } },
    { name: 'get_condition_info', description: 'Get dietary info for a health condition', parameters: { type: 'object', properties: { condition: { type: 'string' } }, required: ['condition'] } },
    { name: 'search_foods', description: 'Search foods by name or category', parameters: { type: 'object', properties: { query: { type: 'string' } }, required: ['query'] } },
];

export async function POST(request: NextRequest) {
    let message = '';
    let userId: string | null = null;

    try {
        const body = await request.json();
        message = body.message || '';
        userId = body.userId || null;

        if (!message) {
            return NextResponse.json({ error: 'Message is required' }, { status: 400 });
        }

        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            return handleWithoutGemini(message, userId);
        }

        // Get patient profile for context
        let patientContext = 'No patient profile available.';
        let patientProfile: PatientProfile | null = null;
        if (userId) {
            const profile = getFullProfile(userId);
            if (profile) {
                patientContext = buildPatientContext(profile as unknown as Record<string, unknown>);
                patientProfile = buildPatientProfile(profile as unknown as Record<string, unknown>);
            }
        }

        const systemPrompt = SYSTEM_PROMPT.replace('{PATIENT_CONTEXT}', patientContext);

        // Get chat history for context
        const history = userId ? getChatHistory(userId, 10).reverse() : [];

        // Build messages array for Gemini
        const chatMessages = [
            { role: 'user', parts: [{ text: systemPrompt }] },
            ...history.map((msg) => ({
                role: (msg.role as string) === 'user' ? 'user' : 'model',
                parts: [{ text: msg.content as string }],
            })),
            { role: 'user', parts: [{ text: message }] },
        ];

        const MODELS = ['gemini-2.5-flash', 'gemini-2.0-flash-lite'];
        let usedModel = MODELS[0];

        let geminiRes: Response | null = null;
        for (const model of MODELS) {
            geminiRes = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: chatMessages,
                        tools: [{ functionDeclarations: TOOLS_DEFINITION }],
                        generationConfig: { temperature: 0.7, maxOutputTokens: 4096 },
                    }),
                }
            );
            if (geminiRes.ok) { usedModel = model; break; }
            if (geminiRes.status !== 429 && geminiRes.status !== 404) break;
        }

        if (!geminiRes || !geminiRes.ok) {
            const errData = geminiRes ? await geminiRes.text() : 'No response';
            console.error('Gemini API error:', geminiRes?.status, errData);
            const isQuota = geminiRes?.status === 429;
            return handleWithoutGemini(message, userId, isQuota);
        }

        const geminiData = await geminiRes.json();
        const candidate = geminiData.candidates?.[0];
        const parts = candidate?.content?.parts || [];

        const effectiveProfile = patientProfile || {
            id: 'anonymous', name: 'User', age: 30, gender: 'other' as const,
            prakriti: { vata: 0.33, pitta: 0.33, kapha: 0.34, dominant: 'vata' as const },
            conditions: [], allergies: [], dietaryPreferences: [],
            goals: { weightGoal: 'maintain' as const, dailyCalorieTarget: 2000, proteinTarget: 60 },
        };

        let responseText = '';
        for (const part of parts) {
            if (part.functionCall) {
                const toolResult = processToolCall(part.functionCall.name, part.functionCall.args, effectiveProfile);

                const followUpRes = await fetch(
                    `https://generativelanguage.googleapis.com/v1beta/models/${usedModel}:generateContent?key=${apiKey}`,
                    {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            contents: [
                                ...chatMessages,
                                { role: 'model', parts: [{ functionCall: part.functionCall }] },
                                { role: 'user', parts: [{ functionResponse: { name: part.functionCall.name, response: { result: toolResult } } }] },
                            ],
                            generationConfig: { temperature: 0.7, maxOutputTokens: 4096 },
                        }),
                    }
                );

                if (followUpRes.ok) {
                    const followUpData = await followUpRes.json();
                    responseText = followUpData.candidates?.[0]?.content?.parts?.[0]?.text || toolResult;
                } else {
                    responseText = toolResult;
                }
            } else if (part.text) {
                responseText += part.text;
            }
        }

        // Save messages to DB
        if (userId) {
            saveChatMessage({ userId, role: 'user', content: message });
            saveChatMessage({ userId, role: 'assistant', content: responseText });
        }

        return NextResponse.json({ response: responseText });
    } catch (error) {
        console.error('Chat API error:', error);
        // Never return 500 — always give a useful response via fallback
        return handleWithoutGemini(message, userId, false);
    }
}

// Fallback handler — uses local algorithms when Gemini is unavailable
function handleWithoutGemini(message: string, userId: string | null, isQuotaExhausted = false) {
    const lowerMsg = message.toLowerCase();
    let response = '';
    let patientProfile: PatientProfile | null = null;

    if (userId) {
        const profile = getFullProfile(userId);
        if (profile) {
            patientProfile = buildPatientProfile(profile as unknown as Record<string, unknown>);
        }
    }

    if (!patientProfile) {
        return NextResponse.json({
            response: 'Please complete your onboarding first so I can personalize recommendations for your Prakriti.',
        });
    }

    // Try to find food names in the message
    const mentionedFoods = foods.filter(f =>
        lowerMsg.includes(f.name.toLowerCase()) ||
        (f.nameHindi && lowerMsg.includes(f.nameHindi.toLowerCase()))
    );

    if (lowerMsg.includes('issue') || lowerMsg.includes('problem') || lowerMsg.includes('condition') || lowerMsg.includes('wrong') || lowerMsg.includes('health')) {
        const userConditions = patientProfile.conditions || [];
        if (userConditions.length > 0) {
            const condInfo = userConditions.map(c => processToolCall('get_condition_info', { condition: c }, patientProfile)).join('\n\n---\n\n');
            const topFoods = processToolCall('score_top_foods', {}, patientProfile);
            response = `Based on your profile, here are your health considerations:\n\n${condInfo}\n\n---\n\n**Top Foods for Your Prakriti (${patientProfile.prakriti.dominant}):**\n\n${topFoods}`;
        } else {
            response = `Your profile shows no specific health conditions. Your dominant dosha is **${patientProfile.prakriti.dominant}** (V:${Math.round(patientProfile.prakriti.vata * 100)}% P:${Math.round(patientProfile.prakriti.pitta * 100)}% K:${Math.round(patientProfile.prakriti.kapha * 100)}%).\n\n` + processToolCall('score_top_foods', {}, patientProfile);
        }
    } else if (lowerMsg.includes('plan') || lowerMsg.includes('all day') || lowerMsg.includes('tomorrow') || lowerMsg.includes('full day') || lowerMsg.includes('entire day')) {
        const bf = processToolCall('compose_meal', { meal_type: 'breakfast' }, patientProfile);
        const ln = processToolCall('compose_meal', { meal_type: 'lunch' }, patientProfile);
        const dn = processToolCall('compose_meal', { meal_type: 'dinner' }, patientProfile);
        const sn = processToolCall('compose_meal', { meal_type: 'snack' }, patientProfile);
        response = `Here's a full day meal plan tailored to your **${patientProfile.prakriti.dominant}** prakriti:\n\n${bf}\n\n---\n\n${ln}\n\n---\n\n${dn}\n\n---\n\n${sn}`;
    } else if (lowerMsg.includes('score') || lowerMsg.includes('good for me') || lowerMsg.includes('should i eat') || lowerMsg.includes('is') && mentionedFoods.length === 1) {
        if (mentionedFoods.length > 0) {
            response = processToolCall('get_food_score', { food_name: mentionedFoods[0].name }, patientProfile);
        } else {
            // Try to extract a food-like word
            const words = message.split(/\s+/).filter(w => w.length > 2);
            const foodWord = words.find(w => foods.some(f => f.name.toLowerCase().includes(w.toLowerCase())));
            if (foodWord) {
                response = processToolCall('get_food_score', { food_name: foodWord }, patientProfile);
            } else {
                response = processToolCall('score_top_foods', {}, patientProfile);
            }
        }
    } else if (mentionedFoods.length >= 2) {
        // Two foods mentioned — check compatibility
        response = processToolCall('check_compatibility', { food1: mentionedFoods[0].name, food2: mentionedFoods[1].name }, patientProfile);
    } else if (lowerMsg.includes('meal') || lowerMsg.includes('suggest') || lowerMsg.includes('breakfast') || lowerMsg.includes('lunch') || lowerMsg.includes('dinner') || lowerMsg.includes('snack') || lowerMsg.includes('eat')) {
        const mealType = lowerMsg.includes('breakfast') ? 'breakfast' : lowerMsg.includes('dinner') ? 'dinner' : lowerMsg.includes('snack') ? 'snack' : 'lunch';
        response = processToolCall('compose_meal', { meal_type: mealType }, patientProfile);
    } else if (lowerMsg.includes('compatible') || lowerMsg.includes('together') || lowerMsg.includes('combine') || lowerMsg.includes('mix')) {
        response = '🔍 Please specify two foods to check compatibility. Example: "Can I eat fish and curd together?"';
    } else if (lowerMsg.includes('substitute') || lowerMsg.includes('alternative') || lowerMsg.includes('replace') || lowerMsg.includes('instead')) {
        if (mentionedFoods.length > 0) {
            response = processToolCall('find_substitutes', { food_name: mentionedFoods[0].name, reason: 'allergy' }, patientProfile);
        } else {
            response = '🔄 Please specify a food you want to find substitutes for. Example: "What can I use instead of paneer?"';
        }
    } else if (mentionedFoods.length === 1) {
        // Single food mentioned without clear intent — score it
        response = processToolCall('get_food_score', { food_name: mentionedFoods[0].name }, patientProfile);
    } else if (lowerMsg.includes('top') || lowerMsg.includes('best') || lowerMsg.includes('recommend')) {
        response = processToolCall('score_top_foods', {}, patientProfile);
    } else if (lowerMsg.includes('hello') || lowerMsg.includes('hi') || lowerMsg.includes('namaste') || lowerMsg.includes('hey') || lowerMsg.includes('help')) {
        response = `Namaste! I'm **AyurOS Agent**, your Ayurvedic diet consultant. Your dominant dosha is **${patientProfile.prakriti.dominant}**.\n\nHere's what I can help with:\n\n• **"Score rice for me"** -- get your personal ANH-Score for any food\n• **"Suggest a breakfast"** -- get a dosha-balanced meal\n• **"Can I eat milk and fish together?"** -- check for Viruddha Aahara\n• **"Top foods for me"** -- see your best food choices\n• **"Substitute for paneer"** -- find alternatives for any food`;
    } else if (lowerMsg.includes('who are you') || lowerMsg.includes('what are you') || lowerMsg.includes('about')) {
        response = `I'm **AyurOS Agent**, the AI diet consultant built into AyurDiet OS.\n\nI combine **Ayurvedic principles** (Prakriti, Dosha theory, Rasa, Virya) with **modern nutritional science** to give you personalized diet guidance.\n\nI use the **ANH-Score algorithm** (Ayur-Nutri Hybrid Score) to rate foods on a 0-100 scale based on your unique constitution.\n\nYour Prakriti: **${patientProfile.prakriti.dominant}** dominant (V:${Math.round(patientProfile.prakriti.vata * 100)}% P:${Math.round(patientProfile.prakriti.pitta * 100)}% K:${Math.round(patientProfile.prakriti.kapha * 100)}%)`;
    } else {
        const topFoods = processToolCall('score_top_foods', {}, patientProfile);
        response = '🌿 Here are the top foods recommended for your Prakriti:\n\n' + topFoods;
    }

    if (isQuotaExhausted) {
        response += '\n\n---\n_Note: AI conversation mode is temporarily unavailable (API quota reached). Using local algorithms for your response._';
    }

    if (userId) {
        saveChatMessage({ userId, role: 'user', content: message });
        saveChatMessage({ userId, role: 'assistant', content: response });
    }

    return NextResponse.json({ response });
}
