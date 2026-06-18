import { Router } from 'express';
import * as cartController from '../controllers/cart.controller.js';

const router = Router();

/**
 * @typedef {object} AddToCartBody
 * @property {string} userId.required - User ID
 * @property {string} productId.required - Product ID
 * @property {number} quantity.required - Quantity to add
 * @property {string} selectedSize - Size variant (e.g. S, M, L)
 * @property {string} selectedColor - Color variant (e.g. black, white)
 */

/**
 * @typedef {object} RemoveFromCartBody
 * @property {string} productId.required - Product ID to remove
 * @property {string} selectedSize - Size variant to match
 * @property {string} selectedColor - Color variant to match
 */

/**
 * POST /api/cart
 * @summary Add an item to the cart
 * @tags Cart
 * @param {AddToCartBody} request.body.required - Cart item details
 * @return {object} 200 - Updated cart
 * @return {object} 400 - Missing required fields
 */
router.post('/', cartController.addToCart);

/**
 * GET /api/cart/{userId}
 * @summary Get the cart for a user
 * @tags Cart
 * @param {string} userId.path.required - User ID
 * @return {object} 200 - Cart contents
 */
router.get('/:userId', cartController.getCart);

/**
 * DELETE /api/cart/{userId}/item
 * @summary Remove an item from the cart
 * @tags Cart
 * @param {string} userId.path.required - User ID
 * @param {RemoveFromCartBody} request.body.required - Item to remove
 * @return {object} 200 - Updated cart
 * @return {object} 400 - productId is required
 */
router.delete('/:userId/item', cartController.removeFromCart);

/**
 * DELETE /api/cart/{userId}
 * @summary Clear all items from a user's cart
 * @tags Cart
 * @param {string} userId.path.required - User ID
 * @return {object} 200 - Cart cleared
 */
router.delete('/:userId', cartController.clearCart);

export default router;
