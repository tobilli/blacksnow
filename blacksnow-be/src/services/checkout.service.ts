// Simple in-memory checkout/order storage
interface Order {
  id: string;
  email: string;
  address: string;
  phone: string;
  items: Array<{
    productId: string;
    quantity: number;
    amount: number;
  }>;
  totalAmount: number;
  status: string;
  createdAt: string;
}

const orders: Order[] = [];

export const createOrder = (orderData: any) => {
  const newOrder: Order = {
    id: `order_${Date.now()}`,
    email: orderData.email,
    address: orderData.address,
    phone: orderData.phone,
    items: orderData.items || [],
    totalAmount: orderData.amount || 0,
    status: 'pending',
    createdAt: new Date().toISOString(),
  };

  orders.push(newOrder);
  return newOrder;
};

export const getOrders = () => {
  return orders;
};

export const getOrderById = (id: string) => {
  return orders.find((order) => order.id === id);
};

export default { createOrder, getOrders, getOrderById };