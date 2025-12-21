'use client';

import { useRef } from 'react';
import { PatientProfile } from '@/lib/types';
import { Recipe } from '@/lib/data/recipes';
import { Food } from '@/lib/types';
import { MealTemplate } from '@/lib/data/mealTemplates';

interface DietChartData {
  weeklyPlan?: Record<string, {
    breakfast: Array<{ name: string; portion: number }>;
    lunch: Array<{ name: string; portion: number }>;
    dinner: Array<{ name: string; portion: number }>;
    snacks: Array<{ name: string; portion: number }>;
  }>;
  template?: MealTemplate;
  dailyTargets?: {
    calories: number;
    protein: number;
  };
  recommendations?: string[];
  avoidFoods?: string[];
}

interface PrintableChartProps {
  patient: PatientProfile;
  doctorName?: string;
  clinicName?: string;
  clinicAddress?: string;
  chartData: DietChartData;
  showLogo?: boolean;
}

export function PrintableChart({
  patient,
  doctorName = 'Dr. Ayurvedic Physician',
  clinicName = 'AyurDiet Wellness Center',
  clinicAddress,
  chartData,
  showLogo = true,
}: PrintableChartProps) {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  const currentDate = new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  const getDoshaDescription = (dosha: string): string => {
    const descriptions: Record<string, string> = {
      vata: 'Vata-dominant constitution - focus on warm, grounding, nourishing foods',
      pitta: 'Pitta-dominant constitution - focus on cooling, calming foods',
      kapha: 'Kapha-dominant constitution - focus on light, stimulating foods',
    };
    return descriptions[dosha] || '';
  };

  return (
    <>
      {/* Print Button (hidden in print) */}
      <div className="print:hidden mb-4 flex gap-2">
        <button
          onClick={handlePrint}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
              d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" 
            />
          </svg>
          Print Diet Chart
        </button>
        <button
          onClick={() => {
            // Export as PDF would require a library like html2pdf
            alert('PDF export would require additional libraries. Use browser Print to PDF for now.');
          }}
          className="px-4 py-2 bg-sand text-stone rounded-lg hover:bg-clay"
        >
          Export PDF
        </button>
      </div>

      {/* Printable Content */}
      <div 
        ref={printRef}
        className="bg-white p-8 max-w-4xl mx-auto print:max-w-none print:p-4"
        style={{ fontFamily: 'Georgia, serif' }}
      >
        {/* Header / Letterhead */}
        <header className="border-b-2 border-primary pb-4 mb-6">
          <div className="flex justify-between items-start">
            <div>
              {showLogo && (
                <div className="text-3xl font-bold text-primary mb-1">
                  AyurDiet OS
                </div>
              )}
              <div className="text-xl font-semibold">{clinicName}</div>
              {clinicAddress && (
                <div className="text-sm text-gray-600">{clinicAddress}</div>
              )}
            </div>
            <div className="text-right">
              <div className="font-semibold">{doctorName}</div>
              <div className="text-sm text-gray-600">Date: {currentDate}</div>
            </div>
          </div>
        </header>

        {/* Patient Info */}
        <section className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h2 className="text-lg font-bold mb-3 text-primary">Patient Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="font-medium">Name:</span> {patient.name}
            </div>
            <div>
              <span className="font-medium">Age:</span> {patient.age} years
            </div>
            <div>
              <span className="font-medium">Prakriti:</span>{' '}
              <span className="capitalize">{patient.prakriti.dominant}</span>
              {patient.prakriti.secondary && (
                <span> - {patient.prakriti.secondary}</span>
              )}
            </div>
            <div>
              <span className="font-medium">Weight Goal:</span>{' '}
              <span className="capitalize">{patient.goals.weightGoal.replace('_', ' ')}</span>
            </div>
          </div>
          <div className="mt-3 text-sm text-gray-600 italic">
            {getDoshaDescription(patient.prakriti.dominant)}
          </div>
        </section>

        {/* Daily Targets */}
        {chartData.dailyTargets && (
          <section className="mb-6">
            <h2 className="text-lg font-bold mb-3 text-primary">Daily Nutritional Targets</h2>
            <div className="flex gap-8">
              <div className="text-center p-4 border rounded-lg">
                <div className="text-3xl font-bold text-primary">
                  {chartData.dailyTargets.calories}
                </div>
                <div className="text-sm text-gray-600">kcal / day</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-3xl font-bold text-secondary">
                  {chartData.dailyTargets.protein}g
                </div>
                <div className="text-sm text-gray-600">protein / day</div>
              </div>
            </div>
          </section>
        )}

        {/* Diet Plan Table */}
        {chartData.template && (
          <section className="mb-6">
            <h2 className="text-lg font-bold mb-3 text-primary">
              {chartData.template.name}
            </h2>
            <p className="text-sm text-gray-600 mb-4">{chartData.template.description}</p>
            
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-primary text-white">
                  <th className="border p-2 text-left">Meal</th>
                  <th className="border p-2 text-left">Calories</th>
                  <th className="border p-2 text-left">Suggested Foods</th>
                  <th className="border p-2 text-left">Notes</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(chartData.template.mealStructure).map(([meal, slot]) => (
                  slot && (
                    <tr key={meal}>
                      <td className="border p-2 font-medium capitalize">{meal.replace(/([A-Z])/g, ' $1')}</td>
                      <td className="border p-2">{slot.calorieRange.min}-{slot.calorieRange.max}</td>
                      <td className="border p-2 text-sm">
                        {slot.suggestedRecipes.join(', ') || '-'}
                      </td>
                      <td className="border p-2 text-sm text-gray-600">{slot.notes || '-'}</td>
                    </tr>
                  )
                ))}
              </tbody>
            </table>
          </section>
        )}

        {/* Weekly Plan */}
        {chartData.weeklyPlan && (
          <section className="mb-6">
            <h2 className="text-lg font-bold mb-3 text-primary">Weekly Meal Plan</h2>
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-primary text-white">
                  <th className="border p-2">Day</th>
                  <th className="border p-2">Breakfast</th>
                  <th className="border p-2">Lunch</th>
                  <th className="border p-2">Dinner</th>
                  <th className="border p-2">Snacks</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(chartData.weeklyPlan).map(([day, meals]) => (
                  <tr key={day}>
                    <td className="border p-2 font-medium">{day}</td>
                    <td className="border p-2">
                      {meals.breakfast.map(m => m.name).join(', ') || '-'}
                    </td>
                    <td className="border p-2">
                      {meals.lunch.map(m => m.name).join(', ') || '-'}
                    </td>
                    <td className="border p-2">
                      {meals.dinner.map(m => m.name).join(', ') || '-'}
                    </td>
                    <td className="border p-2">
                      {meals.snacks.map(m => m.name).join(', ') || '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

        {/* Do's and Don'ts */}
        <section className="mb-6 grid grid-cols-2 gap-4">
          {chartData.recommendations && chartData.recommendations.length > 0 && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h3 className="font-bold text-green-700 mb-2">Recommended Foods (Pathya)</h3>
              <ul className="text-sm space-y-1">
                {chartData.recommendations.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-green-600">+</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {chartData.avoidFoods && chartData.avoidFoods.length > 0 && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <h3 className="font-bold text-red-700 mb-2">Foods to Avoid (Apathya)</h3>
              <ul className="text-sm space-y-1">
                {chartData.avoidFoods.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-red-600">-</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>

        {/* Template Guidelines */}
        {chartData.template?.guidelines && (
          <section className="mb-6">
            <h2 className="text-lg font-bold mb-3 text-primary">Important Guidelines</h2>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              {chartData.template.guidelines.map((guideline, i) => (
                <li key={i}>{guideline}</li>
              ))}
            </ol>
          </section>
        )}

        {/* Ayurvedic Tips */}
        <section className="mb-6 p-4 border-l-4 border-primary bg-gray-50">
          <h3 className="font-bold mb-2">Ayurvedic Eating Guidelines</h3>
          <ul className="text-sm space-y-1">
            <li>- Eat freshly cooked meals at regular times</li>
            <li>- Chew food thoroughly (32 times ideally)</li>
            <li>- Avoid drinking cold water with meals</li>
            <li>- Leave 1/4 of stomach empty after eating</li>
            <li>- Wait at least 3 hours between meals</li>
            <li>- Light dinner before sunset when possible</li>
          </ul>
        </section>

        {/* Footer */}
        <footer className="border-t pt-4 text-sm text-gray-600">
          <div className="flex justify-between">
            <div>
              <p>This diet plan is personalized based on Ayurvedic principles.</p>
              <p>Consult your physician before making major dietary changes.</p>
            </div>
            <div className="text-right">
              <p>Generated by AyurDiet OS</p>
              <p className="italic">Tradition meets Technology</p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t text-center">
            <p className="font-medium">Doctor's Signature: _______________________</p>
          </div>
        </footer>
      </div>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .print\\:hidden {
            display: none !important;
          }
          ${printRef.current ? `#${printRef.current.id}, #${printRef.current.id} *` : ''} {
            visibility: visible;
          }
          @page {
            size: A4;
            margin: 1cm;
          }
        }
      `}</style>
    </>
  );
}

// Helper to create chart data from weekly planner
export function createChartDataFromWeeklyPlan(
  weeklyPlan: Record<string, any>,
  foods: Food[],
  recipes: Recipe[],
  patient: PatientProfile,
  template?: MealTemplate
): DietChartData {
  const formattedPlan: DietChartData['weeklyPlan'] = {};

  Object.entries(weeklyPlan).forEach(([day, dayPlan]) => {
    formattedPlan![day] = {
      breakfast: [],
      lunch: [],
      dinner: [],
      snacks: [],
    };

    ['breakfast', 'lunch', 'dinner', 'snacks'].forEach(meal => {
      const mealItems = (dayPlan as any)[meal]?.items || [];
      mealItems.forEach((item: any) => {
        const name = item.type === 'food'
          ? foods.find(f => f.id === item.id)?.name
          : recipes.find(r => r.id === item.id)?.name;
        if (name) {
          formattedPlan![day][meal as keyof typeof formattedPlan[typeof day]].push({
            name,
            portion: item.portion,
          });
        }
      });
    });
  });

  return {
    weeklyPlan: formattedPlan,
    template,
    dailyTargets: {
      calories: patient.goals.dailyCalorieTarget || 1800,
      protein: patient.goals.proteinTarget || 60,
    },
    recommendations: template?.dosList || [
      'Fresh, seasonal vegetables',
      'Whole grains and millets',
      'Warm water throughout the day',
      'Home-cooked meals',
    ],
    avoidFoods: template?.dontsList || [
      'Processed and packaged foods',
      'Cold beverages',
      'Excessive spicy or oily food',
      'Late night eating',
    ],
  };
}

