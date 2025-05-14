import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";



const UserContext = createContext()

export const useUser = () => useContext(UserContext)


function UserProvider({ children }) {
    
    const navigate = useNavigate()

    const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
});

    const [token, setToken] = useState(() => {
    const storedToken = localStorage.getItem("token");
    return storedToken ? JSON.parse(storedToken) : null;
});

    


    useEffect(() => {

        user ? localStorage.setItem("user", JSON.stringify(user)) :
            localStorage.removeItem("user")

        token ? localStorage.setItem("token", JSON.stringify(token)) :
            localStorage.removeItem("token")

    }, [user, token])

    
    async function login(data) {


        const URL = import.meta.env.VITE_API_URL

        try {
            const response = await axios.post(`${URL}/login`, data)
            
            const { user, token } = response.data

            setUser(user)
            setToken(token)

            Swal.fire({
                icon: 'success',
                title: 'Login exitoso',
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                if (user.role === "admin") {
                    navigate("/")
                } else {
                    navigate("/")
                }
            })

        } catch (error) {
            console.error("login error:", error);
            Swal.fire({
                icon: 'error',
                text: 'Usuario o contraseña incorrectos',
                footer: '<a href="">Olvidaste tu contraseña?</a>'
            })
        }
    }

    function logout() {
        setUser(null)
        setToken(null)
    }


    return (
        <UserContext.Provider value={{login, user, token, logout}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider
