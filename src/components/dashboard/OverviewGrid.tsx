import { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { useDashboardOverview } from '../../hooks/useDashboardOverview';
import { MetricCard } from './MetricCard';
import { MetricCardSkeleton } from './MetricCardSkeleton';

type Period = '7d' | '30d' | '90d';
const PERIODS: Period[] = ['7d', '30d', '90d'];

export function OverviewGrid() {
  const { cards, isLoading, error } = useDashboardOverview();
  // TODO: pass activePeriod to service when API supports time-range filtering
  const [activePeriod, setActivePeriod] = useState<Period>('30d');

  return (
    <section aria-label="Dashboard overview metrics" className="mb-10">

      {/* Section header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-base font-medium dark:text-white light:text-[#0f172a]">Overview</h2>
          <p className="text-sm dark:text-[#4a6070] light:text-[#64748b]">Your content performance at a glance</p>
        </div>

        <div className="flex items-center gap-1">
          {PERIODS.map((period) => (
            <button
              key={period}
              type="button"
              onClick={() => { setActivePeriod(period); }}
              className={`rounded-lg px-3 py-1.5 text-xs transition-all duration-200 ${
                activePeriod === period
                  ? 'border dark:border-[#1a2830] light:border-[#e2e8f0] dark:bg-[#0e1519] light:bg-white dark:text-white light:text-[#0f172a]'
                  : 'dark:text-[#4a6070] light:text-[#64748b] dark:hover:text-white light:hover:text-[#0f172a]'
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {isLoading && Array.from({ length: 6 }, (_, i) => (
          <MetricCardSkeleton key={i} />
        ))}

        {!isLoading && error && (
          <div className="col-span-full flex items-center justify-center gap-2 py-12">
            <AlertCircle size={18} className="shrink-0 text-red-400" aria-hidden="true" />
            <p className="text-sm text-red-400">{error}</p>
          </div>
        )}

        {!isLoading && !error && cards.map((card) => (
          <MetricCard key={card.id} card={card} />
        ))}
      </div>

    </section>
  );
}
