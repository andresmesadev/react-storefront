import React from 'react'
import useCart from "../../hooks/useCart";
import "../../styles/cart.css";
import { HiPlus,HiMinus } from "react-icons/hi";


const CartItemCounter = ({ item ,  }) => {
    const { buyProducts, decreaseQuantity } = useCart();

    const decrese = () => {
        if (item.quanty <= 1) return;
        decreaseQuantity(item.id);
    }

  return (
    <div className="quantityControl">
      <button
        type="button"
        className='counter-button'
        onClick={decrese}
        disabled={item.quanty <= 1}
        aria-label="Disminuir cantidad"
      >
        <HiMinus/>
      </button>
      <p className="quantityValue">{item.quanty}</p>
      <button type="button" className='counter-button' onClick={() => buyProducts(item)} aria-label="Aumentar cantidad"><HiPlus/></button>
    </div>
  )
}

export default CartItemCounter
