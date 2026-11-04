import { useCallback, useState } from 'react';
import './Home.css';

import Header from './Header/Header';
import HeroSlider from './HeroSlider/HeroSlider';
import Dishes from './Dishes/Dishes';
import Modal from './Modal/Modal';
import Toast from './Toast/Toast';

import { useCart } from '../../context/CartContext';

function Home() {
  const { cart, cartCount, addToCart } = useCart();

  const [modalType, setModalType] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [toastId, setToastId] = useState(0);

  // إضافة صنف للعربة
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

  return (
    <main className="home-page">
      <Header
        cartCount={cartCount}
        onOpenModal={setModalType}
      />

      <HeroSlider />

      <Dishes onAdd={handleAddToCart} />

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
    </main>
  );
}

export default Home;