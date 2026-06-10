import type { DashboardOverview, MetricCard } from '../types/dashboard.types';
import { TOKEN_KEY } from '../constants/storageKeys';
import { MOCK_METRIC_CARDS, MOCK_OVERVIEW } from '../mocks/mockDashboard';

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000/api/v1';
const IS_DEV = import.meta.env.DEV;

function getAuthHeaders(): Record<string, string> {
  const token = localStorage.getItem(TOKEN_KEY) ?? '';
  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
}

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json() as Promise<T>;
}

export const dashboardService = {
  async getOverview(producerEmail: string): Promise<DashboardOverview> {
    if (IS_DEV) {
      await new Promise((resolve) => setTimeout(resolve, 600));
      return MOCK_OVERVIEW;
    }
    const res = await fetch(
      `${API_BASE}/dashboard/overview?email=${encodeURIComponent(producerEmail)}`,
      { headers: getAuthHeaders() },
    );
    return handleResponse<DashboardOverview>(res);
  },

  async getMetricCards(producerEmail: string): Promise<MetricCard[]> {
    if (IS_DEV) {
      await new Promise((resolve) => setTimeout(resolve, 600));
      return MOCK_METRIC_CARDS;
    }
    const res = await fetch(
      `${API_BASE}/dashboard/metrics?email=${encodeURIComponent(producerEmail)}`,
      { headers: getAuthHeaders() },
    );
    return handleResponse<MetricCard[]>(res);
  },
};
