import { Router } from 'express';
import * as orderController from '../controllers/order.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = Router();

// ── Public ──
router.post('/', orderController.createOrder);

// ── Protected (admin) ──
router.get('/', authenticate, orderController.getOrders);
router.get('/:id', authenticate, orderController.getOrder);
router.patch('/:id/status', authenticate, orderController.updateOrderStatus);

export default router;
