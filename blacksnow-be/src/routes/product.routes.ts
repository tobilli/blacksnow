import { Router } from 'express';
import * as productController from '../controllers/product.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { upload } from '../middleware/upload.middleware.js';

const router = Router();

/**
 * @typedef {object} ColorInput
 * @property {string} name.required - Color name (e.g. Black)
 * @property {string} hexCode.required - Hex code (e.g. #000000)
 */

/**
 * @typedef {object} CreateProductBody
 * @property {string} name.required - Product name
 * @property {string} description.required - Product description
 * @property {string} category.required - Product category
 * @property {string} collection.required - Product collection
 * @property {string} brand - Brand name
 * @property {number} price.required - Price (>= 0)
 * @property {string} currency - Currency code, defaults to GBP
 * @property {string} discountType - percentage or fixed
 * @property {number} discountValue - Discount amount
 * @property {number} stockQuantity.required - Stock quantity (>= 0)
 * @property {boolean} isNew - Mark as new arrival
 * @property {boolean} isFeatured - Mark as featured
 * @property {array<string>} tags - Tags list
 * @property {array<string>} sizes - Available sizes
 * @property {array<ColorInput>} colors - Available colors
 */

/**
 * @typedef {object} UpdateProductBody
 * @property {string} name - Product name
 * @property {string} description - Product description
 * @property {string} category - Product category
 * @property {string} collection - Product collection
 * @property {string} brand - Brand name
 * @property {number} price - Price (>= 0)
 * @property {string} currency - Currency code
 * @property {string} discountType - percentage or fixed
 * @property {number} discountValue - Discount amount
 * @property {number} stockQuantity - Stock quantity (>= 0)
 * @property {boolean} isNew - Mark as new arrival
 * @property {boolean} isFeatured - Mark as featured
 * @property {array<string>} tags - Tags list
 * @property {array<string>} sizes - Available sizes
 * @property {array<ColorInput>} colors - Available colors
 */

/**
 * GET /api/products
 * @summary List all products
 * @tags Products
 * @return {object} 200 - Array of products
 */
router.get('/', productController.getProducts);

/**
 * GET /api/products/{id}
 * @summary Get a single product by ID
 * @tags Products
 * @param {string} id.path.required - Product ID
 * @return {object} 200 - Product details
 * @return {object} 404 - Product not found
 */
router.get('/:id', productController.getProduct);

/**
 * POST /api/products
 * @summary Create a new product (admin) — multipart/form-data
 * @tags Products
 * @security BearerAuth
 * @param {CreateProductBody} request.body.required - Product fields (send as form-data; attach images separately)
 * @return {object} 201 - Created product
 * @return {object} 401 - Unauthorized
 */
router.post('/', authenticate, upload.array('images', 10), productController.createProduct);

/**
 * PATCH /api/products/{id}
 * @summary Update a product (admin) — multipart/form-data
 * @tags Products
 * @security BearerAuth
 * @param {string} id.path.required - Product ID
 * @param {UpdateProductBody} request.body - Fields to update (send as form-data; attach images separately)
 * @return {object} 200 - Updated product
 * @return {object} 401 - Unauthorized
 * @return {object} 404 - Product not found
 */
router.patch('/:id', authenticate, upload.array('images', 10), productController.updateProduct);

/**
 * DELETE /api/products/{id}
 * @summary Delete a product (admin)
 * @tags Products
 * @security BearerAuth
 * @param {string} id.path.required - Product ID
 * @return {object} 200 - Product deleted
 * @return {object} 401 - Unauthorized
 * @return {object} 404 - Product not found
 */
router.delete('/:id', authenticate, productController.deleteProduct);

/**
 * DELETE /api/products/{id}/images/{imageId}
 * @summary Delete a specific product image (admin)
 * @tags Products
 * @security BearerAuth
 * @param {string} id.path.required - Product ID
 * @param {string} imageId.path.required - Image ID
 * @return {object} 200 - Image deleted
 * @return {object} 401 - Unauthorized
 * @return {object} 404 - Image not found
 */
router.delete('/:id/images/:imageId', authenticate, productController.deleteProductImage);

export default router;
