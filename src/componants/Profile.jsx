import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";

const Profile = ()=> {
  
  const user = useSelector((store) => store.user); 

  return (
    <>
   {user && <div className="flex items-center"><EditProfile user={user} /></div> }
    </>
  )
}

export default Profile;