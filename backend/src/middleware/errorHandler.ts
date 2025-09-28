import { Request, Response, NextFunction } from 'express';
import { Prisma } from '@prisma/client';

export interface AppError extends Error {
  statusCode?: number;
  isOperational?: boolean;
}

export const errorHandler = (
  error: AppError | Prisma.PrismaClientKnownRequestError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let statusCode = 500;
  let message = 'Error interno del servidor';

  // Manejo de errores de Prisma
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P2002':
        statusCode = 400;
        message = 'Ya existe un registro con esos datos únicos';
        break;
      case 'P2025':
        statusCode = 404;
        message = 'Registro no encontrado';
        break;
      case 'P2003':
        statusCode = 400;
        message = 'Violación de restricción de clave foránea';
        break;
      case 'P2014':
        statusCode = 400;
        message = 'Los datos proporcionados violan una restricción';
        break;
      default:
        statusCode = 500;
        message = 'Error de base de datos';
    }
  }
  // Manejo de errores de aplicación
  else if (error.statusCode) {
    statusCode = error.statusCode;
    message = error.message;
  }
  // Errores de validación
  else if (error.name === 'ValidationError') {
    statusCode = 400;
    message = error.message;
  }
  // Errores de JWT
  else if (error.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Token inválido';
  }
  else if (error.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Token expirado';
  }

  // Log del error en desarrollo
  if (process.env.NODE_ENV === 'development') {
    console.error('Error:', {
      message: error.message,
      stack: error.stack,
      url: req.url,
      method: req.method,
      body: req.body,
      params: req.params,
      query: req.query
    });
  }

  res.status(statusCode).json({
    success: false,
    error: {
      message,
      ...(process.env.NODE_ENV === 'development' && {
        stack: error.stack,
        details: error
      })
    }
  });
};