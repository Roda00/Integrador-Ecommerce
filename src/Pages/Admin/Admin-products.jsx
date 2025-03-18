import React from 'react'
import '../css/administrador.css'
import '../css/styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export default function Admin_products() {
    return (
        <main>
            <h1>Administrador de productos</h1>
            <div className="border-bottom-cont" />
            <div className="tables-container">
                <div className="table-container">
                    <table>
                        <tbody>
                            <tr>
                                <th>Imagen</th>
                                <th>Producto</th>
                                <th>Descripción</th>
                                <th>Precio</th>
                                <th>Acciones</th>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr>
                                <td className="image-cell">
                                    <img
                                        src="https://www.themeandvariations.com.au/pages/wp-content/uploads/2023/08/bose_200_1989.png"
                                        alt=""
                                    />
                                </td>
                                <td className="name-cell">Bosendorfer Grand 200</td>
                                <td className="description-cell">
                                    Uno de los modelos mas populares de la gran familia de pianos
                                    Bosendorfer, el Bösendorfer 200 VC Su tamaño compacto significa un
                                    elemento ideal para salones de medianos.
                                </td>
                                <td className="price-cell">$34.000.000</td>
                                <td className="tools-cell">
                                    <a href="">
                                        <i id="editar-icono" className="fa-solid fa-pen" />
                                    </a>
                                    <a href="">
                                        <i id="borrar-icono" className="fa-solid fa-trash" />
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td className="image-cell">
                                    <img
                                        src="https://www.thepianoshopbath.co.uk/wp-content/uploads/2018/01/KawaiGL10.jpg"
                                        alt=""
                                    />
                                </td>
                                <td className="name-cell">Kawai GL10</td>
                                <td className="description-cell">
                                    Piano acústico de 1/4 cola de 88 notas. resistente aluminio
                                    extruido, y cuenta con el diseño innovador de KAWAI de doble barra
                                    que ofrece mayor solidez y estabilidad.
                                </td>
                                <td className="price-cell">$27.000.000</td>
                                <td className="tools-cell">
                                    <a href="">
                                        <i id="editar-icono" className="fa-solid fa-pen" />
                                    </a>
                                    <a href="">
                                        <i id="borrar-icono" className="fa-solid fa-trash" />
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td className="image-cell">
                                    <img
                                        src="https://http2.mlstatic.com/D_NQ_NP_985308-MLA41210702971_032020-O.webp"
                                        alt=""
                                    />
                                </td>
                                <td className="name-cell">Yamaha Gb1</td>
                                <td className="description-cell">
                                    El GB1K es el piano de cola más compacto de Yamaha. Sin embargo,
                                    aunque su tamaño sea reducido, ofrece un tono resonante y una
                                    delicada facilidad para tocar, siendo mucho más accesible.
                                </td>
                                <td className="price-cell">$13.000.000</td>
                                <td className="tools-cell">
                                    <a href="">
                                        <i id="editar-icono" className="fa-solid fa-pen" />
                                    </a>
                                    <a href="">
                                        <i id="borrar-icono" className="fa-solid fa-trash" />
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td className="image-cell">
                                    <img
                                        src="https://www.themeandvariations.com.au/pages/wp-content/uploads/2023/08/bose_200_1989.png"
                                        alt=""
                                    />
                                </td>
                                <td className="name-cell">Steinway &amp; Sons A</td>
                                <td className="description-cell">
                                    Midiendo 6 pies 2 pulgadas (188 cm), el Modelo A es conocido por
                                    proporcionar un “gran” sonido en un instrumento de escala media.
                                    Este piano de cola ofrece poder y calidez, con un diseño que
                                    permite que la tabla armónica resuene libre y eficientemente.
                                </td>
                                <td>$60.000.000</td>
                                <td className="tools-cell">
                                    <a href="">
                                        <i id="editar-icono" className="fa-solid fa-pen" />
                                    </a>
                                    <a href="">
                                        <i id="borrar-icono" className="fa-solid fa-trash" />
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <table>
                        <tbody>
                            <tr>
                                <th>Imagen</th>
                                <th>Producto</th>
                                <th>Descripción</th>
                                <th>Precio</th>
                                <th>Acciones</th>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr>
                                <td className="image-cell">
                                    <img
                                        src="https://www.coachhousepianos.co.uk/wp-content/uploads/2022/07/bosendorfer_model_120_cl_1_20120614_14258756151.jpg"
                                        alt=""
                                    />
                                </td>
                                <td className="name-cell">Bosendorfer 120</td>
                                <td className="description-cell">
                                    Bösendorfer Grand Upright 120 se adapta a todas las habitaciones y
                                    da rienda suelta a los voluminosos tonos Bösendorfer. Eliminando
                                    cualquier obstáculo a la expresión artística y la articulación,
                                    Bösendorfer ha diseñado una acción con teclas más largas para
                                    optimizar el manejo y el tacto.
                                </td>
                                <td className="price-cell">$26.000.000</td>
                                <td className="tools-cell">
                                    <a href="">
                                        <i id="editar-icono" className="fa-solid fa-pen" />
                                    </a>
                                    <a href="">
                                        <i id="borrar-icono" className="fa-solid fa-trash" />
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td className="image-cell">
                                    <img
                                        src="https://pianospuch.com.ar/wp-content/uploads/2020/10/KAWAI-ND21.png"
                                        alt=""
                                    />
                                </td>
                                <td className="name-cell">Kawai Nd-21</td>
                                <td className="description-cell">
                                    El piano vertical ND-21 ofrece un valor incomparable con un
                                    sonido, tacto y durabilidad excepcionales. Además de la tapa
                                    armónica de abeto macizo, el ND-21 utiliza la exclusiva acción
                                    ultrasensible de Kawai, que combina la artesanía experimentada con
                                    nuestra tecnología de piano de renombre mundial.
                                </td>
                                <td className="price-cell">$29.000.000</td>
                                <td className="tools-cell">
                                    <a href="">
                                        <i id="editar-icono" className="fa-solid fa-pen" />
                                    </a>
                                    <a href="">
                                        <i id="borrar-icono" className="fa-solid fa-trash" />
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td className="image-cell">
                                    <img
                                        src="https://http2.mlstatic.com/D_NQ_NP_805360-MLA50497163520_062022-O.webp"
                                        alt=""
                                    />
                                </td>
                                <td className="name-cell">Yamaha U3</td>
                                <td className="description-cell">
                                    Con su cálido y sólido sonido, así como su capacidad de toque
                                    consistentemente estable, la serie U te envuelve y te permite
                                    sumergirte en el piano desde la primera vez que lo tocas. Este
                                    modelo personifica el piano vertical de Yamaha y encarna un
                                    estándar en pianos que ha madurado durante décadas, heredando las
                                    especificaciones y características fundamentales y manteniendo un
                                    alto aprecio por parte de pianistas profesionales.
                                </td>
                                <td className="price-cell">$23.000.000</td>
                                <td className="tools-cell">
                                    <a href="">
                                        <i id="editar-icono" className="fa-solid fa-pen" />
                                    </a>
                                    <a href="">
                                        <i id="borrar-icono" className="fa-solid fa-trash" />
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td className="image-cell">
                                    <img
                                        src="https://www.tomleemusic.ca/media/catalog/product/cache/6f367da5d9877a0e353f7b78313f76b2/3/4/34100.jpg"
                                        alt=""
                                    />
                                </td>
                                <td className="name-cell">Steinway &amp; Sons K52</td>
                                <td className="description-cell">
                                    Introducido en 1903, este piano cuenta con una tabla armónica más
                                    grande que muchos pianos de cola, para una voz más resonante. La
                                    elección de los intérpretes profesionales que buscan un
                                    instrumento vertical, y perfecto para todo tipo de casas y
                                    departamentos.
                                </td>
                                <td className="price-cell">$32.000.000</td>
                                <td className="tools-cell">
                                    <a href="">
                                        <i id="editar-icono" className="fa-solid fa-pen" />
                                    </a>
                                    <a href="">
                                        <i id="borrar-icono" className="fa-solid fa-trash" />
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </main>

    )
}
