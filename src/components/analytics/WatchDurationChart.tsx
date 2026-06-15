import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { WatchDurationPoint } from '../../types/content.types';
import { useTheme } from '../../context/ThemeContext';
import { formatViews } from '../../utils/formatters';

interface WatchDurationChartProps {
  data: WatchDurationPoint[];
}

export function WatchDurationChart({ data }: WatchDurationChartProps) {
  const { isDark } = useTheme();
  const maxViewers = Math.max(...data.map((d) => d.viewers));

  const gridStroke = isDark ? '#1a2830' : '#e2e8f0';
  const tickFill = isDark ? '#4a6070' : '#64748b';
  const tooltipStyle = isDark
    ? { backgroundColor: '#0e1519', border: '1px solid #1a2830', borderRadius: 8 }
    : { backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 8 };
  const labelStyle = { color: tickFill };

  const chartData = data.map((d) => ({
    ...d,
    fill: d.viewers === maxViewers ? '#00b4dc' : 'rgba(0,180,220,0.4)',
  }));

  return (
    <div
      aria-label="Watch duration distribution chart"
      className="rounded-2xl border dark:border-[#1a2830] light:border-[#e2e8f0] dark:bg-[#0e1519] light:bg-white p-5"
    >
      <h3 className="mb-1 text-sm font-medium dark:text-white light:text-[#0f172a]">Watch Duration Distribution</h3>
      <p className="mb-4 text-xs dark:text-[#4a6070] light:text-[#64748b]">
        How long viewers are watching your content
      </p>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={chartData} margin={{ top: 4, right: 4, bottom: 4, left: 4 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
          <XAxis
            dataKey="label"
            tick={{ fill: tickFill, fontSize: 11 }}
            axisLine={{ stroke: gridStroke }}
            tickLine={false}
          />
          <YAxis
            tickFormatter={(v) => formatViews(v as number)}
            tick={{ fill: tickFill, fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={tooltipStyle}
            labelStyle={labelStyle}
            itemStyle={{ color: '#00b4dc' }}
          />
          <Bar dataKey="viewers" radius={[4, 4, 0, 0] as [number, number, number, number]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
