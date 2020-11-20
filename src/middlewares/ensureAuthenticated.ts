import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '../config/authConfig';
import AppError from '../errors/AppError';

interface TokenPayload {
  iat: string;
  exp: string;
  sub: string;
}

const ensuredAuthenticated = (
  request: Request,
  response: Response,
  next: NextFunction
): void => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError(401, 'Auth token is missing');
  }

  const [, token] = authHeader.split(' ');
  try {
    const decoded = verify(token, authConfig.secret);
    const { sub } = decoded as TokenPayload;
    request.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new AppError(401, 'Invalid auth token');
  }
};

export default ensuredAuthenticated;
