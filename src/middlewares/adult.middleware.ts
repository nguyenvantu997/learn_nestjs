import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request } from 'express';
import { Cat } from 'src/cats/interfaces/cat.interface';

@Injectable()
export class AdultMiddleware implements NestMiddleware {
  use(req: Request, res: any, next: () => void) {
    const cat: Cat = req.body;
    if (cat.age >= 18) {
        cat.breed = 'age to 18'
    }
    
    next();
  }
}
