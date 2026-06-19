import NavBar from '../../components/NavBar/NavBar';
import Footer from '../../components/Footer/Footer';
import ProductGrid from '../../components/ProductGrid/ProductGrid';
import { useGetProducts } from './hooks';
import type { ErrorResponse } from '../../services/request-config';
import './ShopPage.scss';

const ShopPage = () => {
  const { data, isLoading, error, refetch } = useGetProducts();

  const totalCount = data?.metadata?.totalCount ?? 0;
  const showControls = !error && (isLoading || totalCount > 0);

  return (
    <main className="shop-page">
      <NavBar />

      <div className="shop-container">
        <div className="shop-header">
          <div className="breadcrumb">BLACKSNOW / SHOP</div>
          <h1 className="shop-title">SHOP</h1>
          <p className="shop-description">CURATED PIECES. MINIMAL DESIGN. BUILT FOR EXPRESSION.</p>
        </div>

        {showControls && (
          <div className="shop-controls">
            <button className="filter-btn">
              <span>FILTER</span>
            </button>
            <div className="product-count">
              {isLoading && !isLoading && `${totalCount} ${totalCount === 1 ? 'PRODUCT' : 'PRODUCTS'}`}
            </div>
            <button className="sort-btn">SORT BY: NEWEST</button>
          </div>
        )}

        <ProductGrid
          data={data}
          isLoading={isLoading}
          error={error as ErrorResponse | null}
          refetch={refetch}
        />
      </div>

      <Footer />
    </main>
  );
};

export default ShopPage;
