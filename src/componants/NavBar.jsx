
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Base_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";

const NavBar = () =>{
   
  const user = useSelector((store)=>store.user);
 
  const dispatch = useDispatch();
  const navigate = useNavigate();

   const handleLogout =async () => {

      try{
          await axios.post(Base_URL+"/logout",{},{
          withCredentials:true,
         })
         dispatch(removeUser());
         return navigate("/login")
      }catch(err){
        console.error(err);
      }
   }
   
  return(
        <div>
             <div className="navbar  bg-gradient-to-b from-info-content to-info-content/90   shadow-sm fixed z-50 ">
               <div className="flex-1">
               {user && <Link to="/" className="btn btn-ghost text-xl text-white">🧑‍💻 DevTinder</Link>}
               {!user && <Link to="/login" className="btn btn-ghost text-xl text-white">🧑‍💻 DevTinder</Link>}
               </div>

              {user && (
              <div className="flex gap-0.5 items-center"> 
                <p className="text-white">Welcome, {user.firstName}</p>
                <div className="dropdown dropdown-end mx-5">
                 <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                   <img
                    alt="User Photo"
                    src={user.photoURL} />
                  </div>
                 </div>
                 <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                  <li><Link to="/profile">Profile</Link></li>
                  <li><Link to="/connections">Connections</Link></li>
                  <li><Link to="/requests">Connections Requests</Link></li>
                  <li><Link onClick={handleLogout}>Logout</Link></li>
                 </ul>
                </div>
               </div>
              )}                        
              </div>
        </div>
        
    )
}

export default NavBar;