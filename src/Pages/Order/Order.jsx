import React from 'react'
import './Order.css'
import { useOrder } from '../../Components/context/OrderContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'

export default function Order() {

  const { count, total, cart, disminuirCantidad, aumentarCantidad } = useOrder()

  const precio = total.toLocaleString("es-AR")



  function pintarProductos() {
    return cart.map((item) => {
      return (
        <div className="chart-product-cont">
          <div className="chart-image">
            <img src={item.image} alt={item.name} />
          </div>

          <div className="product-detail-cont">
            <div className="product-title">
              <h2>{item.nombre}</h2>
            </div>
            <div className="order-bottom-cont">
              <img src={item.selectedColor} alt="" />
              <button>
                <FontAwesomeIcon onClick={() => disminuirCantidad(item, item.selectedColor)} className={`md-count ${item.quantity === 1 ? "false" : "active"}`} icon={faMinus} />
                <FontAwesomeIcon onClick={() => disminuirCantidad(item, item.selectedColor)} className={`md-count ${item.quantity === 1 ? "active" : "false"}`} icon={faTrash} />
              </button>
              <p>[{item.quantity}]</p>
              <button>
                <FontAwesomeIcon onClick={() => aumentarCantidad(item, item.selectedColor)} className="md-count" icon={faPlus} />
              </button>
            </div>
          </div>
          <div className="price-cont">
            <p>${item.precio.toLocaleString("es-AR")}</p>
          </div>
        </div>

      )
    })
  }

  return (

    <main>
      <section>
        <div className="chart-container">
          <div className="chart-title">
            <h1>Carrito</h1>
            <p>[{count}]</p>
          </div>
          {pintarProductos()}
          <div className="total-cont">
            <div className="total">
              <h2>Total</h2>
            </div>
            <div className="chart-total">
              <p>${precio}</p>
            </div>
          </div>
        </div>
      </section>
    </main>


  )
}
