import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import * as cachedManager from 'cache-manager';
import { CacheManagerInterceptor } from './interceptors/cache-manager.interceptor';
import { CacheKey } from './decorators/cache-key.decorator';
import { CatsService } from './cats/cats.service';
import { Cat } from './cats/interfaces/cat.interface';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService) { }
    
  manager = cachedManager.caching({ store: 'memory', max: 100, ttl: 10 });

  @Get()
  @CacheKey('greet_key')
  @UseInterceptors(CacheManagerInterceptor)
  async getHello(): Promise<string> {
    return this.appService.getHello();
  }

  @Get('question')
  //@CacheKey('question_key')
  @UseInterceptors(CacheManagerInterceptor)
  async getQuestion(): Promise<Cat[]> {
    return await this.appService.getCatAll();
  }
}
