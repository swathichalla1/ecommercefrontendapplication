import React from 'react'
import {useNavigate,Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = (props) => {
  const {field} = props
const navi = useNavigate();

  const logout = ()=>{
    if (field==="user"){
      Cookies.remove("UserToken");
    }
    else{
      Cookies.remove("AdminToken");
      localStorage.removeItem("Adminidentity")
      localStorage.removeItem("AdminToken");
    }
    
    navi("/")
}

  return (
    <div className="header">
      <h1 className="logo">Shop Mart</h1>
      {field==="user" && <Link to="/Cart"><h3>View Cart</h3></Link>}
      
      <button className="submitButton" onClick={logout}>Logout</button>
    </div>
  )
}

export default Header
