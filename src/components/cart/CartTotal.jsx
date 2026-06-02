import React from 'react'
import useCart from "../../hooks/useCart";
import "../../styles/cart.css";
import { Link } from 'react-router-dom';

const CartTotal = () => {
    const {cart} = useCart();

    const total =cart.reduce((acc,el) => acc + el.price * el.quanty , 0);
  return (
    <div className='cartTotal'>
        <h3>total a pagar es : $ {total} </h3>
        <Link className='Btn' to ={"/formulario"}>PAGAR</Link>
        <Link className='Btn' to={"/home"}>SEGUIR COMPRANDO</Link>
    </div>
  )
}

export default CartTotal
