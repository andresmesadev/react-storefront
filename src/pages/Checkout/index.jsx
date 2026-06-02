import React from 'react'
import useCart from "../../hooks/useCart";
import useToast from "../../hooks/useToast";
import { createOrder } from "../../services/orders";
import { getCartTotal, sanitizeCart } from "../../utils/cart";
import "../../styles/form.css"


const CheckoutPage = () => {

    const { cart, clearCart } = useCart();
    const { showToast } = useToast();
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [submitError, setSubmitError] = React.useState("");
    const [submitSuccess, setSubmitSuccess] = React.useState(false);
    const [orderId, setOrderId] = React.useState("");


    const storeOrder = async (e) => {
        e.preventDefault();

        if (isSubmitting || submitSuccess) return;

        const sanitizedCart = sanitizeCart(cart);

        if (sanitizedCart.length === 0) {
            setSubmitError("Tu carrito está vacío. Agrega productos antes de finalizar la compra.");
            return;
        }

        setIsSubmitting(true);
        setSubmitError("");

        const buyer = {
            nombre: document.querySelector('#nombre').value.trim(),
            direccion: document.querySelector('#direccion').value.trim(),
            celular: document.querySelector('#celular').value.trim(),
            correo: document.querySelector('#correo').value.trim(),
            products: sanitizedCart,
            total: getCartTotal(sanitizedCart),
        }

        try {
            const order = await createOrder(buyer);
            setOrderId(order.id);
            setSubmitSuccess(true);
            clearCart();
            showToast("Pedido enviado correctamente.", "success");
        } catch {
            setSubmitError("No pudimos procesar tu pedido en este momento. Inténtalo nuevamente en unos minutos.");
            showToast("No pudimos enviar tu pedido.", "error");
        } finally {
            setIsSubmitting(false);
        }

    }

    return (
        <section className="checkoutSection">
            <header className="checkoutHeader">
                <h1>Finalizar compra</h1>
                <p>Completa tus datos para terminar el pedido.</p>
            </header>

            {submitSuccess ? (
              <div className="statePanel statePanelSuccess" role="status" aria-live="polite">
                <h2>Pedido enviado</h2>
                <p>Recibimos tu información correctamente. Gracias por tu compra.</p>
                <p>ID de orden: <strong>{orderId}</strong></p>
              </div>
            ) : (
            <form className='container-form' onSubmit={storeOrder} aria-busy={isSubmitting}>
                {submitError ? (
                  <div className="formAlert formAlertError" role="alert" aria-live="assertive">
                    {submitError}
                  </div>
                ) : null}

                <div className="formGroup">
                    <label htmlFor="nombre">Nombre</label>
                    <input type="text" name="nombre" id='nombre' autoComplete="name" required />
                </div>
                <div className="formGroup">
                    <label htmlFor="direccion">Dirección</label>
                    <input type="text" name="direccion" id='direccion' autoComplete="street-address" required />
                </div>
                <div className="formGroup">
                    <label htmlFor="celular">Número celular</label>
                    <input type="tel" name="celular" id='celular' autoComplete="tel" required />
                </div>
                <div className="formGroup">
                    <label htmlFor="correo">Correo electrónico</label>
                    <input type="email" name="correo" id='correo' autoComplete="email" required />
                </div>
                <button
                  className={`submitButton ${isSubmitting ? "buttonLoading" : ""}`}
                  type='submit'
                  disabled={isSubmitting || cart.length === 0}
                  aria-busy={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="buttonSpinner" aria-hidden="true" />
                      Enviando pedido...
                    </>
                  ) : (
                    "Finalizar pedido"
                  )}
                </button>
            </form>
            )}
        </section>
    )
}

export default CheckoutPage
