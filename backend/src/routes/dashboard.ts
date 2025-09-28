import express from 'express';
import { authenticate, authorize } from '@/middleware/auth';

const router = express.Router();

// Rutas para dashboard y reportes
router.get('/stats', authenticate, authorize('ADMIN', 'OPERADOR'), (req, res) => {
  res.json({ success: true, data: { message: 'Estadísticas del dashboard - Pendiente implementación' } });
});

router.get('/occupancy', authenticate, authorize('ADMIN', 'OPERADOR'), (req, res) => {
  res.json({ success: true, data: { message: 'Reporte de ocupación - Pendiente implementación' } });
});

router.get('/revenue', authenticate, authorize('ADMIN', 'OPERADOR'), (req, res) => {
  res.json({ success: true, data: { message: 'Reporte de ingresos - Pendiente implementación' } });
});

router.get('/clients', authenticate, authorize('ADMIN', 'OPERADOR'), (req, res) => {
  res.json({ success: true, data: { message: 'Reporte de clientes - Pendiente implementación' } });
});

router.get('/export/:type', authenticate, authorize('ADMIN', 'OPERADOR'), (req, res) => {
  res.json({ success: true, data: { message: 'Exportar reportes - Pendiente implementación' } });
});

export default router;