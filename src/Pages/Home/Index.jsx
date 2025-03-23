import React from 'react'
import '../css/styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCertificate, faHeadset, faTruck, faWallet } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router'

export default function Index({ pianos }) {

    const pianosDeCola = pianos.filter((piano) => 

        piano.categoria === "Piano de cola"

    )


    const pianosVerticales = pianos.filter((piano) => 

        piano.categoria === "Piano vertical"

    )

function pintarPianosDeCola() {
    
    return pianosDeCola.map((piano) => { 
        
        console.log(piano
        )
        
        return (
            <article>
                <div className="piano-container" key={piano.id}>
                    <div className="piano-image-container">
                    <NavLink to={`/Piano-product/${piano.id} `} className="ver-mas">Ver mas </NavLink> 
                        <img
                            src={piano.image}
                            alt=""
                        />
                    </div>
                    <div className="description-container">
                        <h3>{piano.nombre}</h3>
                        <p>
                            {piano.descripcion}
                        </p>
                        <p>
                        </p>
                        <div className="comprar-button-container">
                            <a href="">Comprar</a>
                            <p>${piano.precio}</p>
                        </div>
                    </div>
                </div>
            </article>
        )
    })

  
    
}


function pintarPianosVerticales() {

    return pianosVerticales.map((piano) => {
        

        return (
        <article>
            <div className="piano-container" key={piano.id}>
                <div className="piano-image-container">
                <NavLink to={`/Piano-product/${piano.id}`} className="ver-mas">Ver mas </NavLink> 
                    <img
                        src={piano.image}
                        alt=""
                    />
                </div>
                <div className="description-container">
                    <h3>{piano.nombre}</h3>
                    <p>
                        {piano.descripcion}
                    </p>
                    <p>
                    </p>
                    <div className="comprar-button-container">
                        <a href="">Comprar</a>
                        <p>${piano.precio}</p>
                    </div>
                </div>
            </div>
        </article>
        )
    })


}
    




    return (
        <>
            <main>
                <div className="banner-container">
                    <img
                        src="https://cdn-blog.superprof.com/blog_ar/wp-content/uploads/2023/04/pianos-mas-caros-2-scaled.jpg"
                        alt="Piano de cola"
                    />
                </div>
                <h2>Pianos de cola</h2>
                <div className="border-bottom-cont" />
                <div className="piano-product-container">
                        {pintarPianosDeCola()}
                </div>
                <h2>Pianos verticales</h2>
                <div className="border-bottom-cont" />
                <div className="piano-product-container">
                    {pintarPianosVerticales()}
                </div>
                <div className="features-container">
                    <div className="feature-container-all feature-1">
                        <FontAwesomeIcon icon={faWallet} />
                        <p>La mejor financiación</p>
                    </div>
                    <div className="feature-container-all feature-2">
                        <FontAwesomeIcon icon={faTruck} />
                        <p>Envios a todo el país</p>
                    </div>
                    <div className="feature-container-all feature-3">
                        <FontAwesomeIcon icon={faCertificate} />
                        <p>Garantia por 5 años</p>
                    </div>
                    <div className="feature-container-all feature-4">
                        <FontAwesomeIcon icon={faHeadset} />
                        <p>Atención personalizada</p>
                    </div>
                </div>
            </main>

        </>
    )
}
