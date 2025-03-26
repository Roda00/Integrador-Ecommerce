
import './Header.css'
import { NavLink } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faUser } from '@fortawesome/free-solid-svg-icons'
import { useOrder } from '../context/OrderContext'


export default function Header() {

    const {count, toggleCart} = useOrder()

    
    
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
                            <a className='user-cart' onClick={() => toggleCart()}>
                            <FontAwesomeIcon icon={faCartShopping} />
                            {count > 0 && <span className="cart-count">{count}</span>}
                            </a>
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
