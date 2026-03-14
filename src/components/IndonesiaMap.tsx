'use client';

import dynamic from 'next/dynamic';

const MapComponent = dynamic(() => import('./MapContent'), {
  ssr: false,
  loading: () => (
    <div className="h-[520px] bg-gray-100 rounded-lg animate-pulse flex items-center justify-center text-gray-500 text-sm">
      Memuat Peta...
    </div>
  ),
});

export default function IndonesiaMap() {
  return <MapComponent />;
}
