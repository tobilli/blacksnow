import { z } from 'zod';

const orderItemSchema = z.object({
  productId: z.string().uuid('Invalid product ID'),
  productName: z.string().min(1),
  selectedSize: z.string().min(1, 'Size is required'),
  selectedColor: z.string().min(1, 'Color is required'),
  quantity: z.number().int().positive('Quantity must be > 0'),
  unitPrice: z.number().nonnegative(),
});

export const createOrderSchema = z.object({
  email: z.string().email('Invalid email'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  address: z.string().min(1, 'Address is required'),
  address2: z.string().optional(),
  city: z.string().min(1, 'City is required'),
  postcode: z.string().min(1, 'Postcode is required'),
  country: z.string().optional().default('United Kingdom'),
  phone: z.string().min(1, 'Phone is required'),
  currency: z.string().optional().default('GBP'),
  paymentMethod: z.string().optional(),
  items: z.array(orderItemSchema).min(1, 'Order must have at least one item'),
});

export const updateOrderStatusSchema = z.object({
  status: z.enum(['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'REFUNDED']),
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;
