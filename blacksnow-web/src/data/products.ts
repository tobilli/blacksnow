import { Product } from '../types/product';

export const PRODUCTS: Product[] = [
  {
    id: 'prod_87439A',
    slug: 'minimus-cap-black',
    name: 'MINIMUS CAP',
    description:
      'Premium minimalist cap with adjustable strap. Crafted from heavyweight cotton twill with a structured 6-panel crown. Features a black underbrim and adjustable brass buckle strap. Built for those who move with intention.',
    category: 'caps',
    collection: 'NOIR — SERIES 01',
    brand: 'BLACKSNOW',
    price: 299.99,
    currency: 'GBP',
    discount: {
      type: 'percentage',
      value: 10,
    },
    finalPrice: 269.99,
    stockStatus: 'in_stock',
    stockQuantity: 32,
    isNew: true,
    isFeatured: false,
    tags: ['minimal', 'streetwear', 'cap'],
    variants: {
      sizes: ['S', 'M', 'L'],
      colors: [
        { name: 'Black', hexCode: '#000000' },
        { name: 'White', hexCode: '#FFFFFF' },
      ],
    },
    images: [
      { id: 'img_01', url: '/images/minimus-cap.jpg', alt: 'Front view of MINIMUS CAP' },
      { id: 'img_02', url: '/images/minimus-cap.jpg', alt: 'Side view of MINIMUS CAP' },
    ],
    rating: 4.7,
    reviewCount: 128,
  },
];
