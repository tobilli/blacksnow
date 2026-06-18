import { Router } from 'express';
import * as orderController from '../controllers/order.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = Router();

/**
 * @typedef {object} CreateOrderBody
 * @property {string} email.required - Customer email
 * @property {string} address.required - Delivery address
 * @property {string} phone.required - Contact phone
 * @property {array<object>} items.required - Ordered items
 * @property {number} amount.required - Total amount
 */

/**
 * @typedef {object} UpdateOrderStatusBody
 * @property {string} status.required - New status value (e.g. pending, shipped, delivered)
 */

/**
 * POST /api/orders
 * @summary Create a new order
 * @tags Orders
 * @param {CreateOrderBody} request.body.required - Order details
 * @return {object} 201 - Created order
 * @return {object} 400 - Validation error
 */
router.post('/', orderController.createOrder);

/**
 * GET /api/orders
 * @summary List all orders (admin)
 * @tags Orders
 * @security BearerAuth
 * @return {object} 200 - Array of orders
 * @return {object} 401 - Unauthorized
 */
router.get('/', authenticate, orderController.getOrders);

/**
 * GET /api/orders/{id}
 * @summary Get a single order by ID (admin)
 * @tags Orders
 * @security BearerAuth
 * @param {string} id.path.required - Order ID
 * @return {object} 200 - Order details
 * @return {object} 401 - Unauthorized
 * @return {object} 404 - Order not found
 */
router.get('/:id', authenticate, orderController.getOrder);

/**
 * PATCH /api/orders/{id}/status
 * @summary Update order status (admin)
 * @tags Orders
 * @security BearerAuth
 * @param {string} id.path.required - Order ID
 * @param {UpdateOrderStatusBody} request.body.required - New status
 * @return {object} 200 - Updated order
 * @return {object} 401 - Unauthorized
 * @return {object} 404 - Order not found
 */
router.patch('/:id/status', authenticate, orderController.updateOrderStatus);

export default router;
