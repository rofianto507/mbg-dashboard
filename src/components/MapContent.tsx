'use client';

import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, CircleMarker, Popup, Tooltip } from 'react-leaflet';
import { useState } from 'react';
import { provinces } from '@/data/dummy-data';
import { Province } from '@/types';

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

const BENEFICIARIES_SCALE = 1_000_000;
const RADIUS_MULTIPLIER = 10;
const BASE_RADIUS = 6;

const getStatusLabel = (status: Province['status']) => {
  switch (status) {
    case 'good': return '✅ Status Gizi Baik';
    case 'attention': return '⚠️ Perlu Perhatian';
    case 'critical': return '🔴 Kritis';
  }
};

export default function MapContent() {
  const [selectedProvince, setSelectedProvince] = useState<Province | null>(null);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="font-bold text-[#1e3a5f] text-sm">Peta Status Gizi Indonesia</h3>
          <p className="text-gray-400 text-xs">Klik provinsi untuk detail | Hover untuk info</p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-green-600 inline-block"></span>
            <span className="text-gray-600">Baik (≥80)</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-yellow-600 inline-block"></span>
            <span className="text-gray-600">Perhatian (60-79)</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-red-600 inline-block"></span>
            <span className="text-gray-600">Kritis (&lt;60)</span>
          </div>
        </div>
      </div>

      <div style={{ height: '420px', borderRadius: '8px', overflow: 'hidden' }}>
        <MapContainer
          center={[-2.5, 118.0]}
          zoom={5}
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {provinces.map((province) => {
            const radius = Math.sqrt(province.beneficiaries / BENEFICIARIES_SCALE) * RADIUS_MULTIPLIER + BASE_RADIUS;
            const color = getStatusColor(province.status);

            return (
              <CircleMarker
                key={province.id}
                center={[province.lat, province.lng]}
                radius={radius}
                pathOptions={{
                  color: 'white',
                  weight: 1.5,
                  fillColor: color,
                  fillOpacity: 0.85,
                }}
                eventHandlers={{
                  click: () =>
                    setSelectedProvince(
                      province === selectedProvince ? null : province
                    ),
                }}
              >
                <Tooltip direction="top" offset={[0, -radius]}>
                  <span className="text-xs font-semibold">
                    {province.name} — Skor Gizi: {province.nutritionScore}/100
                  </span>
                </Tooltip>
                <Popup>
                  <div style={{ minWidth: '200px' }}>
                    <div style={{ fontWeight: 'bold', color: '#1e3a5f', marginBottom: '4px' }}>
                      {province.name}
                    </div>
                    <div style={{ color: '#6b7280', fontSize: '11px', marginBottom: '8px' }}>
                      {province.region}
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px', fontSize: '12px' }}>
                      <div>
                        <span style={{ color: '#6b7280' }}>Penerima:</span>
                        <strong style={{ marginLeft: '4px' }}>{province.beneficiaries.toLocaleString('id-ID')}</strong>
                      </div>
                      <div>
                        <span style={{ color: '#6b7280' }}>Sekolah:</span>
                        <strong style={{ marginLeft: '4px' }}>{province.schools.toLocaleString('id-ID')}</strong>
                      </div>
                      <div>
                        <span style={{ color: '#6b7280' }}>Skor Gizi:</span>
                        <strong style={{ marginLeft: '4px', color }}>{province.nutritionScore}/100</strong>
                      </div>
                      <div>
                        <span style={{ color: '#6b7280' }}>Serapan:</span>
                        <strong style={{ marginLeft: '4px' }}>{province.budgetAbsorption}%</strong>
                      </div>
                    </div>
                    <div
                      style={{
                        marginTop: '8px',
                        padding: '2px 8px',
                        borderRadius: '9999px',
                        background: getStatusBg(province.status),
                        color,
                        fontSize: '11px',
                        fontWeight: 600,
                        textAlign: 'center',
                      }}
                    >
                      {getStatusLabel(province.status)}
                    </div>
                  </div>
                </Popup>
              </CircleMarker>
            );
          })}
        </MapContainer>
      </div>

      {selectedProvince && (
        <div
          className="mt-3 p-3 rounded-lg border"
          style={{
            borderColor: getStatusColor(selectedProvince.status),
            background: getStatusBg(selectedProvince.status),
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <span className="font-bold text-[#1e3a5f]">{selectedProvince.name}</span>
              <span className="text-gray-500 text-xs ml-2">{selectedProvince.region}</span>
            </div>
            <button
              onClick={() => setSelectedProvince(null)}
              className="text-gray-400 hover:text-gray-600 text-sm"
            >
              ✕
            </button>
          </div>
          <div className="grid grid-cols-4 gap-3 mt-2 text-xs">
            <div>
              <div className="text-gray-500">Penerima Manfaat</div>
              <div className="font-bold text-[#1e3a5f]">
                {selectedProvince.beneficiaries.toLocaleString('id-ID')}
              </div>
            </div>
            <div>
              <div className="text-gray-500">Sekolah</div>
              <div className="font-bold text-[#1e3a5f]">
                {selectedProvince.schools.toLocaleString('id-ID')}
              </div>
            </div>
            <div>
              <div className="text-gray-500">Skor Gizi</div>
              <div
                className="font-bold"
                style={{ color: getStatusColor(selectedProvince.status) }}
              >
                {selectedProvince.nutritionScore}/100
              </div>
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
