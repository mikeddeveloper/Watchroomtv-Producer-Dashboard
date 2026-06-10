import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AOS from 'aos';
import { Activity, AlertCircle, ArrowLeft, DollarSign, Eye, Star } from 'lucide-react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { AnalyticsStatCard } from '../components/analytics/AnalyticsStatCard';
import { RetentionChart } from '../components/analytics/RetentionChart';
import { WatchDurationChart } from '../components/analytics/WatchDurationChart';
import { DropOffChart } from '../components/analytics/DropOffChart';
import { EngagementMetrics } from '../components/analytics/EngagementMetrics';
import { useContentAnalytics } from '../hooks/useContentAnalytics';
import { formatNaira, formatViews } from '../utils/formatters';

export default function AnalyticsPage() {
  const navigate = useNavigate();
  const { contentId } = useParams<{ contentId: string }>();
  const { analytics, isLoading, error } = useContentAnalytics(contentId ?? '');

  useEffect(() => {
    AOS.init({ duration: 600, once: true, easing: 'ease-out-cubic' });
  }, []);

  useEffect(() => {
    if (!contentId) navigate('/dashboard');
  }, [contentId, navigate]);

  const totalInteractions = analytics
    ? analytics.engagement.likes +
      analytics.engagement.comments +
      analytics.engagement.shares +
      analytics.engagement.saves
    : 0;

  return (
    <DashboardLayout>
      {/* Back button */}
      <button
        type="button"
        aria-label="Back to dashboard"
        onClick={() => { navigate('/dashboard'); }}
        data-aos="fade-right"
        className="mb-6 flex items-center gap-2 text-sm dark:text-[#4a6070] light:text-[#64748b] transition-colors duration-200 dark:hover:text-white light:hover:text-[#0f172a]"
      >
        <ArrowLeft size={16} aria-hidden="true" />
        Back to dashboard
      </button>

      {/* Loading skeleton */}
      {isLoading && (
        <div className="space-y-8">
          <div className="flex animate-pulse items-center gap-4">
            <div className="h-10 w-16 rounded-lg dark:bg-[#1a2830] light:bg-[#e2e8f0]" />
            <div className="h-6 w-48 rounded dark:bg-[#1a2830] light:bg-[#e2e8f0]" />
            <div className="h-5 w-20 rounded-full dark:bg-[#1a2830] light:bg-[#e2e8f0]" />
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {Array.from({ length: 4 }, (_, i) => (
              <div key={i} className="h-20 animate-pulse rounded-2xl dark:bg-[#1a2830] light:bg-[#e2e8f0]" />
            ))}
          </div>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="col-span-full h-72 animate-pulse rounded-2xl dark:bg-[#1a2830] light:bg-[#e2e8f0]" />
            <div className="h-72 animate-pulse rounded-2xl dark:bg-[#1a2830] light:bg-[#e2e8f0]" />
            <div className="h-72 animate-pulse rounded-2xl dark:bg-[#1a2830] light:bg-[#e2e8f0]" />
          </div>
          <div className="h-48 animate-pulse rounded-2xl dark:bg-[#1a2830] light:bg-[#e2e8f0]" />
        </div>
      )}

      {/* Error state */}
      {!isLoading && error && (
        <div className="flex flex-col items-center gap-4 py-20">
          <AlertCircle size={32} className="text-red-400" aria-hidden="true" />
          <p className="text-sm text-red-400">{error}</p>
          <button
            type="button"
            onClick={() => { navigate('/dashboard'); }}
            className="text-sm dark:text-[#4a6070] light:text-[#64748b] transition-colors duration-200 dark:hover:text-white light:hover:text-[#0f172a]"
          >
            Back to dashboard
          </button>
        </div>
      )}

      {/* Content */}
      {!isLoading && !error && analytics && (
        <>
          {/* Page header */}
          <div data-aos="fade-up" className="mb-8 flex items-center gap-4">
            <img
              src={analytics.thumbnail}
              alt={analytics.title}
              className="h-10 w-16 rounded-lg object-cover"
            />
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-medium dark:text-white light:text-[#0f172a]">{analytics.title}</h1>
              <span className="rounded-full border dark:border-[#1a2830] light:border-[#e2e8f0] dark:bg-[#0e1519] light:bg-[#f8fafc] px-2.5 py-1 text-[10px] uppercase tracking-wider dark:text-[#4a6070] light:text-[#64748b]">
                {analytics.genre}
              </span>
            </div>
          </div>

          {/* Stat cards */}
          <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
            <AnalyticsStatCard
              label="Total Views"
              value={formatViews(analytics.totalViews)}
              icon={Eye}
              index={0}
            />
            <AnalyticsStatCard
              label="Revenue"
              value={formatNaira(analytics.revenueNaira)}
              icon={DollarSign}
              index={1}
            />
            <AnalyticsStatCard
              label="Avg Rating"
              value={`${analytics.engagement.avgRating}/5`}
              icon={Star}
              index={2}
            />
            <AnalyticsStatCard
              label="Engagement"
              value={formatViews(totalInteractions)}
              icon={Activity}
              index={3}
            />
          </div>

          {/* Charts */}
          <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="lg:col-span-2">
              <RetentionChart data={analytics.viewerRetention} />
            </div>
            <WatchDurationChart data={analytics.watchDuration} />
            <DropOffChart data={analytics.dropOffAnalytics} />
          </div>

          {/* Engagement */}
          <EngagementMetrics engagement={analytics.engagement} />
        </>
      )}
    </DashboardLayout>
  );
}
