import { useEffect, useState } from "react";
import { getProducts } from "../../services/products";
import { useParams } from "react-router-dom";
import styles from "../../styles/product-card.module.scss";
import { Link, } from 'react-router-dom';
import SkeletonProductCard from "../ui/SkeletonProductCard";
import EmptyState from "../ui/EmptyState";
import ErrorState from "../ui/ErrorState";


function ProductList() {

  const [items, setitems] = useState([])
  const [status, setStatus] = useState("loading")
  const { categoryName } = useParams();
  
  const getItems = async () => {
    setStatus("loading")

    try {
      const items = await getProducts(categoryName)
      setitems(items)
      setStatus("success")
    } catch {
      setitems([])
      setStatus("error")
    }
  }

  useEffect(() => {
    getItems()
  }, [categoryName])

  const emptyDescription = categoryName
    ? `No encontramos productos en "${categoryName}". Explora otras categorías o vuelve al inicio.`
    : "No hay productos disponibles en este momento. Intenta nuevamente más tarde."

  return (

    <section className={styles.catalogSection}>
      <div className={styles.catalogHeader}>
        <span className={styles.eyebrow}>Storefront 2026</span>
        <h1>Premium essentials, curated for everyday style.</h1>
        <p>Explore apparel and accessories with a cleaner shopping experience.</p>
      </div>

      {status === "loading" ? (
        <div className={styles.principal} aria-busy="true" aria-label="Cargando productos">
          {Array.from({ length: 6 }).map((_, index) => (
            <SkeletonProductCard key={index} />
          ))}
        </div>
      ) : null}

      {status === "error" ? (
        <ErrorState
          title="No pudimos cargar el catálogo"
          description="Ocurrió un problema al obtener los productos. Verifica tu conexión e inténtalo de nuevo."
        />
      ) : null}

      {status === "success" && items.length === 0 ? (
        <EmptyState
          title="Sin productos por ahora"
          description={emptyDescription}
          actionLabel="Volver al inicio"
          actionTo="/home"
        />
      ) : null}

      {status === "success" && items.length > 0 ? (
      <div className={styles.principal}>
      {items.map((item) => (
        <Link className={styles.cardLink} key={item.id} to={`/item/${item.id}`}>
          <div className={styles.container}>
            <div className={styles.imageWrapper}>
              <img src={item.image} alt={item.title} width="150" height="150" loading="lazy" />
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
      ) : null}
    </section>
  )
}

export default ProductList
