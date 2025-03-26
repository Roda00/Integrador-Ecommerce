import { createContext, use, useContext, useEffect, useState } from "react";


const OrderContext = createContext();

export const useOrder = () => useContext(OrderContext);
function OrderProvider({ children }) {
    const [cart, setCart] = useState([]); // guardar los productos 

    const [isOpen, setIsOpen] = useState(false); // estado para abrir y cerrar el carrito

    const [total, setTotal] = useState(0); // total de la compra

    const [count, setCount] = useState(0); // cantidad de productos en el carrito



    useEffect(() => {

        let contador = 0;
        let total = 0;

        cart.forEach((item) => {

            contador += item.quantity;
            total += item.precio * item.quantity;
            
        })
        

        setCount(contador);
        setTotal(total);
        
        console.log("Carrito actualizado:", cart);
        console.log("Total actualizado:", total);

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

        console.log("Producto agregado:", piano);
        console.log("Estado del carrito:", cart);
    }


    return (
        <OrderContext.Provider
            value={{
                cart,
                total,
                isOpen,
                toggleCart,
                addCart,
                count
            }}
        >
            {children}
        </OrderContext.Provider>
    )
}

export default OrderProvider;


