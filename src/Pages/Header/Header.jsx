import React from 'react'
import './Header.css'
import { NavLink } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faUser } from '@fortawesome/free-solid-svg-icons'


export default function Header() {
    return (
        <header>
            <nav>
                <ul className="nav-list">
                    <div className="logo-container">
                        <img id="img-1" src="../assets/il_fullxfull.3064868461_17q7.png" alt="" />
                        <img id="img-2" src="../assets/il_fullxfull.3064868461_17q7.png" alt="" />
                    </div>
                    <div className="burger-menu-container">
                        <label htmlFor="burger-menu" />
                        <input className="burger-menu" id="burger-menu" type="checkbox" />
                        <div className="nav-burger-menu-cont">
                            <ul>
                                <li className="nav-item">
                                    <a href="/index.html">Principal</a>
                                </li>
                                <li className="nav-item">
                                    <a href="/Pages/Register.html">Registro</a>
                                </li>
                                <li className="nav-item">
                                    <a href="/Pages/Contacto.html">Contacto</a>
                                </li>
                                <li className="nav-item">
                                    <a href="/Pages/Acerca de nosotros.html">Acerca de nosotros</a>
                                </li>
                                <li className="nav-item">
                                    <a href="/Pages/Administrador.html">Admin productos</a>
                                </li>
                            </ul>
                    </div>
                    </div>
                    <div className="nav-items-container">
                        <li className="nav-item">
                            <NavLink to={"/"}>Principal</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/Register">Registro</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/Contacto">Contacto</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/About-us">Acerca de nosotros</NavLink>
                        </li>
                        <li className="nav-item">
                           <NavLink to="/Admin-products">Admin productos</NavLink>
                        </li>
                    </div>
                    <div className="section-user">
                        <div className="shopping-cart">
                            <FontAwesomeIcon icon={faCartShopping} />
                        </div>
                        <div className="user-icon">
                            <FontAwesomeIcon icon={faUser} />
                        </div>
                    </div>
                </ul>
            </nav>
        </header>
    )
}
