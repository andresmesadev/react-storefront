import React from 'react'
import useCart from "../../hooks/useCart";
import useToast from "../../hooks/useToast";
import { createOrder } from "../../services/orders";
import "../../styles/form.css"


const CheckoutPage = () => {

    const { cart } = useCart();
    const { showToast } = useToast();
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [submitError, setSubmitError] = React.useState("");
    const [submitSuccess, setSubmitSuccess] = React.useState(false);


    const storeOrder = async (e) => {
        e.preventDefault();

        if (isSubmitting || submitSuccess) return;

        setIsSubmitting(true);
        setSubmitError("");

        const buyer = {
            nombre: document.querySelector('#nombre').value,
            direccion: document.querySelector('#direccion').value,
            celular: document.querySelector('#celular').value,
            correo: document.querySelector('#correo').value,
            products: cart
        }

        try {
            await createOrder(buyer);
            setSubmitSuccess(true);
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
                  disabled={isSubmitting}
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
