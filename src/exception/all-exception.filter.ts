import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { EntityNotFoundError } from 'typeorm';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    // create response wrapper
    function responseWrapper(status: HttpStatus) {
      return response.status(status).json({
        statusCode: status,
        timestamp: new Date().toISOString(),
      });
    }

    // TypeORM: entity not found error
    if (exception instanceof EntityNotFoundError) {
      return responseWrapper(HttpStatus.NOT_FOUND);
    }

    // unknown error
    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
