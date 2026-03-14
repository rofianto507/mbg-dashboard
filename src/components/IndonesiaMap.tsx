'use client';

import { useState } from 'react';
import { provinces } from '@/data/dummy-data';
import { Province } from '@/types';

interface TooltipData {
  province: Province;
  x: number;
  y: number;
}

export default function IndonesiaMap() {
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);
  const [selectedProvince, setSelectedProvince] = useState<Province | null>(null);

  const getStatusColor = (status: Province['status']) => {
    switch (status) {
      case 'good': return '#16a34a';
      case 'attention': return '#d97706';
      case 'critical': return '#dc2626';
    }
  };

  const getStatusBg = (status: Province['status']) => {
    switch (status) {
      case 'good': return '#dcfce7';
      case 'attention': return '#fef3c7';
      case 'critical': return '#fee2e2';
    }
  };

  const lngToX = (lng: number) => ((lng - 95) / (141 - 95)) * 700 + 30;
  const latToY = (lat: number) => ((lat - 6) / (-11 - 6)) * 260 + 20;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="font-bold text-[#1e3a5f] text-sm">Peta Status Gizi Indonesia</h3>
          <p className="text-gray-400 text-xs">Klik provinsi untuk detail | Hover untuk info</p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-green-500 inline-block"></span>
            <span className="text-gray-600">Baik (≥80)</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-yellow-500 inline-block"></span>
            <span className="text-gray-600">Perhatian (60-79)</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-red-500 inline-block"></span>
            <span className="text-gray-600">Kritis (&lt;60)</span>
          </div>
        </div>
      </div>

      <div className="relative" style={{ height: '300px' }}>
        <svg
          viewBox="0 0 760 300"
          className="w-full h-full"
          style={{ background: 'linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)', borderRadius: '8px' }}
        >
          <defs>
            <pattern id="ocean" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 0 10 Q 5 5 10 10 Q 15 15 20 10" stroke="#93c5fd" strokeWidth="0.5" fill="none" opacity="0.3"/>
            </pattern>
          </defs>
          <rect width="760" height="300" fill="url(#ocean)" />

          <text x="380" y="285" textAnchor="middle" fontSize="11" fill="#1e40af" fontWeight="600" opacity="0.7">
            PETA WILAYAH INDONESIA
          </text>

          {provinces.map((province) => {
            const x = lngToX(province.lng);
            const y = latToY(province.lat);
            const color = getStatusColor(province.status);
            const size = Math.sqrt(province.beneficiaries / 1000000) * 8 + 5;

            return (
              <g key={province.id}>
                <circle
                  cx={x + 1}
                  cy={y + 1}
                  r={size}
                  fill="rgba(0,0,0,0.15)"
                />
                <circle
                  cx={x}
                  cy={y}
                  r={size}
                  fill={color}
                  opacity={0.85}
                  stroke="white"
                  strokeWidth="1.5"
                  className="cursor-pointer transition-all hover:opacity-100"
                  onMouseEnter={(e) => {
                    const rect = e.currentTarget.ownerSVGElement?.getBoundingClientRect();
                    if (rect) {
                      const svgX = (x / 760) * rect.width;
                      const svgY = (y / 300) * rect.height;
                      setTooltip({ province, x: svgX + rect.left, y: svgY + rect.top });
                    }
                  }}
                  onMouseLeave={() => setTooltip(null)}
                  onClick={() => setSelectedProvince(province === selectedProvince ? null : province)}
                />
                {size > 8 && (
                  <text
                    x={x}
                    y={y + 4}
                    textAnchor="middle"
                    fontSize="6"
                    fill="white"
                    fontWeight="bold"
                    className="pointer-events-none"
                  >
                    {province.name.split(' ').map((w: string) => w[0]).join('').substring(0, 3)}
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        {tooltip && (
          <div
            className="fixed z-50 bg-white shadow-xl rounded-lg p-3 text-sm border border-gray-200 pointer-events-none"
            style={{
              left: tooltip.x + 10,
              top: tooltip.y - 80,
              minWidth: '200px',
            }}
          >
            <div className="font-bold text-[#1e3a5f] text-sm">{tooltip.province.name}</div>
            <div className="text-gray-500 text-xs mb-2">{tooltip.province.region}</div>
            <div className="grid grid-cols-2 gap-1 text-xs">
              <div>
                <span className="text-gray-500">Penerima:</span>
                <span className="font-semibold ml-1">{tooltip.province.beneficiaries.toLocaleString('id-ID')}</span>
              </div>
              <div>
                <span className="text-gray-500">Skor Gizi:</span>
                <span className="font-semibold ml-1">{tooltip.province.nutritionScore}/100</span>
              </div>
              <div>
                <span className="text-gray-500">Sekolah:</span>
                <span className="font-semibold ml-1">{tooltip.province.schools.toLocaleString('id-ID')}</span>
              </div>
              <div>
                <span className="text-gray-500">Serapan:</span>
                <span className="font-semibold ml-1">{tooltip.province.budgetAbsorption}%</span>
              </div>
            </div>
            <div
              className="mt-2 px-2 py-0.5 rounded-full text-xs font-medium text-center"
              style={{
                background: getStatusBg(tooltip.province.status),
                color: getStatusColor(tooltip.province.status),
              }}
            >
              {tooltip.province.status === 'good' ? '✅ Status Gizi Baik' :
               tooltip.province.status === 'attention' ? '⚠️ Perlu Perhatian' : '🔴 Kritis'}
            </div>
          </div>
        )}
      </div>

      {selectedProvince && (
        <div className="mt-3 p-3 rounded-lg border" style={{ borderColor: getStatusColor(selectedProvince.status), background: getStatusBg(selectedProvince.status) }}>
          <div className="flex items-center justify-between">
            <div>
              <span className="font-bold text-[#1e3a5f]">{selectedProvince.name}</span>
              <span className="text-gray-500 text-xs ml-2">{selectedProvince.region}</span>
            </div>
            <button onClick={() => setSelectedProvince(null)} className="text-gray-400 hover:text-gray-600 text-sm">✕</button>
          </div>
          <div className="grid grid-cols-4 gap-3 mt-2 text-xs">
            <div>
              <div className="text-gray-500">Penerima Manfaat</div>
              <div className="font-bold text-[#1e3a5f]">{selectedProvince.beneficiaries.toLocaleString('id-ID')}</div>
            </div>
            <div>
              <div className="text-gray-500">Sekolah</div>
              <div className="font-bold text-[#1e3a5f]">{selectedProvince.schools.toLocaleString('id-ID')}</div>
            </div>
            <div>
              <div className="text-gray-500">Skor Gizi</div>
              <div className="font-bold" style={{ color: getStatusColor(selectedProvince.status) }}>{selectedProvince.nutritionScore}/100</div>
            </div>
            <div>
              <div className="text-gray-500">Serapan Anggaran</div>
              <div className="font-bold text-[#1e3a5f]">{selectedProvince.budgetAbsorption}%</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
