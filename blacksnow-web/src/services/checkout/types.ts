export interface CheckoutItem {
  productId: string;
  quantity: number;
  amount: number;
}

export interface CheckoutBody {
  email: string;
  address: string;
  phone: string;
  items: CheckoutItem[];
  amount: number;
}

export interface CheckoutOrder {
  id: string;
  email: string;
  address: string;
  phone: string;
  items: CheckoutItem[];
  totalAmount: number;
  status: string;
  createdAt: string;
}

export interface CheckoutResponse {
  status: string;
  data: CheckoutOrder;
}

export interface CheckoutOrderListResponse {
  status: string;
  data: CheckoutOrder[];
}
