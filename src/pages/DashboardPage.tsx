import { useEffect } from 'react';
import AOS from 'aos';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { OverviewGrid } from '../components/dashboard/OverviewGrid';
import { ContentTable } from '../components/dashboard/ContentTable';

export default function DashboardPage() {
  useEffect(() => {
    AOS.init({ duration: 600, once: true, easing: 'ease-out-cubic' });
  }, []);

  return (
    <DashboardLayout>
      <OverviewGrid />
      <ContentTable />
    </DashboardLayout>
  );
}
