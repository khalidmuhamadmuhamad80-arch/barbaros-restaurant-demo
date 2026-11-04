import { useCallback, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import './Cart.css';

import Header from '../Home/Header/Header';
import Modal from '../Home/Modal/Modal';
import Toast from '../Home/Toast/Toast';

import CartItems from './CartItems/CartItems';
import CartSummary from './CartSummary/CartSummary';
import CustomerForm from './CustomerForm/CustomerForm';
import DeliveryForm from './DeliveryForm/DeliveryForm';
import OrderNotes from './OrderNotes/OrderNotes';
import InvoiceModal from './InvoiceModal/InvoiceModal';

import { useCart } from '../../context/CartContext';
import { allDeliveryLocations } from '../../data/orderConfig';

function Cart() {
  const { cart, cartCount, cartTotal, addToCart } = useCart();

  const [modalType, setModalType] = useState(null);
  const [invoiceOpen, setInvoiceOpen] = useState(false);
  const [orderReference, setOrderReference] = useState('');

  const [toastMessage, setToastMessage] = useState('');
  const [toastId, setToastId] = useState(0);

  const [customerData, setCustomerData] = useState({
    name: '',
    phone: '',
  });

  const [deliveryMethod, setDeliveryMethod] = useState('pickup');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');

  const customerValidationRef = useRef(null);
  const deliveryValidationRef = useRef(null);

  const selectedPlace = useMemo(
    () =>
      allDeliveryLocations.find(
        (location) => location.id === selectedLocation
      ),
    [selectedLocation]
  );

  const deliveryFee =
    deliveryMethod === 'delivery' && selectedPlace
      ? selectedPlace.fee
      : 0;

  const handleAddToCart = (item) => {
    addToCart(item);
    setToastMessage(`تمت الإضافة: ${item.name}`);
    setToastId((current) => current + 1);
  };

  const closeModal = useCallback(() => {
    setModalType(null);
  }, []);

  const closeToast = useCallback(() => {
    setToastMessage('');
  }, []);

  const handleConfirmOrder = () => {
    const isCustomerValid =
      customerValidationRef.current?.() ?? false;

    const isDeliveryValid =
      deliveryValidationRef.current?.() ?? false;

    if (!isCustomerValid || !isDeliveryValid) {
      const firstInvalidField = !isCustomerValid
        ? document.querySelector(
            '#customer-name.input-error, #customer-phone.input-error'
          )
        : document.querySelector(
            '#delivery-location.input-error, #delivery-address.input-error'
          );

      firstInvalidField?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });

      firstInvalidField?.focus({ preventScroll: true });

      return;
    }

    const reference = `BAR-${Date.now().toString().slice(-8)}`;

    setOrderReference(reference);
    setInvoiceOpen(true);
  };

  return (
    <main className="cart-page">
      <Header
        cartCount={cartCount}
        onOpenModal={setModalType}
      />

      <div className="cart-container">
        <div className="cart-page-header">
          <h1>سلة الطلب</h1>

          <Link to="/" className="cart-back-button">
            → رجوع للمنيو
          </Link>
        </div>

        {cart.length === 0 ? (
          <section className="cart-empty-panel">
            <div className="cart-empty-icon">🛒</div>
            <h2>سلتك فاضية</h2>
            <p>
              أضف أطباقك المفضلة من المنيو وارجع هنا.
            </p>
            <Link to="/" className="cart-empty-button">
              اختار أطباقك
            </Link>
          </section>
        ) : (
          <>
            <CartItems />

            <CartSummary
              deliveryMethod={deliveryMethod}
              deliveryFee={deliveryFee}
            />

            <CustomerForm
              customerData={customerData}
              onCustomerDataChange={setCustomerData}
              registerValidation={(validate) => {
                customerValidationRef.current = validate;
              }}
            />

            <DeliveryForm
              deliveryMethod={deliveryMethod}
              onDeliveryMethodChange={setDeliveryMethod}
              selectedLocation={selectedLocation}
              onSelectedLocationChange={setSelectedLocation}
              address={address}
              onAddressChange={setAddress}
              registerValidation={(validate) => {
                deliveryValidationRef.current = validate;
              }}
            />

            <OrderNotes
              notes={notes}
              onNotesChange={setNotes}
            />

            <button
              type="button"
              className="cart-confirm-button"
              onClick={handleConfirmOrder}
            >
              تأكيد الطلب
            </button>
          </>
        )}
      </div>

      <Modal
        type={modalType}
        onClose={closeModal}
        onAdd={handleAddToCart}
      />

      <Toast
        message={toastMessage}
        toastId={toastId}
        onClose={closeToast}
      />

      {invoiceOpen && (
        <InvoiceModal
          orderReference={orderReference}
          cart={cart}
          customerData={customerData}
          deliveryMethod={deliveryMethod}
          selectedPlace={selectedPlace}
          address={address}
          notes={notes}
          cartTotal={cartTotal}
          deliveryFee={deliveryFee}
          onClose={() => setInvoiceOpen(false)}
        />
      )}
    </main>
  );
}

export default Cart;