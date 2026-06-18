import { deleteRequest, getRequest, postRequest } from '../request-config';
import {
  AddToCartBody,
  CartResponse,
  ClearCartResponse,
  RemoveFromCartBody,
} from './types';

const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:4000';

export const addToCart = (body: AddToCartBody) =>
  postRequest<CartResponse>(BASE_URL, '/api/cart', body);

export const getCart = (userId: string) =>
  getRequest<CartResponse>(BASE_URL, `/api/cart/${userId}`);

export const removeFromCart = (userId: string, body: RemoveFromCartBody) =>
  deleteRequest<CartResponse>(BASE_URL, `/api/cart/${userId}/item`, { data: body });

export const clearCart = (userId: string) =>
  deleteRequest<ClearCartResponse>(BASE_URL, `/api/cart/${userId}`);
