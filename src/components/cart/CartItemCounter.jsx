import React from 'react'
import useCart from "../../hooks/useCart";
import "../../styles/cart.css";
import { HiPlus,HiMinus } from "react-icons/hi";


const CartItemCounter = ({ item ,  }) => {
    const { cart, setCart, buyProducts } = useCart();

    const decrese = () => {

        const producto = cart.find((producto) => producto.id == item.id)
        const itemrepeat = cart.find((producto) => producto.id == item.id)?true:false;

        itemrepeat.quanty !==1 && producto.quanty --
        setCart( [...cart] )
    }
  return (
    <div className="quantityControl">
      <button type="button" className='counter-button' onClick={decrese} aria-label="Disminuir cantidad"><HiMinus/></button>
      <p className="quantityValue">{item.quanty}</p>
      <button type="button" className='counter-button' onClick={() => buyProducts(item)} aria-label="Aumentar cantidad"><HiPlus/></button>
    </div>
  )
}

export default CartItemCounter
