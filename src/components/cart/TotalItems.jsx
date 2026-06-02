import React from 'react'
import useCart from "../../hooks/useCart";

const TotalItems = () => {
    const {cart} = useCart();

    const itemQuanty =cart.reduce((acc,el) => acc + el.quanty , 0);
  return (
    <span className='cart-items-total'>{itemQuanty}</span>
  )
}

export default TotalItems
