import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { DropOffPoint } from '../../types/content.types';
import { useTheme } from '../../context/ThemeContext';

interface DropOffChartProps {
  data: DropOffPoint[];
}

export function DropOffChart({ data }: DropOffChartProps) {
  const { isDark } = useTheme();

  const gridStroke = isDark ? '#1a2830' : '#e2e8f0';
  const tickFill = isDark ? '#4a6070' : '#64748b';
  const tooltipStyle = isDark
    ? { backgroundColor: '#0e1519', border: '1px solid #1a2830', borderRadius: 8 }
    : { backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 8 };
  const labelStyle = { color: tickFill };

  return (
    <div
      data-aos="fade-up"
      aria-label="Drop-off analytics chart"
      className="rounded-2xl border dark:border-[#1a2830] light:border-[#e2e8f0] dark:bg-[#0e1519] light:bg-white p-5"
    >
      <h3 className="mb-1 text-sm font-medium dark:text-white light:text-[#0f172a]">Drop-off Analytics</h3>
      <p className="mb-4 text-xs dark:text-[#4a6070] light:text-[#64748b]">
        Where viewers are leaving your content
      </p>
      <ResponsiveContainer width="100%" height={240}>
        <AreaChart data={data} margin={{ top: 4, right: 4, bottom: 16, left: 4 }}>
          <defs>
            <linearGradient id="dropoff-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f87171" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#f87171" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
          <XAxis
            dataKey="minute"
            tick={{ fill: tickFill, fontSize: 11 }}
            axisLine={{ stroke: gridStroke }}
            tickLine={false}
            label={{ value: 'Minutes', position: 'insideBottom', offset: -8, fill: tickFill, fontSize: 11 }}
          />
          <YAxis
            tickFormatter={(v) => `${String(v)}%`}
            tick={{ fill: tickFill, fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={tooltipStyle}
            labelStyle={labelStyle}
            itemStyle={{ color: '#f87171' }}
          />
          <Area
            type="monotone"
            dataKey="dropOff"
            stroke="#f87171"
            strokeWidth={2}
            fill="url(#dropoff-grad)"
            dot={false}
            isAnimationActive={true}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
