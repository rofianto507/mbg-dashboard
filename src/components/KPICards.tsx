'use client';

import { kpiData, alerts } from '@/data/dummy-data';

export default function KPICards() {
  const formatNumber = (num: number) => {
    return num.toLocaleString('id-ID');
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 col-span-1">
        <div className="flex items-start justify-between mb-3">
          <div className="p-2 bg-blue-50 rounded-lg">
            <span className="text-2xl">👥</span>
          </div>
          <span className="text-green-600 text-xs font-semibold bg-green-50 px-2 py-0.5 rounded-full">
            +{kpiData.totalBeneficiariesTrend}%
          </span>
        </div>
        <div className="text-2xl font-bold text-[#1e3a5f]">
          {(kpiData.totalBeneficiaries / 1000000).toFixed(1)}Jt
        </div>
        <div className="text-gray-500 text-xs mt-1">Total Penerima Manfaat</div>
        <div className="text-gray-400 text-xs mt-0.5">{formatNumber(kpiData.totalBeneficiaries)}</div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 col-span-1">
        <div className="flex items-start justify-between mb-3">
          <div className="p-2 bg-green-50 rounded-lg">
            <span className="text-2xl">🏫</span>
          </div>
          <span className="text-green-600 text-xs font-semibold bg-green-50 px-2 py-0.5 rounded-full">
            +{kpiData.totalSchoolsTrend}%
          </span>
        </div>
        <div className="text-2xl font-bold text-[#1e3a5f]">
          {formatNumber(kpiData.totalSchools)}
        </div>
        <div className="text-gray-500 text-xs mt-1">Sekolah Terlayani</div>
        <div className="text-gray-400 text-xs mt-0.5">SD, SMP &amp; SMA/SMK</div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 col-span-1">
        <div className="flex items-start justify-between mb-3">
          <div className="p-2 bg-yellow-50 rounded-lg">
            <span className="text-2xl">🍽️</span>
          </div>
          <span className="text-blue-600 text-xs font-medium bg-blue-50 px-2 py-0.5 rounded-full">
            Hari Ini
          </span>
        </div>
        <div className="text-2xl font-bold text-[#1e3a5f]">
          {(kpiData.totalPortionsToday / 1000000).toFixed(1)}Jt
        </div>
        <div className="text-gray-500 text-xs mt-1">Total Porsi Hari Ini</div>
        <div className="text-gray-400 text-xs mt-0.5">{formatNumber(kpiData.totalPortionsToday)}</div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 col-span-1">
        <div className="flex items-start justify-between mb-3">
          <div className="p-2 bg-purple-50 rounded-lg">
            <span className="text-2xl">💰</span>
          </div>
          <span className="text-purple-600 text-xs font-medium bg-purple-50 px-2 py-0.5 rounded-full">
            2024
          </span>
        </div>
        <div className="text-2xl font-bold text-[#1e3a5f]">{kpiData.budgetAbsorption}%</div>
        <div className="text-gray-500 text-xs mt-1">Serapan Anggaran</div>
        <div className="mt-2 bg-gray-100 rounded-full h-1.5">
          <div
            className="bg-[#d4a017] h-1.5 rounded-full transition-all"
            style={{ width: `${kpiData.budgetAbsorption}%` }}
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-red-100 p-4 col-span-1">
        <div className="flex items-start justify-between mb-3">
          <div className="p-2 bg-red-50 rounded-lg">
            <span className="text-2xl">⚠️</span>
          </div>
          <span className="text-white text-xs font-bold bg-red-500 px-2 py-0.5 rounded-full animate-pulse">
            {kpiData.activeAlerts}
          </span>
        </div>
        <div className="text-2xl font-bold text-red-600">{kpiData.activeAlerts}</div>
        <div className="text-gray-500 text-xs mt-1">Alert Aktif</div>
        <div className="text-red-400 text-xs mt-0.5">{alerts.filter(a => a.severity === 'critical').length} Kritis · {alerts.filter(a => a.severity === 'warning').length} Perhatian</div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 col-span-1">
        <div className="flex items-start justify-between mb-3">
          <div className="p-2 bg-emerald-50 rounded-lg">
            <span className="text-2xl">📊</span>
          </div>
          <span className="text-emerald-600 text-xs font-medium bg-emerald-50 px-2 py-0.5 rounded-full">
            Baik
          </span>
        </div>
        <div className="text-2xl font-bold text-[#1e3a5f]">
          {kpiData.nationalNutritionIndex}
          <span className="text-sm text-gray-400">/100</span>
        </div>
        <div className="text-gray-500 text-xs mt-1">Indeks Gizi Nasional</div>
        <div className="mt-2 bg-gray-100 rounded-full h-1.5">
          <div
            className="bg-emerald-500 h-1.5 rounded-full"
            style={{ width: `${kpiData.nationalNutritionIndex}%` }}
          />
        </div>
      </div>
    </div>
  );
}
