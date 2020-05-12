import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

import authConfig from '@config/auth'

import AppError from '@shared/errors/AppError'

interface TokenPayload {
  sub: string
}

export default async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    throw new AppError('Header is missing bearer token', 401)
  }

  const match = authHeader.match(/^Bearer (\S+)$/)

  if (!match) {
    throw new AppError('Invalid bearer token', 401)
  }

  const token = match[1]

  try {
    const decoded = verify(token, authConfig.secret) as TokenPayload

    req.user = { id: decoded.sub }

    return next()
  } catch (error) {
    throw new AppError('Invalid jwt token', 401)
  }
}
