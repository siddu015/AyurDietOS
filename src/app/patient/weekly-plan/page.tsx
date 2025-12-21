'use client';

import { useState, useEffect } from 'react';
import { WeeklyPlanner, generateWeeklyPlanFromTemplate } from '@/components/WeeklyPlanner';
import { PrintableChart, createChartDataFromWeeklyPlan } from '@/components/PrintableChart';
import { foods, recipes, mealTemplates, getTemplateById } from '@/lib/data';
import { PatientProfile } from '@/lib/types';

// Demo patient
const demoPatient: PatientProfile = {
  id: 'demo-patient',
  name: 'Demo Patient',
  age: 35,
  gender: 'female',
  prakriti: {
    dominant: 'pitta',
    secondary: 'vata',
    vata: 30,
    pitta: 50,
    kapha: 20,
  },
  vikriti: { vata: 25, pitta: 55, kapha: 20, dominant: 'pitta' },
  conditions: ['digestive_issues'],
  allergies: [],
  dietaryPreferences: ['vegetarian'],
  goals: {
    weightGoal: 'maintain',
    dailyCalorieTarget: 1800,
    proteinTarget: 55,
  },
};

export default function WeeklyPlanPage() {
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
  const [weeklyPlan, setWeeklyPlan] = useState<Record<string, any>>({});
  const [showPrint, setShowPrint] = useState(false);

  const selectedTemplate = selectedTemplateId ? getTemplateById(selectedTemplateId) : undefined;

  // Generate plan when template is selected
  useEffect(() => {
    if (selectedTemplate) {
      // Extract recipe IDs from template
      const templateRecipes: string[] = [];
      Object.values(selectedTemplate.mealStructure).forEach(slot => {
        if (slot?.suggestedRecipes) {
          templateRecipes.push(...slot.suggestedRecipes);
        }
      });

      const generatedPlan = generateWeeklyPlanFromTemplate(
        selectedTemplate.preferredFoods.slice(0, 7),
        templateRecipes.slice(0, 7),
        foods,
        recipes,
        demoPatient
      );
      setWeeklyPlan(generatedPlan);
    }
  }, [selectedTemplate]);

  const chartData = createChartDataFromWeeklyPlan(
    weeklyPlan,
    foods,
    recipes,
    demoPatient,
    selectedTemplate
  );

  return (
    <div className="min-h-screen bg-cream">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-dark mb-2">Weekly Meal Planner</h1>
          <p className="text-stone">
            Create personalized 7-day meal plans based on Ayurvedic principles
          </p>
        </header>

        {/* Template Selection */}
        <section className="card p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4">Select a Diet Template</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {mealTemplates.map(template => (
              <button
                key={template.id}
                onClick={() => setSelectedTemplateId(template.id)}
                className={`p-4 rounded-lg text-left transition-all ${
                  selectedTemplateId === template.id
                    ? 'bg-primary text-white'
                    : 'bg-sand hover:bg-clay'
                }`}
              >
                <h3 className="font-medium">{template.name}</h3>
                <p className={`text-sm mt-1 ${
                  selectedTemplateId === template.id ? 'text-white/80' : 'text-stone'
                }`}>
                  {template.description.slice(0, 80)}...
                </p>
                <div className="mt-2 flex gap-2">
                  <span className={`text-xs px-2 py-0.5 rounded ${
                    selectedTemplateId === template.id ? 'bg-white/20' : 'bg-clay'
                  }`}>
                    {template.dailyCalorieTarget} kcal
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded ${
                    selectedTemplateId === template.id ? 'bg-white/20' : 'bg-clay'
                  }`}>
                    {template.duration.replace('_', ' ')}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Template Details */}
        {selectedTemplate && (
          <section className="card p-6 mb-8">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-semibold">{selectedTemplate.name}</h2>
                <p className="text-sm text-stone">{selectedTemplate.nameHindi}</p>
              </div>
              <button
                onClick={() => setShowPrint(!showPrint)}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
              >
                {showPrint ? 'Hide Print View' : 'Print Diet Chart'}
              </button>
            </div>

            <p className="text-stone mb-4">{selectedTemplate.description}</p>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Do's */}
              <div className="p-4 bg-secondary/10 rounded-lg">
                <h3 className="font-medium text-secondary mb-2">Recommended (Pathya)</h3>
                <ul className="text-sm space-y-1">
                  {selectedTemplate.dosList.map((item, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-secondary">+</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Don'ts */}
              <div className="p-4 bg-moderate/10 rounded-lg">
                <h3 className="font-medium text-moderate mb-2">Avoid (Apathya)</h3>
                <ul className="text-sm space-y-1">
                  {selectedTemplate.dontsList.map((item, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-moderate">-</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Guidelines */}
            <div className="mt-6 p-4 bg-sand rounded-lg">
              <h3 className="font-medium mb-2">Guidelines</h3>
              <ol className="text-sm space-y-1 list-decimal list-inside">
                {selectedTemplate.guidelines.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ol>
            </div>
          </section>
        )}

        {/* Weekly Planner */}
        {selectedTemplate && (
          <section className="mb-8">
            <WeeklyPlanner
              patient={demoPatient}
              foods={foods}
              recipes={recipes}
              initialPlan={weeklyPlan}
              onPlanChange={setWeeklyPlan}
            />
          </section>
        )}

        {/* Print View */}
        {showPrint && selectedTemplate && (
          <section className="mt-8">
            <PrintableChart
              patient={demoPatient}
              chartData={chartData}
              doctorName="Dr. Ayurvedic Physician"
              clinicName="AyurDiet Wellness Center"
            />
          </section>
        )}
      </div>
    </div>
  );
}

