export function MetricCardSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="flex flex-col gap-4 rounded-2xl border dark:border-[#1a2830] light:border-[#e2e8f0] dark:bg-[#0e1519] light:bg-white p-5"
    >
      {/* Top row */}
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-2">
          <div className="h-2.5 w-28 animate-pulse rounded dark:bg-[#1a2830] light:bg-[#e2e8f0]" />
          <div className="h-7 w-20 animate-pulse rounded dark:bg-[#1a2830] light:bg-[#e2e8f0]" />
        </div>
        <div className="h-10 w-10 animate-pulse rounded-xl dark:bg-[#1a2830] light:bg-[#e2e8f0]" />
      </div>

      {/* Change badge */}
      <div className="h-4 w-24 animate-pulse rounded dark:bg-[#1a2830] light:bg-[#e2e8f0]" />

      {/* Sparkline */}
      <div className="-mx-5 -mb-5 mt-auto h-12 animate-pulse rounded-b-2xl dark:bg-[#1a2830] light:bg-[#e2e8f0]" />
    </div>
  );
}
