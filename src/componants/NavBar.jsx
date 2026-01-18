import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Base_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";

const NavBar = () => {
  const user = useSelector((store) => store.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try{
      await axios.post(Base_URL + "/logout",{}, { withCredentials: true, } );
      dispatch(removeUser());
      navigate("/login");
    }catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex justify-between navbar bg-gradient-to-b from-info-content to-info-content/90 shadow-sm fixed z-50 ">
      <div className="flex px-2 pb-1">
        <Link to={user ? "/" : "/login"} className="flex items-center gap-2 text-xl font-bold text-white/90 hover:text-white px-2 py-1 rounded-lg hover:bg-white/10 transition">
          <span>🧑‍💻</span>
          <span>DevTinder</span>
        </Link>
      </div>

      {user && (
        <div className="flex gap-3 items-center">
          <p className="text-white/90 text-md ">Welcome, <span className="font-semibold">{user.firstName}</span></p>
          <div className="dropdown dropdown-end mx-5">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar ring-2 ring-pink-300/60 hover:ring-indigo-300/60">
              <div className="w-10 rounded-full">
                <img alt="User Photo" src={user.photoURL} />
              </div>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-white/95 backdrop-blur-md rounded-xl mt-3 w-52 p-2 shadow-xl border border-pink-100">
              <li><Link to="/profile">Profile</Link></li>
              <li><Link to="/">Feed</Link></li>
              <li><Link to="/connections">Connections</Link></li>
              <li><Link to="/requests">Connection Requests</Link></li>
              <div className="my-1 h-px bg-pink-100" />
              <li><button onClick={handleLogout} className="text-pink-600 hover:bg-pink-50 rounded-lg">Logout</button></li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
