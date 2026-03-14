'use client';

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { dailyData } from '@/data/dummy-data';

export default function DistributionChart() {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return `${date.getDate()}/${date.getMonth() + 1}`;
  };

  const chartData = dailyData.map(d => ({
    ...d,
    date: formatDate(d.date),
    distributedM: Math.round(d.distributed / 10000) / 100,
    targetM: Math.round(d.target / 10000) / 100,
  }));

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-bold text-[#1e3a5f] text-sm">Trend Distribusi Harian</h3>
          <p className="text-gray-400 text-xs">30 hari terakhir (dalam juta porsi)</p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-3 h-0.5 bg-[#1e3a5f]"></div>
            <span className="text-gray-600">Aktual</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-0.5 bg-[#d4a017]"></div>
            <span className="text-gray-600">Target</span>
          </div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 10, fill: '#94a3b8' }}
            tickLine={false}
            interval={4}
          />
          <YAxis
            tick={{ fontSize: 10, fill: '#94a3b8' }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) => `${v}Jt`}
          />
          <Tooltip
            contentStyle={{ fontSize: '12px', borderRadius: '8px', border: '1px solid #e2e8f0' }}
            formatter={(value: number, name: string) => [
              `${value.toFixed(2)} Jt Porsi`,
              name === 'distributedM' ? 'Terdistribusi' : 'Target'
            ]}
          />
          <Line
            type="monotone"
            dataKey="targetM"
            stroke="#d4a017"
            strokeWidth={1.5}
            strokeDasharray="4 4"
            dot={false}
            name="target"
          />
          <Line
            type="monotone"
            dataKey="distributedM"
            stroke="#1e3a5f"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4 }}
            name="distributed"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
