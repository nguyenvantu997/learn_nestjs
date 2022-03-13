import { SetMetadata } from '@nestjs/common';

export const CacheKey = (cachedKey) => SetMetadata('cache-key', cachedKey);
