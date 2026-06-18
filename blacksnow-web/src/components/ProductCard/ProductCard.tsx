import { Link } from 'react-router-dom';
import { Product } from '../../types/product';
import './ProductCard.scss';

interface ProductCardProps {
  product: Product;
}

const sym = (currency: string) => {
  const map: Record<string, string> = { GBP: '£', USD: '$', EUR: '€' };
  return map[currency] ?? currency;
};

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="product-card">
      <Link to={`/shop/product/${product.id}`} className="product-image-wrapper">
        <img src={product.images[0]?.url} alt={product.images[0]?.alt ?? product.name} className="product-image" />
        {product.isNew && <div className="badge new-badge">NEW</div>}
      </Link>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-collection">{product.collection}</p>
        <p className="product-price">{sym(product.currency)}{product.finalPrice.toFixed(2)}</p>
        <Link to={`/shop/product/${product.id}`} className="view-details">VIEW DETAILS →</Link>
      </div>
    </div>
  );
};

export default ProductCard;
