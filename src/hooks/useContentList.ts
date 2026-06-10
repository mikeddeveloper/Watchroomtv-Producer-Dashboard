import { useEffect, useState } from 'react';
import type { ContentItem } from '../types/content.types';
import { useAuth } from './useAuth';
import { contentService } from '../services/contentService';

export function useContentList() {
  const { user } = useAuth();
  const [items, setItems] = useState<ContentItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    if (!user) {
      setError('Not authenticated');
      setIsLoading(false);
      return;
    }

    void contentService.getContentList(user.email)
      .then((data) => {
        if (!cancelled) setItems(data);
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load content');
        }
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => { cancelled = true; };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return { items, isLoading, error };
}
