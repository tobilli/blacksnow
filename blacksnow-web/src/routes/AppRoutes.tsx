import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from '../pages/LandingPage/LandingPage';
import ShopPage from '../pages/ShopPage/ShopPage';
import ProductDetails from '../pages/ProductDetails/ProductDetails';
import CheckoutPage from '../pages/CheckoutPage/CheckoutPage';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/shop/product/:id" element={<ProductDetails />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
