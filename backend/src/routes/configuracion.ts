import express from 'express';
import { authenticate, authorize } from '@/middleware/auth';

const router = express.Router();

// Rutas para configuración del sistema
router.get('/', authenticate, authorize('ADMIN'), (req, res) => {
  res.json({ success: true, data: { message: 'Configuración del sistema - Pendiente implementación' } });
});

router.put('/', authenticate, authorize('ADMIN'), (req, res) => {
  res.json({ success: true, data: { message: 'Actualizar configuración - Pendiente implementación' } });
});

router.get('/public', (req, res) => {
  res.json({ success: true, data: { message: 'Configuración pública - Pendiente implementación' } });
});

export default router;