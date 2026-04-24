'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, ChevronDown, Flame, Snowflake, Leaf, Sparkles, AlertTriangle, Globe2 } from 'lucide-react';
import { foods, ayurvedaTips } from '@/lib/data';
import { calculateANHScore } from '@/lib/algorithms/anhScore';
import { getTipsForFood } from '@/lib/algorithms/tipMatcher';
import type { Food, PatientProfile, FoodOrigin, TipCategory } from '@/lib/types';

const CATEGORIES = [
  { id: 'all', label: 'All', emoji: '🍽️' },
  { id: 'grains', label: 'Grains', emoji: '🌾' },
  { id: 'pulses', label: 'Pulses', emoji: '🫘' },
  { id: 'legumes', label: 'Legumes', emoji: '🌱' },
  { id: 'vegetables', label: 'Vegetables', emoji: '🥬' },
  { id: 'fruits', label: 'Fruits', emoji: '🍎' },
  { id: 'dairy', label: 'Dairy', emoji: '🥛' },
  { id: 'spices', label: 'Spices', emoji: '🌶️' },
  { id: 'oils', label: 'Oils', emoji: '🫒' },
  { id: 'nuts_seeds', label: 'Nuts & Seeds', emoji: '🥜' },
  { id: 'beverages', label: 'Beverages', emoji: '🍵' },
  { id: 'meat', label: 'Meat', emoji: '🍗' },
  { id: 'condiments', label: 'Condiments', emoji: '🧂' },
];

const CUISINES: { id: FoodOrigin | 'all'; label: string }[] = [
  { id: 'all', label: 'All Cuisines' },
  { id: 'indian', label: 'Indian' },
  { id: 'american', label: 'American' },
  { id: 'italian', label: 'Italian' },
  { id: 'french', label: 'French' },
  { id: 'spanish', label: 'Spanish' },
  { id: 'british', label: 'British' },
  { id: 'german', label: 'German' },
  { id: 'greek', label: 'Greek' },
  { id: 'turkish', label: 'Turkish' },
  { id: 'lebanese', label: 'Lebanese' },
  { id: 'persian', label: 'Persian' },
  { id: 'moroccan', label: 'Moroccan' },
  { id: 'egyptian', label: 'Egyptian' },
  { id: 'ethiopian', label: 'Ethiopian' },
  { id: 'chinese', label: 'Chinese' },
  { id: 'japanese', label: 'Japanese' },
  { id: 'korean', label: 'Korean' },
  { id: 'thai', label: 'Thai' },
  { id: 'vietnamese', label: 'Vietnamese' },
  { id: 'indonesian', label: 'Indonesian' },
  { id: 'mexican', label: 'Mexican' },
  { id: 'brazilian', label: 'Brazilian' },
  { id: 'peruvian', label: 'Peruvian' },
  { id: 'colombian', label: 'Colombian' },
  { id: 'argentinian', label: 'Argentinian' },
  { id: 'caribbean', label: 'Caribbean' },
  { id: 'universal', label: 'Universal' },
];

const TIP_ICONS: Record<TipCategory, string> = {
  spice_remedy: '🌶️',
  supplement: '💊',
  food_as_medicine: '🌿',
  combination_tip: '🔗',
  timing_tip: '⏰',
  seasonal_tip: '🍂',
};

