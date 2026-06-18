import { z } from 'zod';

const colorSchema = z.object({
  name: z.string().min(1),
  hexCode: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Invalid hex color'),
});

export const createProductSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  category: z.string().min(1, 'Category is required'),
  collection: z.string().min(1, 'Collection is required'),
  brand: z.string().optional(),
  price: z.coerce.number().nonnegative('Price must be >= 0'),
  currency: z.string().optional().default('GBP'),
  discountType: z.enum(['percentage', 'fixed']).optional(),
  discountValue: z.coerce.number().nonnegative().optional(),
  stockQuantity: z.coerce.number().int().nonnegative('Stock quantity must be >= 0'),
  isNew: z.coerce.boolean().optional().default(false),
  isFeatured: z.coerce.boolean().optional().default(false),
  tags: z.preprocess(
    v => (typeof v === 'string' ? JSON.parse(v) : v),
    z.array(z.string())
  ).optional().default([]),
  sizes: z.preprocess(
    v => (typeof v === 'string' ? JSON.parse(v) : v),
    z.array(z.string())
  ).optional().default([]),
  colors: z.preprocess(
    v => (typeof v === 'string' ? JSON.parse(v) : v),
    z.array(colorSchema)
  ).optional().default([]),
});

export const updateProductSchema = createProductSchema.partial();

export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
