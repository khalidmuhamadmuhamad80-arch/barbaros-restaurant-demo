import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

const CartContext = createContext(null);

const STORAGE_KEY = 'barbaros-cart';

function getInitialCart() {
  try {
    const savedCart = localStorage.getItem(STORAGE_KEY);

    if (!savedCart) {
      return [];
    }

    const parsedCart = JSON.parse(savedCart);

    return Array.isArray(parsedCart) ? parsedCart : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(getInitialCart);

  // حفظ العربة في localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // يستمر الموقع في العمل حتى لو تعذر التخزين
    }
  }, [cart]);

  // إجمالي عدد القطع
  const cartCount = useMemo(() => {
    return cart.reduce(
      (total, item) => total + item.quantity,
      0
    );
  }, [cart]);

  // إجمالي سعر المنتجات
  const cartTotal = useMemo(() => {
    return cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }, [cart]);

  // إضافة صنف
  const addToCart = useCallback((item) => {
    setCart((currentCart) => {
      const existingItem = currentCart.find(
        (cartItem) => cartItem.id === item.id
      );

      if (existingItem) {
        return currentCart.map((cartItem) =>
          cartItem.id === item.id
            ? {
                ...cartItem,
                quantity: cartItem.quantity + 1,
              }
            : cartItem
        );
      }

      return [
        ...currentCart,
        {
          ...item,
          quantity: 1,
        },
      ];
    });
  }, []);

  // تغيير الكمية
  const updateQuantity = useCallback((itemId, newQuantity) => {
    if (newQuantity < 1) {
      return;
    }

    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === itemId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  }, []);

  // حذف صنف
  const removeFromCart = useCallback((itemId) => {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== itemId)
    );
  }, []);

  // تفريغ العربة
  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const value = useMemo(
    () => ({
      cart,
      cartCount,
      cartTotal,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
    }),
    [
      cart,
      cartCount,
      cartTotal,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
    ]
  );

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      'useCart must be used inside CartProvider'
    );
  }

  return context;
}