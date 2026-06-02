
import { useEffect, useState } from "react";
import useCart from "../../hooks/useCart";
import { useParams } from 'react-router-dom';
import styles from "../../styles/product-detail.module.scss";
import { getProductById } from "../../services/products";

const ProductDetailPage = () => {
  const [item, setitem] = useState({})
  const {id} = useParams()

  const getItem = async () =>{
    const item = await getProductById(id)
    setitem(item);
  }

  useEffect (() => {
    getItem()
  } ,[])

  const {  buyProducts } = useCart();


  return (
            
            <div className={styles.containerUnoPrincipal}>
              <div className={styles.containeruno}>
                <h3>{item.title}</h3>
                <img src={item.image} alt={item.title} width="200" height="250" />
                <h4>{item.description}</h4>
                <h3>$ {item.price}</h3>
                <h3>{item.category}</h3>
                <button onClick={() => buyProducts(item)}>Agregar</button>
              </div>
            </div>
            
  )
}

export default ProductDetailPage
