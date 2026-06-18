import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './CartModal.scss';

const sym = (currency: string) => {
  const map: Record<string, string> = { GBP: '£', USD: '$', EUR: '€' };
  return map[currency] ?? currency;
};

const CartModal = () => {
  const { items, removeFromCart, updateQuantity, totalItems, totalPrice, isCartOpen, closeCart } =
    useCart();
  const navigate = useNavigate();
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  if (!isCartOpen) return null;

  const currency = items[0]?.product.currency ?? 'GBP';

  const handleCheckout = () => {
    if (!agreedToTerms) return;
    closeCart();
    navigate('/checkout');
  };

  return (
    <>
      <div className="cart-overlay" onClick={closeCart} />

      <div className="cart-modal">
        <div className="cart-header">
          <h2 className="cart-title">CART</h2>
          <span className="cart-count">{totalItems} {totalItems === 1 ? 'ITEM' : 'ITEMS'}</span>
          <button className="cart-close" onClick={closeCart} aria-label="Close cart">✕</button>
        </div>

        <div className="cart-body">
          {items.length === 0 ? (
            <div className="cart-empty">
              <p>Your cart is empty</p>
            </div>
          ) : (
            items.map((item, idx) => (
              <div
                key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}-${idx}`}
                className="cart-item"
              >
                <div className="cart-item-img">
                  <img src={item.product.images[0]?.url} alt={item.product.name} />
                </div>

                <div className="cart-item-info">
                  <p className="cart-item-name">{item.product.name}</p>
                  <p className="cart-item-variant">
                    {item.selectedColor} / {item.selectedSize}
                  </p>
                  <p className="cart-item-price">
                    {sym(item.product.currency)}{item.product.finalPrice.toFixed(2)}
                  </p>
                </div>

                <div className="cart-item-controls">
                  <div className="cart-qty">
                    <button
                      className="cart-qty-btn"
                      onClick={() =>
                        updateQuantity(
                          item.product.id,
                          item.selectedSize,
                          item.selectedColor,
                          item.quantity - 1
                        )
                      }
                    >
                      −
                    </button>
                    <span className="cart-qty-val">{item.quantity}</span>
                    <button
                      className="cart-qty-btn"
                      onClick={() =>
                        updateQuantity(
                          item.product.id,
                          item.selectedSize,
                          item.selectedColor,
                          Math.min(item.product.stockQuantity, item.quantity + 1)
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="cart-remove"
                    onClick={() =>
                      removeFromCart(item.product.id, item.selectedSize, item.selectedColor)
                    }
                    aria-label="Remove item"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total-row">
              <span className="cart-total-label">TOTAL</span>
              <span className="cart-total-price">
                {sym(currency)}{totalPrice.toFixed(2)}
              </span>
            </div>

            <label className="cart-terms">
              <input
                type="checkbox"
                checked={agreedToTerms}
                onChange={e => setAgreedToTerms(e.target.checked)}
                className="cart-terms-check"
              />
              <span className="cart-terms-text">
                I agree to the <a href="#" onClick={e => e.preventDefault()}>terms and conditions</a>
              </span>
            </label>

            <button
              className={`cart-checkout-btn${!agreedToTerms ? ' disabled' : ''}`}
              onClick={handleCheckout}
              disabled={!agreedToTerms}
            >
              CHECKOUT →
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartModal;
