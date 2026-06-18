import NavBar from '../../components/NavBar/NavBar';
import Footer from '../../components/Footer/Footer';
import ProductGrid from '../../components/ProductGrid/ProductGrid';
import './ShopPage.scss';

const ShopPage = () => {
  return (
    <main className="shop-page">
      <NavBar />

      <div className="shop-container">
        <div className="shop-header">
          <div className="breadcrumb">BLACKSNOW / SHOP</div>
          <h1 className="shop-title">SHOP</h1>
          <p className="shop-description">CURATED PIECES. MINIMAL DESIGN. BUILT FOR EXPRESSION.</p>
        </div>

        <div className="shop-controls">
          <button className="filter-btn">
            <span>FILTER</span>
          </button>
          <div className="product-count">1 PRODUCT</div>
          <button className="sort-btn">SORT BY: NEWEST</button>
        </div>

        <ProductGrid />
      </div>

      <Footer />
    </main>
  );
};

export default ShopPage;
