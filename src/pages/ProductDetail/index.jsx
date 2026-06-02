
import { useEffect, useState } from "react";
import useCart from "../../hooks/useCart";
import useToast from "../../hooks/useToast";
import { useParams } from 'react-router-dom';
import styles from "../../styles/product-detail.module.scss";
import { getProductById } from "../../services/products";
import ProductDetailSkeleton from "../../components/ui/ProductDetailSkeleton";
import EmptyState from "../../components/ui/EmptyState";
import ErrorState from "../../components/ui/ErrorState";

const ProductDetailPage = () => {
  const [item, setitem] = useState({})
  const [status, setStatus] = useState("loading")
  const [isAdding, setIsAdding] = useState(false)
  const {id} = useParams()
  const { buyProducts } = useCart();
  const { showToast } = useToast();

  const getItem = async () =>{
    setStatus("loading")

    try {
      const item = await getProductById(id)

      if (!item?.title) {
        setitem({})
        setStatus("empty")
        return
      }

      setitem(item)
      setStatus("success")
    } catch {
      setitem({})
      setStatus("error")
    }
  }

  useEffect (() => {
    getItem()
  } ,[id])

  const handleAddToCart = () => {
    if (isAdding || status !== "success") return;

    setIsAdding(true)
    buyProducts(item)
    showToast("Producto agregado al carrito.", "success")
    window.setTimeout(() => setIsAdding(false), 700)
  }


  return (
    <section className={styles.detailSection}>
      {status === "loading" ? (
        <>
          <span className="srOnly" aria-live="polite">Cargando producto</span>
          <ProductDetailSkeleton />
        </>
      ) : null}

      {status === "error" ? (
        <ErrorState
          title="No pudimos cargar este producto"
          description="Ocurrió un problema al obtener la información. Intenta nuevamente o regresa al catálogo."
        />
      ) : null}

      {status === "empty" ? (
        <EmptyState
          title="Producto no encontrado"
          description="El producto que buscas no existe o ya no está disponible."
          actionLabel="Volver al catálogo"
          actionTo="/home"
        />
      ) : null}

      {status === "success" ? (
      <div className={styles.detailGrid}>
        <div className={styles.imagePanel}>
          <img src={item.image} alt={item.title} width="200" height="250" />
        </div>
        <div className={styles.infoPanel}>
          <span className={styles.category}>{item.category}</span>
          <h1 className={styles.title}>{item.title}</h1>
          <p className={styles.description}>{item.description}</p>
          <p className={styles.price}>$ {item.price}</p>
          <button
            className={`${styles.addButton} ${isAdding ? "buttonLoading" : ""}`}
            onClick={handleAddToCart}
            disabled={isAdding}
            aria-busy={isAdding}
          >
            {isAdding ? (
              <>
                <span className="buttonSpinner" aria-hidden="true" />
                Agregando...
              </>
            ) : (
              "Agregar al carrito"
            )}
          </button>
        </div>
      </div>
      ) : null}
    </section>
  )
}

export default ProductDetailPage
