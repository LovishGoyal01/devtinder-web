import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector} from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { Base_URL } from "../utils/constants";
import toast from "react-hot-toast";

const Login = ()=> {

  const [firstName , setFirstName] =useState("");
  const [lastName , setLastname] = useState("");
  const [emailId , setEmailId] = useState("");
  const [password , setPassword] = useState("");

  const [isDisable, setIsDisable] = useState(false);

  const [showPassword, setShowPassword] = useState("password");

  const [toNavigate, setToNavigate] = useState("/");

  const [isLoginForm , setIsLoginForm] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((store)=>store.user);
 
  useEffect(() => {
    if (!user) return;

    navigate(toNavigate);
  }, [user, toNavigate, navigate]);


  const handleLogin = async () => {

    try{
     setIsDisable(true)
     const { data } = await axios.post(Base_URL + "/login", {
        emailId,
        password,
      },{withCredentials:true});

      if(data.success){
        toast.success(data.message);
        dispatch(addUser(data.user));
        setToNavigate("/")      
      }else{
        toast.error(data.message)
      }  
    }catch(error){
      toast.error(error.response?.data?.message || error.message);
    }finally{
      setIsDisable(false)
    }
  }

  const handleSignup = async () => {
    try{
      const { data } = await axios.post(Base_URL + "/signup", {
        firstName,
        lastName,
        emailId,
        password,
       
      },{withCredentials:true});

      if(data.success){
        toast.success(data.message);
        dispatch(addUser(data.user));
        navigate("/profile")
       }else{
        toast.error(data.message)
       }
     }catch(error){
       toast.error(error.response?.data?.message || error.message);
     }
  }

 return (
     <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-rose-500 to-purple-800 px-4">
    
       <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full items-center">

         {/* LEFT SIDE CARD */}
         <div className="hidden md:flex flex-col justify-center text-white px-6">
           {isLoginForm ? (
             <>
               <h1 className="text-4xl font-bold mb-4">Welcome Back 👋</h1>
               <p className="text-white/90 text-lg">
                 Login to continue exploring meaningful developer connections.
               </p>
             </>
           ) : (
             <>
               <h1 className="text-4xl font-bold mb-4">Welcome to DevTinder 🚀</h1>
               <p className="text-white/90 text-lg">
                 Discover developers, connect by interests, and grow your network.
               </p>
             </>
           )}
         </div>

         {/* RIGHT SIDE FORM */}
         <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-auto">
           <div className="p-6">
             <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
               {isLoginForm ? "Login" : "Create Account"}
             </h2>

             {!isLoginForm && (
               <div className="flex gap-3 mb-4">
                 <input type="text" placeholder="First Name" className="input w-full"
                   value={firstName} onChange={(e) => setFirstName(e.target.value)}
                 />
                 <input type="text" placeholder="Last Name" className="input w-full"
                   value={lastName} onChange={(e) => setLastname(e.target.value)}
                 />
               </div>
             )}

             <input type="email" placeholder="Email" className="input w-full mb-4"
               value={emailId} onChange={(e) => setEmailId(e.target.value)}
             />

             <div className="relative mb-6">
               <input type={showPassword ? "text" : "password"}
                placeholder="Password" className="input w-full pr-12"
                value={password} onChange={(e) => setPassword(e.target.value)}
               />
               <button type="button" onClick={() => setShowPassword((prev) => !prev)} className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 hover:text-gray-700 z-10">
                {showPassword ? "Hide" : "Show"}
               </button>
             </div>

             <button disabled={isDisable} className="btn btn-primary w-full mb-4" onClick={isLoginForm ? handleLogin : handleSignup}>
               {isLoginForm ? "Login" : "Sign Up"}
             </button>

             <p className="text-center text-sm text-gray-600 cursor-pointer hover:text-indigo-500" onClick={() => setIsLoginForm(!isLoginForm)}>
               {isLoginForm ? "New user? Create an account" : "Already have an account? Login"}
             </p>
           </div>
         </div>

       </div>
     </div>
   );
}

export default Login;