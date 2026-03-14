'use client';

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { calorieData } from '@/data/dummy-data';

export default function CalorieChart() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
      <div className="mb-4">
        <h3 className="font-bold text-[#1e3a5f] text-sm">Pemenuhan Standar Kalori</h3>
        <p className="text-gray-400 text-xs">Kalori aktual vs standar per jenjang pendidikan (kkal)</p>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={calorieData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
          <XAxis
            dataKey="category"
            tick={{ fontSize: 10, fill: '#94a3b8' }}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 10, fill: '#94a3b8' }}
            tickLine={false}
            axisLine={false}
            domain={[400, 900]}
          />
          <Tooltip
            contentStyle={{ fontSize: '12px', borderRadius: '8px', border: '1px solid #e2e8f0' }}
            formatter={(value: number, name: string) => [
              `${value} kkal`,
              name === 'actual' ? 'Aktual' : 'Standar'
            ]}
          />
          <Bar dataKey="standard" fill="#e2e8f0" radius={[4, 4, 0, 0]} name="standard" />
          <Bar dataKey="actual" fill="#1e3a5f" radius={[4, 4, 0, 0]} name="actual" />
        </BarChart>
      </ResponsiveContainer>
      <div className="flex items-center justify-center gap-4 mt-2 text-xs">
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 rounded bg-[#e2e8f0] inline-block"></span>
          <span className="text-gray-600">Standar</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 rounded bg-[#1e3a5f] inline-block"></span>
          <span className="text-gray-600">Aktual</span>
        </div>
      </div>
    </div>
  );
}
