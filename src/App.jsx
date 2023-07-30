
import './App.css'

import {BrowserRouter as Router ,Routes,Route} from "react-router-dom"
import {
   Home,
  About,
  Cart,
  Error,
  SingleProduct,
  PrivateRouth,
  AuthWrapper,
  Products,
  CheckOutPage
} from "./pages"
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Footer from './components/Footer'
function App() {

  return (
    <>
  
    <Router>
      <Navbar/>
      <Sidebar/>
    <Routes>
      <Route path='/' exact element={<Home/>}/>
      <Route path='about' element={<About/>}/>
      <Route path='cart' element={<Cart/>}/>
      <Route path='products' element={<Products/>}/>
      <Route path='products/:id' element={<SingleProduct/>}/>
      <Route path='checkout' element={<CheckOutPage />}/>
      <Route path='error' element={<Error/>}/>
    </Routes>
    <Footer/>
    </Router>

    </>
  )
}

export default App
