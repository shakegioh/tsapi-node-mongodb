import { NextFunction, Request, Response } from 'express';
import HttpException from 'exception/HttpException';
import logger from 'util/logger';

/**
 * Transforma uma exception em um objeto json para sempre retornar json como response
 */
function errorMiddleware(error: HttpException, req: Request, res: Response, next: NextFunction) {
  const status: number = error.status || 500;
  const errorCode: string = error.errorCode || 'UNKNOWN_ERROR';
  const errorMessage: string = error.errorMessage || error.message || 'Alguma coisa deu errado';

  const debug: any = {};

  if (error.stack) {
    debug.stack = error.stack;
  }

  const errorResponse = {
    status,
    errorCode,
    errorMessage,
    _debug: debug,
  };

  logger.error('[errorMiddleware]', errorResponse);

  res.status(status).json(errorResponse);
}

export default errorMiddleware;
