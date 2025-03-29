import React, { useEffect, useState } from 'react'
import '../css/administrador.css'
import '../css/styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'


export default function Admin_products({ pianos, sendForm, editForm, deleteProduct }) {


    const { register, handleSubmit, reset, setValue } = useForm();

    const [productoEditado, setProductoEditado] = useState(null)

    const pianosDeCola = pianos.filter((piano) =>

        piano.categoria === "Piano de cola"

    )


    const pianosVerticales = pianos.filter((piano) =>

        piano.categoria === "Piano vertical"

    )


    function seleccionarProducto(producto) {
        setProductoEditado(producto)
    }

    function pintarTablePianosDeCola() {

        return pianosDeCola.map((pianos) => {

            return (

                <tr>
                    <td className="image-cell">
                        <img
                            src={pianos.image}
                            alt=""
                        />
                    </td>
                    <td className="name-cell">{pianos.nombre}</td>
                    <td className="description-cell">
                        {pianos.descripcion.split('||')}
                    </td>
                    <td className="price-cell">{pianos.precio.toLocaleString("es-AR")}</td>
                    <td className="tools-cell">
                        <button onClick={() => seleccionarProducto(pianos)}>
                            <FontAwesomeIcon icon={faPen} id="editar-icono" />
                        </button>
                        <button onClick={() => handleDeleteProduct(pianos)}>
                            <FontAwesomeIcon icon={faTrash} id="borrar-icono" />
                        </button>
                    </td>
                </tr>

            )




        })
    }
    function pintarTablePianosVerticales() {

        return pianosVerticales.map((pianos) => {

            return (

                <tr>
                    <td className="image-cell">
                        <img
                            src={pianos.image}
                            alt=""
                        />
                    </td>
                    <td className="name-cell">{pianos.nombre}</td>
                    <td className="description-cell">
                        {pianos.descripcion.split('||')}
                    </td>
                    <td className="price-cell">{pianos.precio.toLocaleString("es-AR")}</td>
                    <td className="tools-cell">
                        <button onClick={() => seleccionarProducto(pianos)}>
                            <FontAwesomeIcon icon={faPen} id="editar-icono" />
                        </button>
                        <button onClick={() => handleDeleteProduct(pianos)}>
                            <FontAwesomeIcon icon={faTrash} id="borrar-icono" />
                        </button>
                    </td>
                </tr>

            )




        })
    }


    function handleDeleteProduct(pianos) {

        Swal.fire({
            title: "¿Estas seguro de eliminar este producto?",
            icon: "warning",
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, seguro"
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title: "Borrado!",
                text: "El piano a sido eliminado",
                icon: "success"
            });
            deleteProduct(pianos)
            }
          });

    }

    useEffect(() => {

        if (productoEditado) {


            setValue('nombre', productoEditado.nombre)
            setValue('image', productoEditado.image)
            setValue('image2', productoEditado.image2)
            setValue('descripcion', productoEditado.descripcion)
            setValue('precio', productoEditado.precio)
            setValue('color1', productoEditado.color1)
            setValue('color2', productoEditado.color2)
            setValue('categoria', productoEditado.categoria)

        }



    }, [productoEditado])

    const onSubmit = (data) => {
        if (productoEditado) {
            data.id = productoEditado.id
            editForm(data)
            Swal.fire({
                icon: 'success',
                title: 'Producto editado correctamente',
                showConfirmButton: false,
                timer: 1500
            }); } else {
                sendForm(data)
                Swal.fire({
                    icon: 'success',
                    title: 'Producto agregado correctamente',
                    showConfirmButton: false,
                    timer: 1500
                });
            }

            setProductoEditado(null);
        reset();

    }




    return (
        <main>
            <h1>Administrador de productos</h1>
            <div className="border-bottom-cont" />
            <div className="tables-container">
                <div className="form-agregar-productos" onSubmit={handleSubmit(onSubmit)}>
                    <form className='form-product' action="">
                        <p>Agregar pianos</p>
                        <label htmlFor="">Nombre</label>
                        <input {...register('nombre', { required: "Ingresa el nombre del producto" })}
                            type="text"
                            placeholder='Nombre del producto'
                        />
                        <label htmlFor="">Imagen principal</label>
                        <input {...register('image', { required: "Ingresa la URL de la imagen principal" })}
                            type='text'
                            placeholder='URL de la imagen'
                        />
                        <label htmlFor="">Imagen secundaria</label>
                        <input {...register('image2', { required: "Ingresa la URL de la imagen secundaria" })}
                            type="text"
                            placeholder='URL de la imagen'
                        />
                        <label htmlFor="">Descrpción</label>
                        <textarea {...register('descripcion', { required: "Ingresa la descripción del producto" })}
                            placeholder='Descripción del producto'
                        />
                        <label htmlFor="">Precio</label>
                        <input {...register('precio', { required: "Ingresa el precio del producto" })}
                            type="number"
                            placeholder='Precio del producto'
                            id='precio'
                        />
                        <label htmlFor="">Color primario</label>
                        <input {...register('color1', { required: "Ingresa el link del color primario" })}
                            type="text"
                            placeholder='Url del color primario'
                        />
                        <label htmlFor="">Color secundario</label>
                        <input {...register('color2')}
                            type="text"
                            placeholder='Url del color secundario'
                        />
                        <label htmlFor="">Categoria</label>
                        <select {...register('categoria', { required: "Ingresa la categoria del piano" })}>
                            <option value="Piano de cola">Piano de cola</option>
                            <option value="Piano vertical">Piano vertical</option>
                        </select>
                        <button id='submit' type='submit'>
                            {productoEditado ? "Editar producto" : "Agregar producto"}
                        </button>
                    </form>
                </div>
                <div className="table-container">
                    <table className='table-admin'>
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
                            {pintarTablePianosDeCola()}
                        </tbody>
                    </table>
                    <table className='table-admin'>
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
                            {pintarTablePianosVerticales()}
                        </tbody>
                    </table>
                </div>
            </div>
        </main>

    )
}
