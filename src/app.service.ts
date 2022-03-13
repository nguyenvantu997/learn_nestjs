import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { CatsService } from './cats/cats.service';
import { Cat } from './cats/interfaces/cat.interface';

@Injectable()
export class AppService {
  constructor(
    @Inject(forwardRef(() => CatsService)) 
    private readonly catService: CatsService
    ) { }

  getHello(): string {
    return 'Hello World!';
  }

  async getCatAll(): Promise<any> {
    return await this.catService.findAll();
  }
}
