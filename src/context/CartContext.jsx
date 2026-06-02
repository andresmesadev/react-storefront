import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const buyProducts = (item) => {
    const producto = cart.find((producto) => producto.id == item.id);
    const itemrepeat = cart.find((producto) => producto.id == item.id) ? true : false;

    if (itemrepeat) {
      producto.quanty++;
      setCart([...cart]);
    } else {
      setCart([...cart, item]);
    }
  };

  return (
    <CartContext.Provider value={{ cart, setCart, buyProducts }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
