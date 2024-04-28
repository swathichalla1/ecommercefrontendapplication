import React,{useState,useEffect} from 'react'
import Header from '../Header'
import ShowProduct from '../ShowProduct'
import './index.css'

const ProductsAddedByAdmin = () => {
    const [adminproducts,setadminproducts] = useState([]);
    const [status,setstatus] = useState("initial");

    //const length = adminproducts.length


    useEffect(()=>{
        console.log("products by admin useeffect called");
        async function getAdminAddedProducts(){
          setstatus("Loading");
          const Adminidentity = localStorage.getItem("Adminidentity");
            try{
                const response = await fetch(`https://ecommercebackend-2-tnje.onrender.com/Admin/adminProducts/${Adminidentity}`);
                const data = await response.json();
                console.log(data);

                if (response.ok){
                    setadminproducts(data.onlyProducts)
                    if(data.onlyProducts.length ===0){
                      setstatus("zerolength")
                    }
                    else{
                      setstatus("success")
                    }
                    //console.log(data.onlyProducts)
                }
                else{
                  alert("something went wrong try again!");
                  setstatus("failure");
                }
            }catch(error){
              alert(`error : ${error}`);
              setstatus("failure");
          //console.log(error);
            }
            
        }
        
        //return ()=>getAdminAddedProducts()
        getAdminAddedProducts()
    },[])

    const deleteProductByAdmin = async(id)=>{
        try{
          const response = await fetch(`https://ecommercebackend-2-tnje.onrender.com/Product/delete/${id}`,{
            method:"DELETE"
          })
          const data = await response.json();
          //console.log(data);
          if(response.ok){
            const updatedproducts = adminproducts.filter((eachproduct)=>(
              eachproduct._id !== id
            ));
            setadminproducts(updatedproducts);
          }
          else{
            
            alert("something went wrong try again!");
          }

        }catch(error){
          alert(`error : ${error}`);
        }

      

    }

  return (
    <div>
    <Header field="admin"/>
    {status==="Loading" && <h1 style={{textAlign:"center",color:"orange"}}>Loading...</h1>}
    {status==="zerolength"  && <h1 style={{textAlign:"center",color:"blue"}}>No products added yet!</h1> }
    {status==="success" && <div>
      <h1 style={{textAlign:"center",color:"blue"}}>products added by you as admin</h1>
      <ul className="products">
  {adminproducts.map((each) => (
    <ShowProduct key={each._id} details={each} field="admin" deleteProductByAdmin={deleteProductByAdmin}/>
  ))}
</ul>
      </div>
    }
      
    </div>
  )
}

export default ProductsAddedByAdmin
