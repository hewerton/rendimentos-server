import { NextFunction, Request, Response } from 'express';

import AppError from '../errors/AppError';

const errorHandler = (
  err: Error,
  request: Request,
  response: Response,
  _next: NextFunction
): Response => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  return response.status(500).json({
    status: 'error',
    message: err.message,
  });
};

export default errorHandler;
