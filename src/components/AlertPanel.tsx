'use client';

import { useState } from 'react';
import { alerts } from '@/data/dummy-data';
import { Alert as AlertType } from '@/types';

export default function AlertPanel() {
  const [filter, setFilter] = useState<'all' | 'critical' | 'warning'>('all');

  const filteredAlerts = alerts.filter(a =>
    filter === 'all' ? true : a.severity === filter
  );

  const criticalCount = alerts.filter(a => a.severity === 'critical').length;
  const warningCount = alerts.filter(a => a.severity === 'warning').length;

  const getTypeIcon = (type: AlertType['type']) => {
    switch (type) {
      case 'nutrition': return '🥗';
      case 'distribution': return '🚛';
      case 'budget': return '💰';
      case 'reporting': return '📋';
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="font-bold text-[#1e3a5f] text-sm">⚠️ Early Warning System</h3>
          <p className="text-gray-400 text-xs">Alert aktif yang memerlukan tindakan</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-0.5 rounded-full">
            {criticalCount} Kritis
          </span>
          <span className="bg-yellow-100 text-yellow-700 text-xs font-bold px-2 py-0.5 rounded-full">
            {warningCount} Perhatian
          </span>
        </div>
      </div>

      <div className="flex gap-1 mb-3">
        {(['all', 'critical', 'warning'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`text-xs px-3 py-1 rounded-full font-medium transition-colors ${
              filter === f
                ? 'bg-[#1e3a5f] text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {f === 'all' ? 'Semua' : f === 'critical' ? '🔴 Kritis' : '🟡 Perhatian'}
          </button>
        ))}
      </div>

      <div className="space-y-2 max-h-64 overflow-y-auto scrollbar-thin">
        {filteredAlerts.map((alert) => (
          <div
            key={alert.id}
            className={`p-3 rounded-lg border-l-4 ${
              alert.severity === 'critical'
                ? 'bg-red-50 border-red-500'
                : 'bg-yellow-50 border-yellow-500'
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-start gap-2">
                <span className="text-lg flex-shrink-0">{getTypeIcon(alert.type)}</span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-bold ${
                      alert.severity === 'critical' ? 'text-red-600' : 'text-yellow-600'
                    }`}>
                      {alert.severity === 'critical' ? '🔴' : '🟡'} {alert.province}
                    </span>
                  </div>
                  <p className="text-xs text-gray-700 font-medium mt-0.5">{alert.message}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{alert.detail}</p>
                </div>
              </div>
              <span className="text-xs text-gray-400 flex-shrink-0">{formatTime(alert.timestamp)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
