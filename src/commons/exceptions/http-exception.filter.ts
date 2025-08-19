import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status = exception.getStatus();
        const exceptionResponse = exception.getResponse();
        let message = '';
        let error = '';

        if (typeof exceptionResponse === 'string') {
            message = exceptionResponse;
        } else if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
            const res = exceptionResponse as Record<string, any>;
            message = res.message || exception.message;
            error = res.error || exception.name;
        } else {
            message = exception.message;
            error = exception.name;
        }

        response
            .status(status)
            .json({
                statusCode: status,
                message: message,
                error: error,
                timestamp: new Date().toISOString(),
            });
    }
}
