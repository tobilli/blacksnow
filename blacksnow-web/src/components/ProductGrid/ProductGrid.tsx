import { PRODUCTS } from '../../data/products';
import ProductCard from '../ProductCard/ProductCard';
import './ProductGrid.scss';

const ProductGrid = () => {
  return (
    <div className="product-grid">
      {PRODUCTS.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
