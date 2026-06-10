import { useEffect, useState } from 'react';
import type { MetricCard } from '../types/dashboard.types';
import { useAuth } from './useAuth';
import { dashboardService } from '../services/dashboardService';

export function useDashboardOverview() {
  const { user } = useAuth();
  const [cards, setCards] = useState<MetricCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    if (!user) {
      setError('Not authenticated');
      setIsLoading(false);
      return;
    }

    void dashboardService.getMetricCards(user.email)
      .then((data) => {
        if (!cancelled) setCards(data);
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load metrics');
        }
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => { cancelled = true; };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return { cards, isLoading, error };
}
