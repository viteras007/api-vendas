import { Secret } from './../../../../node_modules/@types/jsonwebtoken/index.d';
import authConfig from '@config/auth';
import AppError from "@shared/errors/AppError";
import { NextFunction, Response, Request } from "express";
import { verify } from "jsonwebtoken";

export default function isAuthenticated(request: Request, response: Response, next: NextFunction): void {
  const authHeader = request.headers.authorization;

  if(!authHeader) {
    throw new AppError('JWT Token is missing.');
  }

  const [,token] = authHeader.split(' ');

  try {
    const decodeToken = verify(token, authConfig.jwt.secret);

    return next();
  } catch (err) {
    throw new AppError('Invalid JWT Token');
  }
}
