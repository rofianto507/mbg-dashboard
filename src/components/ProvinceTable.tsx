'use client';

import { useState, useMemo } from 'react';
import { provinces } from '@/data/dummy-data';
import { Province } from '@/types';

type SortKey = keyof Pick<Province, 'name' | 'beneficiaries' | 'schools' | 'dailyPortions' | 'nutritionScore' | 'budgetAbsorption'>;

export default function ProvinceTable() {
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('beneficiaries');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('desc');
    }
    setPage(1);
  };

  const filteredAndSorted = useMemo(() => {
    let data = provinces.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.region.toLowerCase().includes(search.toLowerCase())
    );
    data.sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortDir === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      }
      return sortDir === 'asc' ? (aVal as number) - (bVal as number) : (bVal as number) - (aVal as number);
    });
    return data;
  }, [search, sortKey, sortDir]);

  const totalPages = Math.ceil(filteredAndSorted.length / pageSize);
  const paginatedData = filteredAndSorted.slice((page - 1) * pageSize, page * pageSize);

  const getStatusBadge = (status: Province['status']) => {
    switch (status) {
      case 'good': return <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-medium">✅ Baik</span>;
      case 'attention': return <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">⚠️ Perhatian</span>;
      case 'critical': return <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded-full text-xs font-medium">🔴 Kritis</span>;
    }
  };

  const SortIcon = ({ field }: { field: SortKey }) => (
    <span className="ml-1 text-gray-400">
      {sortKey === field ? (sortDir === 'asc' ? '↑' : '↓') : '↕'}
    </span>
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-bold text-[#1e3a5f] text-sm">Data Detail Per Provinsi</h3>
          <p className="text-gray-400 text-xs">38 provinsi Indonesia - Klik header untuk sort</p>
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Cari provinsi..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="pl-8 pr-4 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#1e3a5f] w-48"
          />
          <span className="absolute left-2.5 top-2 text-gray-400 text-sm">🔍</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">#</th>
              {[
                { key: 'name' as SortKey, label: 'Provinsi' },
                { key: 'beneficiaries' as SortKey, label: 'Penerima' },
                { key: 'schools' as SortKey, label: 'Sekolah' },
                { key: 'dailyPortions' as SortKey, label: 'Porsi/Hari' },
                { key: 'nutritionScore' as SortKey, label: 'Skor Gizi' },
                { key: 'budgetAbsorption' as SortKey, label: 'Serapan (%)' },
              ].map(col => (
                <th
                  key={col.key}
                  onClick={() => handleSort(col.key)}
                  className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer hover:text-[#1e3a5f] whitespace-nowrap"
                >
                  {col.label}<SortIcon field={col.key} />
                </th>
              ))}
              <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((province, idx) => (
              <tr
                key={province.id}
                className="border-b border-gray-50 hover:bg-blue-50/30 transition-colors"
              >
                <td className="py-2.5 px-3 text-gray-400 text-xs">{(page - 1) * pageSize + idx + 1}</td>
                <td className="py-2.5 px-3">
                  <div className="font-medium text-[#1e3a5f]">{province.name}</div>
                  <div className="text-gray-400 text-xs">{province.region}</div>
                </td>
                <td className="py-2.5 px-3 text-gray-700">{province.beneficiaries.toLocaleString('id-ID')}</td>
                <td className="py-2.5 px-3 text-gray-700">{province.schools.toLocaleString('id-ID')}</td>
                <td className="py-2.5 px-3 text-gray-700">{province.dailyPortions.toLocaleString('id-ID')}</td>
                <td className="py-2.5 px-3">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-100 rounded-full h-1.5 max-w-[60px]">
                      <div
                        className={`h-1.5 rounded-full ${
                          province.nutritionScore >= 80 ? 'bg-green-500' :
                          province.nutritionScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${province.nutritionScore}%` }}
                      />
                    </div>
                    <span className="font-semibold text-[#1e3a5f]">{province.nutritionScore}</span>
                  </div>
                </td>
                <td className="py-2.5 px-3">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-100 rounded-full h-1.5 max-w-[60px]">
                      <div
                        className={`h-1.5 rounded-full ${
                          province.budgetAbsorption >= 85 ? 'bg-green-500' :
                          province.budgetAbsorption >= 75 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${province.budgetAbsorption}%` }}
                      />
                    </div>
                    <span className="font-semibold text-gray-700">{province.budgetAbsorption}%</span>
                  </div>
                </td>
                <td className="py-2.5 px-3">{getStatusBadge(province.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="text-xs text-gray-500">
          Menampilkan {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, filteredAndSorted.length)} dari {filteredAndSorted.length} provinsi
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-2 py-1 text-xs border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            ← Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setPage(i + 1)}
              className={`px-2.5 py-1 text-xs rounded ${
                page === i + 1
                  ? 'bg-[#1e3a5f] text-white'
                  : 'border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-2 py-1 text-xs border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}
