import { Skeleton } from '@chakra-ui/react';
import ProductCard from '../ProductCard/ProductCard';
import StateCard from '../StateCard/StateCard';
import type { ErrorResponse } from '../../services/request-config';
import type { ProductListResponse } from '../../services/products/types';
import './ProductGrid.scss';

interface ProductGridProps {
  data: ProductListResponse | undefined;
  isLoading: boolean;
  error: ErrorResponse | null;
  refetch: () => void;
}

const ProductGrid = ({ data, isLoading, error, refetch }: ProductGridProps) => {
  if (isLoading) {
    return (
      <div className="product-grid">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} height="420px" borderRadius="2px" startColor="#b7b1b1ff"
          variant="pulse" endColor="#c9c9c9ff" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <StateCard
        title="Something went wrong"
        subtitle="We couldn't load the products. Please try again."
        action={{ label: 'Try again', onClick: () => refetch() }}
      />
    );
  }

  const products = data?.data ?? [];

  if (products.length === 0) {
    return (
      <StateCard
        title="No products found"
        subtitle="Check back soon — new pieces are on the way."
      />
    );
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
