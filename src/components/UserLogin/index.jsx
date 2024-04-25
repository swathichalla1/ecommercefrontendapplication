
import {useState} from 'react';
import {useNavigate,Navigate} from 'react-router-dom'
import Cookies from 'js-cookie'


import './index.css';

const UserLogin = ()=>{

    const [email,setemail] = useState("");
    const [password,setpassword] = useState("");
    const [showerror,setshowerror] = useState(false);
    const [error,seterror] = useState("");
    const [status,setstatus] = useState("initial");
    const nav = useNavigate();
    

    const onSubmitSuccess = (token)=>{
      setstatus("success");
      setemail("");
      setpassword("");
      Cookies.set("UserToken",token,{expires:1});
         nav("/AllProducts",{ replace: true });
    }

    const onSubmitFailure = (err)=>{
      setstatus("failure");
           setshowerror(true);
           seterror(err);
    }


    const submitForm = async(event)=>{
      event.preventDefault();
      setstatus("Loading")
      const userDetails = {email,password};
      try{
        const options = {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Accept" : "application/json"
            },
            body:JSON.stringify(userDetails)
            }
     
          const response = await fetch("https://ecommercebackend-2-tnje.onrender.com/User/UserLogin",options);
    
          const data = await response.json();
          //console.log(data);
    
          if (response.ok===true){
            onSubmitSuccess(data.token);
          }
          else{
            onSubmitFailure(data.error);
          }

      }catch(error){
        onSubmitFailure(error);
      }
      

      


    }

    const jwtToken = Cookies.get("UserToken");
    if(jwtToken !== undefined){
      const confirmed = window.confirm("You are already logged in. Do you want to continue?");
    if (confirmed) {
      return <Navigate to="/AllProducts" />;
    }
    }
    else{
      return(
        <div className="container">
        <form onSubmit={submitForm} className="formContainer">
        <h1> User Login</h1>
        <div className="labelInput">
        <label className="label" htmlFor="email" >EMAIL</label>
        <input value={email} className="inputel" id="email" type="text" placeholder="Enter email" onChange={(e)=>(setemail(e.target.value))}/>
        </div>
        <div className="labelInput">
        <label className="label" htmlFor="password" >PASSWORD</label>
        <input  value={password} className="inputel" id="password" type="password" placeholder="Enter password" onChange={(e)=>(setpassword(e.target.value))}/>
        </div>
        <button className="submitButton" type="submit" >Login</button>
        <br/>
        {status==="Loading" && <p className="error">Loading...</p>}
        {showerror && <p className="error">{`** ${error}`}</p>}
        </form>
        
        </div>


    )

    }

    
}

export default UserLogin