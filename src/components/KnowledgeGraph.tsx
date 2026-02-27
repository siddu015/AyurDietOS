'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { foods, doshas, conditions, viruddhaRules } from '@/lib/data';
import { AlertTriangle, ShieldCheck, ShieldAlert, X, ChevronRight } from 'lucide-react';

interface KnowledgeGraphProps {
  filterType?: 'all' | 'doshas' | 'conditions' | 'viruddha';
}

const DOSHA_COLORS = {
  vata: { bg: 'bg-blue-500/15', border: 'border-blue-400/30', text: 'text-blue-400', dot: 'bg-blue-400', hex: '#60a5fa' },
  pitta: { bg: 'bg-red-500/15', border: 'border-red-400/30', text: 'text-red-400', dot: 'bg-red-400', hex: '#f87171' },
  kapha: { bg: 'bg-green-500/15', border: 'border-green-400/30', text: 'text-green-400', dot: 'bg-green-400', hex: '#4ade80' },
};

const SEVERITY_STYLES = {
  severe: { bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-400', badge: 'bg-red-500/20 text-red-300' },
  moderate: { bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-400', badge: 'bg-amber-500/20 text-amber-300' },
  mild: { bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', text: 'text-yellow-400', badge: 'bg-yellow-500/20 text-yellow-300' },
};

type DoshaKey = 'vata' | 'pitta' | 'kapha';

export function KnowledgeGraph({ filterType = 'all' }: KnowledgeGraphProps) {
  const [selectedDosha, setSelectedDosha] = useState<DoshaKey | null>(null);
  const [selectedFood, setSelectedFood] = useState<string | null>(null);
  const [selectedCondition, setSelectedCondition] = useState<string | null>(null);

  if (filterType === 'all' || filterType === 'doshas') {
    return <FoodDoshaView selectedDosha={selectedDosha} setSelectedDosha={setSelectedDosha} selectedFood={selectedFood} setSelectedFood={setSelectedFood} />;
  }
  if (filterType === 'conditions') {
    return <ConditionsView selectedCondition={selectedCondition} setSelectedCondition={setSelectedCondition} />;
  }
  return <ViruddhaView />;
}

/* ============================================================
   VIEW 1: FOOD-DOSHA MAP
   Three dosha columns, foods flow into them with pacify/aggravate
   ============================================================ */
function FoodDoshaView({
  selectedDosha, setSelectedDosha, selectedFood, setSelectedFood,
}: {
  selectedDosha: DoshaKey | null;
  setSelectedDosha: (d: DoshaKey | null) => void;
  selectedFood: string | null;
  setSelectedFood: (f: string | null) => void;
}) {
  const foodsWithEffects = useMemo(() => {
    return foods
      .filter(f => {
        const e = f.ayurvedic.doshaEffect;
        return Math.abs(e.vata) >= 1 || Math.abs(e.pitta) >= 1 || Math.abs(e.kapha) >= 1;
      })
      .slice(0, 18)
      .map(f => ({
        id: f.id,
        name: f.name,
        nameHindi: f.nameHindi,
        category: f.category,
        virya: f.ayurvedic.virya,
        effects: {
          vata: f.ayurvedic.doshaEffect.vata,
          pitta: f.ayurvedic.doshaEffect.pitta,
          kapha: f.ayurvedic.doshaEffect.kapha,
        },
      }));
  }, []);

  const doshaData = useMemo(() => {
    return doshas.doshas.map(d => ({
      type: d.type as DoshaKey,
      name: d.name,
      elements: d.elements,
      qualities: d.qualities.slice(0, 4),
      hindi: d.type === 'vata' ? 'वात' : d.type === 'pitta' ? 'पित्त' : 'कफ',
    }));
  }, []);

  const activeFoods = useMemo(() => {
    if (!selectedDosha) return foodsWithEffects;
    return foodsWithEffects.filter(f => Math.abs(f.effects[selectedDosha]) >= 1);
  }, [selectedDosha, foodsWithEffects]);

  const activeFood = useMemo(() => {
    if (!selectedFood) return null;
    return foodsWithEffects.find(f => f.id === selectedFood) || null;
  }, [selectedFood, foodsWithEffects]);

  return (
    <div className="space-y-5">
      {/* Dosha cards -- clickable filters */}
      <div className="grid grid-cols-3 gap-3">
        {doshaData.map(d => {
          const c = DOSHA_COLORS[d.type];
          const isActive = selectedDosha === d.type;
          return (
            <motion.button
              key={d.type}
              onClick={() => setSelectedDosha(isActive ? null : d.type)}
              whileTap={{ scale: 0.97 }}
              className={`relative p-4 rounded-xl text-left transition-all duration-200 border ${
                isActive
                  ? `${c.bg} ${c.border} ring-1 ring-${d.type === 'vata' ? 'blue' : d.type === 'pitta' ? 'red' : 'green'}-400/20`
                  : 'bg-white/[0.03] border-white/[0.06] hover:bg-white/[0.06]'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className={`w-3 h-3 rounded-full ${c.dot}`} />
                <span className={`font-bold text-base ${isActive ? c.text : 'text-white/80'}`}>{d.name}</span>
                <span className="text-white/30 text-xs">{d.hindi}</span>
              </div>
              <p className="text-xs text-white/40">{d.elements.join(' + ')}</p>
              <div className="flex flex-wrap gap-1 mt-2">
                {d.qualities.map(q => (
                  <span key={q} className="text-[10px] px-1.5 py-0.5 rounded bg-white/[0.05] text-white/40">{q}</span>
                ))}
              </div>
              {isActive && (
                <motion.div layoutId="dosha-indicator" className={`absolute bottom-0 left-4 right-4 h-0.5 rounded-full ${c.dot}`} />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Hint */}
      <p className="text-xs text-white/30 text-center">
        {selectedDosha
          ? `Showing foods that affect ${selectedDosha.charAt(0).toUpperCase() + selectedDosha.slice(1)}. Click a food for details.`
          : 'Click a dosha to filter, or click any food to see its dosha effects.'}
      </p>

      {/* Food grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        <AnimatePresence mode="popLayout">
          {activeFoods.map(f => {
            const isSelected = selectedFood === f.id;
            return (
              <motion.button
                key={f.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                onClick={() => setSelectedFood(isSelected ? null : f.id)}
                className={`p-3 rounded-lg text-left transition-all border ${
                  isSelected
                    ? 'bg-[#c9a227]/10 border-[#c9a227]/30'
                    : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.05]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`font-medium text-sm ${isSelected ? 'text-[#c9a227]' : 'text-white/80'}`}>{f.name}</span>
                  {f.nameHindi && <span className="text-[10px] text-white/25">{f.nameHindi}</span>}
                </div>
                {/* Mini dosha effect bar */}
                <div className="flex gap-1">
                  {(['vata', 'pitta', 'kapha'] as const).map(d => {
                    const val = f.effects[d];
                    if (Math.abs(val) < 1) return <span key={d} className="flex-1 h-1.5 rounded-full bg-white/[0.05]" />;
                    return (
                      <span
                        key={d}
                        className={`flex-1 h-1.5 rounded-full ${val < 0 ? 'bg-green-500/60' : 'bg-red-500/50'}`}
                        title={`${d}: ${val < 0 ? 'Pacifies' : 'Aggravates'}`}
                      />
                    );
                  })}
                </div>
                <div className="flex gap-1 mt-1">
                  <span className="text-[9px] text-blue-400/50 flex-1 text-center">V</span>
                  <span className="text-[9px] text-red-400/50 flex-1 text-center">P</span>
                  <span className="text-[9px] text-green-400/50 flex-1 text-center">K</span>
                </div>
              </motion.button>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Selected food detail panel */}
      <AnimatePresence>
        {activeFood && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="p-5 rounded-xl bg-white/[0.03] border border-[#c9a227]/20"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-white">{activeFood.name}</h3>
                <p className="text-xs text-white/40">
                  {activeFood.category} {activeFood.virya ? `| ${activeFood.virya} virya` : ''}
                  {activeFood.nameHindi ? ` | ${activeFood.nameHindi}` : ''}
                </p>
              </div>
              <button onClick={() => setSelectedFood(null)} className="text-white/30 hover:text-white/60 p-1">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {(['vata', 'pitta', 'kapha'] as const).map(d => {
                const val = activeFood.effects[d];
                const isPacify = val < 0;
                const isAggravate = val > 0;
                const neutral = val === 0;
                const c = DOSHA_COLORS[d];
                return (
                  <div key={d} className={`p-3 rounded-lg border ${c.bg} ${c.border}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${c.dot}`} />
                      <span className={`font-medium text-sm ${c.text}`}>{d.charAt(0).toUpperCase() + d.slice(1)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {isPacify && <ShieldCheck className="w-4 h-4 text-green-400" />}
                      {isAggravate && <ShieldAlert className="w-4 h-4 text-red-400" />}
                      <span className={`text-sm font-medium ${isPacify ? 'text-green-400' : isAggravate ? 'text-red-400' : 'text-white/40'}`}>
                        {isPacify ? 'Pacifies' : isAggravate ? 'Aggravates' : 'Neutral'}
                      </span>
                    </div>
                    {!neutral && (
                      <div className="mt-2 flex gap-0.5">
                        {Array.from({ length: Math.min(Math.abs(val), 3) }).map((_, i) => (
                          <span key={i} className={`w-2 h-2 rounded-sm ${isPacify ? 'bg-green-400/60' : 'bg-red-400/60'}`} />
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Legend bar */}
      <div className="flex flex-wrap justify-center gap-5 text-xs text-white/40 pt-2">
        <span className="flex items-center gap-1.5">
          <span className="w-5 h-1.5 rounded-full bg-green-500/60" /> Pacifies (beneficial)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-5 h-1.5 rounded-full bg-red-500/50" /> Aggravates (caution)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-5 h-1.5 rounded-full bg-white/[0.05]" /> Neutral / weak effect
        </span>
      </div>
    </div>
  );
}

/* ============================================================
   VIEW 2: HEALTH CONDITIONS
   Each condition as an expandable card showing dosha links + dietary guidance
   ============================================================ */
function ConditionsView({
  selectedCondition, setSelectedCondition,
}: {
  selectedCondition: string | null;
  setSelectedCondition: (c: string | null) => void;
}) {
  const conditionData = useMemo(() => {
    return conditions.map(c => ({
      id: c.id,
      name: c.name,
      nameAyurvedic: c.nameAyurvedic,
      description: c.description,
      doshas: c.affectedDoshas as DoshaKey[],
      avoidCategories: c.avoidFoodCategories,
      recommendCategories: c.recommendedFoodCategories,
      guidelines: c.dietaryGuidelines || [],
    }));
  }, []);

  return (
    <div className="space-y-3">
      {/* Dosha legend at top */}
      <div className="flex items-center justify-center gap-4 mb-2">
        {(['vata', 'pitta', 'kapha'] as const).map(d => (
          <span key={d} className="flex items-center gap-1.5 text-xs text-white/50">
            <span className={`w-2.5 h-2.5 rounded-full ${DOSHA_COLORS[d].dot}`} />
            {d.charAt(0).toUpperCase() + d.slice(1)}
          </span>
        ))}
      </div>

      {/* Condition cards */}
      <div className="space-y-2">
        {conditionData.map(c => {
          const isOpen = selectedCondition === c.id;
          return (
            <motion.div key={c.id} layout className="rounded-xl border border-white/[0.06] overflow-hidden">
              <button
                onClick={() => setSelectedCondition(isOpen ? null : c.id)}
                className={`w-full p-4 text-left transition-colors ${isOpen ? 'bg-white/[0.05]' : 'bg-white/[0.02] hover:bg-white/[0.04]'}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-1">
                      {c.doshas.map(d => (
                        <span key={d} className={`w-4 h-4 rounded-full ${DOSHA_COLORS[d].dot} border-2 border-[#111]`} />
                      ))}
                    </div>
                    <div>
                      <span className="font-medium text-sm text-white/90">{c.name}</span>
                      {c.nameAyurvedic && (
                        <span className="text-xs text-white/30 ml-2">{c.nameAyurvedic}</span>
                      )}
                    </div>
                  </div>
                  <motion.div animate={{ rotate: isOpen ? 90 : 0 }} transition={{ duration: 0.15 }}>
                    <ChevronRight className="w-4 h-4 text-white/30" />
                  </motion.div>
                </div>
                {/* Dosha tags */}
                <div className="flex gap-1.5 mt-2 ml-7">
                  {c.doshas.map(d => {
                    const dc = DOSHA_COLORS[d];
                    return (
                      <span key={d} className={`text-[10px] px-2 py-0.5 rounded-full ${dc.bg} ${dc.text} ${dc.border} border`}>
                        {d.charAt(0).toUpperCase() + d.slice(1)} imbalance
                      </span>
                    );
                  })}
                </div>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 space-y-3 border-t border-white/[0.06]">
                      <p className="text-xs text-white/50 pt-3 leading-relaxed">{c.description}</p>

                      {c.recommendCategories.length > 0 && (
                        <div>
                          <h4 className="text-[10px] font-semibold text-green-400/70 uppercase tracking-wider mb-1.5">Recommended Foods</h4>
                          <div className="flex flex-wrap gap-1.5">
                            {c.recommendCategories.map(cat => (
                              <span key={cat} className="text-xs px-2 py-1 rounded-md bg-green-500/10 text-green-400/80 border border-green-500/20">
                                {cat.replace(/_/g, ' ')}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {c.avoidCategories.length > 0 && (
                        <div>
                          <h4 className="text-[10px] font-semibold text-red-400/70 uppercase tracking-wider mb-1.5">Avoid</h4>
                          <div className="flex flex-wrap gap-1.5">
                            {c.avoidCategories.map(cat => (
                              <span key={cat} className="text-xs px-2 py-1 rounded-md bg-red-500/10 text-red-400/80 border border-red-500/20">
                                {cat.replace(/_/g, ' ')}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {c.guidelines.length > 0 && (
                        <div>
                          <h4 className="text-[10px] font-semibold text-white/40 uppercase tracking-wider mb-1.5">Dietary Guidelines</h4>
                          <ul className="space-y-1">
                            {c.guidelines.slice(0, 4).map((g, i) => (
                              <li key={i} className="text-xs text-white/50 flex items-start gap-2">
                                <span className="text-[#c9a227] mt-0.5">--</span>
                                <span>{g}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/* ============================================================
   VIEW 3: VIRUDDHA AAHARA
   Clear incompatible pair cards with severity, type, reason
   ============================================================ */
function ViruddhaView() {
  const [expandedRule, setExpandedRule] = useState<string | null>(null);
  const [severityFilter, setSeverityFilter] = useState<string | null>(null);

  const foodNameMap = useMemo(() => {
    const map = new Map<string, string>();
    foods.forEach(f => map.set(f.id, f.name));
    const extra: Record<string, string> = {
      hot_water: 'Hot Water', night_time: 'Night Time', hot_preparations: 'Hot Preparations',
      citrus_fruits: 'Citrus Fruits', fruits_general: 'Fruits', cooked_meals: 'Cooked Meals',
      cold_drinks: 'Cold Drinks', hot_meals: 'Hot Meals', meals_general: 'Meals',
    };
    Object.entries(extra).forEach(([k, v]) => { if (!map.has(k)) map.set(k, v); });
    return map;
  }, []);

  const rules = useMemo(() => {
    let filtered = viruddhaRules;
    if (severityFilter) {
      filtered = filtered.filter(r => r.severity === severityFilter);
    }
    return filtered.map(r => ({
      ...r,
      food1Name: foodNameMap.get(r.food1) || r.food1.replace(/_/g, ' '),
      food2Name: foodNameMap.get(r.food2) || r.food2.replace(/_/g, ' '),
    }));
  }, [severityFilter, foodNameMap]);

  const counts = useMemo(() => ({
    severe: viruddhaRules.filter(r => r.severity === 'severe').length,
    moderate: viruddhaRules.filter(r => r.severity === 'moderate').length,
    mild: viruddhaRules.filter(r => r.severity === 'mild').length,
  }), []);

  const typeLabels: Record<string, string> = {
    samyoga: 'Combination',
    matra: 'Proportion',
    samskara: 'Processing',
    virya: 'Potency Conflict',
    kala: 'Timing',
    krama: 'Sequence',
  };

  return (
    <div className="space-y-4">
      {/* Severity filter pills */}
      <div className="flex items-center gap-2 justify-center flex-wrap">
        <button
          onClick={() => setSeverityFilter(null)}
          className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
            !severityFilter
              ? 'bg-white/[0.08] border-white/20 text-white/80'
              : 'border-white/[0.06] text-white/40 hover:text-white/60'
          }`}
        >
          All ({viruddhaRules.length})
        </button>
        {(['severe', 'moderate', 'mild'] as const).map(s => {
          const st = SEVERITY_STYLES[s];
          const isActive = severityFilter === s;
          return (
            <button
              key={s}
              onClick={() => setSeverityFilter(isActive ? null : s)}
              className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                isActive ? `${st.bg} ${st.border} ${st.text}` : 'border-white/[0.06] text-white/40 hover:text-white/60'
              }`}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)} ({counts[s]})
            </button>
          );
        })}
      </div>

      {/* Rules list */}
      <div className="space-y-2">
        {rules.map(rule => {
          const sev = SEVERITY_STYLES[rule.severity];
          const isOpen = expandedRule === rule.id;
          return (
            <motion.div
              key={rule.id}
              layout
              className={`rounded-xl border overflow-hidden transition-colors ${
                isOpen ? `${sev.bg} ${sev.border}` : 'bg-white/[0.02] border-white/[0.06]'
              }`}
            >
              <button
                onClick={() => setExpandedRule(isOpen ? null : rule.id)}
                className="w-full p-4 text-left"
              >
                <div className="flex items-center gap-3">
                  <AlertTriangle className={`w-4 h-4 flex-shrink-0 ${sev.text}`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-medium text-sm text-white/90">{rule.food1Name}</span>
                      <span className="text-white/20">+</span>
                      <span className="font-medium text-sm text-white/90">{rule.food2Name}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${sev.badge}`}>
                      {rule.severity}
                    </span>
                    <motion.div animate={{ rotate: isOpen ? 90 : 0 }} transition={{ duration: 0.15 }}>
                      <ChevronRight className="w-4 h-4 text-white/30" />
                    </motion.div>
                  </div>
                </div>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 space-y-3 border-t border-white/[0.04]">
                      <div className="flex gap-2 pt-3">
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/[0.06] text-white/50 border border-white/[0.08]">
                          {typeLabels[rule.type] || rule.type}
                        </span>
                        {rule.reference && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#c9a227]/10 text-[#c9a227]/60 border border-[#c9a227]/20">
                            {rule.reference}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-white/50 leading-relaxed">{rule.reason}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Summary bar */}
      <div className="flex items-center justify-center gap-6 text-xs text-white/30 pt-2">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-red-400" /> Severe -- avoid entirely
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-amber-400" /> Moderate -- use caution
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-yellow-400" /> Mild -- occasional is okay
        </span>
      </div>
    </div>
  );
}
