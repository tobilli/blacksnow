import { Router } from 'express';
import * as checkoutController from '../controllers/checkout.controller.js';

const router = Router();

/**
 * @typedef {object} CheckoutBody
 * @property {string} email.required - Customer email
 * @property {string} address.required - Delivery address
 * @property {string} phone.required - Contact phone number
 * @property {array<object>} items.required - Cart items to order
 * @property {number} amount.required - Total order amount
 */

/**
 * POST /api/checkout
 * @summary Place an order (checkout)
 * @tags Checkout
 * @param {CheckoutBody} request.body.required - Checkout details
 * @return {object} 201 - Order created
 * @return {object} 400 - Missing required fields
 */
router.post('/', checkoutController.checkout);

/**
 * GET /api/checkout/orders
 * @summary Get all checkout orders
 * @tags Checkout
 * @return {object} 200 - List of orders
 */
router.get('/orders', checkoutController.getOrders);

/**
 * GET /api/checkout/orders/{id}
 * @summary Get a single checkout order by ID
 * @tags Checkout
 * @param {string} id.path.required - Order ID
 * @return {object} 200 - Order details
 * @return {object} 404 - Order not found
 */
router.get('/orders/:id', checkoutController.getOrderById);

export default router;
