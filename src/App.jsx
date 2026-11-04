import { HashRouter, Routes, Route } from 'react-router-dom';

import Home from './components/Home/Home';
import Cart from './components/Cart/Cart';

import { CartProvider } from './context/CartContext';

function App() {
  return (
    <CartProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </HashRouter>
    </CartProvider>
  );
}

export default App;