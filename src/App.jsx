
import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import Header from './Pages/Header/Header'
import Contacto from './Pages/Contacto/Contacto'
import Index from './Pages/Home/Index'
import Footer from './Pages/Footer/Footer'
import Acerca_de_nosotros from './Pages/Acerca de nosotros/Acerca_de_nosotros'
import Register from './Pages/Register/Register'
import Admin from './Pages/Admin/Admin-products'

function App() {


  return (
    <>
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/Contacto" element={      <Contacto />    } />
          <Route path="/About-us" element={      <Acerca_de_nosotros />    } />
          <Route path="/Register" element={      <Register />    } />
          <Route path="/Admin-products" element={      <Admin />    } />
        </Routes>
      <Footer />
      </BrowserRouter>

    </>
  )
}

export default App
