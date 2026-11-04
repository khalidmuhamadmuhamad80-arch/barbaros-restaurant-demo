import { useEffect } from 'react';
import './InvoiceModal.css';

import { WHATSAPP_NUMBER } from '../../../data/orderConfig';

function InvoiceModal({
  orderReference,
  cart,
  customerData,
  deliveryMethod,
  selectedPlace,
  address,
  notes,
  cartTotal,
  deliveryFee,
  onClose,
}) {
  const finalTotal = cartTotal + deliveryFee;

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const formatPrice = (price) => `${price} جنيه`;

  const orderMessage = [
    '🍽️ *طلب جديد - مطعم Barbaros*',
    '',
    `رقم الطلب المرجعي: ${orderReference}`,
    '',
    '👤 *بيانات العميل*',
    `الاسم: ${customerData.name}`,
    `رقم الموبايل: ${customerData.phone}`,
    '',
    '📦 *طريقة الاستلام*',
    deliveryMethod === 'pickup'
      ? 'استلام من المطعم'
      : `توصيل إلى: ${selectedPlace?.name || ''}`,
    ...(deliveryMethod === 'delivery'
      ? [`العنوان: ${address}`]
      : []),
    '',
    '🛒 *تفاصيل الطلب*',
    ...cart.map(
      (item, index) =>
        `${index + 1}. ${item.name} - ${item.quantity} × ${formatPrice(item.price)} = ${formatPrice(item.price * item.quantity)}`
    ),
    '',
    `إجمالي الطلبات: ${formatPrice(cartTotal)}`,
    `رسوم التوصيل: ${deliveryMethod === 'pickup' ? 'لا يوجد' : formatPrice(deliveryFee)}`,
    `*الإجمالي النهائي: ${formatPrice(finalTotal)}*`,
    '',
    `ملاحظات إضافية: ${notes.trim() || 'لا توجد'}`,
  ].join('\n');

  const handleSendOrder = () => {
    const whatsappUrl =
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(orderMessage)}`;

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className="invoice-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <section
        className="invoice-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="invoice-title"
      >
        <header className="invoice-header">
          <h2 id="invoice-title">مراجعة الفاتورة</h2>

          <button
            type="button"
            className="invoice-close-button"
            onClick={onClose}
            aria-label="إغلاق الفاتورة"
          >
            ×
          </button>
        </header>

        <div className="invoice-body">
          <div className="invoice-reference">
            <span>رقم الطلب المرجعي</span>
            <strong>{orderReference}</strong>
          </div>

          <p className="invoice-reference-note">
            هذا رقم مرجعي محلي لتسهيل المتابعة، وليس رقماً صادراً
            من نظام مركزي للمطعم.
          </p>

          <section className="invoice-section">
            <h3>بيانات العميل</h3>

            <div className="invoice-info-row">
              <span>الاسم</span>
              <strong>{customerData.name}</strong>
            </div>

            <div className="invoice-info-row">
              <span>رقم الموبايل</span>
              <strong dir="ltr">{customerData.phone}</strong>
            </div>
          </section>

          <section className="invoice-section">
            <h3>تفاصيل الاستلام</h3>

            <div className="invoice-info-row">
              <span>طريقة الاستلام</span>
              <strong>
                {deliveryMethod === 'pickup'
                  ? 'استلام من المطعم'
                  : 'توصيل للمنزل'}
              </strong>
            </div>

            {deliveryMethod === 'delivery' && (
              <>
                <div className="invoice-info-row">
                  <span>المدينة أو القرية</span>
                  <strong>{selectedPlace?.name}</strong>
                </div>

                <div className="invoice-address">
                  <span>العنوان بالتفصيل</span>
                  <p>{address}</p>
                </div>
              </>
            )}
          </section>

          <section className="invoice-section">
            <h3>أصناف الطلب</h3>

            <div className="invoice-items">
              {cart.map((item) => (
                <div className="invoice-item" key={item.id}>
                  <div className="invoice-item-details">
                    <strong>{item.name}</strong>
                    <span>
                      {item.quantity} × {formatPrice(item.price)}
                    </span>
                  </div>

                  <strong className="invoice-item-total">
                    {formatPrice(item.price * item.quantity)}
                  </strong>
                </div>
              ))}
            </div>
          </section>

          <section className="invoice-section invoice-calculation">
            <div className="invoice-info-row">
              <span>إجمالي الطلبات</span>
              <strong>{formatPrice(cartTotal)}</strong>
            </div>

            <div className="invoice-info-row">
              <span>رسوم التوصيل</span>
              <strong>
                {deliveryMethod === 'pickup'
                  ? 'لا يوجد'
                  : formatPrice(deliveryFee)}
              </strong>
            </div>

            <div className="invoice-final-total">
              <span>الإجمالي النهائي</span>
              <strong>{formatPrice(finalTotal)}</strong>
            </div>
          </section>

          <section className="invoice-section">
            <h3>ملاحظات إضافية</h3>
            <p className="invoice-notes">
              {notes.trim() || 'لا توجد ملاحظات'}
            </p>
          </section>
        </div>

        <footer className="invoice-footer">
          <button
            type="button"
            className="invoice-send-button"
            onClick={handleSendOrder}
          >
            إرسال الطلب عبر واتساب
          </button>

          <button
            type="button"
            className="invoice-edit-button"
            onClick={onClose}
          >
            العودة للتعديل
          </button>
        </footer>
      </section>
    </div>
  );
}

export default InvoiceModal;