import { getRequest, patchRequest, postRequest } from '../request-config';
import {
  CreateOrderBody,
  OrderListResponse,
  OrderResponse,
  UpdateOrderStatusBody,
} from './types';

const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:4000';

export const createOrder = (body: CreateOrderBody) =>
  postRequest<OrderResponse>(BASE_URL, '/api/orders', body);

export const getOrders = (params?: { page?: number; perPage?: number; status?: string }) =>
  getRequest<OrderListResponse>(BASE_URL, '/api/orders', params as Record<string, unknown>);

export const getOrder = (id: string) =>
  getRequest<OrderResponse>(BASE_URL, `/api/orders/${id}`);

export const updateOrderStatus = (id: string, body: UpdateOrderStatusBody) =>
  patchRequest<OrderResponse>(BASE_URL, `/api/orders/${id}/status`, body);
