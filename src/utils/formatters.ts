export function formatViews(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
}

export function formatWatchTime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  return `${hours.toLocaleString()} hrs`;
}

export function formatNaira(amount: number): string {
  return `₦${amount.toLocaleString()}`;
}

export function formatCompletionRate(rate: number): string {
  return `${rate}%`;
}

export function formatDate(isoString: string): string {
  return new Date(isoString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}
