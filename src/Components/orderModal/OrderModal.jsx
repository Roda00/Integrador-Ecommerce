import React from 'react'
import './orderModal.css'
import { useOrder } from '../context/OrderContext'
import { Link } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';


export default function OrderModal() {

    const { count, total, cart, toggleCart, isOpen, aumentarCantidad, disminuirCantidad } = useOrder()

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
                            <div className="md-total-cont">
                                <p>${item.precio.toLocaleString("es-AR")}</p>
                            </div>
                            <div className="md-bottom-cont">
                                <img src={item.selectedColor} alt="" />
                                <button>
                                <FontAwesomeIcon  onClick={() => disminuirCantidad(item, item.selectedColor)}  className={`md-count ${item.quantity === 1 ? "false" : "active"}`}    icon={faMinus} />
                                <FontAwesomeIcon  onClick={() => disminuirCantidad(item, item.selectedColor)}  className={`md-count ${item.quantity === 1 ? "active" : "false"}`}    icon={faTrash} />
                                </button>
                                <p>[{item.quantity}]</p>
                                <button>
                                <FontAwesomeIcon onClick={() => aumentarCantidad(item, item.selectedColor)} className="md-count" icon={faPlus} />
                                </button>
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
                {cart.length === 0 && (

                    <div className="empty-cart">
                        <p>El carrito aún está vacio</p>

                    </div>

                )}

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
