import { createContext, useCallback, useEffect, useState } from "react";
import {
  loadCartFromStorage,
  normalizeCartItem,
  sanitizeCart,
  saveCartToStorage,
} from "../utils/cart";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCartState] = useState(() => loadCartFromStorage());

  const setCart = useCallback((updater) => {
    setCartState((prevCart) => {
      const nextCart = typeof updater === "function" ? updater(prevCart) : updater;
      return sanitizeCart(nextCart);
    });
  }, []);

  useEffect(() => {
    saveCartToStorage(cart);
  }, [cart]);

  const buyProducts = useCallback((item) => {
    const normalizedItem = normalizeCartItem(item);
    if (!normalizedItem) return;

    setCart((prevCart) => {
      const existingItem = prevCart.find((product) => product.id == normalizedItem.id);

      if (existingItem) {
        return prevCart.map((product) =>
          product.id == normalizedItem.id
            ? { ...product, quanty: product.quanty + 1 }
            : product
        );
      }

      return [...prevCart, normalizedItem];
    });
  }, [setCart]);

  const decreaseQuantity = useCallback((id) => {
    setCart((prevCart) =>
      prevCart
        .map((product) =>
          product.id == id ? { ...product, quanty: product.quanty - 1 } : product
        )
        .filter((product) => product.quanty >= 1)
    );
  }, [setCart]);

  const clearCart = useCallback(() => {
    setCart([]);
  }, [setCart]);

  return (
    <CartContext.Provider value={{ cart, setCart, buyProducts, decreaseQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
