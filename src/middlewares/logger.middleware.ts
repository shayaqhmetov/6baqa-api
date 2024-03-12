import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // TODO: Implement the middleware logic
    console.log('Request...'); // This will log the request to the console
    next();
  }
}
