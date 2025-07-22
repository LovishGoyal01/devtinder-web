import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import { Base_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";
import axios from "axios";

const Body = ()=> {
  
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const user = useSelector((store)=>store.user);

   const fetchUser = async ()=>{
    try{
    const res = await axios.get(Base_URL + "/profile/view" , {
      withCredentials:true,
    })
    dispatch(addUser(res.data));
   }catch(err){
    if(err.status === 401){
     navigate("/login");
    }
    console.error(err);
   }
  }
   useEffect(()=>{
    if(!user){
    fetchUser();
    }
   },[]);
   

  return (
    <>
    <NavBar/>
    <Outlet/>
    <Footer/>
    </>
  )
}

export default Body;