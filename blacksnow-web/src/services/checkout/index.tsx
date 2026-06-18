import { getRequest, postRequest } from '../request-config';
import { CheckoutBody, CheckoutOrderListResponse, CheckoutResponse } from './types';

const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:4000';

export const checkout = (body: CheckoutBody) =>
  postRequest<CheckoutResponse>(BASE_URL, '/api/checkout', body);

export const getCheckoutOrders = () =>
  getRequest<CheckoutOrderListResponse>(BASE_URL, '/api/checkout/orders');

export const getCheckoutOrder = (id: string) =>
  getRequest<CheckoutResponse>(BASE_URL, `/api/checkout/orders/${id}`);
