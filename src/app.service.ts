import { HttpService, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { join } from 'path';
import { Observable } from 'rxjs';
import { FeedItem } from 'src/interfaces';
import { map } from 'rxjs/operators';

@Injectable()
export class AppService {
  private readonly url: string;

  constructor(private readonly httpService: HttpService) {
    const rawJson = fs.readFileSync(join(__dirname, '..', 'api.config.json')).toString();
    this.url = JSON.parse(rawJson).apiUrl;
  }

  getFeed(): Observable<FeedItem[]> {
    return this.httpService.get(this.url)
      .pipe(map(({ data }) => data.items));
  }

}
