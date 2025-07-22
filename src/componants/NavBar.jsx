
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const NavBar = () =>{
   
  const user = useSelector((store)=>store.user);

  console.log(user);
  
  return(
        <div>
             <div className="navbar bg-info-content shadow-sm">
               <div className="flex-1">
                <Link to="/" className="btn btn-ghost text-xl text-white">🧑‍💻 DevTinder</Link>
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
                  <li><Link>Settings</Link></li>
                  <li><Link to="/logout">Logout</Link></li>
                 </ul>
                </div>
               </div>
              )}                        
              </div>
        </div>
        
    )
}

export default NavBar;