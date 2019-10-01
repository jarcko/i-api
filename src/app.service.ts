import { HttpService, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { join } from 'path';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';

@Injectable()
export class AppService {
  private readonly url: string;

  constructor(private readonly httpService: HttpService) {
    const rawJson = fs.readFileSync(join(__dirname, '..', 'api.config.json')).toString();
    this.url = JSON.parse(rawJson).apiUrl;
  }

  getFeed(): Observable<AxiosResponse<{ items: object[] }>> {
    return this.httpService.get(this.url);
  }

}
