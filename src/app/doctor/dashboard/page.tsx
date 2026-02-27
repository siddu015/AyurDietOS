'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { foods } from '@/lib/data';
import { calculateANHScore } from '@/lib/algorithms/anhScore';
import { checkFoodPairCompatibility } from '@/lib/algorithms/viruddhaCheck';
import type { PatientProfile, Food } from '@/lib/types';
import {
  Users, ClipboardPlus, Search, Activity, AlertTriangle,
  UtensilsCrossed, ChevronRight, ArrowRight,
} from 'lucide-react';

// Demo patients for doctor view
const demoPatients: PatientProfile[] = [
  {
    id: 'patient_1', name: 'Rajesh Kumar', age: 45, gender: 'male',
    prakriti: { vata: 25, pitta: 55, kapha: 20, dominant: 'pitta' },
    conditions: ['diabetes', 'hypertension'], allergies: ['peanuts'],
    dietaryPreferences: ['vegetarian'],
    goals: { weightGoal: 'lose', dailyCalorieTarget: 1600, proteinTarget: 65 },
  },
  {
    id: 'patient_2', name: 'Priya Sharma', age: 32, gender: 'female',
    prakriti: { vata: 45, pitta: 25, kapha: 30, dominant: 'vata' },
    conditions: ['digestive_issues'], allergies: [],
    dietaryPreferences: ['vegetarian'],
    goals: { weightGoal: 'maintain', dailyCalorieTarget: 1800, proteinTarget: 55 },
  },
  {
    id: 'patient_3', name: 'Amit Patel', age: 28, gender: 'male',
    prakriti: { vata: 15, pitta: 30, kapha: 55, dominant: 'kapha' },
    conditions: ['obesity'], allergies: [],
    dietaryPreferences: ['non-vegetarian'],
    goals: { weightGoal: 'lose', dailyCalorieTarget: 1400, proteinTarget: 70 },
  },
];

