import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from '@/utils/database';
import { RolUsuario } from '@prisma/client';

interface JwtPayload {
  userId: string;
  email: string;
  rol: RolUsuario;
}

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      res.status(401).json({
        success: false,
        error: { message: 'Token de acceso requerido' }
      });
      return;
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as JwtPayload;

    const usuario = await prisma.usuario.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        nombre: true,
        apellido: true,
        rol: true,
        estado: true
      }
    });

    if (!usuario) {
      res.status(401).json({
        success: false,
        error: { message: 'Usuario no encontrado' }
      });
      return;
    }

    if (usuario.estado !== 'ACTIVO') {
      res.status(401).json({
        success: false,
        error: { message: 'Usuario inactivo' }
      });
      return;
    }

    req.user = usuario;
    req.userId = usuario.id;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      error: { message: 'Token inválido' }
    });
  }
};

export const authorize = (...roles: RolUsuario[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        error: { message: 'Usuario no autenticado' }
      });
      return;
    }

    if (!roles.includes(req.user.rol)) {
      res.status(403).json({
        success: false,
        error: { message: 'No tienes permisos para realizar esta acción' }
      });
      return;
    }

    next();
  };
};