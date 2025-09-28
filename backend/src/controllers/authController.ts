import { Request, Response } from 'express';
import { prisma } from '@/utils/database';
import { hashPassword, comparePassword } from '@/utils/password';
import { generateToken } from '@/utils/jwt';
import { validationResult } from 'express-validator';

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        success: false,
        error: { message: 'Datos inválidos', details: errors.array() }
      });
      return;
    }

    const { email, password } = req.body;

    const usuario = await prisma.usuario.findUnique({
      where: { email: email.toLowerCase() }
    });

    if (!usuario) {
      res.status(401).json({
        success: false,
        error: { message: 'Credenciales inválidas' }
      });
      return;
    }

    const isPasswordValid = await comparePassword(password, usuario.password);

    if (!isPasswordValid) {
      res.status(401).json({
        success: false,
        error: { message: 'Credenciales inválidas' }
      });
      return;
    }

    if (usuario.estado !== 'ACTIVO') {
      res.status(401).json({
        success: false,
        error: { message: 'Usuario inactivo. Contacta al administrador.' }
      });
      return;
    }

    // Registrar acceso
    await prisma.registroAcceso.create({
      data: {
        usuarioId: usuario.id,
        tipoAcceso: 'WEB_LOGIN',
        direccionIP: req.ip,
        userAgent: req.get('User-Agent'),
        exitoso: true
      }
    });

    const token = generateToken({
      userId: usuario.id,
      email: usuario.email,
      rol: usuario.rol
    });

    res.json({
      success: true,
      data: {
        token,
        usuario: {
          id: usuario.id,
          email: usuario.email,
          nombre: usuario.nombre,
          apellido: usuario.apellido,
          rol: usuario.rol,
          estado: usuario.estado
        }
      }
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({
      success: false,
      error: { message: 'Error interno del servidor' }
    });
  }
};

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        success: false,
        error: { message: 'Datos inválidos', details: errors.array() }
      });
      return;
    }

    const { email, password, nombre, apellido, telefono, invitadoPor } = req.body;

    // Verificar si el usuario ya existe
    const existingUser = await prisma.usuario.findUnique({
      where: { email: email.toLowerCase() }
    });

    if (existingUser) {
      res.status(400).json({
        success: false,
        error: { message: 'Ya existe un usuario con este email' }
      });
      return;
    }

    // Verificar invitación si se requiere
    if (invitadoPor) {
      const invitador = await prisma.usuario.findUnique({
        where: { id: invitadoPor }
      });

      if (!invitador || invitador.rol === 'CLIENTE') {
        res.status(400).json({
          success: false,
          error: { message: 'Invitación inválida' }
        });
        return;
      }
    }

    const hashedPassword = await hashPassword(password);

    const nuevoUsuario = await prisma.usuario.create({
      data: {
        email: email.toLowerCase(),
        password: hashedPassword,
        nombre,
        apellido,
        telefono,
        invitadoPor,
        rol: 'CLIENTE',
        estado: 'PENDIENTE'
      },
      select: {
        id: true,
        email: true,
        nombre: true,
        apellido: true,
        telefono: true,
        rol: true,
        estado: true,
        fechaRegistro: true
      }
    });

    res.status(201).json({
      success: true,
      data: {
        usuario: nuevoUsuario,
        message: 'Usuario registrado exitosamente. Pendiente de activación por administrador.'
      }
    });
  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({
      success: false,
      error: { message: 'Error interno del servidor' }
    });
  }
};

export const getProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        error: { message: 'Usuario no autenticado' }
      });
      return;
    }

    const usuario = await prisma.usuario.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        email: true,
        nombre: true,
        apellido: true,
        telefono: true,
        rol: true,
        estado: true,
        fechaRegistro: true,
        fechaActualizacion: true
      }
    });

    res.json({
      success: true,
      data: { usuario }
    });
  } catch (error) {
    console.error('Error obteniendo perfil:', error);
    res.status(500).json({
      success: false,
      error: { message: 'Error interno del servidor' }
    });
  }
};

export const updateProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        error: { message: 'Usuario no autenticado' }
      });
      return;
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        success: false,
        error: { message: 'Datos inválidos', details: errors.array() }
      });
      return;
    }

    const { nombre, apellido, telefono } = req.body;

    const usuarioActualizado = await prisma.usuario.update({
      where: { id: req.user.id },
      data: {
        nombre,
        apellido,
        telefono
      },
      select: {
        id: true,
        email: true,
        nombre: true,
        apellido: true,
        telefono: true,
        rol: true,
        estado: true,
        fechaActualizacion: true
      }
    });

    res.json({
      success: true,
      data: { usuario: usuarioActualizado }
    });
  } catch (error) {
    console.error('Error actualizando perfil:', error);
    res.status(500).json({
      success: false,
      error: { message: 'Error interno del servidor' }
    });
  }
};

export const changePassword = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        error: { message: 'Usuario no autenticado' }
      });
      return;
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        success: false,
        error: { message: 'Datos inválidos', details: errors.array() }
      });
      return;
    }

    const { currentPassword, newPassword } = req.body;

    const usuario = await prisma.usuario.findUnique({
      where: { id: req.user.id }
    });

    if (!usuario) {
      res.status(404).json({
        success: false,
        error: { message: 'Usuario no encontrado' }
      });
      return;
    }

    const isCurrentPasswordValid = await comparePassword(currentPassword, usuario.password);

    if (!isCurrentPasswordValid) {
      res.status(400).json({
        success: false,
        error: { message: 'Contraseña actual incorrecta' }
      });
      return;
    }

    const hashedNewPassword = await hashPassword(newPassword);

    await prisma.usuario.update({
      where: { id: req.user.id },
      data: { password: hashedNewPassword }
    });

    res.json({
      success: true,
      data: { message: 'Contraseña actualizada exitosamente' }
    });
  } catch (error) {
    console.error('Error cambiando contraseña:', error);
    res.status(500).json({
      success: false,
      error: { message: 'Error interno del servidor' }
    });
  }
};