import {
  Catch,
  ArgumentsHost,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class GlobalExceptionFilters implements ExceptionFilter {
  private statusByErrorName: Map<string, number>;

  private errorName: string;

  constructor() {
    this.statusByErrorName = new Map([['EntityNotFound', 404]]);
  }

  catch(exception: HttpException, host: ArgumentsHost) {
    this.errorName = exception.name;
    let errorMessage: any = exception;
    errorMessage = errorMessage.response?.message ?? false;
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status = this.getStatus(exception);
    return errorMessage
      ? response.status(status).json({
          statusCode: status,
          timestamp: new Date().toISOString(),
          path: request.url,
          message: errorMessage,
        })
      : response.status(status).json({
          statusCode: status,
          timestamp: new Date().toISOString(),
          path: request.url,
        });
  }

  private getStatus(exception: unknown): number {
    if (exception instanceof HttpException) {
      return exception.getStatus();
    }
    return this.statusByErrorName.has(this.errorName)
      ? this.statusByErrorName.get(this.errorName)
      : HttpStatus.INTERNAL_SERVER_ERROR;
  }
}
