import { Injectable, NestMiddleware } from '@nestjs/common';
import * as path from 'path';

const resolvePath = (file: string) => path.resolve(`./src/i-ui/${file}`);

@Injectable()
export class FrontendMiddleware implements NestMiddleware {
  use(req, res, next) {
    const url = req.originalUrl.substr(1);

    if (url.includes('api')) {
      return next();
    }

    if (url.includes('.') || url.includes('assets')) {
      const file = url.includes('assets') ? `/${url}` : url;
      return res.sendFile(resolvePath(file));
    }

    return res.sendFile(resolvePath('index.html'));
  }
}
