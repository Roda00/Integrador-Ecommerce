import React from 'react'
import '../css/about-us.css'
import '../css/styles.css'


export default function Acerca_de_nosotros() {
    return (
        <main>
            <div className="banner-container">
                <img
                    src="https://img.freepik.com/fotos-premium/cerca-teclado-piano-cola-clasico_908985-23915.jpg"
                    alt="Piano de cola"
                />
            </div>
            <div className="about-us-container">
                <h2>Nuestro objetivo</h2>
                <div className="border-bottom-cont" />
                <div className="img-details">
                    <p>
                        En nuestra casa de pianos, creemos que la música tiene el poder de
                        conectar y transformar.
                    </p>
                    <img
                        src="https://concepto.de/wp-content/uploads/2023/01/piano.jpg"
                        alt=""
                    />
                </div>
                <h2>Nuestro propósito</h2>
                <div className="border-bottom-cont" />
                <div className="img-details-2">
                    <p>
                        Va más allá de la simple venta de pianos: buscamos ser el puente entre
                        la música y quienes desean hacerla parte de su vida. Nos mueve la pasión
                        por el sonido cálido y expresivo de un piano, y estamos aquí para ayudar
                        a que más personas descubran la magia que puede traer a un hogar, a una
                        sala de concierto, o a una vida entera.
                    </p>
                    <img
                        src="https://jorquerapianos.com/wp-content/uploads/2023/08/mejor-lugar-para-colocar-tu-piano.jpg"
                        alt=""
                    />
                </div>
                <h2>Nuestros clientes</h2>
                <div className="border-bottom-cont" />
                <div className="img-details">
                    <p>
                        Desde estudiantes que tocan sus primeras notas hasta pianistas que
                        buscan perfeccionar su talento, ofrecemos asesoría cercana y honesta,
                        con la intención de encontrar el piano adecuado para cada camino
                        musical. No importa si se trata de un piano de estudio o uno de
                        concierto, nuestra misión es aportar al desarrollo de una cultura
                        musical vibrante y accesible.
                    </p>
                    <img
                        src="https://i.multisononline.com/img/varios/cola/joven-estudiante-colin-gb1k.webp"
                        alt=""
                    />
                </div>
                <h2>Nuestra finalidad</h2>
                <div className="border-bottom-cont" />
                <div className="img-details-2">
                    <p>
                        Queremos que cada persona que entra en contacto con nosotros sienta que
                        la música es un lenguaje universal y, sobre todo, una fuente de
                        inspiración y disfrute que podemos compartir juntos.
                    </p>
                    <img
                        src="https://cdndigital.march.es/fedora/objects/fjm-foto:104745/datastreams/JPG1200/content"
                        alt=""
                    />
                </div>
                <h2>Integrantes del equipo</h2>
                <div className="border-bottom-cont" />
                <div className="equipo">
                    <div className="img-details">
                        <img src="/assets/DSC_0340-Enhanced-NR.jpg" alt="" />
                    </div>
                    <div className="equipo-integrante">
                        <h3>Alejandro Felipe Doce</h3>
                        <p>
                            Estudiante de Licenciatura en piano en UNL, Fotografo, Programador
                            Full-Stack en progreso
                        </p>
                    </div>
                </div>
            </div>
        </main>

    )
}
