import { Request, Response } from 'express';
import * as orderService from '../services/order.service.js';
import { createOrderSchema, updateOrderStatusSchema } from '../validations/order.validation.js';
import { ok, created, notFound, badRequest, paginated, serverError } from '../utils/response.js';

export const createOrder = async (req: Request, res: Response) => {
  try {
    const parsed = createOrderSchema.safeParse(req.body);
    if (!parsed.success) return badRequest(res, parsed.error.issues.map(i => i.message));

    const order = await orderService.createOrder(parsed.data);
    return created(res, order);
  } catch (err) {
    return serverError(res, err);
  }
};

export const getOrders = async (req: Request, res: Response) => {
  try {
    const page = Math.max(1, parseInt(String(req.query.page ?? '1'), 10) || 1);
    const perPage = Math.min(50, parseInt(String(req.query.perPage ?? '20'), 10) || 20);
    const status = req.query.status as string | undefined;

    const result = await orderService.getOrders(page, perPage, status);
    return paginated(res, result.data, result.metadata);
  } catch (err) {
    return serverError(res, err);
  }
};

export const getOrder = async (req: Request, res: Response) => {
  try {
    const order = await orderService.getOrderById(req.params.id);
    if (!order) return notFound(res, 'Order not found');
    return ok(res, order);
  } catch (err) {
    return serverError(res, err);
  }
};

export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const parsed = updateOrderStatusSchema.safeParse(req.body);
    if (!parsed.success) return badRequest(res, parsed.error.issues.map(i => i.message));

    const order = await orderService.updateOrderStatus(req.params.id, parsed.data.status);
    if (!order) return notFound(res, 'Order not found');
    return ok(res, order);
  } catch (err) {
    return serverError(res, err);
  }
};
