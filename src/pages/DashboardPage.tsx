import { useEffect } from 'react';
import AOS from 'aos';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { OverviewGrid } from '../components/dashboard/OverviewGrid';
import { ContentTable } from '../components/dashboard/ContentTable';
import { RevenueByGenreChart } from '../components/dashboard/RevenueByGenreChart';
import { WatchTimeByGenreChart } from '../components/dashboard/WatchTimeByGenreChart';

export default function DashboardPage() {
  useEffect(() => {
    AOS.init({ duration: 600, once: true, easing: 'ease-out-cubic' });
  }, []);

  return (
    <DashboardLayout>
      <OverviewGrid />
      <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <RevenueByGenreChart />
        <WatchTimeByGenreChart />
      </div>
      <ContentTable />
    </DashboardLayout>
  );
}
