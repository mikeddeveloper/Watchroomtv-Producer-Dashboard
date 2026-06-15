import { useState } from 'react';
import type { ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, Film, Search, SearchX } from 'lucide-react';
import type { ContentItem } from '../../types/content.types';
import { useContentList } from '../../hooks/useContentList';
import {
  formatCompletionRate,
  formatDate,
  formatNaira,
  formatViews,
  formatWatchTime,
} from '../../utils/formatters';

interface ContentTableRowProps {
  item: ContentItem;
  onNavigate: (id: string) => void;
}

function ContentTableRow({ item, onNavigate }: ContentTableRowProps) {
  const [imgError, setImgError] = useState(false);

  const completionColor =
    item.completionRate >= 70
      ? 'bg-emerald-400'
      : item.completionRate >= 50
        ? 'bg-amber-400'
        : 'bg-red-400';

  const statusStyles: Record<ContentItem['status'], string> = {
    published:
      'border border-emerald-400/20 bg-emerald-400/10 text-emerald-400',
    processing:
      'border border-amber-400/20 bg-amber-400/10 text-amber-400',
    draft:
      'border dark:border-[#1a2830] light:border-[#e2e8f0] dark:bg-[#1a2830] light:bg-[#e2e8f0] dark:text-[#4a6070] light:text-[#64748b]',
  };

  return (
    <tr
      role="row"
      onClick={() => { onNavigate(item.id); }}
      className="cursor-pointer border-b dark:border-[#1a2830]/50 light:border-[#e2e8f0] transition-all duration-200 dark:hover:bg-[#0e1519] light:hover:bg-[#f8fafc]"
    >
      <td role="cell" className="px-2 py-4">
        {imgError ? (
          <div className="flex h-12 w-20 items-center justify-center rounded-lg dark:bg-[#111a20] light:bg-[#f8fafc]">
            <Film size={16} className="dark:text-[#4a6070] light:text-[#64748b]" aria-hidden="true" />
          </div>
        ) : (
          <img
            src={item.thumbnail}
            alt={item.title}
            className="h-12 w-20 rounded-lg dark:bg-[#111a20] light:bg-[#f8fafc] object-cover"
            onError={() => { setImgError(true); }}
          />
        )}
      </td>

      <td role="cell" className="px-2 py-4">
        <p className="text-sm font-medium dark:text-white light:text-[#0f172a]">{item.title}</p>
        <p className="mt-0.5 text-xs dark:text-[#4a6070] light:text-[#64748b]">{item.genre}</p>
      </td>

      <td role="cell" className="px-2 py-4">
        <p className="text-sm dark:text-[#d0e8f0] light:text-[#1e293b]">{formatViews(item.views)}</p>
        <p className="mt-0.5 text-[11px] dark:text-[#4a6070] light:text-[#64748b]">{formatDate(item.uploadedAt)}</p>
      </td>

      <td role="cell" className="px-2 py-4">
        <p className="text-sm dark:text-[#d0e8f0] light:text-[#1e293b]">{formatWatchTime(item.watchTimeMinutes)}</p>
      </td>

      <td role="cell" className="px-2 py-4">
        <p className="text-sm dark:text-[#d0e8f0] light:text-[#1e293b]">{formatCompletionRate(item.completionRate)}</p>
        <div className="mt-1.5 h-1 w-16 rounded-full dark:bg-[#1a2830] light:bg-[#e2e8f0]">
          <div
            className={`h-full rounded-full ${completionColor}`}
            style={{ width: `${item.completionRate}%` }}
          />
        </div>
      </td>

      <td role="cell" className="px-2 py-4">
        <p className="text-sm dark:text-[#d0e8f0] light:text-[#1e293b]">{formatNaira(item.revenueNaira)}</p>
      </td>

      <td role="cell" className="px-2 py-4">
        <span
          className={`rounded-full px-2.5 py-1 text-xs ${statusStyles[item.status]}`}
        >
          {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
        </span>
      </td>
    </tr>
  );
}

function ContentTableRowSkeleton() {
  return (
    <tr role="row">
      <td role="cell" className="px-2 py-4">
        <div className="h-12 w-20 animate-pulse rounded-lg dark:bg-[#1a2830] light:bg-[#e2e8f0]" />
      </td>
      <td role="cell" className="px-2 py-4">
        <div className="mb-1.5 h-4 w-36 animate-pulse rounded dark:bg-[#1a2830] light:bg-[#e2e8f0]" />
        <div className="h-3 w-20 animate-pulse rounded dark:bg-[#1a2830] light:bg-[#e2e8f0]" />
      </td>
      <td role="cell" className="px-2 py-4">
        <div className="h-4 w-16 animate-pulse rounded dark:bg-[#1a2830] light:bg-[#e2e8f0]" />
      </td>
      <td role="cell" className="px-2 py-4">
        <div className="h-4 w-20 animate-pulse rounded dark:bg-[#1a2830] light:bg-[#e2e8f0]" />
      </td>
      <td role="cell" className="px-2 py-4">
        <div className="mb-1.5 h-4 w-12 animate-pulse rounded dark:bg-[#1a2830] light:bg-[#e2e8f0]" />
        <div className="h-1 w-16 animate-pulse rounded dark:bg-[#1a2830] light:bg-[#e2e8f0]" />
      </td>
      <td role="cell" className="px-2 py-4">
        <div className="h-4 w-24 animate-pulse rounded dark:bg-[#1a2830] light:bg-[#e2e8f0]" />
      </td>
      <td role="cell" className="px-2 py-4">
        <div className="h-5 w-20 animate-pulse rounded-full dark:bg-[#1a2830] light:bg-[#e2e8f0]" />
      </td>
    </tr>
  );
}

export function ContentTable() {
  const { items, isLoading, error } = useContentList();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems =
    searchQuery.trim() === ''
      ? items
      : items.filter((item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()),
        );

  function handleNavigate(id: string): void {
    navigate(`/dashboard/analytics/${id}`);
  }

  return (
    <section>
      {/* Section header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-base font-medium dark:text-white light:text-[#0f172a]">Content Performance</h2>
          <p className="text-sm dark:text-[#4a6070] light:text-[#64748b]">All your uploaded content</p>
        </div>

        <div className="relative">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 dark:text-[#4a6070] light:text-[#64748b]"
            aria-hidden="true"
          />
          <input
            type="text"
            placeholder="Search content..."
            value={searchQuery}
            onChange={(e: ChangeEvent<HTMLInputElement>) => { setSearchQuery(e.target.value); }}
            className="w-48 rounded-lg border dark:border-[#1a2830] light:border-[#e2e8f0] dark:bg-[#0e1519] light:bg-white py-2 pl-8 pr-3 text-sm dark:text-[#d0e8f0] light:text-[#1e293b] outline-none placeholder:dark:text-[#4a6070] placeholder:light:text-[#64748b] focus:border-[#00b4dc]"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table role="table" className="w-full">
          <thead role="rowgroup">
            <tr role="row" className="border-b dark:border-[#1a2830] light:border-[#e2e8f0]">
              {['Thumbnail', 'Title & Genre', 'Views', 'Watch Time', 'Completion', 'Revenue', 'Status'].map(
                (col) => (
                  <th
                    key={col}
                    role="columnheader"
                    className="pb-3 pl-2 pr-2 pt-0 text-left text-xs font-medium dark:text-[#4a6070] light:text-[#64748b]"
                  >
                    {col}
                  </th>
                ),
              )}
            </tr>
          </thead>

          <tbody role="rowgroup">
            {isLoading &&
              Array.from({ length: 5 }, (_, i) => <ContentTableRowSkeleton key={i} />)}

            {!isLoading && error && (
              <tr role="row">
                <td role="cell" colSpan={7} className="py-16 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <AlertCircle size={16} className="text-red-400" aria-hidden="true" />
                    <p className="text-sm text-red-400">{error}</p>
                  </div>
                </td>
              </tr>
            )}

            {!isLoading && !error && filteredItems.length === 0 && (
              <tr role="row">
                <td role="cell" colSpan={7} className="py-16 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <SearchX size={32} className="dark:text-[#4a6070] light:text-[#64748b]" aria-hidden="true" />
                    <p className="text-sm dark:text-[#4a6070] light:text-[#64748b]">No content found</p>
                  </div>
                </td>
              </tr>
            )}

            {!isLoading &&
              !error &&
              filteredItems.map((item) => (
                <ContentTableRow
                  key={item.id}
                  item={item}
                  onNavigate={handleNavigate}
                />
              ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
