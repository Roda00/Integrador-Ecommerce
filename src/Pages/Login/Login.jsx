import React from 'react'
import { useForm } from 'react-hook-form'
import './Login.css'
import axios from 'axios'
import { useUser } from '../../Components/context/UserContext'
import Swal from 'sweetalert2'

export default function Login() {

    const URL = import.meta.env.VITE_API_URL

    const { register, handleSubmit, formState: { errors, isValid } } = useForm()

    const { login } = useUser()


    return (

        <main className="main-login">
            <h1>Login</h1>
            <form className='login-form' onSubmit={handleSubmit(login)}>
                <div className="login-email-container">
                    <label htmlFor="email">Email</label>
                    <input
                        {...register("email", { required: "Ingresa un email" })}
                        pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                        placeholder="Email"
                        type="email"
                        id="email"
                    />
                    {errors.email && <p className='error'>{errors.email.message}</p>}
                </div>

                <div className="login-password-container">
                    <label htmlFor="password">Contraseña</label>
                    <input
                        {...register("password", {
                            required: "Ingresa tu contraseña",
                        })}
                        placeholder="Contraseña"
                        type="password"
                        id="contraseña"
                    />
                    {errors.password && <p className='error'>{errors.password.message}</p>}
                </div>

                <button type="submit" id='submit' >Login</button>
            </form>
        </main>

    )



}
