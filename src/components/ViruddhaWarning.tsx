'use client';

import { ViruddhaRule } from '@/lib/types';

interface ViruddhaWarningProps {
  warnings: Array<{
    rule: ViruddhaRule;
    food1: string;
    food2: string;
    message: string;
  }>;
  compact?: boolean;
}

const severityConfig = {
  severe: {
    bg: 'bg-severe/10',
    border: 'border-severe',
    text: 'text-severe',
    icon: '!!',
    label: 'Severe',
  },
  moderate: {
    bg: 'bg-moderate/10',
    border: 'border-moderate',
    text: 'text-moderate',
    icon: '!',
    label: 'Moderate',
  },
  mild: {
    bg: 'bg-mild/10',
    border: 'border-mild',
    text: 'text-mild',
    icon: 'i',
    label: 'Mild',
  },
};

const viruddhaTypeLabels: Record<string, string> = {
  samyoga: 'Combination',
  krama: 'Sequence',
  desha: 'Place',
  kala: 'Time',
  matra: 'Quantity',
  satmya: 'Habit',
  dosha: 'Constitution',
  samskara: 'Processing',
  virya: 'Potency',
  kostha: 'Bowel',
  avastha: 'Health State',
  paka: 'Cooking',
};

export function ViruddhaWarning({ warnings, compact }: ViruddhaWarningProps) {
  if (warnings.length === 0) {
    return (
      <div className="p-4 bg-secondary/10 rounded-lg border border-secondary/20">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center text-secondary font-bold">
            OK
          </div>
          <p className="text-secondary font-medium">
            All foods are compatible - No Viruddha Aahara detected
          </p>
        </div>
      </div>
    );
  }

  if (compact) {
    return (
      <div className="space-y-2">
        {warnings.map((warning, index) => {
          const config = severityConfig[warning.rule.severity];
          return (
            <div
              key={index}
              className={`p-2 rounded ${config.bg} ${config.text} text-sm flex items-center gap-2`}
            >
              <span className="font-bold">[{config.label}]</span>
              <span>{warning.food1} + {warning.food2}</span>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-full bg-severe/20 flex items-center justify-center text-severe font-bold">
          !
        </div>
        <h3 className="font-semibold text-severe">
          Viruddha Aahara Detected ({warnings.length} incompatibility{warnings.length > 1 ? 'ies' : ''})
        </h3>
      </div>

      {warnings.map((warning, index) => {
        const config = severityConfig[warning.rule.severity];
        return (
          <div
            key={index}
            className={`p-4 rounded-lg border-l-4 ${config.bg} ${config.border}`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded text-xs font-bold ${config.text} ${config.bg}`}>
                  {config.label}
                </span>
                <span className="px-2 py-0.5 rounded text-xs bg-clay/50 text-stone">
                  {viruddhaTypeLabels[warning.rule.type] || warning.rule.type}
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-2 mb-2">
              <span className="font-medium">{warning.food1}</span>
              <span className="text-stone">+</span>
              <span className="font-medium">{warning.food2}</span>
            </div>
            
            <p className="text-sm text-stone mb-2">
              {warning.rule.reason}
            </p>
            
            {warning.rule.reference && (
              <p className="text-xs text-stone/70 italic">
                Reference: {warning.rule.reference}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}

