export interface AddToCartBody {
  userId: string;
  productId: string;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export interface RemoveFromCartBody {
  productId: string;
  selectedSize?: string;
  selectedColor?: string;
}

export interface CartItemRecord {
  productId: string;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export interface CartResponse {
  status: string;
  data: CartItemRecord[];
}

export interface ClearCartResponse {
  status: string;
  message: string;
}
