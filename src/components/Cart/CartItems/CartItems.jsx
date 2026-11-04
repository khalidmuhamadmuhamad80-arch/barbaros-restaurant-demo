import './CartItems.css';
import { useCart } from '../../../context/CartContext';

function CartItems() {
  const { cart, updateQuantity, removeFromCart } = useCart();

  const formatPrice = (price) => {
    return `${price} جنيه`;
  };

  return (
    <section className="cart-panel cart-items-panel">
      <h2 className="cart-panel-title">طلباتك</h2>

      <div className="cart-items-table-header">
        <span>المنتج</span>
        <span>الكمية</span>
        <span>السعر</span>
      </div>

      <div className="cart-items-list">
        {cart.map((item) => (
          <article className="cart-item" key={item.id}>
            <div
              className="cart-item-image"
              style={{ backgroundColor: item.color || 'var(--line)' }}
            >
              {item.image && (
                <img src={item.image} alt={item.name} />
              )}
            </div>

            <div className="cart-item-info">
              <h3>{item.name}</h3>
              <p>{formatPrice(item.price)} للواحد</p>
            </div>

            <div className="cart-item-quantity">
              <button
                type="button"
                className="quantity-button"
                onClick={() =>
                  updateQuantity(item.id, item.quantity - 1)
                }
                disabled={item.quantity <= 1}
                aria-label={`تقليل كمية ${item.name}`}
              >
                −
              </button>

              <span>{item.quantity}</span>

              <button
                type="button"
                className="quantity-button"
                onClick={() =>
                  updateQuantity(item.id, item.quantity + 1)
                }
                aria-label={`زيادة كمية ${item.name}`}
              >
                +
              </button>
            </div>

            <strong className="cart-item-total">
              {formatPrice(item.price * item.quantity)}
            </strong>

            <button
              type="button"
              className="cart-item-delete"
              onClick={() => removeFromCart(item.id)}
              aria-label={`حذف ${item.name} من العربة`}
              title="حذف"
            >
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M3 6h18" />
                <path d="M8 6V4h8v2" />
                <path d="m19 6-1 14H6L5 6" />
                <path d="M10 11v5" />
                <path d="M14 11v5" />
              </svg>
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

export default CartItems;