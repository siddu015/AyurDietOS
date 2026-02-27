'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CalendarDays, Printer, ChevronRight, UtensilsCrossed, Leaf, Check } from 'lucide-react';
import { WeeklyPlanner, generateWeeklyPlanFromTemplate } from '@/components/WeeklyPlanner';
import { PrintableChart, createChartDataFromWeeklyPlan } from '@/components/PrintableChart';
import { foods, recipes, mealTemplates, getTemplateById } from '@/lib/data';
import type { PatientProfile } from '@/lib/types';

export default function WeeklyPlanPage() {
  const [patient, setPatient] = useState<PatientProfile | null>(null);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
  const [weeklyPlan, setWeeklyPlan] = useState<Record<string, any>>({});
  const [showPrint, setShowPrint] = useState(false);

  const selectedTemplate = selectedTemplateId ? getTemplateById(selectedTemplateId) : undefined;

  // Load patient from DB
  useEffect(() => {
    const userId = localStorage.getItem('ayurdiet_user_id');
    if (userId) {
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
              prakriti: { vata: p.vata / 100, pitta: p.pitta / 100, kapha: p.kapha / 100, dominant: p.dominant },
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
    }
  }, []);

  // Generate plan on template select
  useEffect(() => {
    if (selectedTemplate && patient) {
      const templateRecipes: string[] = [];
      Object.values(selectedTemplate.mealStructure).forEach((slot: unknown) => {
        const s = slot as { suggestedRecipes?: string[] };
        if (s?.suggestedRecipes) templateRecipes.push(...s.suggestedRecipes);
      });

      const plan = generateWeeklyPlanFromTemplate(
        selectedTemplate.preferredFoods.slice(0, 7),
        templateRecipes.slice(0, 7),
        foods, recipes, patient,
        selectedTemplate
      );
      setWeeklyPlan(plan);
    }
  }, [selectedTemplate, patient]);

  const chartData = patient
    ? createChartDataFromWeeklyPlan(weeklyPlan, foods, recipes, patient, selectedTemplate)
    : { days: [], template: selectedTemplate, dailyTargets: { calories: 2000, protein: 60 }, recommendations: [] };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">Weekly Meal Planner</h1>
        <p className="text-sm text-white/40">
          Create a personalized 7-day meal plan based on Ayurvedic principles
          {patient ? ` · Tailored for ${patient.prakriti.dominant} constitution` : ''}
        </p>
      </motion.div>

      {/* Template Selection */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <h2 className="text-sm font-semibold text-white/60 mb-3 flex items-center gap-2">
          <CalendarDays className="h-4 w-4 text-[#c9a227]" /> Select a Diet Template
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {mealTemplates.map(template => (
            <button
              key={template.id}
              onClick={() => setSelectedTemplateId(template.id)}
              className={`text-left p-4 rounded-xl border transition-all duration-200 ${selectedTemplateId === template.id
                ? 'bg-[#c9a227]/10 border-[#c9a227]/30'
                : 'bg-white/[0.03] border-white/[0.06] hover:bg-white/[0.06]'
                }`}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-white text-sm">{template.name}</h3>
                {selectedTemplateId === template.id && (
                  <div className="w-5 h-5 rounded-full bg-[#c9a227] flex items-center justify-center">
                    <Check className="h-3 w-3 text-black" />
                  </div>
                )}
              </div>
              <p className="text-xs text-white/40 mb-2 line-clamp-2">{template.description.slice(0, 80)}...</p>
              <div className="flex gap-2">
                <span className="text-xs px-2 py-0.5 rounded bg-white/[0.06] text-white/50">{template.dailyCalorieTarget} kcal</span>
                <span className="text-xs px-2 py-0.5 rounded bg-white/[0.06] text-white/50">{template.duration.replace('_', ' ')}</span>
              </div>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Template Details */}
      {selectedTemplate && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-white">{selectedTemplate.name}</h2>
              <p className="text-xs text-white/30">{selectedTemplate.nameHindi}</p>
            </div>
            <button
              onClick={() => setShowPrint(!showPrint)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#c9a227]/15 text-[#c9a227] text-sm hover:bg-[#c9a227]/25 transition-all"
            >
              <Printer className="h-4 w-4" />
              {showPrint ? 'Hide Print' : 'Print Chart'}
            </button>
          </div>

          <p className="text-sm text-white/50 mb-5">{selectedTemplate.description}</p>

          <div className="grid md:grid-cols-2 gap-4">
            {/* Do's */}
            <div className="p-4 rounded-xl bg-[#4a7c59]/10 border border-[#4a7c59]/15">
              <h3 className="font-medium text-[#7ab08a] text-sm mb-2 flex items-center gap-1">
                <Leaf className="h-3.5 w-3.5" /> Recommended (Pathya)
              </h3>
              <ul className="text-sm space-y-1 text-white/60">
                {selectedTemplate.dosList.map((item, i) => (
                  <li key={i} className="flex gap-2"><span className="text-[#7ab08a]">+</span>{item}</li>
                ))}
              </ul>
            </div>
            {/* Don'ts */}
            <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/10">
              <h3 className="font-medium text-red-400 text-sm mb-2 flex items-center gap-1">
                <UtensilsCrossed className="h-3.5 w-3.5" /> Avoid (Apathya)
              </h3>
              <ul className="text-sm space-y-1 text-white/60">
                {selectedTemplate.dontsList.map((item, i) => (
                  <li key={i} className="flex gap-2"><span className="text-red-400">-</span>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Guidelines */}
          <div className="mt-4 p-4 rounded-xl bg-white/[0.03]">
            <h3 className="font-medium text-white/60 text-sm mb-2">Guidelines</h3>
            <ol className="text-sm space-y-1 list-decimal list-inside text-white/50">
              {selectedTemplate.guidelines.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ol>
          </div>
        </motion.div>
      )}

      {/* Weekly Planner */}
      {selectedTemplate && patient && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <WeeklyPlanner
            patient={patient}
            foods={foods}
            recipes={recipes}
            template={selectedTemplate}
            initialPlan={weeklyPlan}
            onPlanChange={setWeeklyPlan}
          />
        </motion.div>
      )}

      {/* Print View */}
      {showPrint && selectedTemplate && patient && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-8">
          <PrintableChart
            patient={patient}
            chartData={chartData}
            doctorName="Dr. Ayurvedic Physician"
            clinicName="AyurDiet Wellness Center"
          />
        </motion.div>
      )}
    </div>
  );
}
