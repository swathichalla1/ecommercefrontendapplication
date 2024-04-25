
import {useState} from 'react';
import {useNavigate,Link } from 'react-router-dom'
import './index.css';

const UserRegistration = ()=>{

    const [username,setusername] = useState("");
    const [email,setemail] = useState("");
    const [password,setpassword] = useState("");
    const [showerror,setshowerror] = useState(false);
    const [error,seterror] = useState("");
    const [status,setstatus] = useState("initial");
    const nav = useNavigate();
    

    const onSubmitSuccess = ()=>{
      setstatus("success");
      setusername("");
      setemail("");
      setpassword("");
         nav("/UserLogin");
    }

    const onSubmitFailure = (err)=>{
      setstatus("failure");
           setshowerror(true);
           seterror(err);
    }


    const submitForm = async(event)=>{
      event.preventDefault();
      setstatus("Loading");
      const userDetails = {username,email,password};
      try{
        const options = {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Accept" : "application/json"
            },
            body:JSON.stringify(userDetails)
            }
     
          const response = await fetch("https://ecommercebackend-2-tnje.onrender.com/User/UserRegister",options);
    
          const data = await response.json();
          //console.log(data);
    
          if (response.ok===true){
            
            onSubmitSuccess();
          }
          else{
            onSubmitFailure(data.error);
          }

      }catch(error){
        onSubmitFailure("Something wrong try again!");
      }
      

      


    }

    return(
        <div className="container">
        <form onSubmit={submitForm} className="formContainer">
        <h1>User Registration</h1>
        <div className="labelInput">
        <label className="label" htmlFor="username" >USERNAME</label>
        <input value={username} className="inputel" id="username" type="text" placeholder="Enter username" onChange={(e)=>(setusername(e.target.value))}/>
        </div>
        <div className="labelInput">
        <label className="label" htmlFor="email" >EMAIL</label>
        <input value={email} className="inputel" id="email" type="text" placeholder="Enter email" onChange={(e)=>(setemail(e.target.value))}/>
        </div>
        <div className="labelInput">
        <label className="label" htmlFor="password" >PASSWORD</label>
        <input  value={password} className="inputel" id="password" type="password" placeholder="Enter password" onChange={(e)=>(setpassword(e.target.value))}/>
        </div>
        <button className="submitButton" type="submit" >Register</button>
        <br/>
        {status==="Loading" && <p className="error">Loading...</p>}
        {showerror && <p className="error">{`** ${error}`}</p>}
        </form>

        <Link className="linkstyle" to="/UserLogin"><h1>Already registered ? Click here to login!</h1></Link>
        </div>


    )

}

export default UserRegistration