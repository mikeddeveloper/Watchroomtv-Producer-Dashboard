import { Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { useTheme } from '../../context/ThemeContext';
import type { EngagementMetrics as EngagementData } from '../../types/content.types';
import { formatViews } from '../../utils/formatters';

interface Props {
  engagement: EngagementData;
}

export function EngagementPieChart({ engagement }: Props) {
  const { isDark } = useTheme();

  const data = [
    { name: 'Likes',    value: engagement.likes,    fill: '#00b4dc' },
    { name: 'Comments', value: engagement.comments, fill: '#7c3aed' },
    { name: 'Shares',   value: engagement.shares,   fill: '#f59e0b' },
    { name: 'Saves',    value: engagement.saves,    fill: '#10b981' },
  ];
  const total = data.reduce((s, d) => s + d.value, 0);

  const tooltipStyle = isDark
    ? { backgroundColor: '#0e1519', border: '1px solid #1a2830', borderRadius: 8, fontSize: 12 }
    : { backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: 12 };
  const tickFill = isDark ? '#4a6070' : '#64748b';

  return (
    <div
      aria-label="Engagement breakdown"
      className="rounded-2xl border dark:border-[#1a2830] light:border-[#e2e8f0] dark:bg-[#0e1519] light:bg-white p-5"
    >
      <h3 className="mb-1 text-sm font-medium dark:text-white light:text-[#0f172a]">Engagement Breakdown</h3>
      <p className="mb-5 text-xs dark:text-[#4a6070] light:text-[#64748b]">
        Distribution of user interactions
      </p>

      <div className="flex items-center gap-6">
        <div className="h-37 w-37 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
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
                formatter={(value) => [formatViews(value as number), 'Count']}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <ul className="flex-1 space-y-3">
          {data.map((d) => (
            <li key={d.name} className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: d.fill }} />
                <span className="text-xs dark:text-[#4a6070] light:text-[#64748b]">{d.name}</span>
              </div>
              <div className="text-right">
                <span className="tabular-nums text-xs font-medium dark:text-white light:text-[#0f172a]">
                  {total > 0 ? ((d.value / total) * 100).toFixed(1) : '0.0'}%
                </span>
                <p className="tabular-nums text-xs dark:text-[#4a6070] light:text-[#64748b]">
                  {formatViews(d.value)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
