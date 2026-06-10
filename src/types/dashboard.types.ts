import type { LucideIcon } from 'lucide-react';

export interface MetricCard {
  id: string;
  label: string;
  value: string;
  change: number;
  changeLabel: string;
  icon: LucideIcon;
  sparkline: number[];
}

export interface DashboardOverview {
  totalContentUploaded: number;
  totalViews: number;
  totalWatchTimeMinutes: number;
  averageCompletionRate: number;
  totalRevenueNaira: number;
  totalEarningsNaira: number;
}
