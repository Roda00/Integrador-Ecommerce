
import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import Header from './Components/Header/Header'
import Contacto from './Pages/Contacto/Contacto'
import Index from './Pages/Home/Index'
import Footer from './Components/Footer/Footer'
import Acerca_de_nosotros from './Pages/Acerca de nosotros/Acerca_de_nosotros'
import Register from './Pages/Register/Register'
import Admin from './Pages/Admin/Admin-products'
import axios from 'axios'
import { use, useEffect, useState } from 'react'
import Piano from './Pages/Product/Piano-product'
import Pianos_list from './Components/Pianos-list/Pianos-list'
import Order from './Pages/Order/Order'
import OrderModal from './Components/orderModal/OrderModal'
import Admin_Users from './Pages/Admin-Users/Admin-Users'
import Login from './Pages/Login/Login'
import AdminGuard from '../services/guard/AdminGuard'
import UserProfile from './Pages/UserProfile/UserProfile'
import { useUser } from './Components/context/UserContext'

function App() {

  const URL = import.meta.env.VITE_API_URL

  const [pianos, setPianos] = useState([])

  const {token} = useUser()

  const [userEditado, setUserEditado] = useState(null)


  useEffect(() => {

    getPianos()

  }, [])

  async function getPianos() {

    try {
      const response = await axios.get(`${URL}/products`)
      setPianos(response.data.products)



    } catch (error) {
      console.log(error)
    }

  }

  async function sendRegister(data) {

    try {
      const send = await axios.post(`${URL}/users`, data)


    } catch (error) {
      console.log(error)
    }
  }
  async function sendForm(data) {

    try {
      const send = await axios.post(`${URL}/products`, data, {
        headers: {
          access_token: token
        }
      })
      getPianos(send.data.products)

    } catch (error) {
      console.log(error)
    }
  }

  async function editForm(productoEditado, formData) {
    try {


      const response = await axios.put(`${URL}/products/${productoEditado._id}`, formData, {
        headers: {
          access_token: token
        }
      } );


      getPianos();
    } catch (error) {
      console.log(error);
    }
  }


  async function deleteProduct(data) {

    try {
      const send = await axios.delete(`${URL}/products/${data._id}`, {
        headers: {
          access_token: token
        }
      }) 

      getPianos()

    } catch (error) {
      console.log(error)

    }
  }

  return (
    <>
      <Header />
      <OrderModal />
      <Routes>
        <Route path="/" element={<Index pianos={pianos} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Contacto" element={<Contacto />} />
        <Route path="/About-us" element={<Acerca_de_nosotros />} />
        <Route path="/Register" element={<Register sendRegister={sendRegister} />} />
        <Route path="/Admin-products" element={
          <AdminGuard>
            <Admin pianos={pianos} sendForm={sendForm} editForm={editForm} deleteProduct={deleteProduct} />
          </AdminGuard>
        } />
        <Route path="/Piano-product/:id" element={<Piano pianos={pianos} />} />
        <Route path="/Cart" element={<Order />} />
        <Route path="/Admin-users" element={
          <AdminGuard>
            <Admin_Users sendRegister={sendRegister} />
          </AdminGuard>
        } />
      </Routes>
      <Footer />

    </>
  )
}

export default App
