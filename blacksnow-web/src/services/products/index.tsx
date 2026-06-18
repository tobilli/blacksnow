import { deleteRequest, getRequest, patchRequest, postRequest } from '../request-config';
import {
  CreateProductBody,
  DeleteImageResponse,
  ProductListResponse,
  ProductResponse,
  ProductsQuery,
  UpdateProductBody,
} from './types';

const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:4000';

export const getProducts = (query?: ProductsQuery) =>
  getRequest<ProductListResponse>(BASE_URL, '/api/products', query as Record<string, unknown>);

export const getProduct = (id: string) =>
  getRequest<ProductResponse>(BASE_URL, `/api/products/${id}`);

// export const createProduct = (body: CreateProductBody, images?: File[]) => {
//   const form = new FormData();
//   (Object.keys(body) as (keyof CreateProductBody)[]).forEach(key => {
//     const val = body[key];
//     if (val === undefined) return;
//     if (Array.isArray(val)) {
//       form.append(key, JSON.stringify(val));
//     } else {
//       form.append(key, String(val));
//     }
//   });
//   images?.forEach(file => form.append('images', file));
//   return postRequest<ProductResponse>(BASE_URL, '/api/products', form, {
//     headers: { 'Content-Type': 'multipart/form-data' },
//   });
// };

// export const updateProduct = (id: string, body: UpdateProductBody, images?: File[]) => {
//   const form = new FormData();
//   (Object.keys(body) as (keyof UpdateProductBody)[]).forEach(key => {
//     const val = body[key];
//     if (val === undefined) return;
//     if (Array.isArray(val)) {
//       form.append(key, JSON.stringify(val));
//     } else {
//       form.append(key, String(val));
//     }
//   });
//   images?.forEach(file => form.append('images', file));
//   return patchRequest<ProductResponse>(BASE_URL, `/api/products/${id}`, form, {
//     headers: { 'Content-Type': 'multipart/form-data' },
//   });
// };

// export const deleteProduct = (id: string) =>
//   deleteRequest<{ status: string; data: { message: string; id: string } }>(
//     BASE_URL,
//     `/api/products/${id}`,
//   );

// export const deleteProductImage = (id: string, imageId: string) =>
//   deleteRequest<DeleteImageResponse>(BASE_URL, `/api/products/${id}/images/${imageId}`);
