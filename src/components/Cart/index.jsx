import React,{useContext} from 'react'
import {store} from '../../App.jsx'
import Header from '../Header'
import './index.css'

  


const Cart = () => {
    const {cartitems} = useContext(store);
    const length = cartitems.length;
    //console.log(cartitems);
  return (
    <>
     <Header field="user"/>
     {length>0 ? <h1 style={{textAlign:"center",color:"blue"}}>Products added to cart</h1> : <h1 style={{textAlign:"center",color:"blue"}}>No Products added to cart</h1>}
     
    <div>
      {cartitems.map((eachitem)=>{
        return(<div key={eachitem._id} className="showcart">
        <>
        <img className="eachitem" src={`http://localhost:5001/uploads/uploads/${eachitem.image}`} alt={"productImage"}/>
        <p className="eachitem">{`Product : ${eachitem.productName}`}</p>
        </>
       
        <p className="eachitem">{`Price : ${eachitem.price} RS    `}</p>
        </div>)
        
      })}
    </div>

      {length>0 && <button className="checkout" type="submit">Check Out</button>}
    
    </>
    
  )
}

export default Cart
