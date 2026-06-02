import React from 'react'
import useCart from "../../hooks/useCart";
import "../../styles/cart.css";
import { Link } from 'react-router-dom';

const CartTotal = () => {
    const {cart} = useCart();

    const total =cart.reduce((acc,el) => acc + el.price * el.quanty , 0);
  return (
    <aside className="cartSummary">
        <h2>Resumen</h2>
        <p className="cartSummaryTotal">
          Total a pagar
          <strong>$ {total}</strong>
        </p>
        <div className='cartTotal'>
          <div className="cartActions">
            <Link className='Btn' to ={"/formulario"}>PAGAR</Link>
            <Link className='Btn' to={"/home"}>SEGUIR COMPRANDO</Link>
          </div>
        </div>
    </aside>
  )
}

export default CartTotal
