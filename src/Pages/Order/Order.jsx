import React from 'react'
import './Order.css'
import { useOrder } from '../../Components/context/OrderContext'

export default function Order() {

  const { count, total, cart } = useOrder()

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
            <div className="quantity">
              <p>{item.quantity}</p>
            </div>
            <div className="product-color">
                <img src={item.selectedColor} alt="" />
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
