import type { LucideIcon } from 'lucide-react';

interface AnalyticsStatCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
}

export function AnalyticsStatCard({ label, value, icon }: AnalyticsStatCardProps) {
  const Icon = icon;

  return (
    <div className="flex items-center gap-3 rounded-2xl border dark:border-[#1a2830] light:border-[#e2e8f0] dark:bg-[#0e1519] light:bg-white p-4">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border dark:border-[#1a2830] light:border-[#e2e8f0] dark:bg-[#111a20] light:bg-[#f8fafc]">
        <Icon size={16} className="text-[#00b4dc]" aria-hidden="true" />
      </div>
      <div>
        <p className="text-xs dark:text-[#4a6070] light:text-[#64748b]">{label}</p>
        <p className="text-lg font-medium dark:text-white light:text-[#0f172a]">{value}</p>
      </div>
    </div>
  );
}
