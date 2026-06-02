import "../../styles/navbar.css"
import React from 'react'
import CartWidget from "../cart/CartWidget";
import { Link } from "react-router-dom";
import TotalItems from "../cart/TotalItems";
import useCart from "../../hooks/useCart";



const NavBar = ({icon}) => {
  const {cart} = useCart();
  return (
    <header className="nav-container">
      <Link className="brand" to="/home">
        <img className="brand-logo" src={icon} alt="Mattelsa" width="200" height="160"/>
      </Link>
      <nav className="navbar">
        <Link className="navbarButton" to="/home" >INICIO</Link>
        <Link className="navbarButton" to="/category/men's clothing" >MEN'S CLOTHING</Link>
        <Link className="navbarButton" to="/category/women's clothing" >WOMEN'S CLOTHING</Link>
        <Link className="navbarButton" to="/category/jewelery" >JEWELERY</Link>
        <Link className="cart-link" to={"/cart"}>
          <CartWidget/>
          {cart.length > 0 ? < TotalItems/> : null}
        </Link>
      </nav>
    </header>
  )
}

export default NavBar
