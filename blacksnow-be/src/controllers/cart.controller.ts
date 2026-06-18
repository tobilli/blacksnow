import { Request, Response } from 'express';
import cartService from '../services/cart.service';

export const addToCart = (req: Request, res: Response) => {
  try {
    const { userId, productId, quantity, selectedSize, selectedColor } = req.body;

    if (!userId || !productId || !quantity) {
      return res.status(400).json({ status: 'error', message: 'userId, productId, and quantity are required' });
    }

    const cart = cartService.addToCart(userId, productId, quantity, selectedSize, selectedColor);
    res.json({ status: 'success', data: cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};

export const getCart = (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const cart = cartService.getCart(userId);
    res.json({ status: 'success', data: cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};

export const removeFromCart = (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { productId, selectedSize, selectedColor } = req.body;

    if (!productId) {
      return res.status(400).json({ status: 'error', message: 'productId is required' });
    }

    const cart = cartService.removeFromCart(userId, productId, selectedSize, selectedColor);
    res.json({ status: 'success', data: cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};

export const clearCart = (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    cartService.clearCart(userId);
    res.json({ status: 'success', message: 'Cart cleared' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};

export default { addToCart, getCart, removeFromCart, clearCart };