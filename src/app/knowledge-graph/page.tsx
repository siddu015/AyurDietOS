'use client';

import { useState } from 'react';
import { KnowledgeGraph } from '@/components/KnowledgeGraph';
import { foods, conditions, viruddhaRules } from '@/lib/data';

type FilterType = 'all' | 'foods' | 'doshas' | 'conditions' | 'viruddha';

export default function KnowledgeGraphPage() {
  const [filter, setFilter] = useState<FilterType>('all');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Knowledge Graph</h1>
        <p className="text-stone">
          Visual representation of relationships between foods, doshas, conditions, and incompatibilities
        </p>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2">
        {[
          { value: 'all', label: 'All Relationships' },
          { value: 'doshas', label: 'Dosha Effects' },
          { value: 'conditions', label: 'Health Conditions' },
          { value: 'viruddha', label: 'Incompatibilities' },
        ].map(({ value, label }) => (
          <button
            key={value}
            onClick={() => setFilter(value as FilterType)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === value
                ? 'bg-secondary text-white'
                : 'bg-sand text-stone hover:bg-clay'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Graph */}
      <KnowledgeGraph filterType={filter} />

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <StatCard
          label="Foods in Database"
          value={foods.length}
          color="bg-primary"
        />
        <StatCard
          label="Health Conditions"
          value={conditions.length}
          color="bg-accent"
        />
        <StatCard
          label="Incompatibility Rules"
          value={viruddhaRules.length}
          color="bg-severe"
        />
        <StatCard
          label="Dosha Types"
          value={3}
          color="bg-secondary"
        />
      </div>

      {/* Information */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="card p-6">
          <h3 className="font-semibold mb-3">Understanding the Graph</h3>
          <ul className="space-y-2 text-sm text-stone">
            <li className="flex items-start gap-2">
              <span className="text-secondary mt-1">*</span>
              <span><strong>Green lines</strong> indicate a food pacifies (reduces) that dosha</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-severe mt-1">*</span>
              <span><strong>Red lines</strong> indicate a food aggravates (increases) that dosha</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-moderate mt-1">*</span>
              <span><strong>Orange lines</strong> show incompatible food combinations (Viruddha Aahara)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-stone mt-1">*</span>
              <span><strong>Gray lines</strong> connect health conditions to affected doshas</span>
            </li>
          </ul>
        </div>
        
        <div className="card p-6">
          <h3 className="font-semibold mb-3">How to Use</h3>
          <ul className="space-y-2 text-sm text-stone">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">1.</span>
              <span>Click on any node to see its connections and details</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">2.</span>
              <span>Use filters to focus on specific relationship types</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">3.</span>
              <span>Hover over nodes to highlight them</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">4.</span>
              <span>The graph auto-arranges using force-directed layout</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="card p-4 text-center">
      <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center mx-auto mb-2`}>
        <span className="text-xl font-bold text-white">{value}</span>
      </div>
      <p className="text-sm text-stone">{label}</p>
    </div>
  );
}

