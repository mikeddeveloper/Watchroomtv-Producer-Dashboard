import { Clock, DollarSign, Eye, Film, TrendingUp, Wallet } from 'lucide-react';
import type { DashboardOverview, MetricCard } from '../types/dashboard.types';

export const MOCK_OVERVIEW: DashboardOverview = {
  totalContentUploaded: 24,
  totalViews: 1482300,
  totalWatchTimeMinutes: 3920400,
  averageCompletionRate: 68.4,
  totalRevenueNaira: 4750000,
  totalEarningsNaira: 3562500,
};

export const MOCK_METRIC_CARDS: MetricCard[] = [
  {
    id: 'content',
    label: 'Total Content Uploaded',
    value: '24',
    change: 4.2,
    changeLabel: 'vs last month',
    icon: Film,
    sparkline: [18, 19, 20, 20, 22, 23, 24],
  },
  {
    id: 'views',
    label: 'Total Views',
    value: '1.48M',
    change: 12.5,
    changeLabel: 'vs last month',
    icon: Eye,
    sparkline: [980000, 1050000, 1120000, 1200000, 1310000, 1400000, 1482300],
  },
  {
    id: 'watchtime',
    label: 'Total Watch Time',
    value: '65,340 hrs',
    change: 8.1,
    changeLabel: 'vs last month',
    icon: Clock,
    sparkline: [52000, 55000, 57000, 59000, 61000, 63000, 65340],
  },
  {
    id: 'completion',
    label: 'Avg Completion Rate',
    value: '68.4%',
    change: -2.3,
    changeLabel: 'vs last month',
    icon: TrendingUp,
    sparkline: [72, 70, 71, 69, 68, 67, 68.4],
  },
  {
    id: 'revenue',
    label: 'Total Revenue',
    value: '₦4,750,000',
    change: 18.7,
    changeLabel: 'vs last month',
    icon: DollarSign,
    sparkline: [2800000, 3100000, 3400000, 3700000, 4000000, 4400000, 4750000],
  },
  {
    id: 'earnings',
    label: 'Total Earnings',
    value: '₦3,562,500',
    change: 18.7,
    changeLabel: 'vs last month',
    icon: Wallet,
    sparkline: [2100000, 2325000, 2550000, 2775000, 3000000, 3300000, 3562500],
  },
];
