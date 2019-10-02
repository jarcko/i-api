import { Controller, Get, HttpStatus, Logger, Query, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { catchError, take } from 'rxjs/operators';
import { CacheService } from 'src/cache.service';
import { Observable } from 'rxjs';
import { FeedItem } from 'src/interfaces';

@Controller('api')
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor(
    private appService: AppService,
    private cacheService: CacheService,
  ) {}

  @Get()
  getFeed(@Query('idx') idx, @Query('qty') qty, @Res() res) {
    const index = parseInt(idx, 10);
    const quantity = parseInt(qty, 10);
    const isCached = this.cacheService.isCached();
    const fetchItems$: Observable<FeedItem[]> = isCached ? this.cacheService.getCachedSubFeed(index, quantity) : this.appService.getFeed();

    fetchItems$.pipe(
      take(1),
      catchError((err) => {
        this.logger.error(err);
        throw new Error(`We are sorry! Can not load the data. Please reload the page`);
      }),
    )
      .subscribe(
        result => {
          if (!isCached) {
            this.cacheService.store(result);
            result = result.slice(index, index + quantity);
          }
          return res.status(HttpStatus.OK).json(result);
        },
        err => res.status(HttpStatus.NOT_FOUND).json({
          name: 'Error',
          message: err.message,
        }),
      );
  }
}
