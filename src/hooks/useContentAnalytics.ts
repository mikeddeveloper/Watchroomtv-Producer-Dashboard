import { useEffect, useState } from 'react';
import type { ContentAnalytics } from '../types/content.types';
import { contentService } from '../services/contentService';

export function useContentAnalytics(contentId: string) {
  const [analytics, setAnalytics] = useState<ContentAnalytics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    if (!contentId) {
      setError('Content ID is required');
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);
    setAnalytics(null);

    void contentService.getContentAnalytics(contentId)
      .then((data) => {
        if (!cancelled) setAnalytics(data);
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load analytics');
        }
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => { cancelled = true; };
  }, [contentId]);

  return { analytics, isLoading, error };
}
