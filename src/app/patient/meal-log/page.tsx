'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plus, Search, Clock, Flame, Beef, Wheat, Droplets,
    Trash2, ChevronDown, UtensilsCrossed, Sun, Moon, Coffee, Apple,
    TrendingUp, TrendingDown, Minus as MinusIcon, Target,
} from 'lucide-react';
import { foods } from '@/lib/data';
import { calculateANHScore } from '@/lib/algorithms/anhScore';
import type { PatientProfile, Food } from '@/lib/types';

interface MealLogEntry {
    id: string;
    meal_type: string;
    food_items: { foodId: string; name: string; quantity: number; calories: number; protein: number }[];
    total_calories: number;
    total_protein: number;
    total_carbs: number;
    total_fat: number;
    logged_at: string;
}

const MEAL_TYPES = [
    { id: 'breakfast', label: 'Breakfast', icon: <Coffee className="h-4 w-4" />, time: '7-9 AM' },
    { id: 'lunch', label: 'Lunch', icon: <Sun className="h-4 w-4" />, time: '12-2 PM' },
    { id: 'snack', label: 'Snack', icon: <Apple className="h-4 w-4" />, time: '4-5 PM' },
    { id: 'dinner', label: 'Dinner', icon: <Moon className="h-4 w-4" />, time: '7-9 PM' },
];

