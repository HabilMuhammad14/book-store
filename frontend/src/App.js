import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import Search from './pages/Search.jsx'
import Detail from './pages/Detail.jsx'
import Cart from './pages/Cart.jsx'
import Orders from './pages/Orders.jsx'

export default function App() {
  const [cart, setCart] = useState([])

  return (
    <>
      <Navbar cart={cart} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/book/:key" element={<Detail cart={cart} setCart={setCart} />} />
        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
    </>
  )
}