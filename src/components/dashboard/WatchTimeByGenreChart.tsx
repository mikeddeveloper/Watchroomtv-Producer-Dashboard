import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { useTheme } from '../../context/ThemeContext';

const DATA = [
  { name: 'Documentary', value: 2_460_000, color: '#00b4dc' },
  { name: 'Drama',       value:   980_000, color: '#7c3aed' },
  { name: 'Reality',     value:   540_000, color: '#f59e0b' },
  { name: 'Music',       value:   390_000, color: '#10b981' },
];

const TOTAL = DATA.reduce((s, d) => s + d.value, 0);

function formatHours(minutes: number): string {
  const h = Math.round(minutes / 60);
  return h >= 1000 ? `${(h / 1000).toFixed(1)}k hrs` : `${h} hrs`;
}

export function WatchTimeByGenreChart() {
  const { isDark } = useTheme();

  const tooltipStyle = isDark
    ? { backgroundColor: '#0e1519', border: '1px solid #1a2830', borderRadius: 8, fontSize: 12 }
    : { backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: 12 };
  const tickFill = isDark ? '#4a6070' : '#64748b';

  return (
    <div
      data-aos="fade-up"
      data-aos-delay="100"
      aria-label="Watch time by genre"
      className="rounded-2xl border dark:border-[#1a2830] light:border-[#e2e8f0] dark:bg-[#0e1519] light:bg-white p-5"
    >
      <h3 className="mb-1 text-sm font-medium dark:text-white light:text-[#0f172a]">Watch Time by Genre</h3>
      <p className="mb-5 text-xs dark:text-[#4a6070] light:text-[#64748b]">
        Total viewing hours split by content category
      </p>

      <div className="flex items-center gap-6">
        <div className="h-[148px] w-[148px] shrink-0">
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
              >
                {DATA.map((d) => (
                  <Cell key={d.name} fill={d.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={tooltipStyle}
                labelStyle={{ color: tickFill, fontSize: 11 }}
                itemStyle={{ color: isDark ? '#d0e8f0' : '#1e293b' }}
                formatter={(value: number) => [formatHours(value), 'Watch Time']}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <ul className="flex-1 space-y-3">
          {DATA.map((d) => (
            <li key={d.name} className="flex items-center justify-between gap-2">
              <div className="flex min-w-0 items-center gap-2">
                <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: d.color }} />
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
