import React from 'react'
import './order.css'
import { useOrder } from '../../Components/context/OrderContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import Swal from 'sweetalert2'
import axios from 'axios'
import { useUser } from '../../Components/context/UserContext'

export default function Order() {

  const { count, total, cart, disminuirCantidad, aumentarCantidad, vaciarCarrito } = useOrder()

  const { user, token } = useUser()

  const precio = total.toLocaleString("es-AR")

  const URL = import.meta.env.VITE_API_URL

  function handleVaciarCarrito() {

    Swal.fire({
      title: "¿Estas seguro de vaciar tu orden?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, vaciar",
    }).then((result) => {
      if (result.isConfirmed) {
        vaciarCarrito()
        Swal.fire({
          title: "Borrado",
          text: "Tu carrito a sido vaciado",
          icon: "success"
        });
      }
    });

  }

  async function createOrder() {

    try {

      const products = cart.map((item) => {
        return {
          product: item._id,        
          quantity: item.quantity,  
          precio: item.precio       
        };
      });
      const response = await axios.post(`${URL}/orders`, {
        user: user,
        products: products,
        total: total
      }, {
        headers: {
          access_token: token
        }

      })
      Swal.fire({
        title: "Orden creada",
        text: "Tu orden fue creada con exito",
        icon: "success"
      })

    } catch (error) {
      console.error("Error al crear la orden:", error);

    }

  }

  async function getOrders() {

    try {
      const response = await axios.get(`${URL}/orders`,{
        headers: {
          access_token: token
        }
      })
      const orders = response.data;
      console.log(orders);

    } catch (error) {
      console.error("Error al obtener las ordenes:", error);
    }

  }


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
          {cart.length > 0 && (
            <div className="btns-cont">

              <button className="btn-vaciarcart" onClick={() => handleVaciarCarrito()}>
                <p>Vaciar Carrito</p>
              </button>
              <button className="btn-finalizar" onClick={() => {createOrder(); getOrders(); vaciarCarrito()}}>
                <p>Finalizar Compra</p>
              </button>
            </div>

          )}


        </div>
      </section>
    </main>


  )
}
