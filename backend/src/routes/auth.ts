import express from 'express';
import { body } from 'express-validator';
import {
  login,
  register,
  getProfile,
  updateProfile,
  changePassword
} from '@/controllers/authController';
import { authenticate } from '@/middleware/auth';

const router = express.Router();

// Validaciones
const loginValidation = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Email válido requerido'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Contraseña debe tener al menos 6 caracteres')
];

const registerValidation = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Email válido requerido'),
  body('password')
    .isLength({ min: 8 })
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage('Contraseña debe tener al menos 8 caracteres, incluyendo mayúscula, minúscula, número y símbolo'),
  body('nombre')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Nombre debe tener entre 2 y 50 caracteres'),
  body('apellido')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Apellido debe tener entre 2 y 50 caracteres'),
  body('telefono')
    .optional()
    .isMobilePhone('es-ES')
    .withMessage('Número de teléfono inválido')
];

const updateProfileValidation = [
  body('nombre')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Nombre debe tener entre 2 y 50 caracteres'),
  body('apellido')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Apellido debe tener entre 2 y 50 caracteres'),
  body('telefono')
    .optional()
    .isMobilePhone('es-ES')
    .withMessage('Número de teléfono inválido')
];

const changePasswordValidation = [
  body('currentPassword')
    .isLength({ min: 1 })
    .withMessage('Contraseña actual requerida'),
  body('newPassword')
    .isLength({ min: 8 })
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage('Nueva contraseña debe tener al menos 8 caracteres, incluyendo mayúscula, minúscula, número y símbolo')
];

// Rutas públicas
router.post('/login', loginValidation, login);
router.post('/register', registerValidation, register);

// Rutas protegidas
router.get('/profile', authenticate, getProfile);
router.put('/profile', authenticate, updateProfileValidation, updateProfile);
router.put('/change-password', authenticate, changePasswordValidation, changePassword);

export default router;