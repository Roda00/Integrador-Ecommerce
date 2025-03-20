import React from 'react'
import './Footer.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram, faSquareFacebook, faWhatsapp } from '@fortawesome/free-brands-svg-icons'

export default function Footer() {
  return (
    <footer>
  <div className="footer-container">
    <div className="footer-column footer-column-1">
      <div className="icon-container">
        <FontAwesomeIcon icon={faSquareFacebook} />
        <p>Pianissimo Ventas</p>
      </div>
      <div className="icon-container">
        <FontAwesomeIcon icon={faInstagram} />
        <p>Pianissimo_Ventas</p>
      </div>
      <div className="icon-container">
        <FontAwesomeIcon  icon={faWhatsapp}/>
        <p>+54 11 5394-8720</p>
      </div>
    </div>
    <div className="footer-column footer-column-2">
      <img src="/assets/il_fullxfull.3064868461_17q7.png" alt="" />
      <p>2024. Todos los derechos reservados</p>
    </div>
    <div className="footer-column footer-column-3">
      <div className="ubicacion-container">
        <p id="encontranos">Encontranos</p>
        <p>Capital Federal, Av cordoba 1500</p>
      </div>
      <div className="email-container">
        <p id="contactanos">Contactanos</p>
        <p>Pianissimoventas@gmail.com</p>
      </div>
      <div className="newsletter-container">
        <form action="">
          <label htmlFor="email-footer" id="newsletter">
            Recibi noticias de nuevos ingresos
          </label>
          <div className="input-flex-cont">
            <input
              id="email-footer"
              placeholder="ingresa tu email..."
              type="email"
              name="email newsletter"
              required=""
            />
            <button>Enviar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</footer>

  )
}
