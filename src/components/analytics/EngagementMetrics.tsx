import { Bookmark, Heart, MessageCircle, Share2, Star } from 'lucide-react';
import type { EngagementMetrics as EngagementData } from '../../types/content.types';
import { formatViews } from '../../utils/formatters';

interface EngagementMetricsProps {
  engagement: EngagementData;
}

const STATS = [
  { key: 'likes' as const, label: 'Likes', icon: Heart },
  { key: 'comments' as const, label: 'Comments', icon: MessageCircle },
  { key: 'shares' as const, label: 'Shares', icon: Share2 },
  { key: 'saves' as const, label: 'Saves', icon: Bookmark },
];

export function EngagementMetrics({ engagement }: EngagementMetricsProps) {
  const filledStars = Math.floor(engagement.avgRating);

  return (
    <div
      aria-label="Engagement metrics"
      className="rounded-2xl border dark:border-[#1a2830] light:border-[#e2e8f0] dark:bg-[#0e1519] light:bg-white p-5"
    >
      <h3 className="mb-4 text-sm font-medium dark:text-white light:text-[#0f172a]">Engagement Metrics</h3>

      <div className="mb-5 grid grid-cols-2 gap-4">
        {STATS.map(({ key, label, icon: Icon }) => (
          <div key={key} className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border dark:border-[#1a2830] light:border-[#e2e8f0] dark:bg-[#111a20] light:bg-[#f8fafc]">
              <Icon size={14} className="text-[#00b4dc]" aria-hidden="true" />
            </div>
            <div>
              <p className="text-xs dark:text-[#4a6070] light:text-[#64748b]">{label}</p>
              <p className="text-sm font-medium dark:text-white light:text-[#0f172a]">{formatViews(engagement[key])}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 border-t dark:border-[#1a2830] light:border-[#e2e8f0] pt-4">
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }, (_, i) => (
            <Star
              key={i}
              size={14}
              fill={i < filledStars ? 'currentColor' : 'none'}
              className={i < filledStars ? 'text-[#00b4dc]' : 'dark:text-[#1a2830] light:text-[#e2e8f0]'}
              aria-hidden="true"
            />
          ))}
        </div>
        <span className="ml-1 text-sm dark:text-white light:text-[#0f172a]">{engagement.avgRating}/5</span>
      </div>
    </div>
  );
}
