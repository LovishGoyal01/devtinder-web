import axios from "axios";
import { useState } from "react";
import { useDispatch} from "react-redux";
import { addUser } from "../utils/userSlice";
import { Base_URL } from "../utils/constants";
import UserCard from "./UserCard"

const EditProfile = ({user})=> {

  
  const [firstName , setFirstName] = useState(user.firstName);
  const [lastName , setLastName] = useState(user.lastName);
  const [photoURL , setPhotoURL] = useState(user.photoURL);
  const [age , setAge] = useState(user.age);
  const [gender , setgender] = useState(user.gender);
  const [about , setAbout] = useState(user.about);
  const [error , setError] = useState("");
  const [showToast , setShowToast] = useState(false);

  const dispatch = useDispatch();

  const handleEdit = async () => {

    setError("");

    try{
     const res = await axios.patch(Base_URL + "/profile/edit", {
        firstName,
        lastName,
        photoURL,
        age,
        gender,
        about,
      },{withCredentials:true});

     dispatch(addUser(res.data?.data));
     
     setShowToast(true);
     setTimeout(()=>{
        setShowToast(false);
     },3000);

    }catch(err){
      setError(err?.response?.data || "Something went wrong!!");
    }
  }

  return (
<>    
 <div className="flex my-10 justify-center mb-10">
    <div className="flex justify-center mx-10 mb-10">
       <div className="card card-border bg-base-100 w-96">
         <div className="card-body">
           <h2 className="card-title">Edit Profile</h2>
           <div>
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend">First Name:</legend>
                      <input type="text" className="input" value={firstName} onChange={(e)=>setFirstName(e.target.value)} />
                  </fieldset>
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend">Last Name:</legend>
                      <input type="text" className="input" value={lastName} onChange={(e)=>setLastName(e.target.value)} />
                  </fieldset>
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend">Photo URL:</legend>
                      <input type="text" className="input" value={photoURL} onChange={(e)=>setPhotoURL(e.target.value)} />
                  </fieldset>
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend">Age:</legend>
                      <input type="text" className="input" value={age} onChange={(e)=>setAge(e.target.value)} />
                  </fieldset>
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend">Gender:</legend>
                  </fieldset>
                 <div className="dropdown dropdown-hover w-80">
                  <div tabIndex={0} role="button" className="btn w-full">{gender}</div>
                   <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-10 w-52 p-2 shadow-sm">
                      <li onClick={() => setgender("male")}><a>male</a></li>
                      <li onClick={() => setgender("female")}><a>female</a></li>
                      <li onClick={() => setgender("others")}><a>others</a></li>
                   </ul>
                  </div>
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend">About:</legend>
                      <textarea className="textarea"  value={about} onChange={(e)=>setAbout(e.target.value)} ></textarea>
                  </fieldset>
                  
           </div>
           <p className="text-red-500">{error}</p>
           <div className="card-actions justify-center">
             <button className="btn btn-primary" onClick={handleEdit} >Save</button>
           </div>
         </div>
       </div>
    </div>
    <UserCard user={{firstName , lastName , photoURL , age , gender , about }}/>
</div>

{showToast && (
    <div className="toast toast-top toast-center">
      <div className="alert alert-info">
         <span>Profile saved successfully.</span>
      </div>
    </div>
   )
}    
</>
  )
}

export default EditProfile;