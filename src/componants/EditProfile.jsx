import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { Base_URL } from "../utils/constants";
import UserCard from "./UserCard";
import toast from "react-hot-toast";

const EditProfile = ({ user }) => {

  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [age, setAge] = useState(user?.age || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [about, setAbout] = useState(user?.about || "");

  const [skillsInput, setSkillsInput] = useState(user?.skills?.join(", ") || "");
  const MAX_SKILL_LENGTH = 20;
  const parsedSkills = skillsInput
  .split(",")
  .map(s => s.trim().slice(0, MAX_SKILL_LENGTH))
  .filter(Boolean);
  
  const dispatch = useDispatch();

  // -------------------------------------------------------
  // Cloudinary Upload Function (Frontend Only)
  // -------------------------------------------------------
    const uploadToCloudinary = async (file) => {
    try {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "user_photos");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dkfpmhm1h/image/upload",
        {
          method: "POST",
          body: data,
        }
      );

      const json = await res.json();

      if (json.error) {
        throw new Error(json.error.message);
      }

      return json.secure_url;

    } catch (error) {
      const message = "Failed to upload image to Cloudinary" || error?.message;
      toast.error(message);
    }
  };

  // -------------------------------------------------------
  // Save Profile
  // -------------------------------------------------------

  const validateImageURL = (url) => {
  return new Promise((resolve) => {
    
    const img = new Image();  // create image object

    img.onload = () => resolve(true);   // image loaded = URL is valid
    img.onerror = () => resolve(false); // image failed = URL invalid

    img.src = url;  // try loading the image
  });
};

  const handleEdit = async () => {

   const isValid = await validateImageURL(photoURL);

   if (!isValid) { toast.error("Invalid Photo URL!") }

    try {

      const {data} = await axios.patch( Base_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoURL,
          age,
          gender,
          about,
          skills:parsedSkills,
        },
        { withCredentials: true }
      );

      if(data.success){
        console.log(age + gender )
        dispatch(addUser(data.user));
        toast.success(data.message);
      }else{
        toast.error(data.message);
      }

     } catch (error) {
        const message = error?.response?.data?.message || "Something went wrong!!";
        toast.error(message);
     }
  };

  // -------------------------------------------------------
  // UI
  // -------------------------------------------------------
  return (
     <div className="flex justify-center gap-10 ">
       {/* EDIT FORM */}
       <div className="card bg-white w-[420px] shadow-md">
         <div className="card-body p-4">
           <h2 className="text-xl font-bold text-gray-900 mb-3">Edit Profile</h2>
   
           {/* Name */}
           <div className="flex gap-3">
             <div className="flex-1">
               <label className="text-sm font-medium text-gray-600">First Name</label>
               <input className="input w-full" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
             </div>
   
             <div className="flex-1">
               <label className="text-sm font-medium text-gray-600">Last Name</label>
               <input className="input w-full" value={lastName} onChange={(e) => setLastName(e.target.value)} />
             </div>
           </div>
   
           {/* Photo */}
           <div className="mt-2">
             <label className="text-sm font-medium text-gray-600">Profile Photo</label>
             <div className="relative">
               <input className="input w-full pr-10" placeholder="Paste image URL or upload"
                 value={photoURL} onChange={(e) => setPhotoURL(e.target.value)}
               />
               <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                 onClick={() => document.getElementById("photoFile").click()}
               >
                 📁
               </button>
             </div>
           </div>
   
           <input id="photoFile" type="file" accept="image/*" className="hidden"
            onChange={async (e) => {
               const file = e.target.files[0];
               if (file) {
                 setPhotoURL("Uploading...");
                 const url = await uploadToCloudinary(file);
                 setPhotoURL(url);
               }
             }}
           />

        {/* Gender & Age */}
           <div className="flex gap-4 mt-2">
             <div className="flex-1">
               <label className="text-sm font-medium text-gray-600">Gender</label>
               <select className="select w-full" value={gender} onChange={(e) => setGender(e.target.value)}>
                 <option value="">Select</option>
                 <option value="Male">Male</option>
                 <option value="Female">Female</option>
                 <option value="Other">Other</option>
               </select>
             </div>

             <div className="flex-1">
               <label className="text-sm font-medium text-gray-600">Age</label>
               <input type="number" className="input w-full"
                 value={age} onChange={(e) => setAge(e.target.value)}
               />
             </div>
           </div>
   
           {/* About */}
           <div className="mt-2">
             <label className="text-sm font-medium text-gray-600">About</label>
             <textarea className="textarea w-full resize-none h-[64px]" maxLength={150}
                value={about} onChange={(e) => setAbout(e.target.value)}
             />
             <p className="text-xs text-gray-500 text-right">{about.length}/150 characters</p>
           </div>
   
           {/* Skills */}
           <div className="-mt-2">
             <label className="text-sm font-medium text-gray-600"> Skills (comma separated)</label>
             <input className="input w-full" placeholder="React, Node.js, MongoDB"
              value={skillsInput} onChange={(e) => setSkillsInput(e.target.value)}
             />
           </div>

           {/* Save */}
           <button disabled={parsedSkills.length === 0 || photoURL === "Uploading..." || about.length < 75 } className="btn bg-pink-500 disabled:bg-pink-300 hover:bg-pink-600 text-white mt-2" onClick={handleEdit}>
             Save Changes
           </button>
         </div>
       </div>
   
       {/* LIVE PREVIEW */}
       <div className="sticky top-10">
         <UserCard
           user={{ firstName, lastName, photoURL, age, gender, about, skills:parsedSkills }}
         />
       </div>
     </div>
   );   

};

export default EditProfile;
