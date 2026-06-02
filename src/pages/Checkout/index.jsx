import React from 'react'
import { useForm } from "react-hook-form"
import useCart from "../../hooks/useCart";
import { createOrder } from "../../services/orders";
import "../../styles/form.css"


const CheckoutPage = () => {

    const { cart } = useCart();
    const { register, handleSubmit } = useForm();


    const storeOrder = async (e) => {
        e.preventDefault();
        const buyer = {
            nombre: document.querySelector('#nombre').value,
            direccion: document.querySelector('#direccion').value,
            celular: document.querySelector('#celular').value,
            correo: document.querySelector('#correo').value,
            products: cart
        }

        await createOrder(buyer);

    }

    return (
        <>
            <div >
                <div >formulario</div>
                <form className='container-form'>
                    <div>
                        <label>nombre</label>
                        <input type="text" name="" id='nombre' />
                    </div>
                    <div>
                        <label>direccion</label>
                        <input type="text" name="" id='direccion' />
                    </div>
                    <div>
                        <label>numero celular</label>
                        <input type="text" name="" id='celular' />
                    </div>
                    <div>
                        <label>correro electronico</label>
                        <input type="text" name="" id='correo' />
                    </div>
                    <input type='submit' value="Terminar" onClick={storeOrder}></input>
                </form>
            </div>
        </>
    )
}

export default CheckoutPage
