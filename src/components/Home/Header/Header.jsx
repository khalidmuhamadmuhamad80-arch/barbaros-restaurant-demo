import { Link, useNavigate } from 'react-router-dom';

import './Header.css';
import NavBar from '../NavBar/NavBar';

function Header({ cartCount = 0, onOpenModal }) {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="site-header">
      <div className="header-main">
        <div className="header-container">
          <button
            className="header-brand"
            onClick={handleLogoClick}
            aria-label="العودة إلى أعلى الصفحة"
          >
            <span className="brand-icon">ب</span>
            <span className="brand-name">بربروس</span>
          </button>

          <Link
            to="/cart"
            className="header-cart"
            aria-label={`العربة، عدد الأصناف ${cartCount}`}
          >
            <span className="cart-text">🛒 العربة</span>
            <span className="cart-count">{cartCount}</span>
          </Link>
        </div>
      </div>

      <NavBar onOpenModal={onOpenModal} />
    </header>
  );
}

export default Header;