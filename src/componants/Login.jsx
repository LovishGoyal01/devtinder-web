import axios from "axios";
import { useState } from "react";
import { useDispatch} from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { Base_URL } from "../utils/constants";


const Login = ()=> {

  const [firstName , setFirstName] =useState("");
  const [lastName , setLastname] = useState("");
  const [emailId , setEmailId] = useState("Lovish@gmail.com");
  const [password , setPassword] = useState("LovishG@123");
  const [age , setAge] =useState("");
  const [gender , setGender] = useState("");

  const [isLoginForm , setIsLoginForm] = useState(false);

  const [error , setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
        age,
        gender,
      },{withCredentials:true});

     dispatch(addUser(res.data?.data));
     navigate("/");
    }catch(err){
      setError(err?.response?.data || "Something went wrong!!");
    }
  }

  return (
    <>
    <div className="flex justify-center my-6 mb-25">
       <div className="card card-border bg-base-100 w-90">
         <div className="card-body">
           <h2 className="card-title flex justify-center">{isLoginForm ? "Login" : "Sign Up"}</h2>
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
                      <input type="text" className="input" value={emailId} onChange={(e)=>setEmailId(e.target.value)} />
                  </fieldset>
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend">Password:</legend>
                      <input type="text" className="input" value={password} onChange={(e)=>setPassword(e.target.value)} />
                  </fieldset>
                 {!isLoginForm && ( <>
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend">Age:</legend>
                      <input type="text" className="input" value={age} onChange={(e)=>setAge(e.target.value)} />
                  </fieldset>
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend">Gender:</legend>
                      <input type="text" className="input" value={gender} onChange={(e)=>setGender(e.target.value)} />
                  </fieldset>
                 </>)}
           </div>
           <p className="text-red-500">{error}</p>
           <div className="card-actions justify-center">
             <button className="btn btn-primary" onClick={isLoginForm? handleLogin : handleSignup} >{isLoginForm ? "Login" : "Sign Up"}</button>
           </div>
           <p className="flex justify-center cursor-pointer" onClick={()=>setIsLoginForm(!isLoginForm)} >{isLoginForm?"New User? Signup Here" : "Already a User? Login Here"}</p>
         </div>
       </div>
    </div>
    </>
  )
}

export default Login;