'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { foods, conditions, viruddhaRules } from '@/lib/data';
import { KnowledgeGraph } from '@/components/KnowledgeGraph';
import { Network, Heart, AlertTriangle, Zap, BookOpen } from 'lucide-react';

type FilterType = 'all' | 'doshas' | 'conditions' | 'viruddha';

const FILTERS: { value: FilterType; label: string; icon: React.ReactNode; description: string }[] = [
  { value: 'all', label: 'Food-Dosha Map', icon: <Network className="h-4 w-4" />, description: 'How foods affect the three doshas' },
  { value: 'doshas', label: 'Dosha Effects', icon: <Zap className="h-4 w-4" />, description: 'Foods that pacify or aggravate each dosha' },
  { value: 'conditions', label: 'Health Conditions', icon: <Heart className="h-4 w-4" />, description: 'Conditions linked to dosha imbalance' },
  { value: 'viruddha', label: 'Viruddha Aahara', icon: <AlertTriangle className="h-4 w-4" />, description: 'Incompatible food combinations' },
];

export default function KnowledgeGraphPage() {
  const [filter, setFilter] = useState<FilterType>('all');

  return (
    <div className="space-y-6 text-white">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#4a7c59]/15 rounded-full text-[#7ab08a] text-xs font-medium mb-4">
          <BookOpen className="h-3.5 w-3.5" /> Interactive Visualization
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold mb-3">
          <span className="text-[#4a7c59]">Ayurvedic</span>{' '}
          <span className="text-[#c9a227]">Knowledge Graph</span>
        </h1>
        <p className="text-sm text-white/40 max-w-xl mx-auto leading-relaxed">
          Explore interconnections between foods, doshas, health conditions,
          and incompatible combinations from classical Ayurvedic texts.
        </p>
      </motion.div>

      {/* Filter Cards */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {FILTERS.map(({ value, label, icon, description }) => (
          <button
            key={value}
            onClick={() => setFilter(value)}
            className={`p-4 rounded-xl text-left transition-all duration-200 ${filter === value
              ? 'bg-gradient-to-br from-[#4a7c59]/20 to-[#c9a227]/10 border border-[#4a7c59]/30 shadow-lg'
              : 'bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06]'
              }`}
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-2 ${filter === value ? 'bg-[#4a7c59]/20 text-[#7ab08a]' : 'bg-white/[0.06] text-white/40'
              }`}>
              {icon}
            </div>
            <h3 className={`font-semibold text-sm ${filter === value ? 'text-white' : 'text-white/70'}`}>{label}</h3>
            <p className={`text-xs mt-1 leading-snug ${filter === value ? 'text-white/50' : 'text-white/30'}`}>{description}</p>
          </button>
        ))}
      </motion.div>

      {/* Graph Container */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-8 rounded-2xl border border-white/[0.06] overflow-hidden bg-white/[0.01]">
        <KnowledgeGraph filterType={filter} />
      </motion.div>

      {/* Stats Row */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard value={foods.length} label="Foods" sublabel="Ayurvedic database" gradient="from-[#4a7c59] to-[#3a6249]" />
        <StatCard value={3} label="Doshas" sublabel="Vata · Pitta · Kapha" gradient="from-[#c9a227] to-[#a38420]" />
        <StatCard value={conditions.length} label="Conditions" sublabel="Health states" gradient="from-[#d35400] to-[#e67e22]" />
        <StatCard value={viruddhaRules.length} label="Viruddha" sublabel="Incompatibilities" gradient="from-[#e74c3c] to-[#c0392b]" />
      </motion.div>

      {/* Info Cards */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="grid md:grid-cols-3 gap-5">
        <InfoCard title="The Three Doshas" color="bg-[#4a7c59]" items={[
          { label: 'Vata', desc: 'Air + Space — Movement, creativity' },
          { label: 'Pitta', desc: 'Fire + Water — Metabolism, transformation' },
          { label: 'Kapha', desc: 'Earth + Water — Structure, stability' },
        ]} />
        <InfoCard title="Understanding Effects" color="bg-[#c9a227]" items={[
          { label: 'Pacifies', desc: 'Reduces/balances the dosha (beneficial)' },
          { label: 'Aggravates', desc: 'Increases the dosha (use with caution)' },
          { label: 'Neutral', desc: 'No significant effect on dosha balance' },
        ]} />
        <InfoCard title="Viruddha Aahara" color="bg-[#d35400]" items={[
          { label: 'Concept', desc: 'Incompatible food combinations in Ayurveda' },
          { label: 'Examples', desc: 'Milk + fish, honey + hot water' },
          { label: 'Effect', desc: 'Can cause digestive issues and toxins' },
        ]} />
      </motion.div>
    </div>
  );
}

function StatCard({ value, label, sublabel, gradient }: { value: number; label: string; sublabel: string; gradient: string }) {
  return (
    <div className={`bg-gradient-to-br ${gradient} rounded-xl p-4 text-white`}>
      <div className="text-2xl font-bold">{value}</div>
      <div className="font-medium text-sm">{label}</div>
      <div className="text-xs text-white/60">{sublabel}</div>
    </div>
  );
}

function InfoCard({ title, color, items }: { title: string; color: string; items: { label: string; desc: string }[] }) {
  return (
    <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
      <div className="flex items-center gap-2 mb-4">
        <div className={`w-1.5 h-6 rounded-full ${color}`} />
        <h3 className="font-semibold text-white text-sm">{title}</h3>
      </div>
      <div className="space-y-3">
        {items.map((item, i) => (
          <div key={i}>
            <div className="font-medium text-sm text-white/70">{item.label}</div>
            <div className="text-xs text-white/40">{item.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
