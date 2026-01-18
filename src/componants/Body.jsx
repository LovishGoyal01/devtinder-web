import { Outlet, useLocation, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import { Base_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Body = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const user = useSelector((store) => store.user);

  const isLoginPage = location.pathname === "/login";

  const fetchUser = async () => {
    try {
      const { data } = await axios.get(Base_URL + "/profile/view", {
        withCredentials: true,
      });
      if(data.success) {
        dispatch(addUser(data.user));
        toast.success("Welcome "+data.user.firstName)
      }else{
        navigate("/login");
      }
    }catch(error) {
      if(!isLoginPage){
        toast.error(error.response?.data?.message || error.message);
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    if (!user) {
      fetchUser();
    }
  }, [user]);

  return (
    <div className={`min-h-screen flex flex-col ${ isLoginPage ? "bg-gradient-to-b from-rose-500 to-purple-800" : "bg-gradient-to-br from-rose-500 to-indigo-400"}`}>
     
      {/* AUTH HEADER (LOGIN ONLY) */}
      {isLoginPage ? (
        <div className="absolute top-6 left-6 z-50">
          <span className="text-white text-2xl font-bold tracking-wide hover:opacity-90 cursor-pointer transition">
            🧑‍💻 DevTinder
          </span>
        </div>
        ) : (
        <NavBar />
      )}

      <main className="flex-1 flex justify-center">
        <Outlet />
      </main>

      {!isLoginPage && <Footer />}
    </div>
  );
};

export default Body;
