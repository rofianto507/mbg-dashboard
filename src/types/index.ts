export interface Province {
  id: string;
  name: string;
  region: string;
  population: number;
  beneficiaries: number;
  schools: number;
  dailyPortions: number;
  nutritionScore: number;
  budgetAbsorption: number;
  budgetAllocated: number;
  costPerChild: number;
  distributionStatus: 'on-time' | 'delayed' | 'critical';
  status: 'good' | 'attention' | 'critical';
  lat: number;
  lng: number;
}

export interface Alert {
  id: string;
  severity: 'critical' | 'warning';
  province: string;
  message: string;
  detail: string;
  timestamp: string;
  type: 'nutrition' | 'distribution' | 'budget' | 'reporting';
}

export interface DailyData {
  date: string;
  distributed: number;
  target: number;
  nutritionScore: number;
  budget: number;
}

export interface KPIData {
  totalBeneficiaries: number;
  totalBeneficiariesTrend: number;
  totalSchools: number;
  totalSchoolsTrend: number;
  totalPortionsToday: number;
  budgetAbsorption: number;
  activeAlerts: number;
  nationalNutritionIndex: number;
}
