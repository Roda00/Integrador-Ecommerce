
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

function App() {

  const URL = `https://67daa41535c87309f52d63af.mockapi.io`

  const [pianos, setPianos] = useState([])


  const [userEditado, setUserEditado] = useState(null)


  useEffect(() => {

    getPianos()

  }, [])

  async function getPianos() {

    try {
      const response = await axios.get(`${URL}/Pianos`)

      setPianos(response.data)



    } catch (error) {
      console.log(error)
    }
    
  }

  async function sendRegister(data) {

    try {
      const send = await axios.post(`${URL}/Usuarios`, data )

      console.log(send)

    } catch (error) {
      console.log(error)
    }
  }
  async function sendForm(data) {

    try {
      const send = await axios.post(`${URL}/Pianos`, data )
      getPianos()
      console.log(send)

    } catch (error) {
      console.log(error)
    }
  }

  async function editForm(data) {

    try {
      const send = await axios.put(`${URL}/Pianos/${data.id}`, data )
      getPianos()

    } catch (error) {
      console.log(error)

    }
  }
  async function deleteProduct(data) {

    try {
      const send = await axios.delete(`${URL}/Pianos/${data.id}`)
      
      getPianos()

    } catch (error) {
      console.log(error)

    }
  }

  return (
    <>
      <BrowserRouter>
      <Header />
      <OrderModal/>
        <Routes>
          <Route path="/" element={<Index pianos={pianos}/>} />
          <Route path="/Contacto" element={      <Contacto />    } />
          <Route path="/About-us" element={      <Acerca_de_nosotros />    } />
          <Route path="/Register" element={      <Register sendRegister={sendRegister} />    } />
          <Route path="/Admin-products" element={      <Admin pianos={pianos} sendForm={sendForm} editForm={editForm}  deleteProduct={deleteProduct}  />    } />
          <Route path="/Piano-product/:id" element={      <Piano pianos={pianos}/>   } />
          <Route path="/Cart" element={      <Order  />    }/>
          <Route path="/Admin-users" element={      <Admin_Users sendRegister={sendRegister} />    }/>
        </Routes>
      <Footer />
      </BrowserRouter>

    </>
  )
}

export default App
