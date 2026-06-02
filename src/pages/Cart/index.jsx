import React from 'react'
import useCart from "../../hooks/useCart";
import CartElements from '../../components/cart/CartElements'
import CartTotal from '../../components/cart/CartTotal'
import EmptyState from '../../components/ui/EmptyState'
import "../../styles/cart.css";

const CartPage = () => {
  const {cart} = useCart();

  if (cart.length === 0) {
    return (
      <section className="cartPage">
        <EmptyState
          title="Tu carrito está vacío"
          description="Agrega productos desde el catálogo para continuar con tu compra."
          actionLabel="Explorar productos"
          actionTo="/home"
        />
      </section>
    );
  }

  return (
    <section className="cartPage">
      <header className="cartPageHeader">
        <h1>Tu carrito</h1>
        <p>Revisa tus productos y continúa cuando estés listo.</p>
      </header>
      <div className="cartLayout">
        <CartElements/>
        <CartTotal/>
      </div>
    </section>
  );
};

export default CartPage
