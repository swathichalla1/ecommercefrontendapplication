import React,{useState} from 'react'
import Header from '../Header'
import {Link} from 'react-router-dom'


const AddProducts = () => {
    const [productName,setproductName] = useState("");
    const [description,setdescription] = useState("");
    const [price,setprice] = useState("");
    const [rating,setrating] = useState("");
    const [file,setfile] = useState(null);
    const [showerror,setshowerror] = useState(false);

    const handleImage = (event)=>{
        const selectedImage = event.target.files[0];
        setfile(selectedImage);
    }

    const AddProductsubmitForm = async(event)=>{
        event.preventDefault();
        
        try{
            const AdminToken = localStorage.getItem("AdminToken");
            if(!AdminToken){
                //alert("User not authenticated")
                console.log("User not authenticated");
            }
           const formData = new FormData();
    formData.append('productName', productName);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('rating', rating);
    formData.append('image', file);

    //console.log(formData);

    const options = {
        method:"POST",
        headers:{
            'token': `${AdminToken}`
        },
        body:formData,
    }
           // https://ecommercebackend-2-tnje.onrender.com/Product/add-Product"
            const response =await fetch("http://localhost:5001/Product/add-Product",options)
            console.log(response);
            const data = await response.json();
            console.log(data);
            
            if(response.ok){
                console.log("product added succesfully:frontend");
                alert("product added");
                setproductName("");
                setdescription("");
                setprice("");
                setrating("");
                setfile(null);
          }
          else{
            alert("something went wrong try again!");
          }
            
            //console.log(data);
        }catch(error){
           console.log("catch ",error);
           alert(`error : ${error}`);
        }
    }

  return (
    <>
    <Header filed="admin"/>
    <div className="container">
    
    <form onSubmit={AddProductsubmitForm} className="formContainer">
    <h1>Add Products</h1>
    <div className="labelInput">
    <label className="label" htmlFor="productname" >PRODUCT NAME</label>
    <input value={productName} className="inputel" id="productname" type="text" placeholder="Enter product Name" onChange={(e)=>(setproductName(e.target.value))}/>
    </div>
    <div className="labelInput">
    <label className="label" htmlFor="description" >DESCRIPTION</label>
    <input value={description} className="inputel" id="description" type="text" placeholder="Enter description" onChange={(e)=>(setdescription(e.target.value))}/>
    </div>
    <div className="labelInput">
    <label className="label" htmlFor="price" >PRICE</label>
    <input  value={price} className="inputel" id="price" type="text" placeholder="Enter price" onChange={(e)=>(setprice(e.target.value))}/>
    </div>
    <div className="labelInput">
    <label className="label" htmlFor="rating" >RATING</label>
    <input  value={rating} className="inputel" id="rating" type="text" placeholder="Enter rating" onChange={(e)=>(setrating(e.target.value))}/>
    </div>
    <div className="labelInput">
    <label className="label" htmlFor="image" >IMAGE</label>
    <input id="image" type="file" onChange= {handleImage}/>
    </div>
    <button className="submitButton" type="submit" >Add Product</button>
    <br/>
    
    {showerror && <p className="error">{`** ${error}`}</p>}
    </form>
       <Link to="/ProductsAddedByAdmin" style={{marginBottom:"20px"}}><h1>Show all products added by you as admin</h1></Link>
    
    </div>
    </>
  )
}

export default AddProducts
