import type { ReactNode } from 'react';
import { TopNav } from './TopNav';

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen dark:bg-[#080c10] light:bg-[#f0f4f8]">
      <TopNav />
      <main className="mx-auto max-w-7xl px-6 pb-12 pt-24">
        {children}
      </main>
    </div>
  );
}
