import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const error = exception.getResponse() as
      | string
      | { statusCode: number; message: string | string[]; error: string };

    if (typeof error === 'string') {
      //error 타입이 string일 때
      response.status(status).json({
        success: false,
        timestamp: new Date().toISOString,
        path: request.url,
        error,
      });
    } else {
      //error 타입이 object일 때
      response.status(status).json({
        success: false,
        timestamp: new Date().toISOString,
        ...error,
      });
    }
    // response.status(status).json({})가 기본형태

    // response.status(status).json({
    //   success: false,
    //   timestamp: new Date().toISOString(),
    //   path: request.url,
    //   error,
    // });
  }
}
