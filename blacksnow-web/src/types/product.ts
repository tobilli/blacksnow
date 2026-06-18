export interface ProductColor {
  name: string;
  hexCode: string;
}

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: string;
  collection: string;
  brand: string;
  price: number;
  currency: string;
  discount?: {
    type: string;
    value: number;
  };
  finalPrice: number;
  stockStatus: string;
  stockQuantity: number;
  isNew: boolean;
  isFeatured: boolean;
  tags: string[];
  variants: {
    sizes: string[];
    colors: ProductColor[];
  };
  images: ProductImage[];
  rating: number;
  reviewCount: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}
