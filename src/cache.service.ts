import { Injectable } from '@nestjs/common';
import { FeedItem } from 'src/interfaces';
import { Observable, of } from 'rxjs';

@Injectable()
export class CacheService {
  private videoFeedItems: FeedItem[];

  store(items: FeedItem[]) {
    this.videoFeedItems = items;
  }

  getCachedSubFeed(idx: number, qty: number): Observable<FeedItem[]> {
    return of(this.videoFeedItems.slice(idx, idx + qty));
  }

  isCached(): boolean {
    return !!this.videoFeedItems;
  }
}
