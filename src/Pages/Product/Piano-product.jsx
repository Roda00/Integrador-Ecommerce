import React, { useEffect, useState } from 'react'
import '../css/product-detail.css'
import { useParams } from 'react-router'
import axios from 'axios'
import { useOrder } from '../../Components/context/OrderContext'
import Swal from 'sweetalert2'

const URL = import.meta.env.VITE_API_URL

const URL_UPLOAD = import.meta.env.VITE_FILES_URL

export default function Piano_product() {

  const [product, setProduct] = useState(null)
  const { id } = useParams()

  const [selectedColor, setSelectedColor] = useState({})

  const { addCart } = useOrder()


  useEffect(() => {
    async function getPiano() {

      try {
        const response = await axios.get(`${URL}/products/${id}`)

        setProduct(response.data.product)

        console.log(response.data.product)
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
          src="https://assets.speakcdn.com/assets/1942/steinway-sterling-model-o-ebony-polish-grand-piano-fallboard-logo-keyboard.jpg"
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
                  src={`${URL_UPLOAD}/products/${product.image[0]}`}
                  alt=""
                />
              </li>
              <li>
                <img
                  id="slider-2"
                  src={`${URL_UPLOAD}/products/${product.image[1]}`}
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
              <img
                src={`${URL_UPLOAD}/products/${product.color[0]}`}
                alt=""
                className={selectedColor[product._id] === "color1" ? "active" : ""}
                onClick={() => setSelectedColor({ ...selectedColor, [product._id]: "color1" })}
              />

              {product.color[1] && (
                <img
                  src={`${URL_UPLOAD}/products/${product.color[1]}`}
                  alt=""
                  className={selectedColor[product._id] === "color2" ? "active" : ""}
                  onClick={() => setSelectedColor({ ...selectedColor, [product._id]: "color2" })}
                />
              )}
            </div>
            <div className="buy-button-cont">
              <button
                className="buy-button"
                onClick={() => {
                  if (!selectedColor[product._id]) {
                    Swal.fire("Debe seleccionar un color");
                  } else {
                    const colorIndex = selectedColor[product._id] === "color1" ? 0 : 1;
                    addCart(product, product.color[colorIndex]);
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