export default function DoctorDashboardPage() {
  const [selectedPatient, setSelectedPatient] = useState<PatientProfile | null>(null);
  const [activeTab, setActiveTab] = useState<'patients' | 'compatibility' | 'foods'>('patients');

  return (
    <div className="space-y-6 text-white">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Doctor Dashboard</h1>
          <p className="text-sm text-white/40">Manage patients and create diet plans</p>
        </div>
        <Link href="/doctor/create-plan" className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#4a7c59] to-[#3a6249] text-white text-sm hover:scale-105 transition-transform">
          <ClipboardPlus className="h-4 w-4" /> Create Plan
        </Link>
      </motion.div>

      {/* Tabs */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex gap-2 mb-6">
        {[
          { id: 'patients' as const, label: 'Patients', icon: <Users className="h-4 w-4" /> },
          { id: 'compatibility' as const, label: 'Compatibility Check', icon: <AlertTriangle className="h-4 w-4" /> },
          { id: 'foods' as const, label: 'Food Explorer', icon: <UtensilsCrossed className="h-4 w-4" /> },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm transition-all ${activeTab === tab.id
              ? 'bg-white/[0.08] text-white border border-white/[0.1]'
              : 'text-white/40 hover:text-white/60'
              }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </motion.div>

      {activeTab === 'patients' && (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Patient List */}
          <div className="space-y-3">
            <h2 className="text-sm font-semibold text-white/50 mb-3">Patients ({demoPatients.length})</h2>
            {demoPatients.map(p => (
              <button
                key={p.id}
                onClick={() => setSelectedPatient(p)}
                className={`w-full text-left p-4 rounded-xl border transition-all ${selectedPatient?.id === p.id
                  ? 'bg-[#c9a227]/10 border-[#c9a227]/30'
                  : 'bg-white/[0.03] border-white/[0.06] hover:bg-white/[0.06]'
                  }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4a7c59] to-[#c9a227] flex items-center justify-center font-bold text-sm">
                    {p.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-white text-sm">{p.name}</p>
                    <p className="text-xs text-white/40">{p.age}y · {p.gender} · <span className="capitalize">{p.prakriti.dominant}</span></p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-white/20" />
                </div>
              </button>
            ))}
          </div>

          {/* Patient Details */}
          <div className="lg:col-span-2">
            {selectedPatient ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                  <h2 className="text-lg font-bold text-white mb-4">{selectedPatient.name}</h2>
                  <div className="grid grid-cols-3 gap-4">
                    {(['vata', 'pitta', 'kapha'] as const).map(d => (
                      <div key={d}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-white/50 capitalize">{d}</span>
                          <span className="text-white">{selectedPatient.prakriti[d]}%</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-white/10">
                          <div className="h-full rounded-full bg-gradient-to-r from-[#4a7c59] to-[#c9a227]" style={{ width: `${selectedPatient.prakriti[d]}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                    <p className="text-xs text-white/40 mb-2">Conditions</p>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedPatient.conditions.map(c => (
                        <span key={c} className="px-2 py-0.5 rounded bg-white/[0.08] text-white/60 capitalize text-xs">{c.replace('_', ' ')}</span>
                      ))}
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                    <p className="text-xs text-white/40 mb-2">Goals</p>
                    <p className="text-sm text-white capitalize">{selectedPatient.goals.weightGoal} weight</p>
                    <p className="text-xs text-white/40">{selectedPatient.goals.dailyCalorieTarget} kcal · {selectedPatient.goals.proteinTarget}g protein</p>
                  </div>
                </div>

                {/* Top Foods */}
                <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                  <h3 className="text-sm font-semibold text-white/60 mb-3">Top Scored Foods</h3>
                  <div className="space-y-2">
                    {foods.slice(0, 8).map(f => {
                      const score = calculateANHScore(f, selectedPatient);
                      return (
                        <div key={f.id} className="flex items-center justify-between py-1.5">
                          <span className="text-sm text-white/70">{f.name}</span>
                          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${score.totalScore >= 70 ? 'bg-green-500/15 text-green-400' :
                            score.totalScore >= 50 ? 'bg-yellow-500/15 text-yellow-400' :
                              'bg-red-500/15 text-red-400'
                            }`}>{score.totalScore}</span>
                        </div>
                      );
                    }).sort((a, b) => 0)}
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/[0.04] text-center">
                <Users className="h-8 w-8 text-white/15 mx-auto mb-3" />
                <p className="text-sm text-white/30">Select a patient to view details</p>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'compatibility' && <CompatibilityView />}
      {activeTab === 'foods' && <FoodsExplorerView selectedPatient={selectedPatient} />}
    </div>
  );
}

function CompatibilityView() {
  const [food1, setFood1] = useState('');
  const [food2, setFood2] = useState('');
  const [result, setResult] = useState<{ isCompatible: boolean; warnings: { message: string; rule: { severity: string } }[] } | null>(null);

  const handleCheck = () => {
    const f1 = foods.find(f => f.name.toLowerCase().includes(food1.toLowerCase()));
    const f2 = foods.find(f => f.name.toLowerCase().includes(food2.toLowerCase()));
    if (f1 && f2) {
      const r = checkFoodPairCompatibility(f1, f2);
      setResult(r);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
      <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-[#d35400]" /> Viruddha Aahara Check
        </h2>
        <div className="grid sm:grid-cols-2 gap-3 mb-4">
          <input
            placeholder="First food (e.g. milk)"
            value={food1}
            onChange={e => setFood1(e.target.value)}
            className="px-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white placeholder-white/30 focus:outline-none focus:border-[#c9a227]/40"
          />
          <input
            placeholder="Second food (e.g. fish)"
            value={food2}
            onChange={e => setFood2(e.target.value)}
            className="px-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white placeholder-white/30 focus:outline-none focus:border-[#c9a227]/40"
          />
        </div>
        <button
          onClick={handleCheck}
          disabled={!food1 || !food2}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#d35400] to-[#e67e22] text-white text-sm disabled:opacity-40"
        >
          Check Compatibility
        </button>

        {result && (
          <div className={`mt-4 p-4 rounded-xl border ${result.isCompatible ? 'bg-green-500/5 border-green-500/20' : 'bg-red-500/5 border-red-500/20'}`}>
            <p className={`font-medium text-sm ${result.isCompatible ? 'text-green-400' : 'text-red-400'}`}>
              {result.isCompatible ? '✅ These foods are compatible!' : '⚠️ Viruddha Aahara detected!'}
            </p>
            {result.warnings.map((w, i) => (
              <p key={i} className="text-sm text-white/50 mt-2">{w.message}</p>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

function FoodsExplorerView({ selectedPatient }: { selectedPatient: PatientProfile | null }) {
  const [search, setSearch] = useState('');
  const filtered = foods.filter(f => f.name.toLowerCase().includes(search.toLowerCase())).slice(0, 20);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <div className="relative mb-4 max-w-lg">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
        <input
          placeholder="Search foods..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white placeholder-white/30 focus:outline-none focus:border-[#c9a227]/40"
        />
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filtered.map(f => {
          const score = selectedPatient ? calculateANHScore(f, selectedPatient) : null;
          return (
            <div key={f.id} className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-medium text-sm text-white">{f.name}</h3>
                {score && <span className="text-xs font-bold text-[#c9a227]">{score.totalScore}</span>}
              </div>
              <p className="text-xs text-white/40">{f.nutrition.calories} kcal · {f.nutrition.protein}g protein · <span className="capitalize">{f.category.replace('_', ' ')}</span></p>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
