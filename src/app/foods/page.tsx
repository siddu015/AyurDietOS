'use client';

import { useState } from 'react';
import { FoodBrowser } from '@/components/FoodBrowser';
import { PortionSlider } from '@/components/PortionSlider';
import { foods } from '@/lib/data';
import { Food, PatientProfile } from '@/lib/types';

// Demo patient for showing scores
const demoPatient: PatientProfile = {
  id: 'demo-patient',
  name: 'Demo User',
  age: 30,
  gender: 'male',
  prakriti: {
    dominant: 'vata',
    secondary: 'pitta',
    vata: 60,
    pitta: 25,
    kapha: 15,
  },
  vikriti: { vata: 70, pitta: 20, kapha: 10, dominant: 'vata' },
  conditions: [],
  allergies: [],
  dietaryPreferences: ['vegetarian'],
  goals: {
    weightGoal: 'maintain',
    dailyCalorieTarget: 2000,
    proteinTarget: 60,
  },
};

export default function FoodsPage() {
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const [showScores, setShowScores] = useState(true);

  return (
    <div className="min-h-screen bg-cream">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-dark mb-2">Food Database</h1>
          <p className="text-stone">
            Browse 100+ foods with complete Ayurvedic and nutritional information
          </p>
          <div className="mt-4 flex items-center gap-4">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={showScores}
                onChange={(e) => setShowScores(e.target.checked)}
                className="rounded"
              />
              Show ANH Scores (for Vata-Pitta constitution)
            </label>
          </div>
        </header>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Browser */}
          <div className="lg:col-span-2">
            <FoodBrowser
              foods={foods}
              patient={showScores ? demoPatient : undefined}
              onSelectFood={setSelectedFood}
              showScores={showScores}
            />
          </div>

          {/* Side Panel */}
          <div className="space-y-6">
            {selectedFood ? (
              <>
                <PortionSlider
                  food={selectedFood}
                  patient={demoPatient}
                />

                {/* Food Details */}
                <div className="card p-4">
                  <h3 className="font-semibold mb-4">Ayurvedic Properties</h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-stone">Rasa (Taste)</span>
                      <span className="font-medium">
                        {selectedFood.ayurvedic.rasa.join(', ')}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone">Virya (Potency)</span>
                      <span className={`font-medium ${
                        selectedFood.ayurvedic.virya === 'ushna' 
                          ? 'text-moderate' 
                          : 'text-secondary'
                      }`}>
                        {selectedFood.ayurvedic.virya === 'ushna' ? 'Heating' : 'Cooling'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone">Vipaka</span>
                      <span className="font-medium">{selectedFood.ayurvedic.vipaka}</span>
                    </div>
                    
                    <div className="pt-3 border-t border-clay">
                      <span className="text-stone text-sm">Dosha Effects</span>
                      <div className="mt-2 flex gap-2">
                        {(['vata', 'pitta', 'kapha'] as const).map(dosha => {
                          const effect = selectedFood.ayurvedic.doshaEffect[dosha];
                          return (
                            <div 
                              key={dosha}
                              className={`flex-1 p-2 rounded text-center text-sm ${
                                effect < 0 
                                  ? 'bg-secondary/20 text-secondary' 
                                  : effect > 0 
                                    ? 'bg-moderate/20 text-moderate' 
                                    : 'bg-sand text-stone'
                              }`}
                            >
                              <div className="font-medium capitalize">{dosha}</div>
                              <div>
                                {effect < 0 ? 'Pacifies' : effect > 0 ? 'Aggravates' : 'Neutral'}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {selectedFood.ayurvedic.guna && (
                      <div className="pt-3 border-t border-clay">
                        <span className="text-stone text-sm">Guna (Qualities)</span>
                        <div className="mt-1 flex gap-1 flex-wrap">
                          {selectedFood.ayurvedic.guna.map(guna => (
                            <span 
                              key={guna}
                              className="px-2 py-1 bg-sand rounded text-xs"
                            >
                              {guna}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {selectedFood.season && (
                      <div className="pt-3 border-t border-clay">
                        <span className="text-stone text-sm">Best Seasons</span>
                        <div className="mt-1 flex gap-1 flex-wrap">
                          {selectedFood.season.map(s => (
                            <span 
                              key={s}
                              className="px-2 py-1 bg-primary/10 rounded text-xs"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {selectedFood.contraindications && (
                      <div className="pt-3 border-t border-clay">
                        <span className="text-stone text-sm">Contraindications</span>
                        <div className="mt-1 text-sm text-moderate">
                          {selectedFood.contraindications.join(', ')}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div className="card p-8 text-center text-stone">
                <p>Select a food to see details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

