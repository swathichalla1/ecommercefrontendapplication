import React,{createContext,useState} from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import HomePage from './components/HomePage'
import UserRegistration from './components/UserRegistration'
import UserLogin from './components/UserLogin'
import AllProducts from './components/AllProducts'
import AdminRegistration from './components/AdminRegistration'
import AdminLogin from './components/AdminLogin'
import AddProducts from './components/AddProducts'
import Cart from './components/Cart'
import ProductsAddedByAdmin from './components/ProductsAddedByAdmin'

import './index.css'


export const store = createContext();

const App = ()=>{
dgasdgajvfdujgavsdjas
  const [cartitems,setcartitems] = useState([]);

  return(
    
    <BrowserRouter>
    <store.Provider  value={{cartitems,setcartitems}}>
    <Routes>
    <Route path="/" element={<HomePage/>}/>
    <Route exact path="/UserRegistration" element={<UserRegistration/>}/>
    <Route exact path="/UserLogin" element={<UserLogin/>}/>
    <Route exact path="/AllProducts" element={<AllProducts/>}/>
    <Route exact path="/AdminRegistration" element={<AdminRegistration/>}/>
    <Route exact path="/AdminLogin" element={<AdminLogin/>}/>
    <Route exact path="/AddProducts" element={<AddProducts/>}/>
    <Route exact path="/Cart" element={<Cart/>}/>
    <Route exact path="/ProductsAddedByAdmin" element={<ProductsAddedByAdmin/>}/>
    
    </Routes>
    </store.Provider>
    </BrowserRouter>
  )
}
export default App