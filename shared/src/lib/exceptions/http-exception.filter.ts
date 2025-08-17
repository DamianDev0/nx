import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();
    const req = ctx.getRequest();

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const message = exception.getResponse();
      res.status(status).json({
        timestamp: new Date().toISOString(),
        path: req.url,
        status,
        error: message,
      });
    } else {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        timestamp: new Date().toISOString(),
        path: req.url,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'Internal server error',
      });
    }
  }
}
