import React, { useEffect, useState } from 'react'
import '../css/product-detail.css'
import { useParams } from 'react-router'
import axios from 'axios'
import { useOrder } from '../../Components/context/OrderContext'
import Swal from 'sweetalert2'

const URL = `https://67daa41535c87309f52d63af.mockapi.io`

export default function Piano_product() {

  const [product, setProduct] = useState(null)
  const { id } = useParams()

  const [selectedColor, setSelectedColor] = useState({})

  const { addCart } = useOrder()


  useEffect(() => {
    async function getPiano() {

      try {
        const response = await axios.get(`${URL}/Pianos/${id}`)

        setProduct(response.data)
      } catch (error) {
        console.log(error)
      }
    }

    getPiano()

  }, [])

  if (!product) {
    return <h1>Cargando...</h1>
  }


  const descripcion = product.descripcion.split('||')

  const productPrecio = product.precio.toLocaleString("es-AR")

  return (
    <main>
      <div className="product-banner-container">
        <img
          src={product.banner}
          alt="Piano de cola"
        />
      </div>
      <article>
        <div className="product-piano-cont">
          <div className="piano-image">
            <ul>
              <li>
                <img
                  id="slider-1"
                  src={product.image}
                  alt=""
                />
              </li>
              <li>
                <img
                  id="slider-2"
                  src={product.image2}
                  alt=""
                />
              </li>
            </ul>
          </div>
          <div className="piano-detail-cont">
            <h1>{product.nombre}</h1>
            <p id="price">${productPrecio}</p>
            <p className="piano-description">
              {descripcion[0]}
            </p>
            {descripcion[1] && (
              <>
                <div className="border-bottom-cont" />
                <p className="piano-description">
                  {descripcion[1]}
                </p>
              </>

            )}

            <div className="border-bottom-cont" />
            <h2>Colores disponibles</h2>
            <div className="piano-colors-container">
              <img src={product.color1} alt="" className={selectedColor[product.id] === "color1" ? "active" : ""}
                onClick={() => setSelectedColor({ ...selectedColor, [product.id]: "color1" })} />
              {product.color2 && (
                <img src={product.color2} alt="" className={selectedColor[product.id] === "color2" ? "active" : ""}
                  onClick={() => setSelectedColor({ ...selectedColor, [product.id]: "color2" })} />

              )}
            </div>
            <div className="buy-button-cont">
              <button
                className="buy-button"
                onClick={() => {
                  if (!selectedColor[product.id]) {
                    Swal.fire("Debe seleccionar un color");
                  } else {
                    addCart(product, product[selectedColor[product.id]]);
                  }
                }}
              >
                Comprar
              </button>
            </div>
          </div>
        </div>
      </article>
    </main>
  )
}