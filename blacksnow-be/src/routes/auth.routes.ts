import { Router } from 'express';
import * as authController from '../controllers/auth.controller.js';

const router = Router();

// POST /api/auth/register  — requires ADMIN_SETUP_SECRET in body
router.post('/register', authController.register);

// POST /api/auth/login
router.post('/login', authController.login);

// POST /api/auth/refresh
router.post('/refresh', authController.refreshToken);

// POST /api/auth/logout
router.post('/logout', authController.logout);

export default router;