export default function MealLogPage() {
    const [patient, setPatient] = useState<PatientProfile | null>(null);
    const [userId, setUserId] = useState<string | null>(null);
    const [todayLogs, setTodayLogs] = useState<MealLogEntry[]>([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedMealType, setSelectedMealType] = useState('breakfast');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFoods, setSelectedFoods] = useState<{ food: Food; quantity: number }[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const today = new Date().toISOString().split('T')[0];

    // Load patient
    useEffect(() => {
        const uid = localStorage.getItem('ayurdiet_user_id');
        if (uid) {
            setUserId(uid);
            fetch(`/api/users?id=${uid}`)
                .then(r => r.json())
                .then(data => {
                    if (data.user && data.prakriti) {
                        const p = data.prakriti;
                        setPatient({
                            id: data.user.id, name: data.user.name, age: data.user.age, gender: data.user.gender,
                            prakriti: { vata: p.vata / 100, pitta: p.pitta / 100, kapha: p.kapha / 100, dominant: p.dominant },
                            conditions: data.health?.conditions || [], allergies: data.health?.allergies || [],
                            dietaryPreferences: data.health?.dietary_preferences || [],
                            goals: {
                                weightGoal: data.health?.weight_goal || 'maintain',
                                dailyCalorieTarget: data.health?.calorie_target || 2000,
                                proteinTarget: data.health?.protein_target || 60,
                            },
                        });
                    }
                }).catch(() => { });
        }
    }, []);

    // Load today's logs
    useEffect(() => {
        if (!userId) { setIsLoading(false); return; }
        fetch(`/api/meals?userId=${userId}&date=${today}`)
            .then(r => r.json())
            .then(data => {
                setTodayLogs(data.logs || []);
                setIsLoading(false);
            })
            .catch(() => setIsLoading(false));
    }, [userId, today]);

    const dailyTotals = todayLogs.reduce(
        (acc, log) => ({
            calories: acc.calories + (log.total_calories || 0),
            protein: acc.protein + (log.total_protein || 0),
            carbs: acc.carbs + (log.total_carbs || 0),
            fat: acc.fat + (log.total_fat || 0),
        }),
        { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );

    const targets = patient?.goals || { dailyCalorieTarget: 2000, proteinTarget: 60 };
    const caloriePercent = Math.min(100, Math.round((dailyTotals.calories / (targets.dailyCalorieTarget || 2000)) * 100));
    const proteinPercent = Math.min(100, Math.round((dailyTotals.protein / (targets.proteinTarget || 60)) * 100));

    const filteredFoods = foods.filter(f =>
        !searchQuery || f.name.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 20);

    const handleAddFoodToSelection = (food: Food) => {
        const existing = selectedFoods.find(sf => sf.food.id === food.id);
        if (existing) {
            setSelectedFoods(prev => prev.map(sf => sf.food.id === food.id ? { ...sf, quantity: sf.quantity + 1 } : sf));
        } else {
            setSelectedFoods(prev => [...prev, { food, quantity: 1 }]);
        }
    };

    const handleRemoveFromSelection = (foodId: string) => {
        setSelectedFoods(prev => prev.filter(sf => sf.food.id !== foodId));
    };

    const handleLogMeal = async () => {
        if (!userId || selectedFoods.length === 0) return;

        const foodItems = selectedFoods.map(sf => ({
            foodId: sf.food.id,
            name: sf.food.name,
            quantity: sf.quantity,
            calories: sf.food.nutrition.calories * sf.quantity,
            protein: sf.food.nutrition.protein * sf.quantity,
        }));

        const totalCalories = foodItems.reduce((s, f) => s + f.calories, 0);
        const totalProtein = foodItems.reduce((s, f) => s + f.protein, 0);
        const totalCarbs = selectedFoods.reduce((s, sf) => s + sf.food.nutrition.carbs * sf.quantity, 0);
        const totalFat = selectedFoods.reduce((s, sf) => s + sf.food.nutrition.fat * sf.quantity, 0);

        await fetch('/api/meals', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId,
                mealType: selectedMealType,
                foodItems,
                totalCalories, totalProtein, totalCarbs, totalFat,
            }),
        });

        // Refresh logs
        const res = await fetch(`/api/meals?userId=${userId}&date=${today}`);
        const data = await res.json();
        setTodayLogs(data.logs || []);
        setSelectedFoods([]);
        setShowAddModal(false);
        setSearchQuery('');
    };

    const handleDeleteLog = async (logId: string) => {
        await fetch(`/api/meals?id=${logId}`, { method: 'DELETE' });
        setTodayLogs(prev => prev.filter(l => l.id !== logId));
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-[60vh]">
                <div className="w-8 h-8 rounded-full border-2 border-[#c9a227] border-t-transparent animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white">Meal Log</h1>
                    <p className="text-sm text-white/40">Track your daily food intake</p>
                </div>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#4a7c59] to-[#3a6249] text-white text-sm hover:scale-105 transition-transform"
                >
                    <Plus className="h-4 w-4" /> Log Meal
                </button>
            </motion.div>

            {/* Daily Progress */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <ProgressCard
                    label="Calories"
                    current={Math.round(dailyTotals.calories)}
                    target={targets.dailyCalorieTarget || 2000}
                    unit="kcal"
                    percent={caloriePercent}
                    color="from-[#c9a227] to-[#d35400]"
                    icon={<Flame className="h-4 w-4" />}
                />
                <ProgressCard
                    label="Protein"
                    current={Math.round(dailyTotals.protein)}
                    target={targets.proteinTarget || 60}
                    unit="g"
                    percent={proteinPercent}
                    color="from-[#4a7c59] to-[#3a6249]"
                    icon={<Beef className="h-4 w-4" />}
                />
                <ProgressCard
                    label="Carbs"
                    current={Math.round(dailyTotals.carbs)}
                    target={Math.round((targets.dailyCalorieTarget || 2000) * 0.5 / 4)}
                    unit="g"
                    percent={Math.min(100, Math.round((dailyTotals.carbs / ((targets.dailyCalorieTarget || 2000) * 0.5 / 4)) * 100))}
                    color="from-[#3b82f6] to-[#2563eb]"
                    icon={<Wheat className="h-4 w-4" />}
                />
                <ProgressCard
                    label="Fat"
                    current={Math.round(dailyTotals.fat)}
                    target={Math.round((targets.dailyCalorieTarget || 2000) * 0.3 / 9)}
                    unit="g"
                    percent={Math.min(100, Math.round((dailyTotals.fat / ((targets.dailyCalorieTarget || 2000) * 0.3 / 9)) * 100))}
                    color="from-[#a855f7] to-[#7c3aed]"
                    icon={<Droplets className="h-4 w-4" />}
                />
            </motion.div>

            {/* Today's Meals */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <h2 className="text-sm font-semibold text-white/60 mb-3">Today&apos;s Meals</h2>
                {todayLogs.length === 0 ? (
                    <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/[0.04] text-center">
                        <UtensilsCrossed className="h-8 w-8 text-white/15 mx-auto mb-3" />
                        <p className="text-sm text-white/30">No meals logged today. Tap &quot;Log Meal&quot; to start tracking.</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {MEAL_TYPES.map(mt => {
                            const logsForType = todayLogs.filter(l => l.meal_type === mt.id);
                            if (logsForType.length === 0) return null;
                            return (
                                <div key={mt.id} className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="w-7 h-7 rounded-lg bg-white/[0.06] flex items-center justify-center text-white/50">{mt.icon}</div>
                                        <h3 className="text-sm font-medium text-white">{mt.label}</h3>
                                        <span className="text-xs text-white/30">{mt.time}</span>
                                    </div>
                                    {logsForType.map(log => (
                                        <div key={log.id} className="ml-9">
                                            <div className="flex flex-wrap gap-1.5 mb-2">
                                                {log.food_items.map((item, i) => (
                                                    <span key={i} className="text-xs px-2 py-1 rounded-md bg-white/[0.05] text-white/60">
                                                        {item.name} x{item.quantity}
                                                    </span>
                                                ))}
                                            </div>
                                            <div className="flex items-center gap-4 text-xs text-white/30">
                                                <span>{Math.round(log.total_calories)} kcal</span>
                                                <span>{Math.round(log.total_protein)}g protein</span>
                                                <button onClick={() => handleDeleteLog(log.id)} className="ml-auto text-red-400/40 hover:text-red-400 transition-colors">
                                                    <Trash2 className="h-3.5 w-3.5" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            );
                        })}
                    </div>
                )}
            </motion.div>

            {/* Dosha Balance Insight */}
            {patient && todayLogs.length > 0 && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                    className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                    <h2 className="text-sm font-semibold text-white/60 mb-4 flex items-center gap-2">
                        <Target className="h-4 w-4 text-[#c9a227]" /> Dosha Balance Today
                    </h2>
                    <DoshaTracker logs={todayLogs} patient={patient} />
                </motion.div>
            )}

            {/* Add Meal Modal */}
            <AnimatePresence>
                {showAddModal && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
                        onClick={(e) => { if (e.target === e.currentTarget) setShowAddModal(false); }}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
                            className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl bg-[#141414] border border-white/[0.08] p-6"
                        >
                            <h2 className="text-lg font-bold text-white mb-4">Log a Meal</h2>

                            {/* Meal Type Selection */}
                            <div className="flex gap-2 mb-4">
                                {MEAL_TYPES.map(mt => (
                                    <button
                                        key={mt.id}
                                        onClick={() => setSelectedMealType(mt.id)}
                                        className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs transition-all ${selectedMealType === mt.id
                                                ? 'bg-[#c9a227]/15 text-[#c9a227] border border-[#c9a227]/30'
                                                : 'bg-white/[0.04] text-white/40 border border-white/[0.06]'
                                            }`}
                                    >
                                        {mt.icon} {mt.label}
                                    </button>
                                ))}
                            </div>

                            {/* Food Search */}
                            <div className="relative mb-3">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
                                <input
                                    placeholder="Search foods..."
                                    value={searchQuery}
                                    onChange={e => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#c9a227]/40"
                                />
                            </div>

                            {/* Food List */}
                            <div className="max-h-48 overflow-y-auto space-y-1 mb-4">
                                {filteredFoods.map(food => {
                                    const isSelected = selectedFoods.some(sf => sf.food.id === food.id);
                                    const score = patient ? calculateANHScore(food, patient) : null;
                                    return (
                                        <button
                                            key={food.id}
                                            onClick={() => handleAddFoodToSelection(food)}
                                            className={`w-full text-left p-2.5 rounded-lg flex justify-between items-center text-sm transition-all ${isSelected ? 'bg-[#4a7c59]/10 border border-[#4a7c59]/20' : 'hover:bg-white/[0.04]'
                                                }`}
                                        >
                                            <div>
                                                <span className="text-white">{food.name}</span>
                                                <span className="text-white/30 ml-2 text-xs">{food.nutrition.calories} kcal</span>
                                            </div>
                                            {score && (
                                                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${score.totalScore >= 70 ? 'bg-green-500/15 text-green-400' :
                                                        score.totalScore >= 50 ? 'bg-yellow-500/15 text-yellow-400' :
                                                            'bg-red-500/15 text-red-400'
                                                    }`}>{score.totalScore}</span>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Selected Foods */}
                            {selectedFoods.length > 0 && (
                                <div className="mb-4 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                                    <p className="text-xs text-white/40 mb-2">Selected ({selectedFoods.length})</p>
                                    {selectedFoods.map(sf => (
                                        <div key={sf.food.id} className="flex items-center justify-between py-1.5">
                                            <span className="text-sm text-white">{sf.food.name}</span>
                                            <div className="flex items-center gap-2">
                                                <button onClick={() => {
                                                    if (sf.quantity > 1) setSelectedFoods(prev => prev.map(s => s.food.id === sf.food.id ? { ...s, quantity: s.quantity - 1 } : s));
                                                }} className="p-1 rounded bg-white/[0.05]"><MinusIcon className="h-3 w-3 text-white/40" /></button>
                                                <span className="text-xs text-white/60 w-4 text-center">{sf.quantity}</span>
                                                <button onClick={() => handleAddFoodToSelection(sf.food)} className="p-1 rounded bg-white/[0.05]">
                                                    <Plus className="h-3 w-3 text-white/40" />
                                                </button>
                                                <button onClick={() => handleRemoveFromSelection(sf.food.id)} className="p-1 rounded bg-red-500/10 ml-1">
                                                    <Trash2 className="h-3 w-3 text-red-400" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                    <div className="mt-2 pt-2 border-t border-white/[0.06] grid grid-cols-4 gap-2 text-center text-xs">
                                        <div><span className="text-white/30">Cal</span><br /><span className="text-white font-medium">{Math.round(selectedFoods.reduce((s, sf) => s + sf.food.nutrition.calories * sf.quantity, 0))}</span></div>
                                        <div><span className="text-white/30">Protein</span><br /><span className="text-white font-medium">{Math.round(selectedFoods.reduce((s, sf) => s + sf.food.nutrition.protein * sf.quantity, 0))}g</span></div>
                                        <div><span className="text-white/30">Carbs</span><br /><span className="text-white font-medium">{Math.round(selectedFoods.reduce((s, sf) => s + sf.food.nutrition.carbs * sf.quantity, 0))}g</span></div>
                                        <div><span className="text-white/30">Fat</span><br /><span className="text-white font-medium">{Math.round(selectedFoods.reduce((s, sf) => s + sf.food.nutrition.fat * sf.quantity, 0))}g</span></div>
                                    </div>
                                </div>
                            )}

                            <div className="flex gap-3">
                                <button onClick={() => { setShowAddModal(false); setSelectedFoods([]); setSearchQuery(''); }}
                                    className="flex-1 py-2.5 rounded-xl bg-white/[0.05] text-white/60 text-sm">Cancel</button>
                                <button onClick={handleLogMeal} disabled={selectedFoods.length === 0}
                                    className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#4a7c59] to-[#3a6249] text-white text-sm disabled:opacity-40 hover:scale-[1.02] transition-transform">
                                    Log Meal
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function ProgressCard({ label, current, target, unit, percent, color, icon }: {
    label: string; current: number; target: number; unit: string; percent: number;
    color: string; icon: React.ReactNode;
}) {
    const isOver = current > target;
    return (
        <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5 text-white/50">{icon}<span className="text-xs">{label}</span></div>
                {isOver && <TrendingUp className="h-3.5 w-3.5 text-red-400" />}
            </div>
            <p className="text-lg font-bold text-white">{current}<span className="text-xs text-white/30 ml-1">{unit}</span></p>
            <div className="mt-2 h-1.5 rounded-full bg-white/[0.06]">
                <div className={`h-full rounded-full bg-gradient-to-r ${color} transition-all duration-500`} style={{ width: `${percent}%` }} />
            </div>
            <p className="text-[10px] text-white/30 mt-1">{percent}% of {target} {unit}</p>
        </div>
    );
}

function DoshaTracker({ logs, patient }: { logs: MealLogEntry[]; patient: PatientProfile }) {
    // Calculate dosha impact from today's foods
    const allFoodIds = logs.flatMap(l => l.food_items.map(f => f.foodId));
    const todayFoods = allFoodIds.map(id => foods.find(f => f.id === id)).filter(Boolean) as Food[];

    const doshaImpact = todayFoods.reduce(
        (acc, food) => ({
            vata: acc.vata + food.ayurvedic.doshaEffect.vata,
            pitta: acc.pitta + food.ayurvedic.doshaEffect.pitta,
            kapha: acc.kapha + food.ayurvedic.doshaEffect.kapha,
        }),
        { vata: 0, pitta: 0, kapha: 0 }
    );

    const dominant = patient.prakriti.dominant;

    return (
        <div className="space-y-3">
            {(['vata', 'pitta', 'kapha'] as const).map(d => {
                const impact = doshaImpact[d];
                const isDominant = d === dominant;
                const isGood = (isDominant && impact < 0) || (!isDominant && impact >= 0);
                return (
                    <div key={d}>
                        <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-white/60 capitalize">{d}</span>
                                {isDominant && <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#c9a227]/15 text-[#c9a227]">Dominant</span>}
                            </div>
                            <div className="flex items-center gap-1 text-xs">
                                {impact < 0 ? (
                                    <span className="text-green-400 flex items-center gap-0.5"><TrendingDown className="h-3 w-3" /> Pacifying ({impact})</span>
                                ) : impact > 0 ? (
                                    <span className="text-red-400 flex items-center gap-0.5"><TrendingUp className="h-3 w-3" /> Aggravating (+{impact})</span>
                                ) : (
                                    <span className="text-white/30">Neutral</span>
                                )}
                            </div>
                        </div>
                        <div className="h-2 rounded-full bg-white/[0.06] overflow-hidden">
                            <div
                                className={`h-full rounded-full transition-all duration-500 ${isGood ? 'bg-green-500/60' : 'bg-red-500/60'}`}
                                style={{ width: `${Math.min(100, Math.abs(impact) * 10 + 20)}%` }}
                            />
                        </div>
                    </div>
                );
            })}

            <div className="mt-3 p-3 rounded-lg bg-white/[0.02]">
                <p className="text-xs text-white/40">
                    {doshaImpact[dominant] < 0
                        ? `Your food choices today are pacifying your dominant ${dominant} dosha. This is well-aligned with your Prakriti.`
                        : doshaImpact[dominant] > 0
                            ? `Your food choices today are aggravating your dominant ${dominant} dosha. Consider adding more ${dominant}-pacifying foods.`
                            : `Your food choices today have a neutral effect on your dominant ${dominant} dosha. Consider more ${dominant}-pacifying options.`
                    }
                </p>
            </div>
        </div>
    );
}
