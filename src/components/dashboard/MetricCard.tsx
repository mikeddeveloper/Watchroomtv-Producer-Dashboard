import { TrendingDown, TrendingUp } from 'lucide-react';
import { Area, AreaChart, ResponsiveContainer } from 'recharts';
import type { MetricCard as MetricCardData } from '../../types/dashboard.types';

interface MetricCardProps {
  card: MetricCardData;
  index: number;
}

export function MetricCard({ card, index }: MetricCardProps) {
  const Icon = card.icon;
  const chartData = card.sparkline.map((v, i) => ({ v, i }));

  return (
    <div
      data-aos="fade-up"
      data-aos-delay={`${index * 80}`}
      className="flex cursor-default flex-col gap-4 rounded-2xl border dark:border-[#1a2830] light:border-[#e2e8f0] dark:bg-[#0e1519] light:bg-white p-5 transition-all duration-300 hover:border-[#00b4dc]/20"
    >
      {/* Top row */}
      <div className="flex items-start justify-between">
        <div>
          <p className="mb-2 text-[11px] uppercase tracking-widest dark:text-[#4a6070] light:text-[#64748b]">
            {card.label}
          </p>
          <p className="text-2xl font-medium dark:text-white light:text-[#0f172a]">{card.value}</p>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-xl border dark:border-[#1a2830] light:border-[#e2e8f0] dark:bg-[#111a20] light:bg-[#f8fafc]">
          <Icon size={18} className="text-[#00b4dc]" aria-hidden="true" />
        </div>
      </div>

      {/* Change badge */}
      <div className="flex items-center gap-1.5">
        {card.change >= 0 ? (
          <>
            <TrendingUp size={12} className="text-emerald-400" aria-hidden="true" />
            <span className="text-xs text-emerald-400">+{card.change}%</span>
          </>
        ) : (
          <>
            <TrendingDown size={12} className="text-red-400" aria-hidden="true" />
            <span className="text-xs text-red-400">{card.change}%</span>
          </>
        )}
        <span className="ml-1 text-xs dark:text-[#4a6070] light:text-[#64748b]">{card.changeLabel}</span>
      </div>

      {/* Sparkline — bleeds to card edges */}
      <div className="-mx-5 -mb-5 mt-auto">
        <ResponsiveContainer width="100%" height={48}>
          <AreaChart
            data={chartData}
            margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
          >
            <defs>
              <linearGradient id={`grad-${card.id}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00b4dc" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#00b4dc" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="v"
              stroke="#00b4dc"
              strokeWidth={1.5}
              fill={`url(#grad-${card.id})`}
              dot={false}
              isAnimationActive={true}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
