import { Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { useTheme } from '../../context/ThemeContext';
import { formatNaira } from '../../utils/formatters';

const DATA = [
  { name: 'Documentary', value: 3_210_000, fill: '#00b4dc' },
  { name: 'Drama',       value: 1_240_000, fill: '#7c3aed' },
  { name: 'Reality',     value:   720_000, fill: '#f59e0b' },
  { name: 'Music',       value:   580_000, fill: '#10b981' },
];

const TOTAL = DATA.reduce((s, d) => s + d.value, 0);

export function RevenueByGenreChart() {
  const { isDark } = useTheme();

  const tooltipStyle = isDark
    ? { backgroundColor: '#0e1519', border: '1px solid #1a2830', borderRadius: 8, fontSize: 12 }
    : { backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: 12 };
  const tickFill = isDark ? '#4a6070' : '#64748b';

  return (
    <div
      data-aos="fade-up"
      aria-label="Revenue by genre"
      className="rounded-2xl border dark:border-[#1a2830] light:border-[#e2e8f0] dark:bg-[#0e1519] light:bg-white p-5"
    >
      <h3 className="mb-1 text-sm font-medium dark:text-white light:text-[#0f172a]">Revenue by Genre</h3>
      <p className="mb-5 text-xs dark:text-[#4a6070] light:text-[#64748b]">
        Revenue share across content categories
      </p>

      <div className="flex items-center gap-6">
        <div className="h-37 w-37 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={DATA}
                cx="50%"
                cy="50%"
                innerRadius={44}
                outerRadius={68}
                dataKey="value"
                strokeWidth={2}
                stroke={isDark ? '#0e1519' : '#ffffff'}
              />
              <Tooltip
                contentStyle={tooltipStyle}
                labelStyle={{ color: tickFill, fontSize: 11 }}
                itemStyle={{ color: isDark ? '#d0e8f0' : '#1e293b' }}
                formatter={(value) => [formatNaira(value as number), 'Revenue']}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <ul className="flex-1 space-y-3">
          {DATA.map((d) => (
            <li key={d.name} className="flex items-center justify-between gap-2">
              <div className="flex min-w-0 items-center gap-2">
                <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: d.fill }} />
                <span className="truncate text-xs dark:text-[#4a6070] light:text-[#64748b]">{d.name}</span>
              </div>
              <span className="shrink-0 tabular-nums text-xs font-medium dark:text-white light:text-[#0f172a]">
                {((d.value / TOTAL) * 100).toFixed(1)}%
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
