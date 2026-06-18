// Simple in-memory cart service
interface CartItem {
  productId: string;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

interface Cart {
  [userId: string]: CartItem[];
}

const carts: Cart = {};

export const addToCart = (userId: string, productId: string, quantity: number, selectedSize?: string, selectedColor?: string) => {
  if (!carts[userId]) {
    carts[userId] = [];
  }

  const existingItem = carts[userId].find(
    (item) => item.productId === productId && item.selectedSize === selectedSize && item.selectedColor === selectedColor
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    carts[userId].push({ productId, quantity, selectedSize, selectedColor });
  }

  return carts[userId];
};

export const getCart = (userId: string) => {
  return carts[userId] || [];
};

export const removeFromCart = (userId: string, productId: string, selectedSize?: string, selectedColor?: string) => {
  if (!carts[userId]) return null;

  carts[userId] = carts[userId].filter(
    (item) => !(item.productId === productId && item.selectedSize === selectedSize && item.selectedColor === selectedColor)
  );

  return carts[userId];
};

export const clearCart = (userId: string) => {
  delete carts[userId];
  return [];
};

export default { addToCart, getCart, removeFromCart, clearCart };