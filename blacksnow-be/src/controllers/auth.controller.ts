import { Request, Response } from 'express';
import * as authService from '../services/auth.service.js';
import { registerSchema, loginSchema, refreshSchema } from '../validations/auth.validation.js';
import { ok, created, badRequest, unauthorized, serverError } from '../utils/response.js';

export const register = async (req: Request, res: Response) => {
  try {
    const parsed = registerSchema.safeParse(req.body);
    if (!parsed.success) {
      return badRequest(res, parsed.error.issues.map(i => i.message));
    }

    const { email, password, setupSecret } = parsed.data;
    if (setupSecret !== process.env.ADMIN_SETUP_SECRET) {
      return unauthorized(res, 'Invalid setup secret');
    }

    const user = await authService.register(email, password);
    return created(res, user);
  } catch (err: any) {
    if (err.code === 'DUPLICATE') return badRequest(res, err.message);
    return serverError(res, err);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
      return badRequest(res, parsed.error.issues.map(i => i.message));
    }

    const result = await authService.login(parsed.data.email, parsed.data.password);
    return ok(res, result);
  } catch (err: any) {
    if (err.code === 'INVALID_CREDS') return unauthorized(res, err.message);
    return serverError(res, err);
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const parsed = refreshSchema.safeParse(req.body);
    if (!parsed.success) return badRequest(res, 'refreshToken is required');

    const result = await authService.refresh(parsed.data.refreshToken);
    return ok(res, result);
  } catch (err: any) {
    if (err.code === 'INVALID_TOKEN') return unauthorized(res, err.message);
    return serverError(res, err);
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    const parsed = refreshSchema.safeParse(req.body);
    if (!parsed.success) return badRequest(res, 'refreshToken is required');

    await authService.logout(parsed.data.refreshToken);
    return ok(res, { message: 'Logged out' });
  } catch (err) {
    return serverError(res, err);
  }
};
