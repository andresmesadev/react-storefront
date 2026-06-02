import NavBar from "./components/layout/Navbar"
import ProductList from "./components/products/ProductList"
import HomePage from "./pages/Home"
import ProductDetailPage from "./pages/ProductDetail"
import { Navigate, Route, Routes } from "react-router-dom"
import CartProvider from "./context/CartContext"
import CartPage from "./pages/Cart"
import CheckoutPage from "./pages/Checkout"


function App() {
  
  return (
    <>
    <CartProvider>
      <NavBar icon="https://www.mattelsa.net/media/Home/LogoMattelsa.svg"/>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />}/>
        <Route path="/home" element={<HomePage />} />
        <Route path="/cart" element={<CartPage/>} />
        <Route path="/category/:categoryName" element={<ProductList/>}/>
        <Route path="/item/:id" element={<ProductDetailPage/>}/>
        <Route path="/formulario" element={<CheckoutPage/>}></Route>
      </Routes>
      </CartProvider>
    </>
  )
}

export default App
