import { useEffect, useState } from "react";
import { getProducts } from "../../services/products";
import { useParams } from "react-router-dom";
import styles from "../../styles/product-card.module.scss";
import { Link, } from 'react-router-dom';


function ProductList() {

  const [items, setitems] = useState([])
  const { categoryName } = useParams();
  
  const getItems = async () => {
    const items = await getProducts(categoryName)
    setitems(items);
  }

  useEffect(() => {
    getItems()
  }, [categoryName])

  

  return (

    <section className={styles.catalogSection}>
      <div className={styles.catalogHeader}>
        <span className={styles.eyebrow}>Storefront 2026</span>
        <h1>Premium essentials, curated for everyday style.</h1>
        <p>Explore apparel and accessories with a cleaner shopping experience.</p>
      </div>
      <div className={styles.principal}>
      {items.map((item) => (
        <Link className={styles.cardLink} key={item.id} to={`/item/${item.id}`}>
          <div className={styles.container}>
            <div className={styles.imageWrapper}>
              <img src={item.image} alt={item.title} width="150" height="150" />
            </div>
            <div className={styles.cardContent}>
              <span className={styles.category}>{item.category}</span>
              <h3>{item.title}</h3>
              <p className={styles.price}>$ {item.price}</p>
            </div>
          </div>
        </Link>
      ))}
      </div>
    </section>
  )
}

export default ProductList
