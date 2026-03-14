'use client';

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { nutritionComposition } from '@/data/dummy-data';

export default function NutritionComposition() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
      <div className="mb-4">
        <h3 className="font-bold text-[#1e3a5f] text-sm">Komposisi Menu Gizi</h3>
        <p className="text-gray-400 text-xs">Rata-rata nasional (%)</p>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={nutritionComposition}
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={80}
            paddingAngle={2}
            dataKey="value"
          >
            {nutritionComposition.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ fontSize: '12px', borderRadius: '8px', border: '1px solid #e2e8f0' }}
            formatter={(value: number, name: string) => [`${value}%`, name]}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="grid grid-cols-1 gap-1 mt-2">
        {nutritionComposition.map((item, index) => (
          <div key={index} className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: item.color }}></span>
              <span className="text-gray-600">{item.name}</span>
            </div>
            <span className="font-semibold text-[#1e3a5f]">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
