import React, { useEffect, useState } from 'react'
import '../css/administrador.css'
import '../css/styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'
import { useUser } from '../../Components/context/UserContext'


export default function Admin_products({ pianos, sendForm, editForm, deleteProduct }) {

    const URL = import.meta.env.VITE_FILES_URL


    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

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

                <tr key={pianos._id}>
                    <td className="image-cell">
                        <img
                            src={`${URL}/products/${pianos.image[0]}`}
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

                <tr key={pianos._id}>
                    <td className="image-cell">
                        <img
                            src={`${URL}/products/${pianos.image[0]}`}
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
            setValue('image', productoEditado.image[0, 1])
            setValue('descripcion', productoEditado.descripcion)
            setValue('precio', productoEditado.precio)
            setValue('color1', productoEditado.color)
            setValue('categoria', productoEditado.categoria)

        }



    }, [productoEditado])

    const onSubmit = (data) => {

        const formData = new FormData()


        formData.append('nombre', data.nombre)
        formData.append('descripcion', data.descripcion)
        formData.append('precio', data.precio)
        formData.append('categoria', data.categoria)

        if (data.image?.length) {
            for (let i = 0; i < data.image.length; i++) {
                formData.append('image', data.image[i])
            }
        }

        if (data.color?.length) {

            for (let i = 0; i < data.color.length; i++) {
                formData.append('color', data.color[i])
            }
        }


        
        if (productoEditado) {
            editForm(productoEditado, formData)
            Swal.fire({
                icon: 'success',
                title: 'Producto editado correctamente',
                showConfirmButton: false,
                timer: 1500
            });
            
        } else {
            sendForm(formData)
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
                <div className="form-agregar-productos" >
                    <form className='form-product' action="" onSubmit={handleSubmit(onSubmit)}>
                        <fieldset>
                            <legend>Agregar Pianos</legend>
                            <label htmlFor="">Nombre</label>
                            <input {...register('nombre', { required: "Ingresa el nombre del producto" })}
                                type="text"
                                placeholder='Nombre del producto' />
                            {errors.nombre && <p className='error'>{errors.nombre.message}</p>}

                            <label htmlFor="">Imagen principal</label>
                            <input {...register('image', { required: "Ingresa la URL de la imagen principal" })}
                                type='file'
                                accept='image/*'
                                multiple

                            />
                            {errors.image && <p className='error'>{errors.image.message}</p>}

                            <label htmlFor="">Descrpción</label>
                            <textarea {...register('descripcion', { required: "Ingresa la descripción del producto" })}
                                placeholder='Descripción del producto'
                            />
                            {errors.descripcion && <p className='error'>{errors.descripcion.message}</p>}

                            <label htmlFor="">Precio</label>
                            <input {...register('precio', { required: "Ingresa el precio del producto" })}
                                type="number"
                                placeholder='Precio del producto'
                                id='precio' />
                            {errors.precio && <p className='error'>{errors.precio.message}</p>}

                            <label htmlFor="">Color </label>
                            <input {...register('color', { required: "Ingresa el link del color primario" })}
                                type="file"
                                accept='image/*'
                                multiple
                            />
                            {errors.color1 && <p className='error'>{errors.color1.message}</p>}

                            <label htmlFor="">Categoria</label>
                            <select {...register('categoria', { required: "Ingresa la categoria del piano" })}>
                                <option value="Piano de cola">Piano de cola</option>
                                <option value="Piano vertical">Piano vertical</option>
                            </select>

                            <div className="btn-cont">
                                <button id='submit' type='submit'>
                                    {productoEditado ? "Editar producto" : "Agregar producto"}
                                </button>
                            </div>
                        </fieldset>
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
