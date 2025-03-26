import React from 'react'
import './orderModal.css'
import { useOrder } from '../context/OrderContext'
import { Link } from 'react-router';


export default function OrderModal() {

    const { count, total, cart, toggleCart, isOpen } = useOrder()

    if (!isOpen) return null;

    function pintarModalCarrito() {
        return cart.map((item) => {
            return (

                <div className="modal-cont-container">
                    <div className="md-cont">
                        <div className="md-img-cont">
                            <img src={item.image} alt="" />
                        </div>
                        <div className="md-flex">
                            <div className="md-title-cont">
                                <h3>{item.nombre}</h3>
                            </div>
                            <div className="md-quantity-cont">
                                <p>[{item.quantity}]</p>
                            </div>
                            <div className="md-total-cont">
                                <p>${item.precio.toLocaleString("es-AR")}</p>
                            </div>
                            <div className="product-color">
                                <img src={item.selectedColor} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
    }

    return (

        <div className="modal-overlay" onClick={toggleCart}>
            <div className="order-modal-cont" onClick={(e) => e.stopPropagation()} >
                <div className="modal-title" >
                    <h2>Mi orden</h2>
                </div>
                {pintarModalCarrito()}
                <div className="md-subtotal-cont">
                    <p>Subtotal: </p>
                    <p>${total.toLocaleString("es-AR")}</p>
                </div>
                <div className="md-link">
                    <Link className='link' to="/Cart">Ir al carrito</Link>
                </div>
            </div>
        </div>
    )
}
