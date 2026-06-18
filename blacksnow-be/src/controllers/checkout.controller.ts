import { Request, Response } from 'express';
import checkoutService from '../services/checkout.service';

export const checkout = (req: Request, res: Response) => {
  try {
    const { email, address, phone, items, amount } = req.body;

    if (!email || !address || !phone || !items || !amount) {
      return res.status(400).json({
        status: 'error',
        message: 'email, address, phone, items, and amount are required',
      });
    }

    const order = checkoutService.createOrder({
      email,
      address,
      phone,
      items,
      amount,
    });

    res.status(201).json({ status: 'success', data: order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};

export const getOrders = (req: Request, res: Response) => {
  try {
    const orders = checkoutService.getOrders();
    res.json({ status: 'success', data: orders });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};

export const getOrderById = (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const order = checkoutService.getOrderById(id);

    if (!order) {
      return res.status(404).json({ status: 'error', message: 'Order not found' });
    }

    res.json({ status: 'success', data: order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};

export default { checkout, getOrders, getOrderById };