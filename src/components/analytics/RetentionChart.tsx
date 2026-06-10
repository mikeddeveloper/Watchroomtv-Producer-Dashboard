import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { RetentionPoint } from '../../types/content.types';
import { useTheme } from '../../context/ThemeContext';

interface RetentionChartProps {
  data: RetentionPoint[];
}

export function RetentionChart({ data }: RetentionChartProps) {
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
      aria-label="Viewer retention chart"
      className="rounded-2xl border dark:border-[#1a2830] light:border-[#e2e8f0] dark:bg-[#0e1519] light:bg-white p-5"
    >
      <h3 className="mb-1 text-sm font-medium dark:text-white light:text-[#0f172a]">Viewer Retention</h3>
      <p className="mb-4 text-xs dark:text-[#4a6070] light:text-[#64748b]">
        Percentage of viewers still watching over time
      </p>
      <ResponsiveContainer width="100%" height={240}>
        <LineChart data={data} margin={{ top: 4, right: 4, bottom: 16, left: 4 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
          <XAxis
            dataKey="minute"
            tick={{ fill: tickFill, fontSize: 11 }}
            axisLine={{ stroke: gridStroke }}
            tickLine={false}
            label={{ value: 'Minutes', position: 'insideBottom', offset: -8, fill: tickFill, fontSize: 11 }}
          />
          <YAxis
            domain={[0, 100]}
            tickFormatter={(v) => `${String(v)}%`}
            tick={{ fill: tickFill, fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={tooltipStyle}
            labelStyle={labelStyle}
            itemStyle={{ color: '#00b4dc' }}
          />
          <Line
            type="monotone"
            dataKey="percentage"
            stroke="#00b4dc"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, fill: '#00b4dc' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
