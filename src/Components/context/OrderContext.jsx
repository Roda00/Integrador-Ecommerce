import { createContext, use, useContext, useEffect, useState } from "react";


const OrderContext = createContext();

export const useOrder = () => useContext(OrderContext);
function OrderProvider({ children }) {
    const [cart, setCart] = useState([]); // guardar los productos 

    const [isOpen, setIsOpen] = useState(false); // estado para abrir y cerrar el carrito

    const [total, setTotal] = useState(0); // total de la compra

    const [count, setCount] = useState(0); // cantidad de productos en el carrito


    useEffect(() => {
        const cartLocalStorage = JSON.parse(localStorage.getItem("cart"))
        if (cartLocalStorage) {
            setCart(cartLocalStorage)
        }
    }, [])


    
    useEffect(() => {
        if (cart.length > 0) {
            localStorage.setItem("cart", JSON.stringify(cart));
        } else {
            localStorage.removeItem("cart")
        }

    }, [cart]);




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


        const addToCart = cart.find((item) => item.id === piano.id && item.selectedColor === color)

        if (!addToCart) {
            const newPiano = {
                ...piano,
                quantity: 1,
                selectedColor: color

            }

            setCart([...cart, newPiano])

        } else {

            addToCart.quantity += 1
            setCart([...cart])
        }

    }

    function aumentarCantidad(piano, color) {

        const addToCart = cart.find((item) => item.id === piano.id && item.selectedColor === color)

        addToCart.quantity += 1
        setCart([...cart])

    }
    function disminuirCantidad(piano, color) {

        const addToCart = cart.find((item) => item.id === piano.id && item.selectedColor === color)

        console.log("Cantidad actual:", addToCart)

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
                disminuirCantidad

            }}
        >
            {children}
        </OrderContext.Provider>
    )
}

export default OrderProvider;


