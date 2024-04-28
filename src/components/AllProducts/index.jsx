import React,{useState,useEffect} from 'react'
import Header from '../Header'
import ShowProduct from '../ShowProduct'
import './index.css'

const AllProducts = () => {

  const [AllProducts,setallproducts] = useState([]);
  const [status,setstatus] = useState("initial");



  
  useEffect(()=>{
    console.log("all products useffect called");
    async function getProducts(){
      //console.log("fetched");
      setstatus("Loading")
      try{
            const response = await fetch("https://ecommercebackend-2-tnje.onrender.com/Product/AllProducts");
            const data = await response.json();
            console.log(data);
  
            if (response.ok){
              setstatus("initial");
                   setallproducts(data);
            }
            else{
              setstatus("failure");
              //console.log("something ");
            }
      }catch(error){
        setstatus("failure")
        //alert(`error : ${error}`);
    //console.log("something happend ",error);
      }
    }
    //return ()=>(getProducts())
    getProducts()
  },[])

  return (
    <div>
    <Header field="user"/>
      <h1 style={{color:"green"}}>All products</h1>
      {status==="Loading" && <h1 style={{textAlign:"center",color:"orange"}}>Loading...</h1>}
      {status==="failure" && <h1 style={{textAlign:"center",color:"red"}}>Something went wrong try again!</h1>}
      <ul className="products">
  {AllProducts && AllProducts.Products && AllProducts.Products.map((each) => (
    <ShowProduct key={each._id} details={each}/>
  ))}
</ul>

      
    </div>
  )
}

export default AllProducts
