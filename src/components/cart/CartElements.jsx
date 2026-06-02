import useCart from "../../hooks/useCart";
import useToast from "../../hooks/useToast";
import "../../styles/cart.css";
import CartItemCounter from "./CartItemCounter";
import React from 'react'
import { HiOutlineTrash } from "react-icons/hi";
import { getItemLineTotal } from "../../utils/cart";

const CartElements = () => { 
  const {cart , setCart } = useCart();
  const { showToast } = useToast();

  const deleteProduct = (id) =>{
    const foundId = cart.find((element) => element.id === id );

    const newCart = cart.filter((element)=>{
      return element !== foundId;
    });

    setCart(newCart);
    showToast(`${foundId?.title || "Producto"} eliminado del carrito.`, "info");
  }

  return(
  <div className="cartContentContainer1"> 
    <div className="cartContentContainer">
      {cart.map((item)=>(
            <div className="cartContent" key={item.id}>
                <article className="cartItemCard">
                  <div className="cartItemImage">
                    <img src={item.image} alt={item.title} width="150" height="150" />
                  </div>
                  <div className="cartItemBody">
                    <h3 className="cartItemTitle">{item.title}</h3>
                    <div className="cartItemMeta">
                      <p className="cartItemPrice">$ {getItemLineTotal(item).toFixed(2)}</p>
                    </div>
                    <div className="cartItemActions">
                      <CartItemCounter item={item} />
                      <button type="button" className="deleteButton" onClick={() => deleteProduct(item.id)} aria-label={`Eliminar ${item.title}`}>
                        <HiOutlineTrash/>
                      </button>
                    </div>
                  </div>
                </article>
            </div>
      ))}
    </div>
  </div>
  )
}

export default CartElements
