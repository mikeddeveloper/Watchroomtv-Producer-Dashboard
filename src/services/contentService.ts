import type { ContentAnalytics, ContentItem } from '../types/content.types';
import { TOKEN_KEY } from '../constants/storageKeys';
import { MOCK_CONTENT_ANALYTICS, MOCK_CONTENT_LIST } from '../mocks/mockContent';

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

export const contentService = {
  async getContentList(producerEmail: string): Promise<ContentItem[]> {
    if (IS_DEV) {
      await new Promise((resolve) => setTimeout(resolve, 700));
      return MOCK_CONTENT_LIST;
    }
    const res = await fetch(
      `${API_BASE}/content?email=${encodeURIComponent(producerEmail)}`,
      { headers: getAuthHeaders() },
    );
    return handleResponse<ContentItem[]>(res);
  },

  async getContentAnalytics(contentId: string): Promise<ContentAnalytics> {
    if (IS_DEV) {
      await new Promise((resolve) => setTimeout(resolve, 800));
      const data = MOCK_CONTENT_ANALYTICS[contentId];
      if (!data) throw new Error('Content not found');
      return data;
    }
    const res = await fetch(
      `${API_BASE}/content/${encodeURIComponent(contentId)}/analytics`,
      { headers: getAuthHeaders() },
    );
    return handleResponse<ContentAnalytics>(res);
  },
};
