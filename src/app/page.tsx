import Header from '@/components/Header';
import KPICards from '@/components/KPICards';
import IndonesiaMap from '@/components/IndonesiaMap';
import DistributionChart from '@/components/DistributionChart';
import CalorieChart from '@/components/CalorieChart';
import BudgetChart from '@/components/BudgetChart';
import NutritionComposition from '@/components/NutritionComposition';
import AlertPanel from '@/components/AlertPanel';
import ProvinceTable from '@/components/ProvinceTable';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f1f5f9]">
      <Header />

      <main className="px-6 py-4 space-y-4">
        <KPICards />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          <div className="lg:col-span-3">
            <IndonesiaMap />
          </div>
          <div className="lg:col-span-2">
            <DistributionChart />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-2">
            <CalorieChart />
          </div>
          <div className="lg:col-span-1">
            <BudgetChart />
          </div>
          <div className="lg:col-span-1">
            <NutritionComposition />
          </div>
        </div>

        <AlertPanel />

        <ProvinceTable />
      </main>

      <footer className="bg-[#1e3a5f] text-blue-200 text-xs py-3 px-6 mt-4 flex items-center justify-between">
        <span>© {new Date().getFullYear()} Badan Gizi Nasional - Dashboard Analitik MBG | Versi 2.4.1</span>
        <span className="text-[#d4a017]">Sistem Monitoring Nasional Program Makan Bergizi Gratis</span>
      </footer>
    </div>
  );
}
