import express from 'express';
import { authenticate, authorize } from '@/middleware/auth';

const router = express.Router();

// Rutas para gestión de usuarios
router.get('/', authenticate, authorize('ADMIN', 'OPERADOR'), (req, res) => {
  res.json({ success: true, data: { message: 'Lista de usuarios - Pendiente implementación' } });
});

router.get('/:id', authenticate, authorize('ADMIN', 'OPERADOR'), (req, res) => {
  res.json({ success: true, data: { message: 'Usuario por ID - Pendiente implementación' } });
});

router.put('/:id', authenticate, authorize('ADMIN'), (req, res) => {
  res.json({ success: true, data: { message: 'Actualizar usuario - Pendiente implementación' } });
});

router.delete('/:id', authenticate, authorize('ADMIN'), (req, res) => {
  res.json({ success: true, data: { message: 'Eliminar usuario - Pendiente implementación' } });
});

router.post('/invite', authenticate, authorize('ADMIN', 'OPERADOR'), (req, res) => {
  res.json({ success: true, data: { message: 'Invitar usuario - Pendiente implementación' } });
});

router.put('/:id/activate', authenticate, authorize('ADMIN'), (req, res) => {
  res.json({ success: true, data: { message: 'Activar usuario - Pendiente implementación' } });
});

export default router;