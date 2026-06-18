export interface OrderItem {
  productId: string;
  productName: string;
  selectedSize: string;
  selectedColor: string;
  quantity: number;
  unitPrice: number;
}

export interface CreateOrderBody {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  address2?: string;
  city: string;
  postcode: string;
  country?: string;
  phone: string;
  currency?: string;
  paymentMethod?: string;
  items: OrderItem[];
}

export type OrderStatus =
  | 'PENDING'
  | 'PROCESSING'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'CANCELLED'
  | 'REFUNDED';

export interface UpdateOrderStatusBody {
  status: OrderStatus;
}

export interface OrderRecord {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  address2?: string;
  city: string;
  postcode: string;
  country: string;
  phone: string;
  currency: string;
  paymentMethod?: string;
  totalAmount: number;
  status: OrderStatus;
  items: OrderItem[];
  createdAt: string;
  updatedAt: string;
}

export interface PaginationMeta {
  totalCount: number;
  currentPage: number;
  perPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface OrderListResponse {
  status: string;
  data: OrderRecord[];
  metadata: PaginationMeta;
}

export interface OrderResponse {
  status: string;
  data: OrderRecord;
}
