import prisma from '../lib/prisma.js';
import { CreateOrderInput } from '../validations/order.validation.js';

export const createOrder = async (input: CreateOrderInput) => {
  const totalAmount = input.items.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0
  );

  return prisma.order.create({
    data: {
      email: input.email,
      firstName: input.firstName,
      lastName: input.lastName,
      address: input.address,
      address2: input.address2,
      city: input.city,
      postcode: input.postcode,
      country: input.country ?? 'United Kingdom',
      phone: input.phone,
      currency: input.currency ?? 'GBP',
      paymentMethod: input.paymentMethod,
      totalAmount: +totalAmount.toFixed(2),
      items: {
        create: input.items.map(item => ({
          productId: item.productId,
          productName: item.productName,
          selectedSize: item.selectedSize,
          selectedColor: item.selectedColor,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          totalPrice: +(item.unitPrice * item.quantity).toFixed(2),
        })),
      },
    },
    include: { items: true },
  });
};

export const getOrders = async (page = 1, perPage = 20, status?: string) => {
  const skip = (page - 1) * perPage;
  const where = status ? { status: status as any } : {};

  const [totalCount, data] = await Promise.all([
    prisma.order.count({ where }),
    prisma.order.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip,
      take: perPage,
      include: { items: true },
    }),
  ]);

  const totalPages = Math.max(1, Math.ceil(totalCount / perPage));
  return {
    metadata: { totalCount, currentPage: page, perPage, totalPages, hasNextPage: page < totalPages, hasPreviousPage: page > 1 },
    data,
  };
};

export const getOrderById = async (id: string) =>
  prisma.order.findUnique({ where: { id }, include: { items: { include: { product: true } } } });

export const updateOrderStatus = async (id: string, status: string) => {
  const order = await prisma.order.findUnique({ where: { id } });
  if (!order) return null;
  return prisma.order.update({ where: { id }, data: { status: status as any } });
};
