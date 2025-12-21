'use client';

import { DoshaPrakriti } from '@/lib/types';

interface DoshaBarProps {
  prakriti: DoshaPrakriti;
  showLabels?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function DoshaBar({ prakriti, showLabels = true, size = 'md' }: DoshaBarProps) {
  const heights = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
  };

  const doshas = [
    { name: 'Vata', value: prakriti.vata, color: 'bg-vata' },
    { name: 'Pitta', value: prakriti.pitta, color: 'bg-pitta' },
    { name: 'Kapha', value: prakriti.kapha, color: 'bg-kapha' },
  ];

  return (
    <div className="space-y-2">
      {doshas.map(dosha => (
        <div key={dosha.name} className="space-y-1">
          {showLabels && (
            <div className="flex justify-between text-sm">
              <span className="font-medium">{dosha.name}</span>
              <span className="text-stone">{dosha.value}%</span>
            </div>
          )}
          <div className={`w-full bg-sand rounded-full ${heights[size]}`}>
            <div
              className={`${dosha.color} ${heights[size]} rounded-full transition-all duration-500`}
              style={{ width: `${dosha.value}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

