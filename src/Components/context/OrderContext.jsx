import axios from "axios";
import { createContext, use, useContext, useEffect, useState } from "react";


const OrderContext = createContext();

export const useOrder = () => useContext(OrderContext);

function OrderProvider({ children }) {
    const [cart, setCart] = useState([]); // guardar los productos 

    const [isOpen, setIsOpen] = useState(false); // estado para abrir y cerrar el carrito

    const [total, setTotal] = useState(0); // total de la compra

    const [count, setCount] = useState(0); // cantidad de productos en el carrito

    const [orders, setOrders] = useState([]); // guardar las ordenes

    const URL = import.meta.env.VITE_API_URL
    const URL_upload = import.meta.env.VITE_FILES_URL

    useEffect(() => {
        const cartLocalStorage = JSON.parse(localStorage.getItem("cart"))
        if (cartLocalStorage) {
            setCart(cartLocalStorage)
        }
    }, [])


    async function getOrders() {

        try {
            const response = await axios.get(`${URL}/orders`)
            setOrders(response.data)


        } catch (error) {
            console.log(error)
        }
    }
    
    async function createOrder() {

        try {
            const response = await axios.post(`${URL}/orders`, {
            })
            
            orders(response.data)
        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        if (cart.length > 0) {
            localStorage.setItem("cart", JSON.stringify(cart));
        } else {
            localStorage.removeItem("cart")
        }

    }, [cart]);


    function vaciarCarrito() {
        setCart([])
        localStorage.removeItem("cart")
    }

    useEffect(() => {

        let contador = 0;
        let total = 0;

        cart.forEach((item) => {

            contador += item.quantity;
            total += item.precio * item.quantity;

        })


        setCount(contador);
        setTotal(total);

    }, [cart])

    function toggleCart() {
        setIsOpen(!isOpen);
    }

    function addCart(piano, color) {

        const image = `${URL_upload}/products/${piano.image[0]}`

        color = `${URL_upload}/products/${color}` 

        const addToCart = cart.find((item) => item._id === piano._id && item.selectedColor === color)


        if (!addToCart) {
            const newPiano = {
                ...piano,
                image: image,
                selectedColor: color,
                quantity: 1,

                
            }
            setCart([...cart, newPiano])

        } else {

            addToCart.quantity += 1
            setCart([...cart])
        }

    }


    function aumentarCantidad(piano, color) {

        const addToCart = cart.find((item) => item._id === piano._id && item.selectedColor === color)

        addToCart.quantity += 1
        setCart([...cart])

    }
    function disminuirCantidad(piano, color) {

        const addToCart = cart.find((item) => item._id === piano._id && item.selectedColor === color)


        if (addToCart.quantity <= 1) { cart.splice(0, 1) } else {
            addToCart.quantity -= 1
        }
        setCart([...cart])

    }

    return (
        <OrderContext.Provider
            value={{
                cart,
                total,
                isOpen,
                toggleCart,
                addCart,
                count,
                aumentarCantidad,
                disminuirCantidad,
                vaciarCarrito

            }}
        >
            {children}
        </OrderContext.Provider>
    )
}

export default OrderProvider;


