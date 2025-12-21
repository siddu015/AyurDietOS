'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PatientProfile, DoshaPrakriti, Food } from '@/lib/types';
import { foods } from '@/lib/data';
import { calculateANHScore, checkFoodPairCompatibility, getTopRecommendations } from '@/lib/algorithms';
import { FoodCard } from '@/components/FoodCard';
import { ViruddhaWarning } from '@/components/ViruddhaWarning';
import { ScoreCircle } from '@/components/ui/ScoreCircle';
import { DoshaBar } from '@/components/ui/DoshaBar';

// Demo patients for the doctor dashboard
const demoPatients: PatientProfile[] = [
  {
    id: 'patient_1',
    name: 'Rajesh Kumar',
    age: 45,
    gender: 'male',
    prakriti: { vata: 25, pitta: 55, kapha: 20, dominant: 'pitta' },
    conditions: ['diabetes', 'hypertension'],
    allergies: [],
    dietaryPreferences: ['vegetarian'],
    goals: { weightGoal: 'lose', dailyCalorieTarget: 1600, proteinTarget: 60, dietGoals: ['diabetes_management', 'heart_health'] },
  },
  {
    id: 'patient_2',
    name: 'Priya Sharma',
    age: 32,
    gender: 'female',
    prakriti: { vata: 40, pitta: 30, kapha: 30, dominant: 'vata', secondary: 'pitta' },
    conditions: ['pcod'],
    allergies: ['dairy'],
    dietaryPreferences: ['vegetarian'],
    goals: { weightGoal: 'lose', dailyCalorieTarget: 1500, proteinTarget: 55, dietGoals: ['weight_loss', 'digestive_health'] },
  },
  {
    id: 'patient_3',
    name: 'Amit Patel',
    age: 38,
    gender: 'male',
    prakriti: { vata: 20, pitta: 25, kapha: 55, dominant: 'kapha' },
    conditions: ['obesity'],
    allergies: [],
    dietaryPreferences: ['non-vegetarian'],
    goals: { weightGoal: 'lose', dailyCalorieTarget: 1400, proteinTarget: 70, dietGoals: ['weight_loss', 'energy_boost'] },
  },
];

