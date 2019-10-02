import { HttpModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CacheService } from 'src/cache.service';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    CacheService,
  ],
})
export class AppModule {}
