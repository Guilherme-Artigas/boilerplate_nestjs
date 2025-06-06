import { CustomError } from '@core/errors/CustomError';
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { WinstonLogger } from '@shared/logger/winston-logger';
import { Request, Response } from 'express';

@Catch(HttpException, CustomError)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException | CustomError, host: ArgumentsHost) {
    const logger = WinstonLogger.getInstance();
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : exception.status;

    logger.error(`HTTP Exception: ${exception.message}`, exception);

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: exception.message,
    });
  }
}
