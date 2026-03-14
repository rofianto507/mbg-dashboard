'use client';

import { PieChart, Pie, Cell } from 'recharts';

interface NutritionGaugeProps {
  value: number;
  size?: number;
}

export default function NutritionGauge({ value, size = 120 }: NutritionGaugeProps) {
  const getColor = (v: number) => {
    if (v >= 80) return '#16a34a';
    if (v >= 60) return '#d97706';
    return '#dc2626';
  };

  const color = getColor(value);
  const data = [
    { value: value },
    { value: 100 - value },
  ];

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size / 2 + 10 }}>
        <PieChart width={size} height={size}>
          <Pie
            data={data}
            cx={size / 2}
            cy={size / 2}
            startAngle={180}
            endAngle={0}
            innerRadius={size * 0.35}
            outerRadius={size * 0.48}
            dataKey="value"
            strokeWidth={0}
          >
            <Cell fill={color} />
            <Cell fill="#e2e8f0" />
          </Pie>
        </PieChart>
        <div className="absolute inset-0 flex items-end justify-center pb-2">
          <div className="text-center">
            <div className="text-lg font-bold" style={{ color }}>{value}</div>
            <div className="text-xs text-gray-400">/100</div>
          </div>
        </div>
      </div>
    </div>
  );
}
