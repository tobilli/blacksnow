import { Router } from 'express';
import * as authController from '../controllers/auth.controller.js';

const router = Router();

/**
 * @typedef {object} RegisterBody
 * @property {string} name.required - User full name
 * @property {string} email.required - User email
 * @property {string} password.required - User password
 * @property {string} adminSetupSecret - Required to grant admin role
 */

/**
 * @typedef {object} LoginBody
 * @property {string} email.required - User email
 * @property {string} password.required - User password
 */

/**
 * @typedef {object} RefreshBody
 * @property {string} refreshToken.required - Refresh token
 */

/**
 * @typedef {object} LogoutBody
 * @property {string} refreshToken.required - Refresh token to revoke
 */

/**
 * POST /api/auth/register
 * @summary Register a new user
 * @tags Auth
 * @param {RegisterBody} request.body.required - Registration details
 * @return {object} 201 - Created user and token
 * @return {object} 400 - Validation error
 */
router.post('/register', authController.register);

/**
 * POST /api/auth/login
 * @summary Log in and receive a JWT
 * @tags Auth
 * @param {LoginBody} request.body.required - Login credentials
 * @return {object} 200 - Access token and refresh token
 * @return {object} 401 - Invalid credentials
 */
router.post('/login', authController.login);

/**
 * POST /api/auth/refresh
 * @summary Refresh access token
 * @tags Auth
 * @param {RefreshBody} request.body.required - Refresh token
 * @return {object} 200 - New access token
 * @return {object} 401 - Invalid or expired refresh token
 */
router.post('/refresh', authController.refreshToken);

/**
 * POST /api/auth/logout
 * @summary Invalidate refresh token
 * @tags Auth
 * @param {LogoutBody} request.body.required - Refresh token to revoke
 * @return {object} 200 - Logged out successfully
 */
router.post('/logout', authController.logout);

export default router;
