import axios from "axios";
import { useState } from "react";
import { useDispatch} from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { Base_URL } from "../utils/constants";


const Login = ()=> {

  
  const [emailId , setEmailId] = useState("Lovish@gmail.com");
  const [password , setPassword] = useState("LovishG@123");
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

  return (
    <>
    <div className="flex justify-center my-10">
       <div className="card card-border bg-base-100 w-96">
         <div className="card-body">
           <h2 className="card-title">Login</h2>
           <div>
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend">Email ID</legend>
                      <input type="text" className="input" value={emailId} onChange={(e)=>setEmailId(e.target.value)} />
                  </fieldset>
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend">Password</legend>
                      <input type="text" className="input" value={password} onChange={(e)=>setPassword(e.target.value)} />
                  </fieldset>
           </div>
           <p className="text-red-500">{error}</p>
           <div className="card-actions justify-end">
             <button className="btn btn-primary" onClick={handleLogin} >Login</button>
           </div>
         </div>
       </div>
    </div>
    </>
  )
}

export default Login;