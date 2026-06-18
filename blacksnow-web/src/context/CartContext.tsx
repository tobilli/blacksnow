import { createContext, useContext, useState, ReactNode } from 'react';
import { CartItem, Product } from '../types/product';

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, size: string, color: string, qty: number) => void;
  removeFromCart: (productId: string, size: string, color: string) => void;
  updateQuantity: (productId: string, size: string, color: string, qty: number) => void;
  totalItems: number;
  totalPrice: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}

const CART_KEY = 'blacksnow_cart';

const loadCart = (): CartItem[] => {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
};

const persistCart = (items: CartItem[]) => {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
};

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(loadCart);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const setAndPersist = (updater: (prev: CartItem[]) => CartItem[]) => {
    setItems(prev => {
      const next = updater(prev);
      persistCart(next);
      return next;
    });
  };

  const addToCart = (product: Product, size: string, color: string, qty: number) => {
    setAndPersist(prev => {
      const existing = prev.find(
        i => i.product.id === product.id && i.selectedSize === size && i.selectedColor === color
      );
      if (existing) {
        return prev.map(i =>
          i.product.id === product.id && i.selectedSize === size && i.selectedColor === color
            ? { ...i, quantity: Math.min(i.quantity + qty, product.stockQuantity) }
            : i
        );
      }
      return [...prev, { product, quantity: qty, selectedSize: size, selectedColor: color }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string, size: string, color: string) => {
    setAndPersist(prev =>
      prev.filter(
        i => !(i.product.id === productId && i.selectedSize === size && i.selectedColor === color)
      )
    );
  };

  const updateQuantity = (productId: string, size: string, color: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(productId, size, color);
      return;
    }
    setAndPersist(prev =>
      prev.map(i =>
        i.product.id === productId && i.selectedSize === size && i.selectedColor === color
          ? { ...i, quantity: qty }
          : i
      )
    );
  };

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.product.finalPrice * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        totalItems,
        totalPrice,
        isCartOpen,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};
