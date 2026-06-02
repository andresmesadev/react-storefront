import React from 'react'
import useCart from "../../hooks/useCart";
import CartElements from '../../components/cart/CartElements'
import CartTotal from '../../components/cart/CartTotal'

const CartPage = () => {
  const {cart} = useCart();
  return cart.length > 0 ?(
    <>
  <CartElements/>
  <CartTotal/>
  </>
  ):
  (
    <h2 className='cart-mensaje'>tu carrito esta basido !!!</h2>
  );
};

export default CartPage
