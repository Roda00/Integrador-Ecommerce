import React from 'react'
import "./userModal.css"
import { Link } from 'react-router'
import { useUser } from '../context/UserContext'
import Swal from 'sweetalert2'

export default function UserModal() {

    const { user, logout } = useUser()

    function handleLogOut() {
        Swal.fire({
                    title: "¿Confirmas que quieres cerrar sesión ?",
                    icon: "warning",
                    showCancelButton: true,
                    cancelButtonText: "Cancelar",
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Si, seguro"
                }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire({
                            title: "Cerraste sesión",
                            icon: "success"
                        });
                        logout()
                    }
                });
    }

    return (
        
        <div className="modal-cont">
            <div className="modal">
            { user ? 
                <div className="logout">
                    <a onClick={() => handleLogOut()}>Log out</a>
                </div>
            :

                <div className="login">
                    <Link to={"/Login"}>Log in</Link>
                </div>
        
        }
            </div>
        </div>

    )
}
