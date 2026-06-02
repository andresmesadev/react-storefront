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
    <>
    <h1 className='counter-button' onClick={decrese}><HiMinus/></h1>
    <h3>{item.quanty}</h3>
    <h1 className='counter-button' onClick={() => buyProducts(item)}><HiPlus/></h1>
    </>
  )
}

export default CartItemCounter
