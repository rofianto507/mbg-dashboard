'use client';

import { useState, useEffect } from 'react';

export default function Header() {
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [selectedProvince, setSelectedProvince] = useState('Nasional');
  const [selectedPeriod, setSelectedPeriod] = useState('Bulan Ini');

  useEffect(() => {
    setCurrentTime(new Date());
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  return (
    <header className="bg-[#1e3a5f] text-white shadow-lg">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-14 h-14 bg-[#d4a017] rounded-lg shadow-md flex-shrink-0">
              <span className="text-2xl">🇮🇩</span>
            </div>
            <div>
              <h1 className="text-lg font-bold leading-tight tracking-wide">
                DASHBOARD ANALITIK NASIONAL
              </h1>
              <h2 className="text-[#d4a017] text-sm font-semibold tracking-wider">
                PROGRAM MAKAN BERGIZI GRATIS (MBG)
              </h2>
              <p className="text-blue-200 text-xs mt-0.5">
                Badan Gizi Nasional | Command Center
              </p>
            </div>
          </div>

          <div className="hidden md:flex flex-col items-center">
            {currentTime ? (
              <>
                <div className="text-[#d4a017] text-2xl font-bold font-mono tracking-widest">
                  {formatTime(currentTime)}
                </div>
                <div className="text-blue-200 text-xs mt-1">
                  {formatDate(currentTime)}
                </div>
              </>
            ) : (
              <div className="text-blue-200 text-xs">Memuat waktu...</div>
            )}
            <div className="mt-1 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span className="text-green-300 text-xs font-medium">LIVE</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-blue-200 text-xs font-medium">Provinsi</label>
              <select
                value={selectedProvince}
                onChange={(e) => setSelectedProvince(e.target.value)}
                className="bg-[#2d5086] text-white text-sm px-3 py-1.5 rounded-md border border-blue-400/30 focus:outline-none focus:ring-1 focus:ring-[#d4a017] min-w-[140px]"
              >
                <option>Nasional</option>
                <option>Aceh</option>
                <option>Sumatera Utara</option>
                <option>Jawa Barat</option>
                <option>Jawa Tengah</option>
                <option>Jawa Timur</option>
                <option>DKI Jakarta</option>
                <option>Sulawesi Selatan</option>
                <option>Papua</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-blue-200 text-xs font-medium">Periode</label>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="bg-[#2d5086] text-white text-sm px-3 py-1.5 rounded-md border border-blue-400/30 focus:outline-none focus:ring-1 focus:ring-[#d4a017] min-w-[120px]"
              >
                <option>Hari Ini</option>
                <option>7 Hari</option>
                <option>Bulan Ini</option>
                <option>Kuartal Ini</option>
                <option>Tahun 2024</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#152d4a] px-6 py-1.5 flex items-center gap-6 text-xs">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
          <span className="text-green-300">Sistem Aktif</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-blue-300">Data diperbarui:</span>
          <span className="text-white font-medium">15 Januari 2024, 10:30 WIB</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-blue-300">Cakupan:</span>
          <span className="text-white font-medium">38 Provinsi | 514 Kabupaten/Kota</span>
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <span className="text-[#d4a017] font-semibold">BGN - COMMAND CENTER v2.4.1</span>
        </div>
      </div>
    </header>
  );
}
