import './NavBar.scss';
import { useLocation, Link } from 'react-router-dom';
import { BRAND_WORDMARK, NAV_LINKS, COORDS, SEASON_LABEL } from '../../config/constants';
import { useCart } from '../../context/CartContext';
import CartModal from '../CartModal/CartModal';

const NavBar = ({ showBottomBar = false }: { showBottomBar?: boolean }) => {
  const location = useLocation();
  const { totalItems, openCart } = useCart();

  const isActive = (link: string) => location.pathname === link;

  return (
    <>
      <nav className="nav nav-top">
        <div className="nav-wordmark">{BRAND_WORDMARK}</div>
        <div className="nav-links">
          {NAV_LINKS.map((item) => (
            <Link
              key={item.name}
              to={item.link}
              className={isActive(item.link) ? 'nav-link active' : 'nav-link'}
            >
              {item.name}
            </Link>
          ))}
          <button className="nav-cart-btn" onClick={openCart} aria-label="Open cart">
            CART
            {totalItems > 0 && (
              <span className="nav-cart-count">{totalItems}</span>
            )}
          </button>
        </div>
      </nav>

      {showBottomBar && (
        <nav className="nav nav-bottom">
          <div className="nav-coord">{COORDS}</div>
          <div className="nav-season">{SEASON_LABEL}</div>
        </nav>
      )}

      <CartModal />
    </>
  );
};

export default NavBar;
