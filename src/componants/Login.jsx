import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector} from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { Base_URL } from "../utils/constants";

const Login = ()=> {

  const [firstName , setFirstName] =useState("");
  const [lastName , setLastname] = useState("");
  const [emailId , setEmailId] = useState("lovish1@gmail.com");
  const [password , setPassword] = useState("Lovish@123");


  const [isLoginForm , setIsLoginForm] = useState(false);

  const [error , setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store)=>store.user);
  const handleLogin = async () => {

    try{
     const res = await axios.post(Base_URL + "/login", {
        emailId,
        password,
      },{withCredentials:true});

     dispatch(addUser(res.data));
     navigate("/");
    }catch(err){
      setError(err?.response?.data || "Something went wrong!!");
    }
  }

  const handleSignup = async () => {

    try{
     const res = await axios.post(Base_URL + "/signup", {
        firstName,
        lastName,
        emailId,
        password,
       
      },{withCredentials:true});

     dispatch(addUser(res.data?.data));
     navigate("/profile");
    }catch(err){
      setError(err?.response?.data || "Something went wrong!!");
    }
  }

  if(user)
  {
    navigate("/profile");
  }


  return (
    <>
   <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center"
      style={{ backgroundImage: `url('/backgroundImage.png')` }}
   >
    <div className="flex w-200 justify-center bg-gradient-to-b from-rose-500 to-purple-800 bg-cover bg-center shadow-gray-100 p-4">
       <div className="card  w-96 flex items-center justify-center text-center"    
       >
       {isLoginForm &&(
         <div className="text-primary-content  ">
          <h1 className="text-white font-bold text-4xl m-2 flex justify-center">Welcome Back</h1>
          <p className="text-white ">Login to continue </p>
          <p className="text-white ">&</p>
          <p className="w-70">Continue exploring new connections based on your interests </p>
        </div>
       )}  
       {!isLoginForm &&(
         <div className="text-primary-content ">
          <h1 className="text-white font-bold text-4xl m-2">Welcome </h1>
          <p className="text-white ">Signup to continue </p>
          <p className="text-white ">&</p>
          <p className="text-white w-70">Start exploring new connections, meet new people & make friends  around the world</p>
        </div>
       )}  
       </div>
       <div className="card card-border bg-base-100 w-96 ">
         <div className="card-body">
           <h2 className="card-title  flex justify-center text-primary">{isLoginForm ? "User Login" : "Sign Up"}</h2>
           <div>

                 {!isLoginForm && ( <>
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend">First Name:</legend>
                      <input type="text" className="input" value={firstName} onChange={(e)=>setFirstName(e.target.value)} />
                  </fieldset>

                  <fieldset className="fieldset">
                    <legend className="fieldset-legend">Last Name:</legend>
                      <input type="text" className="input" value={lastName} onChange={(e)=>setLastname(e.target.value)} />
                  </fieldset>
                 </>)}
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend">Email ID:</legend>
                      <input type="email" className="input" value={emailId} onChange={(e)=>setEmailId(e.target.value)} />
                  </fieldset>
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend">Password:</legend>
                      <input type="password" className="input" value={password} onChange={(e)=>setPassword(e.target.value)} />
                  </fieldset>
                 
           </div>
           <p className="text-red-500">{error}</p>
           <div className="card-actions justify-center">
             <button className="btn btn-primary" onClick={isLoginForm? handleLogin : handleSignup} >{isLoginForm ? "Login" : "Sign Up"}</button>
           </div>
           <p className="flex justify-center cursor-pointer hover:text-blue-500" onClick={()=>setIsLoginForm(!isLoginForm)} >{isLoginForm?"New User? Signup Here" : "Already a User? Login Here"}</p>
         </div>
       </div>
    </div>
  </div>   
    </>
  )
}

export default Login;