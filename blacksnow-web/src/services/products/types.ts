import { Product } from '../../types/product';

export type { Product };

export interface ProductColor {
  name: string;
  hexCode: string;
}

export interface CreateProductBody {
  name: string;
  description: string;
  category: string;
  collection: string;
  brand?: string;
  price: number;
  currency?: string;
  discountType?: 'percentage' | 'fixed';
  discountValue?: number;
  stockQuantity: number;
  isNew?: boolean;
  isFeatured?: boolean;
  tags?: string[];
  sizes?: string[];
  colors?: ProductColor[];
}

export type UpdateProductBody = Partial<CreateProductBody>;

export interface ProductsQuery {
  page?: number;
  perPage?: number;
  category?: string;
  collection?: string;
  search?: string;
  sort?: string;
}

export interface PaginationMeta {
  totalCount: number;
  currentPage: number;
  perPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface ProductListResponse {
  status: string;
  data: Product[];
  metadata: PaginationMeta;
}

export interface ProductResponse {
  status: string;
  data: Product;
}

export interface DeleteImageResponse {
  status: string;
  data: Product;
}
