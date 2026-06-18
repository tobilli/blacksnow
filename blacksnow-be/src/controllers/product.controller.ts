import { Request, Response } from 'express';
import * as productService from '../services/product.service.js';
import { createProductSchema, updateProductSchema } from '../validations/product.validation.js';
import { ok, created, notFound, badRequest, paginated, serverError } from '../utils/response.js';

export const getProducts = async (req: Request, res: Response) => {
  try {
    const result = await productService.getProducts(req.query as any);
    return paginated(res, result.data, result.metadata);
  } catch (err) {
    return serverError(res, err);
  }
};

export const getProduct = async (req: Request, res: Response) => {
  try {
    const product = await productService.getProductById(req.params.id);
    if (!product) return notFound(res, 'Product not found');
    return ok(res, product);
  } catch (err) {
    return serverError(res, err);
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const parsed = createProductSchema.safeParse(req.body);
    if (!parsed.success) return badRequest(res, parsed.error.issues.map(i => i.message));

    const files = (req.files as Express.Multer.File[]) ?? [];
    const product = await productService.createProduct(parsed.data, files);
    return created(res, product);
  } catch (err) {
    return serverError(res, err);
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const parsed = updateProductSchema.safeParse(req.body);
    if (!parsed.success) return badRequest(res, parsed.error.issues.map(i => i.message));

    const files = (req.files as Express.Multer.File[]) ?? [];
    const product = await productService.updateProduct(req.params.id, parsed.data, files);
    if (!product) return notFound(res, 'Product not found');
    return ok(res, product);
  } catch (err) {
    return serverError(res, err);
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const product = await productService.deleteProduct(req.params.id);
    if (!product) return notFound(res, 'Product not found');
    return ok(res, { message: 'Product deleted', id: product.id });
  } catch (err) {
    return serverError(res, err);
  }
};

export const deleteProductImage = async (req: Request, res: Response) => {
  try {
    const { id, imageId } = req.params;
    const product = await productService.deleteProductImage(id, imageId);
    if (!product) return notFound(res, 'Product or image not found');
    return ok(res, product);
  } catch (err) {
    return serverError(res, err);
  }
};
