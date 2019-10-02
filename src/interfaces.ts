export interface FeedRS {
  items: FeedItem[];
}

export interface FeedItem {
  title?: string;
  type: string;
  source: string;
  videoId?: string;
  url: string;
  views: number;
}
