
import './NavBar.css';

function NavBar({ onOpenModal }) {

  const handleDishesClick = () => {
    const dishesSection = document.getElementById('dishes');

    if (dishesSection) {
      dishesSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <nav className="main-navbar" aria-label="القائمة الرئيسية">

      <div className="navbar-container">

        <button
          className="navbar-link"
          onClick={handleDishesClick}
        >
          أطباقنا
        </button>

        <button
          className="navbar-link"
          onClick={() => onOpenModal?.('drinks')}
        >
          المشروبات
        </button>

        <button
          className="navbar-link"
          onClick={() => onOpenModal?.('branches')}
        >
          فروعنا
        </button>

        <button
          className="navbar-link"
          onClick={() => onOpenModal?.('extras')}
        >
          الإضافات
        </button>

      </div>

    </nav>
  );
}

export default NavBar;
