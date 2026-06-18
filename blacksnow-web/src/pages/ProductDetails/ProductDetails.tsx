import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import Footer from '../../components/Footer/Footer';
import { useCart } from '../../context/CartContext';
import { PRODUCTS } from '../../data/products';
import './ProductDetails.scss';

const currencySymbol = (currency: string) => {
  const map: Record<string, string> = { GBP: '£', USD: '$', EUR: '€' };
  return map[currency] ?? currency;
};

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const product = PRODUCTS.find(p => p.id === id || p.slug === id);

  const [activeImage, setActiveImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product?.variants.colors[0]?.name ?? '');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [sizeError, setSizeError] = useState(false);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <main className="pd-page">
        <NavBar />
        <div className="pd-not-found">
          <p>PRODUCT NOT FOUND</p>
          <button onClick={() => navigate('/shop')}>← BACK TO SHOP</button>
        </div>
        <Footer />
      </main>
    );
  }

  const sym = currencySymbol(product.currency);

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }
    setSizeError(false);
    addToCart(product, selectedSize, selectedColor, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <main className="pd-page">
      <NavBar />
      <div className="pd-container">
        <div className="pd-breadcrumb" onClick={() => navigate('/shop')}>
          ← BLACKSNOW / SHOP / {product.name}
        </div>

        <div className="pd-layout">
          {/* ── Images ── */}
          <div className="pd-images">
            <div className="pd-main-image">
              <img
                src={product.images[activeImage]?.url}
                alt={product.images[activeImage]?.alt}
              />
              {product.isNew && <span className="pd-badge">NEW</span>}
            </div>
            {product.images.length > 1 && (
              <div className="pd-thumbnails">
                {product.images.map((img, i) => (
                  <button
                    key={img.id}
                    className={`pd-thumb${i === activeImage ? ' active' : ''}`}
                    onClick={() => setActiveImage(i)}
                  >
                    <img src={img.url} alt={img.alt} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Info ── */}
          <div className="pd-info">
            <p className="pd-collection">{product.collection}</p>
            <h1 className="pd-name">{product.name}</h1>

            <div className="pd-pricing">
              <span className="pd-price">
                {sym}{product.finalPrice.toFixed(2)}
              </span>
              {product.discount && (
                <>
                  <span className="pd-original">{sym}{product.price.toFixed(2)}</span>
                  <span className="pd-discount-tag">−{product.discount.value}%</span>
                </>
              )}
            </div>

            <div className="pd-rating">
              <span className="pd-stars">
                {'★'.repeat(Math.round(product.rating))}
                {'☆'.repeat(5 - Math.round(product.rating))}
              </span>
              <span className="pd-review-count">{product.reviewCount} reviews</span>
            </div>

            <p className="pd-description">{product.description}</p>

            {/* Color */}
            <div className="pd-section">
              <p className="pd-label">
                COLOR <span className="pd-selected-val">{selectedColor}</span>
              </p>
              <div className="pd-colors">
                {product.variants.colors.map(color => (
                  <button
                    key={color.name}
                    className={`pd-swatch${selectedColor === color.name ? ' active' : ''}${color.hexCode === '#FFFFFF' ? ' light' : ''}`}
                    style={{ backgroundColor: color.hexCode }}
                    title={color.name}
                    onClick={() => setSelectedColor(color.name)}
                  />
                ))}
              </div>
            </div>

            {/* Size */}
            <div className="pd-section">
              <p className="pd-label">
                SIZE <span className="pd-selected-val">{selectedSize || '—'}</span>
              </p>
              <div className="pd-sizes">
                {product.variants.sizes.map(size => (
                  <button
                    key={size}
                    className={`pd-size-btn${selectedSize === size ? ' active' : ''}`}
                    onClick={() => { setSelectedSize(size); setSizeError(false); }}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {sizeError && <p className="pd-size-error">Please select a size</p>}
            </div>

            {/* Quantity */}
            <div className="pd-section">
              <p className="pd-label">QUANTITY</p>
              <div className="pd-qty-row">
                <div className="pd-qty">
                  <button
                    className="pd-qty-btn"
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  >−</button>
                  <span className="pd-qty-val">{quantity}</span>
                  <button
                    className="pd-qty-btn"
                    onClick={() => setQuantity(q => Math.min(product.stockQuantity, q + 1))}
                  >+</button>
                </div>
                <p className="pd-stock">{product.stockQuantity} in stock</p>
              </div>
            </div>

            <button
              className={`pd-add-btn${added ? ' added' : ''}`}
              onClick={handleAddToCart}
            >
              {added ? '✓ ADDED TO CART' : 'ADD TO CART'}
            </button>

            <div className="pd-meta">
              <div className="pd-meta-row">
                <span>Brand</span>
                <span>{product.brand}</span>
              </div>
              <div className="pd-meta-row">
                <span>Category</span>
                <span>{product.category.toUpperCase()}</span>
              </div>
              <div className="pd-meta-row">
                <span>Tags</span>
                <span>{product.tags.join(', ')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default ProductDetails;
