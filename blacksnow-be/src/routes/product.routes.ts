import { Router } from 'express';
import * as productController from '../controllers/product.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { upload } from '../middleware/upload.middleware.js';

const router = Router();

// ── Public ──
router.get('/', productController.getProducts);
router.get('/:id', productController.getProduct);

// ── Protected (admin) ──
router.post('/', authenticate, upload.array('images', 10), productController.createProduct);
router.patch('/:id', authenticate, upload.array('images', 10), productController.updateProduct);
router.delete('/:id', authenticate, productController.deleteProduct);
router.delete('/:id/images/:imageId', authenticate, productController.deleteProductImage);

export default router;