export default function FoodsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCuisine, setSelectedCuisine] = useState<FoodOrigin | 'all'>('all');
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const [patient, setPatient] = useState<PatientProfile | null>(null);
  const [sortBy, setSortBy] = useState<'name' | 'score' | 'calories'>('name');

  useEffect(() => {
    const userId = localStorage.getItem('ayurdiet_user_id');
    if (!userId) return;
    fetch(`/api/users?id=${userId}`)
      .then(r => r.json())
      .then(data => {
        if (data.user && data.prakriti) {
          const p = data.prakriti;
          setPatient({
            id: data.user.id,
            name: data.user.name,
            age: data.user.age,
            gender: data.user.gender,
            prakriti: { vata: p.vata, pitta: p.pitta, kapha: p.kapha, dominant: p.dominant },
            conditions: data.health?.conditions || [],
            allergies: data.health?.allergies || [],
            dietaryPreferences: data.health?.dietary_preferences || [],
            goals: {
              weightGoal: data.health?.weight_goal || 'maintain',
              dailyCalorieTarget: data.health?.calorie_target || 2000,
              proteinTarget: data.health?.protein_target || 60,
            },
          });
        }
      }).catch(() => { });
  }, []);

  const filteredFoods = useMemo(() => {
    return foods
      .filter(f => selectedCategory === 'all' || f.category === selectedCategory)
      .filter(f => selectedCuisine === 'all' || (f.origin || 'indian') === selectedCuisine)
      .filter(f => !searchQuery || f.name.toLowerCase().includes(searchQuery.toLowerCase()) || f.nameHindi?.toLowerCase().includes(searchQuery.toLowerCase()))
      .sort((a, b) => {
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        if (sortBy === 'calories') return a.nutrition.calories - b.nutrition.calories;
        if (sortBy === 'score' && patient) {
          return calculateANHScore(b, patient).totalScore - calculateANHScore(a, patient).totalScore;
        }
        return 0;
      });
  }, [selectedCategory, selectedCuisine, searchQuery, sortBy, patient]);

  const selectedFoodTips = useMemo(() => {
    if (!selectedFood) return [];
    return getTipsForFood(selectedFood.id, patient || undefined).slice(0, 3);
  }, [selectedFood, patient]);

  return (
    <div className="space-y-6 text-white">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">Food Database</h1>
        <p className="text-sm text-white/40">
          Browse {foods.length}+ foods from {CUISINES.length - 1} cuisines with Ayurvedic properties{patient ? ' · Personalized for your Prakriti' : ''}
        </p>
        <p className="text-xs text-white/30 mt-1">
          {ayurvedaTips.length} classical tips embedded across {foods.length}+ foods
        </p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-6 space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
            <input
              type="text"
              placeholder="Search foods (English or Hindi)..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white placeholder-white/30 focus:outline-none focus:border-[#c9a227]/40"
            />
          </div>

          <div className="relative">
            <Globe2 className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30 pointer-events-none" />
            <select
              value={selectedCuisine}
              onChange={e => setSelectedCuisine(e.target.value as FoodOrigin | 'all')}
              className="appearance-none pl-11 pr-10 py-3 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white/80 text-sm focus:outline-none focus:border-[#c9a227]/40 min-w-[180px]"
            >
              {CUISINES.map(c => (
                <option key={c.id} value={c.id} className="bg-[#1a1a1a]">{c.label}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30 pointer-events-none" />
          </div>

          <div className="relative">
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as 'name' | 'score' | 'calories')}
              className="appearance-none pl-4 pr-10 py-3 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white/70 text-sm focus:outline-none focus:border-[#c9a227]/40 min-w-[160px]"
            >
              <option value="name" className="bg-[#1a1a1a]">Sort: Name</option>
              {patient && <option value="score" className="bg-[#1a1a1a]">Sort: ANH Score</option>}
              <option value="calories" className="bg-[#1a1a1a]">Sort: Calories</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30 pointer-events-none" />
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all ${selectedCategory === cat.id
                ? 'bg-[#c9a227]/20 text-[#c9a227] border border-[#c9a227]/30'
                : 'bg-white/[0.04] text-white/50 border border-white/[0.06] hover:bg-white/[0.08]'
                }`}
            >
              <span>{cat.emoji}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {filteredFoods.length === 0 ? (
            <div className="p-12 rounded-2xl bg-white/[0.02] border border-white/[0.04] text-center">
              <Search className="h-10 w-10 text-white/15 mx-auto mb-3" />
              <p className="text-white/50 mb-1">No foods match your filters</p>
              <p className="text-xs text-white/30">Try clearing the search or switching cuisine</p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedCategory('all'); setSelectedCuisine('all'); }}
                className="mt-4 text-xs text-[#c9a227] hover:text-[#e5b939]"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <>
              <div className="grid sm:grid-cols-2 gap-3">
                {filteredFoods.map((food, i) => {
                  const score = patient ? calculateANHScore(food, patient) : null;
                  return (
                    <motion.button
                      key={food.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: Math.min(i * 0.01, 0.2) }}
                      onClick={() => setSelectedFood(food)}
                      className={`text-left p-4 rounded-xl border transition-all duration-200 ${selectedFood?.id === food.id
                        ? 'bg-[#c9a227]/10 border-[#c9a227]/30'
                        : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.05] hover:border-white/[0.12]'
                        }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-medium text-white text-sm">{food.name}</h3>
                          {food.nameHindi && <p className="text-xs text-white/30">{food.nameHindi}</p>}
                        </div>
                        {score && (
                          <div className={`text-xs font-bold px-2 py-0.5 rounded-full ${score.totalScore >= 70 ? 'bg-green-500/15 text-green-400' :
                            score.totalScore >= 50 ? 'bg-yellow-500/15 text-yellow-400' :
                              'bg-red-500/15 text-red-400'
                            }`}>
                            {score.totalScore}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-white/40">
                        <span>{food.nutrition.calories} kcal</span>
                        <span>·</span>
                        <span>{food.nutrition.protein}g protein</span>
                        {food.origin && food.origin !== 'indian' && (
                          <>
                            <span>·</span>
                            <span className="capitalize text-white/30">{food.origin.replace('_', ' ')}</span>
                          </>
                        )}
                      </div>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {food.ayurvedic.rasa.slice(0, 3).map(r => (
                          <span key={r} className="px-1.5 py-0.5 rounded text-[10px] bg-white/[0.05] text-white/40 capitalize">{r}</span>
                        ))}
                        <span className={`px-1.5 py-0.5 rounded text-[10px] ${food.ayurvedic.virya === 'ushna' ? 'bg-red-500/10 text-red-400' : 'bg-blue-500/10 text-blue-400'}`}>
                          {food.ayurvedic.virya === 'ushna' ? '🔥' : '❄️'} {food.ayurvedic.virya}
                        </span>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
              <p className="text-center text-xs text-white/20 mt-4">
                {filteredFoods.length} of {foods.length} foods
              </p>
            </>
          )}
        </div>

        <div className="lg:sticky lg:top-8 lg:self-start">
          {selectedFood ? (
            <motion.div key={selectedFood.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                <h2 className="text-lg font-bold text-white mb-1">{selectedFood.name}</h2>
                {selectedFood.nameHindi && <p className="text-sm text-white/40 mb-3">{selectedFood.nameHindi}</p>}

                {patient && (() => {
                  const s = calculateANHScore(selectedFood, patient);
                  return (
                    <div className="p-3 rounded-xl bg-white/[0.03] mb-3">
                      <div className="flex justify-between mb-1">
                        <span className="text-xs text-white/50">ANH Score</span>
                        <span className="text-sm font-bold text-[#c9a227]">{s.totalScore}/100</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-white/10">
                        <div className="h-full rounded-full bg-gradient-to-r from-[#4a7c59] to-[#c9a227]" style={{ width: `${s.totalScore}%` }} />
                      </div>
                      <div className="flex justify-between mt-2 text-xs text-white/40">
                        <span>Ayurvedic: {s.ayurvedicScore}</span>
                        <span>Nutritional: {s.nutritionalScore}</span>
                      </div>
                    </div>
                  );
                })()}

                <div className="grid grid-cols-4 gap-2 text-center">
                  <div className="p-2 rounded-lg bg-white/[0.03]"><p className="text-xs text-white/40">Cal</p><p className="text-sm font-medium">{selectedFood.nutrition.calories}</p></div>
                  <div className="p-2 rounded-lg bg-white/[0.03]"><p className="text-xs text-white/40">Protein</p><p className="text-sm font-medium">{selectedFood.nutrition.protein}g</p></div>
                  <div className="p-2 rounded-lg bg-white/[0.03]"><p className="text-xs text-white/40">Carbs</p><p className="text-sm font-medium">{selectedFood.nutrition.carbs}g</p></div>
                  <div className="p-2 rounded-lg bg-white/[0.03]"><p className="text-xs text-white/40">Fat</p><p className="text-sm font-medium">{selectedFood.nutrition.fat}g</p></div>
                </div>
                {selectedFood.servingSize && (
                  <p className="text-xs text-white/40 text-center mt-2">Per {selectedFood.servingSize}</p>
                )}
              </div>

              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                <h3 className="text-sm font-semibold text-white/70 mb-4">Ayurvedic Properties</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-white/40">Rasa (Taste)</span>
                    <span className="text-white capitalize">{selectedFood.ayurvedic.rasa.join(', ')}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/40">Virya (Potency)</span>
                    <span className={`flex items-center gap-1 ${selectedFood.ayurvedic.virya === 'ushna' ? 'text-red-400' : 'text-blue-400'}`}>
                      {selectedFood.ayurvedic.virya === 'ushna' ? <Flame className="h-3.5 w-3.5" /> : <Snowflake className="h-3.5 w-3.5" />}
                      {selectedFood.ayurvedic.virya === 'ushna' ? 'Heating' : 'Cooling'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/40">Vipaka</span>
                    <span className="text-white capitalize">{selectedFood.ayurvedic.vipaka}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/[0.06]">
                  <p className="text-xs text-white/40 mb-2">Dosha Effects</p>
                  <div className="grid grid-cols-3 gap-2">
                    {(['vata', 'pitta', 'kapha'] as const).map(d => {
                      const effect = selectedFood.ayurvedic.doshaEffect[d];
                      return (
                        <div key={d} className={`p-2 rounded-lg text-center text-xs ${effect < 0 ? 'bg-green-500/10 text-green-400' : effect > 0 ? 'bg-red-500/10 text-red-400' : 'bg-white/[0.04] text-white/40'
                          }`}>
                          <div className="font-medium capitalize">{d}</div>
                          <div>{effect < 0 ? 'Pacifies' : effect > 0 ? 'Aggravates' : 'Neutral'}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {selectedFood.ayurvedic.guna && selectedFood.ayurvedic.guna.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-white/[0.06]">
                    <p className="text-xs text-white/40 mb-2">Guna (Qualities)</p>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedFood.ayurvedic.guna.map(g => (
                        <span key={g} className="px-2 py-1 rounded-md text-xs bg-white/[0.05] text-white/50 capitalize">{g}</span>
                      ))}
                    </div>
                  </div>
                )}

                {selectedFood.season && selectedFood.season.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-white/[0.06]">
                    <p className="text-xs text-white/40 mb-2">Best Seasons</p>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedFood.season.map(s => (
                        <span key={s} className="flex items-center gap-1 px-2 py-1 rounded-md text-xs bg-[#4a7c59]/10 text-[#7ab08a] capitalize">
                          <Leaf className="h-3 w-3" /> {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {selectedFood.contraindications && selectedFood.contraindications.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-white/[0.06]">
                    <p className="text-xs text-white/40 mb-2 flex items-center gap-1">
                      <AlertTriangle className="h-3 w-3 text-amber-400" /> Contraindications
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedFood.contraindications.map(c => (
                        <span key={c} className="px-2 py-1 rounded-md text-xs bg-amber-500/10 text-amber-300 capitalize">{c.replace(/_/g, ' ')}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {selectedFoodTips.length > 0 && (
                <div className="p-5 rounded-2xl bg-gradient-to-br from-[#c9a227]/5 to-[#4a7c59]/5 border border-[#c9a227]/20">
                  <h3 className="text-sm font-semibold text-[#c9a227] mb-3 flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5" /> Ayurveda Tips
                  </h3>
                  <div className="space-y-3">
                    {selectedFoodTips.map(tip => (
                      <div key={tip.id} className="p-3 rounded-lg bg-white/[0.03] border border-white/[0.05]">
                        <div className="flex items-start gap-2">
                          <span className="text-base flex-shrink-0">{TIP_ICONS[tip.category]}</span>
                          <div className="flex-1">
                            <p className="text-xs text-white/80 leading-relaxed">{tip.tip}</p>
                            {tip.detail && (
                              <p className="text-xs text-white/50 mt-1.5 leading-relaxed">{tip.detail}</p>
                            )}
                            {tip.source && (
                              <p className="text-[10px] text-white/30 mt-1.5 italic">— {tip.source}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ) : (
            <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/[0.04] text-center">
              <Filter className="h-8 w-8 text-white/15 mx-auto mb-3" />
              <p className="text-sm text-white/30">Select a food to see details & tips</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
