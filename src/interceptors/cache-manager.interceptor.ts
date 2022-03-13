import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as cachedManager from 'cache-manager';
import { tap } from 'rxjs/operators';
import { Reflector } from '@nestjs/core';

@Injectable()
export class CacheManagerInterceptor implements NestInterceptor {
  manager = cachedManager.caching({ store: 'memory', max: 100, ttl: 10 });

  constructor(private reflector: Reflector) { }

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const key = this.reflector.get('cache-key', context.getHandler());

    const cached = await this.manager.get(key);

    if (cached) {
      return cached;
    }

    return next.handle().pipe(
      tap(response => {
        this.manager.set(key, response);
      })
    );
  }
}
