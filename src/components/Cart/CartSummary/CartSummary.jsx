import './CartSummary.css';
import { useCart } from '../../../context/CartContext';

function CartSummary({
  deliveryMethod,
  deliveryFee,
}) {
  const { cartCount, cartTotal } = useCart();

  const finalTotal =
    cartTotal + (deliveryMethod === 'delivery' ? deliveryFee : 0);

  const formatPrice = (price) => `${price} جنيه`;

  return (
    <section className="cart-panel cart-summary-panel">
      <h2 className="cart-panel-title">المبلغ الإجمالي</h2>

      <div className="cart-summary-row">
        <span>عدد القطع</span>
        <strong>{cartCount} قطعة</strong>
      </div>

      <div className="cart-summary-row">
        <span>إجمالي الطلبات</span>
        <strong>{formatPrice(cartTotal)}</strong>
      </div>

      <div className="cart-summary-row">
        <span>رسوم التوصيل</span>

        <strong>
          {deliveryMethod === 'pickup'
            ? 'لا يوجد (استلام من المطعم)'
            : deliveryFee > 0
              ? formatPrice(deliveryFee)
              : 'سيتم تحديد رسوم التوصيل بعد اختيار القرية'}
        </strong>
      </div>

      <div className="cart-summary-final">
        <span>
          {deliveryMethod === 'delivery' && deliveryFee === 0
            ? 'الإجمالي (بدون التوصيل)'
            : 'الإجمالي'}
        </span>

        <strong>{formatPrice(finalTotal)}</strong>
      </div>
    </section>
  );
}

export default CartSummary;