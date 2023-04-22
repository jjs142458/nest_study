import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP'); // logger 클래스 사용
  use(req: Request, res: Response, next: NextFunction) {
    res.on('finish', () => {
      // res(응답)이 끝나고 나서 this.logger.log를 실행
      this.logger.log(
        `${req.ip} ${req.method} ${res.statusCode}`,
        req.originalUrl,
      );
    });
    next();
  }
}
