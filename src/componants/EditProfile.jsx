import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { Base_URL } from "../utils/constants";
import UserCard from "./UserCard";

const EditProfile = ({ user }) => {

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoURL, setPhotoURL] = useState(user.photoURL);
  const [age, setAge] = useState(user.age);
  const [gender, setgender] = useState(user.gender);
  const [about, setAbout] = useState(user.about);
  const [skills, setSkills] = useState(user.skills || []);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);


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

    } catch (err) {
      console.error("Cloudinary Upload Error:", err);
      throw new Error("Failed to upload image to Cloudinary");
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
    setError("");

  const isValid = await validateImageURL(photoURL);

  if (!isValid) {
    setError("Invalid Photo URL!");
    setShowErrorToast(true);

    setTimeout(() => setShowErrorToast(false), 3000);
    return; // stop save request
  }
  if (skills.length == 0) {
    setError("If no skills type Beginner");
    setShowErrorToast(true);

    setTimeout(() => setShowErrorToast(false), 3000);
    return; // stop save request
  }
   if (!age || age<18) {
    setError("Age cannot be less than 18");
    setShowErrorToast(true);

    setTimeout(() => setShowErrorToast(false), 3000);
    return; // stop save request
  }
   if (!gender) {
    setError("Select gender");
    setShowErrorToast(true);

    setTimeout(() => setShowErrorToast(false), 3000);
    return; // stop save request
  }

let skillsArray = skills.map(s =>
  s.charAt(0).toUpperCase() + s.slice(1).toLowerCase()
);

    console.log("Sending skills:", skillsArray);

    try {
      const res = await axios.patch(
        Base_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoURL,
          age,
          gender,
          about,
          skills:skillsArray,
        },
        { withCredentials: true }
      );

      dispatch(addUser(res.data?.data));

      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
        const message = err?.response?.data || "Something went wrong!!";
        setError(message);
        setShowErrorToast(true);

        setTimeout(() => {
           setShowErrorToast(false);
        }, 3000);
     }
  };

  // -------------------------------------------------------
  // UI
  // -------------------------------------------------------
  return (
    <>
      <div className="flex justify-center bg-gradient-to-r from-rose-400 to-blue-400 min-h-screen -mt-0">
        <div className="flex justify-center mt-28 mx-10">
          <div className="card card-border bg-base-100 w-96 h-125 -mt-3">
            <div className="card-body">
              <h2 className="card-title text-primary -mt-2.5">Edit Profile</h2>

              {/* First + Last */}
              <div className="flex gap-2">
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">First Name:</legend>
                  <input
                    type="text"
                    className="input"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </fieldset>

                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Last Name:</legend>
                  <input
                    type="text"
                    className="input"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </fieldset>
              </div>

              {/* Photo Upload */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Photo:</legend>

                <div className="relative w-84">

                  {/* Hidden file uploader */}
                  <input
                    id="photoFile"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={async (e) => {
                      const file = e.target.files[0];
                      if (file) {
                        setPhotoURL("Uploading...");
                        const url = await uploadToCloudinary(file);
                        setPhotoURL(url);
                      }
                    }}
                  />

                  {/* Text input (URL or uploaded) */}
                  <input
                    type="text"
                    className="input w-full pr-12"
                    placeholder="Paste URL or upload photo"
                    value={photoURL}
                    onChange={(e) => setPhotoURL(e.target.value)}
                  />

                  {/* Upload icon */}
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700"
                    onClick={() => document.getElementById("photoFile").click()}
                  >
                    📁
                  </button>
                </div>
              </fieldset>

              {/* Gender + Age */}
              <div className="flex gap-4">
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Gender:</legend>

                  <div className="dropdown dropdown-hover w-40">
                    <div tabIndex={0} role="button" className="btn w-40">
                      {gender || "Select Gender"}
                    </div>

                    <ul className="dropdown-content menu bg-base-100 rounded-box w-32 p-2 shadow-sm">
                      <li onClick={() => setgender("Male")}>
                        <a>Male</a>
                      </li>
                      <li onClick={() => setgender("Female")}>
                        <a>Female</a>
                      </li>
                      <li onClick={() => setgender("Others")}>
                        <a>Others</a>
                      </li>
                    </ul>
                  </div>
                </fieldset>

                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Age:</legend>
                  <input
                    type="number"
                    className="input w-40"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </fieldset>
              </div>

              {/* About */}
              <fieldset className="fieldset rounded-md">
                <legend className="fieldset-legend">About:</legend>
                <textarea
                  className="textarea textarea-bordered w-84 min-h-[40px] text-sm resize-none"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                ></textarea>
              </fieldset>

              {/* Error Toast */}
              {showErrorToast && (
                <div className="toast toast-top toast-center z-50 my-15">
                   <div className="alert alert-error bg-red-600 text-white shadow-lg">
                    <span className="font-bold">{error}</span>
                   </div>
                </div>
              )}

              {/* save button & skills */}
              <div className="card-actions  flex justify-between">
                 <fieldset className="fieldset">
                  <legend className="fieldset-legend ">Skills:</legend>
                  <input
                    className="input w-60"
                    value={skills}
                    onChange={(e) =>{
                      const arr = e.target.value.split(",").map((s)=>s.trim());
                       setSkills(arr)
                    }}
                  />
                </fieldset>
                <button className="btn btn-primary mt-8.5 px-6" onClick={handleEdit}>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Live Preview */}
        <UserCard
          user={{ firstName, lastName, photoURL, age, gender, about, skills }}
        />
      </div>

      {/* Toast */}
      {showToast && (
        <div className="toast toast-top toast-center z-50 my-15">
          <div className="alert alert-info bg-[#97ee54]">
            <span className="font-bold">Profile saved successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
