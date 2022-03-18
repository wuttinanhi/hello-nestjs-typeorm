import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { EntityNotFoundError } from 'typeorm';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  private static readonly logger = new Logger('Exception');

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    // create response wrapper
    function responseWrapper(status: HttpStatus) {
      const errorName = (exception as Error).name;

      AllExceptionFilter.logger.error(
        `Error ${errorName} at ${request.url} from ${request.ip}`,
      );

      return response.status(status).json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
    }

    // TypeORM: entity not found error
    if (exception instanceof EntityNotFoundError) {
      return responseWrapper(HttpStatus.NOT_FOUND);
    }

    // unknown error
    return responseWrapper(HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
