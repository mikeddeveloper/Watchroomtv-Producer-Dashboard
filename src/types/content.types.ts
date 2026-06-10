export interface ContentItem {
  id: string;
  title: string;
  thumbnail: string;
  genre: string;
  uploadedAt: string;
  views: number;
  watchTimeMinutes: number;
  completionRate: number;
  revenueNaira: number;
  status: 'published' | 'draft' | 'processing';
}

export interface ContentAnalytics {
  contentId: string;
  title: string;
  thumbnail: string;
  genre: string;
  totalViews: number;
  viewerRetention: RetentionPoint[];
  watchDuration: WatchDurationPoint[];
  dropOffAnalytics: DropOffPoint[];
  revenueNaira: number;
  engagement: EngagementMetrics;
}

export interface RetentionPoint {
  minute: number;
  percentage: number;
}

export interface WatchDurationPoint {
  label: string;
  viewers: number;
}

export interface DropOffPoint {
  minute: number;
  dropOff: number;
}

export interface EngagementMetrics {
  likes: number;
  comments: number;
  shares: number;
  saves: number;
  avgRating: number;
}
