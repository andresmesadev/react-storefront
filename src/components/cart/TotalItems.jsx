import React from 'react'
import useCart from "../../hooks/useCart";
import { getCartItemCount } from "../../utils/cart";

const TotalItems = () => {
    const {cart} = useCart();
    const itemQuanty = getCartItemCount(cart);

  return (
    <span className='cart-items-total'>{itemQuanty}</span>
  )
}

export default TotalItems
