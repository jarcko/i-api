import { Controller, Get, HttpStatus, Logger, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { catchError, map, take } from 'rxjs/operators';

@Controller('api')
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor(private readonly appService: AppService) {}

  @Get()
  getFeed(@Res() res) {
    this.appService.getFeed().pipe(
      take(1),
      map(({ data }) => data),
      catchError((err) => {
        this.logger.error(err);
        throw new Error(`We are sorry! Can not load the data. Please try again`);
      }),
    )
      .subscribe(
        result => res.status(HttpStatus.OK).json(result),
        err => res.status(HttpStatus.NOT_FOUND).json({
          name: 'Error',
          message: err.message,
        }),
      );
  }
}
