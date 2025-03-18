import React from 'react'
import '../css/contacto.css'
import '../css/register.css'
import '../css/styles.css'

export default function Contacto() {
  return (
    <main>
        <main>
            <h1>Contacto</h1>
            <div className="border-bottom-cont" />
            <div className="contacto-container">
                <div className="form-cont">
                    <form action="">
                        <label htmlFor="nombre">Nombre completo</label>
                        <input
                            maxLength={35}
                            placeholder="Nombre Completo"
                            type="text"
                            id="nombre"
                            name="Username"
                            required=""
                        />
                        <label htmlFor="email">Email</label>
                        <input
                            required=""
                            placeholder="Email"
                            type="email"
                            id="email"
                            name="email"
                        />
                        <label htmlFor="mensaje">Dejá tu mensaje</label>
                        <textarea name="mensaje" id="mensaje" defaultValue={""} />
                        <div className="contacto-submit">
                            <input defaultValue="Contactar" id="submit" type="submit" />
                        </div>
                    </form>
                </div>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.185168553137!2d-58.387989999999995!3d-34.59947890000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccac759b43619%3A0x91ce346a86ee7b78!2sAv.%20C%C3%B3rdoba%201500%2C%20C1055AAR%20Cdad.%20Aut%C3%B3noma%20de%20Buenos%20Aires!5e0!3m2!1ses-419!2sar!4v1730340956631!5m2!1ses-419!2sar"
                    width={600}
                    height={450}
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                />
            </div>
        </main>
    </main>
    )
}