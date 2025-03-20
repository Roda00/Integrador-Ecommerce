
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


function App() {

  const URL = `https://67daa41535c87309f52d63af.mockapi.io`

  const [pianos, setPianos] = useState([])



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

  return (
    <>
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/" element={<Index pianos={pianos}/>} />
          <Route path="/Contacto" element={      <Contacto />    } />
          <Route path="/About-us" element={      <Acerca_de_nosotros />    } />
          <Route path="/Register" element={      <Register sendRegister={sendRegister} />    } />
          <Route path="/Admin-products" element={      <Admin />    } />
        </Routes>
      <Footer />
      </BrowserRouter>

    </>
  )
}

export default App
