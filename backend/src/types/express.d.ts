import { RolUsuario, EstadoUsuario } from '@prisma/client';

export interface AuthUser {
  id: string;
  email: string;
  nombre: string;
  apellido: string;
  rol: RolUsuario;
  estado: EstadoUsuario;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
      userId?: string;
    }
  }
}