export default function DoctorDashboardPage() {
  const [selectedPatient, setSelectedPatient] = useState<PatientProfile | null>(null);
  const [activeView, setActiveView] = useState<'patients' | 'compatibility' | 'foods'>('patients');

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold mb-2">Doctor Dashboard</h1>
          <p className="text-stone">Manage patients, create diet plans, and check food compatibility</p>
        </div>
        <Link href="/doctor/create-plan" className="btn btn-primary">
          Create Diet Plan
        </Link>
      </div>

      {/* Navigation */}
      <div className="flex gap-2 border-b border-clay pb-2">
        {(['patients', 'compatibility', 'foods'] as const).map(view => (
          <button
            key={view}
            onClick={() => setActiveView(view)}
            className={`px-4 py-2 rounded-t-lg font-medium capitalize transition-colors ${
              activeView === view
                ? 'bg-secondary text-white'
                : 'text-stone hover:text-foreground hover:bg-sand'
            }`}
          >
            {view === 'compatibility' ? 'Food Compatibility' : view}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeView === 'patients' && (
        <PatientsView 
          patients={demoPatients} 
          selectedPatient={selectedPatient}
          onSelectPatient={setSelectedPatient}
        />
      )}
      {activeView === 'compatibility' && (
        <CompatibilityView />
      )}
      {activeView === 'foods' && (
        <FoodsExplorerView selectedPatient={selectedPatient} />
      )}
    </div>
  );
}

function PatientsView({ 
  patients, 
  selectedPatient, 
  onSelectPatient 
}: { 
  patients: PatientProfile[]; 
  selectedPatient: PatientProfile | null;
  onSelectPatient: (p: PatientProfile | null) => void;
}) {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {/* Patient List */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Patients</h2>
        {patients.map(patient => (
          <div
            key={patient.id}
            onClick={() => onSelectPatient(patient)}
            className={`card p-4 cursor-pointer ${
              selectedPatient?.id === patient.id ? 'ring-2 ring-secondary' : ''
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-medium">{patient.name}</h3>
                <p className="text-sm text-stone">{patient.age} years, {patient.gender}</p>
              </div>
              <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                patient.prakriti.dominant === 'vata' ? 'badge-vata' :
                patient.prakriti.dominant === 'pitta' ? 'badge-pitta' : 'badge-kapha'
              }`}>
                {patient.prakriti.dominant}
              </span>
            </div>
            <div className="flex flex-wrap gap-1">
              {patient.conditions.map(condition => (
                <span key={condition} className="px-2 py-0.5 bg-sand text-stone rounded text-xs">
                  {condition}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Patient Details */}
      <div className="md:col-span-2">
        {selectedPatient ? (
          <PatientDetails patient={selectedPatient} />
        ) : (
          <div className="card p-8 text-center">
            <p className="text-stone">Select a patient to view details</p>
          </div>
        )}
      </div>
    </div>
  );
}

function PatientDetails({ patient }: { patient: PatientProfile }) {
  const topFoods = getTopRecommendations(foods, patient, 6);

  return (
    <div className="space-y-6">
      {/* Profile Card */}
      <div className="card p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-xl font-semibold">{patient.name}</h2>
            <p className="text-stone">{patient.age} years, {patient.gender}</p>
          </div>
          <Link 
            href={`/doctor/create-plan?patient=${patient.id}`}
            className="btn btn-secondary text-sm"
          >
            Create Plan
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Prakriti */}
          <div>
            <h3 className="font-medium mb-3">Prakriti</h3>
            <DoshaBar prakriti={patient.prakriti} />
          </div>

          {/* Health Info */}
          <div>
            <h3 className="font-medium mb-3">Health Profile</h3>
            <div className="space-y-2">
              <div>
                <span className="text-sm text-stone">Conditions: </span>
                {patient.conditions.length > 0 ? (
                  <span className="text-sm">{patient.conditions.join(', ')}</span>
                ) : (
                  <span className="text-sm text-stone">None</span>
                )}
              </div>
              <div>
                <span className="text-sm text-stone">Allergies: </span>
                {patient.allergies.length > 0 ? (
                  <span className="text-sm">{patient.allergies.join(', ')}</span>
                ) : (
                  <span className="text-sm text-stone">None</span>
                )}
              </div>
              <div>
                <span className="text-sm text-stone">Diet: </span>
                <span className="text-sm">{patient.dietaryPreferences.join(', ')}</span>
              </div>
              <div>
                <span className="text-sm text-stone">Goals: </span>
                <span className="text-sm">{(patient.goals.dietGoals || []).join(', ').replace(/_/g, ' ')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Foods */}
      <div>
        <h3 className="font-semibold mb-4">Top Recommended Foods</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {topFoods.map(({ food, score }) => (
            <FoodCard key={food.id} food={food} score={score} compact />
          ))}
        </div>
      </div>
    </div>
  );
}

function CompatibilityView() {
  const [food1, setFood1] = useState<string>('');
  const [food2, setFood2] = useState<string>('');
  const [result, setResult] = useState<ReturnType<typeof checkFoodPairCompatibility> | null>(null);

  const handleCheck = () => {
    if (food1 && food2) {
      const f1 = foods.find(f => f.id === food1);
      const f2 = foods.find(f => f.id === food2);
      if (f1 && f2) {
        const checkResult = checkFoodPairCompatibility(f1, f2);
        setResult(checkResult);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="card p-6">
        <h2 className="text-xl font-semibold mb-4">Viruddha Aahara Checker</h2>
        <p className="text-stone mb-6">
          Check if two foods are compatible according to Ayurvedic principles
        </p>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium mb-2">Food 1</label>
            <select
              value={food1}
              onChange={(e) => setFood1(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-clay"
            >
              <option value="">Select a food...</option>
              {foods.map(food => (
                <option key={food.id} value={food.id}>
                  {food.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-end justify-center pb-2">
            <span className="text-2xl text-stone">+</span>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Food 2</label>
            <select
              value={food2}
              onChange={(e) => setFood2(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-clay"
            >
              <option value="">Select a food...</option>
              {foods.map(food => (
                <option key={food.id} value={food.id}>
                  {food.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={handleCheck}
          disabled={!food1 || !food2}
          className="btn btn-secondary w-full disabled:opacity-50"
        >
          Check Compatibility
        </button>
      </div>

      {/* Results */}
      {result && (
        <div className="animate-fade-in">
          <ViruddhaWarning warnings={result.warnings} />
        </div>
      )}

      {/* Common Incompatible Pairs */}
      <div className="card p-6">
        <h3 className="font-semibold mb-4">Common Incompatible Combinations</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <IncompatiblePair foods={['Fish', 'Milk']} severity="severe" />
          <IncompatiblePair foods={['Honey (heated)', 'Any hot food']} severity="severe" />
          <IncompatiblePair foods={['Honey', 'Ghee (equal quantity)']} severity="severe" />
          <IncompatiblePair foods={['Milk', 'Banana']} severity="moderate" />
          <IncompatiblePair foods={['Yogurt', 'Night time']} severity="moderate" />
          <IncompatiblePair foods={['Milk', 'Citrus fruits']} severity="moderate" />
        </div>
      </div>
    </div>
  );
}

function IncompatiblePair({ foods, severity }: { foods: [string, string]; severity: string }) {
  const colors = {
    severe: 'border-severe bg-severe/5',
    moderate: 'border-moderate bg-moderate/5',
    mild: 'border-mild bg-mild/5',
  };

  return (
    <div className={`p-3 rounded-lg border-l-4 ${colors[severity as keyof typeof colors]}`}>
      <div className="flex items-center gap-2">
        <span className="font-medium">{foods[0]}</span>
        <span className="text-stone">+</span>
        <span className="font-medium">{foods[1]}</span>
      </div>
      <span className={`text-xs capitalize ${
        severity === 'severe' ? 'text-severe' :
        severity === 'moderate' ? 'text-moderate' : 'text-mild'
      }`}>
        {severity} incompatibility
      </span>
    </div>
  );
}

function FoodsExplorerView({ selectedPatient }: { selectedPatient: PatientProfile | null }) {
  const [search, setSearch] = useState('');
  
  const filteredFoods = foods.filter(f => 
    f.name.toLowerCase().includes(search.toLowerCase()) ||
    f.nameHindi?.toLowerCase().includes(search.toLowerCase())
  );

  const scoredFoods = selectedPatient 
    ? getTopRecommendations(filteredFoods, selectedPatient, filteredFoods.length)
    : filteredFoods.map(food => ({ food, score: undefined }));

  return (
    <div className="space-y-6">
      <div className="flex gap-4 items-center">
        <input
          type="text"
          placeholder="Search foods..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 rounded-lg border border-clay flex-1 max-w-md"
        />
        {!selectedPatient && (
          <p className="text-sm text-stone">
            Select a patient to see personalized scores
          </p>
        )}
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        {scoredFoods.map(({ food, score }) => (
          <FoodCard 
            key={food.id} 
            food={food} 
            score={score as any}
          />
        ))}
      </div>
    </div>
  );
}

