'use client';

interface ScoreCircleProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  showAnimation?: boolean;
}

export function ScoreCircle({ score, size = 'md', label, showAnimation = true }: ScoreCircleProps) {
  const sizes = {
    sm: { width: 60, stroke: 4, fontSize: 'text-lg' },
    md: { width: 100, stroke: 6, fontSize: 'text-2xl' },
    lg: { width: 140, stroke: 8, fontSize: 'text-4xl' },
  };

  const config = sizes[size];
  const radius = (config.width - config.stroke) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (score / 100) * circumference;

  const getScoreColor = (s: number) => {
    if (s >= 75) return { stroke: 'stroke-secondary', text: 'text-secondary' };
    if (s >= 50) return { stroke: 'stroke-primary', text: 'text-primary' };
    if (s >= 25) return { stroke: 'stroke-moderate', text: 'text-moderate' };
    return { stroke: 'stroke-severe', text: 'text-severe' };
  };

  const colors = getScoreColor(score);

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: config.width, height: config.width }}>
        <svg className="transform -rotate-90" width={config.width} height={config.width}>
          <circle
            className="stroke-sand"
            strokeWidth={config.stroke}
            fill="transparent"
            r={radius}
            cx={config.width / 2}
            cy={config.width / 2}
          />
          <circle
            className={`${colors.stroke} transition-all duration-1000 ease-out`}
            strokeWidth={config.stroke}
            strokeLinecap="round"
            fill="transparent"
            r={radius}
            cx={config.width / 2}
            cy={config.width / 2}
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: showAnimation ? offset : circumference,
            }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`${config.fontSize} font-bold ${colors.text}`}>
            {score}
          </span>
        </div>
      </div>
      {label && (
        <span className="mt-2 text-sm text-stone font-medium">{label}</span>
      )}
    </div>
  );
}

