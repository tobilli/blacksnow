import prisma from '../lib/prisma.js';
import { uploadBuffer, deleteImage } from '../utils/cloudinary.js';
import { CreateProductInput, UpdateProductInput } from '../validations/product.validation.js';

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  publicId: string;
}

interface ProductQuery {
  category?: string;
  collection?: string;
  color?: string;
  size?: string;
  isNew?: string;
  sort?: string;
  search?: string;
  page?: string;
  perPage?: string;
}

const slugify = (name: string) =>
  name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const computeFinalPrice = (
  price: number,
  discountType?: string | null,
  discountValue?: number | null
): number => {
  if (!discountType || discountValue == null) return price;
  if (discountType === 'percentage') return +(price * (1 - discountValue / 100)).toFixed(2);
  if (discountType === 'fixed') return +Math.max(0, price - discountValue).toFixed(2);
  return price;
};

const uniqueSlug = async (base: string): Promise<string> => {
  let slug = base;
  let suffix = 1;
  while (await prisma.product.findUnique({ where: { slug } })) {
    slug = `${base}-${suffix++}`;
  }
  return slug;
};

export const getProducts = async (query: ProductQuery) => {
  const page = Math.max(1, parseInt(query.page ?? '1', 10) || 1);
  const perPage = Math.min(50, Math.max(1, parseInt(query.perPage ?? '20', 10) || 20));
  const skip = (page - 1) * perPage;

  const where: Record<string, unknown> = {};
  if (query.category) where.category = { equals: query.category, mode: 'insensitive' };
  if (query.collection) where.collection = { contains: query.collection, mode: 'insensitive' };
  if (query.isNew === 'true') where.isNew = true;
  if (query.size) where.sizes = { has: query.size };
  if (query.search) {
    where.OR = [
      { name: { contains: query.search, mode: 'insensitive' } },
      { description: { contains: query.search, mode: 'insensitive' } },
      { tags: { has: query.search } },
    ];
  }

  let orderBy: Record<string, string> = { createdAt: 'desc' };
  if (query.sort === 'price_asc') orderBy = { finalPrice: 'asc' };
  else if (query.sort === 'price_desc') orderBy = { finalPrice: 'desc' };

  const [totalCount, data] = await Promise.all([
    prisma.product.count({ where: where as any }),
    prisma.product.findMany({ where: where as any, orderBy: orderBy as any, skip, take: perPage }),
  ]);

  const totalPages = Math.max(1, Math.ceil(totalCount / perPage));

  return {
    metadata: { totalCount, currentPage: page, perPage, totalPages, hasNextPage: page < totalPages, hasPreviousPage: page > 1 },
    data,
  };
};

export const getProductById = async (id: string) =>
  prisma.product.findFirst({ where: { OR: [{ id }, { slug: id }] } });

export const createProduct = async (input: CreateProductInput, files: Express.Multer.File[]) => {
  const imageUploads = await Promise.all(
    files.map(async (file, idx) => {
      const result = await uploadBuffer(file.buffer);
      return {
        id: `img_${result.public_id.split('/').pop()}`,
        url: result.secure_url,
        alt: `${input.name} image ${idx + 1}`,
        publicId: result.public_id,
      } satisfies ProductImage;
    })
  );

  const finalPrice = computeFinalPrice(input.price, input.discountType, input.discountValue);
  const slug = await uniqueSlug(slugify(input.name));

  return prisma.product.create({
    data: {
      slug,
      name: input.name,
      description: input.description,
      category: input.category,
      collection: input.collection,
      brand: input.brand ?? 'BLACKSNOW',
      price: input.price,
      currency: input.currency ?? 'GBP',
      discountType: input.discountType,
      discountValue: input.discountValue,
      finalPrice,
      stockQuantity: input.stockQuantity,
      stockStatus: input.stockQuantity > 0 ? 'in_stock' : 'out_of_stock',
      isNew: input.isNew ?? false,
      isFeatured: input.isFeatured ?? false,
      tags: input.tags ?? [],
      sizes: input.sizes ?? [],
      colors: (input.colors ?? []) as any,
      images: imageUploads as any,
    },
  });
};

export const updateProduct = async (id: string, input: UpdateProductInput, files?: Express.Multer.File[]) => {
  const existing = await prisma.product.findUnique({ where: { id } });
  if (!existing) return null;

  const existingImages = (existing.images ?? []) as unknown as ProductImage[];
  let images: ProductImage[] = existingImages;

  if (files && files.length > 0) {
    const newImages = await Promise.all(
      files.map(async (file, idx) => {
        const result = await uploadBuffer(file.buffer);
        return {
          id: `img_${result.public_id.split('/').pop()}`,
          url: result.secure_url,
          alt: `${input.name ?? existing.name} image ${idx + 1}`,
          publicId: result.public_id,
        } satisfies ProductImage;
      })
    );
    images = [...existingImages, ...newImages];
  }

  const price = input.price ?? existing.price;
  const discountType = input.discountType ?? existing.discountType;
  const discountValue = input.discountValue ?? existing.discountValue;
  const finalPrice = computeFinalPrice(price, discountType, discountValue);
  const stockQuantity = input.stockQuantity ?? existing.stockQuantity;

  return prisma.product.update({
    where: { id },
    data: {
      ...(input.name !== undefined && { name: input.name }),
      ...(input.description !== undefined && { description: input.description }),
      ...(input.category !== undefined && { category: input.category }),
      ...(input.collection !== undefined && { collection: input.collection }),
      ...(input.brand !== undefined && { brand: input.brand }),
      ...(input.currency !== undefined && { currency: input.currency }),
      ...(input.discountType !== undefined && { discountType: input.discountType }),
      ...(input.discountValue !== undefined && { discountValue: input.discountValue }),
      ...(input.isNew !== undefined && { isNew: input.isNew }),
      ...(input.isFeatured !== undefined && { isFeatured: input.isFeatured }),
      ...(input.tags !== undefined && { tags: input.tags }),
      ...(input.sizes !== undefined && { sizes: input.sizes }),
      ...(input.colors !== undefined && { colors: input.colors as any }),
      price,
      finalPrice,
      stockQuantity,
      stockStatus: stockQuantity > 0 ? 'in_stock' : 'out_of_stock',
      images: images as any,
    },
  });
};

export const deleteProduct = async (id: string) => {
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) return null;

  const images = (product.images ?? []) as unknown as ProductImage[];
  await Promise.allSettled(images.map(img => deleteImage(img.publicId)));

  return prisma.product.delete({ where: { id } });
};

export const deleteProductImage = async (productId: string, imageId: string) => {
  const product = await prisma.product.findUnique({ where: { id: productId } });
  if (!product) return null;

  const images = (product.images ?? []) as unknown as ProductImage[];
  const target = images.find(img => img.id === imageId);
  if (!target) return null;

  await deleteImage(target.publicId);
  const remaining = images.filter(img => img.id !== imageId);

  return prisma.product.update({ where: { id: productId }, data: { images: remaining as any } });
};
