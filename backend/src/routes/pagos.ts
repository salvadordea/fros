import express from 'express';
import { authenticate, authorize } from '@/middleware/auth';

const router = express.Router();

// Rutas para gestión de pagos
router.get('/', authenticate, authorize('ADMIN', 'OPERADOR'), (req, res) => {
  res.json({ success: true, data: { message: 'Lista de pagos - Pendiente implementación' } });
});

router.post('/', authenticate, (req, res) => {
  res.json({ success: true, data: { message: 'Registrar pago - Pendiente implementación' } });
});

router.get('/my-payments', authenticate, (req, res) => {
  res.json({ success: true, data: { message: 'Mis pagos - Pendiente implementación' } });
});

router.get('/:id', authenticate, (req, res) => {
  res.json({ success: true, data: { message: 'Pago por ID - Pendiente implementación' } });
});

router.put('/:id/confirm', authenticate, authorize('ADMIN', 'OPERADOR'), (req, res) => {
  res.json({ success: true, data: { message: 'Confirmar pago - Pendiente implementación' } });
});

router.get('/invoice/:reservaId', authenticate, (req, res) => {
  res.json({ success: true, data: { message: 'Generar factura - Pendiente implementación' } });
});

export default router;