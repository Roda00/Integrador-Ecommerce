import { createContext, useContext, useEffect, useState } from "react";
import { set } from "react-hook-form";

const OrderContext = createContext();



export const useOrder = () => useContext(OrderContext);

function OrderProvider({ children }) {

    const [isOpen, setIsOpen] = useState(false); // me va a servir para mostrar o no o el sidebar

    const [ cart, setCart ] = useState([]) // me va a servir para guardar los productos que el usuario va a agregar al carrito

    const [total, setTotal] = useState(0); // me va a servir para guardar el total de la compra

    const [count, setCount] = useState(0); // me va a servir para contar la cantidad de productos que el usuario va a agregar al carrito

    useEffect(() => {

        // Cada vez que el carrito cambie, quiero que se actualice el contador
        let contador = 0
        let total = 0

        cart.forEach((item) => {
            contador += item.quantity
            total += item.quantity * item.price
        })

        setCount(contador)
        setTotal(total)

    }, [cart])

    function toggleCart(){
        console.log("Toggle cart");
        setIsOpen(!isOpen);
    }

    function addPost(post) {
        // Tengo que checkear si el post ya fue agregado al carrito
        // Si ya fue agregado, tengo que incrementar la cantidad
        // Si no fue agregado, tengo que agregarlo al carrito
        // entonces busco si hay algun post en la cart con un find que tenga el mismo id del post que quiero agregar 

        const postInCart = cart.find((item) => item.id === post.id);

        if(!postInCart){
            post.quantity = 1; // si no esta en el carrito, le agrego la cantidad
            post.price = parseInt(Math.random() * 50000); // le agrego un precio randomq

            setCart([...cart, post]); // Los tres puntos son para que no se sobreescriba el carrito, ya que el setCart reemplaza el carrito y los puntos significan que se agregue el post al carrito teniendo en cuenta los productos que ya estaban en el carrito
        } else {
            postInCart.quantity += 1; // si ya esta en el carrito, le sumo uno a la cantidad
        }

        setCart([...cart, post]);
    }

    return (
        <OrderContext.Provider
        value={{ 
            cart, // Arrayt de prodcuts 
            toggleCart, // funcion para abrir y cerrar el sidebar
            isOpen,  // estado del carrito
            addPost, // funcion para agregar productos al carrito
            count, 
            total


            
        }}>
            
            {children}
        </OrderContext.Provider>
    )

}

export default OrderProvider;