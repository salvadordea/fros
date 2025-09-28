import jwt from 'jsonwebtoken';
import { RolUsuario } from '@prisma/client';

interface TokenPayload {
  userId: string;
  email: string;
  rol: RolUsuario;
}

export const generateToken = (payload: TokenPayload): string => {
  return jwt.sign(
    payload,
    process.env.JWT_SECRET!,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || '7d'
    }
  );
};

export const verifyToken = (token: string): TokenPayload => {
  return jwt.verify(token, process.env.JWT_SECRET!) as TokenPayload;
};

export const generateRefreshToken = (userId: string): string => {
  return jwt.sign(
    { userId, type: 'refresh' },
    process.env.JWT_SECRET!,
    {
      expiresIn: '30d'
    }
  );
};