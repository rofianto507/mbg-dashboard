'use client';

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList
} from 'recharts';
import { regionBudgetData } from '@/data/dummy-data';

export default function BudgetChart() {
  const getColor = (absorbed: number) => {
    if (absorbed >= 85) return '#16a34a';
    if (absorbed >= 75) return '#d4a017';
    return '#dc2626';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
      <div className="mb-4">
        <h3 className="font-bold text-[#1e3a5f] text-sm">Serapan Anggaran per Wilayah</h3>
        <p className="text-gray-400 text-xs">Persentase realisasi anggaran (%)</p>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart
          data={regionBudgetData}
          layout="vertical"
          margin={{ top: 5, right: 40, left: 10, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
          <XAxis
            type="number"
            tick={{ fontSize: 10, fill: '#94a3b8' }}
            tickLine={false}
            domain={[0, 100]}
            tickFormatter={(v) => `${v}%`}
          />
          <YAxis
            dataKey="region"
            type="category"
            tick={{ fontSize: 10, fill: '#64748b' }}
            tickLine={false}
            width={90}
          />
          <Tooltip
            contentStyle={{ fontSize: '12px', borderRadius: '8px', border: '1px solid #e2e8f0' }}
            formatter={(value: number) => [`${value}%`, 'Serapan Anggaran']}
          />
          <Bar dataKey="absorbed" radius={[0, 4, 4, 0]} maxBarSize={20}>
            {regionBudgetData.map((entry, index) => (
              <Cell key={index} fill={getColor(entry.absorbed)} />
            ))}
            <LabelList dataKey="absorbed" position="right" formatter={(v: number) => `${v}%`} style={{ fontSize: '10px', fill: '#64748b' }} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
