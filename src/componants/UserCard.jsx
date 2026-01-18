import axios from "axios";
import { useDispatch } from "react-redux";
import { Base_URL } from "../utils/constants";
import { removeUserFromFeed } from "../utils/feedSlice";
import { useState } from "react";
import toast from "react-hot-toast";

 
const UserCard = ({user}) => {

   if (!user) return null;

   const {_id, firstName, lastName, photoURL, age, gender, about, skills} = user;

   const MAX_TOTAL_CHARS = 50;
   const MAX_SKILLS = 3;
   const LONG_SKILL_THRESHOLD = 12;
   
   // detect long skill
   const hasLongSkill = skills.some(skill => skill.length > LONG_SKILL_THRESHOLD);

   // decide cap
   const skillCap = hasLongSkill ? 2 : MAX_SKILLS;

   let visibleSkills = [];
   let totalLength = 0;

   for (let skill of skills) {
     if(visibleSkills.length < skillCap && totalLength + skill.length + 6 <= MAX_TOTAL_CHARS) {
         visibleSkills.push(skill);
         totalLength += skill.length;
     }else{
         break;
     }
   }

   const hiddenCount = skills.length - visibleSkills.length;

   const [isSending, setIsSending] = useState(false)
   const dispatch = useDispatch();

   const handleSendRequest = async (status, userId) => {
     try {
          setIsSending(true);

          const { data } = await axios.post( `${Base_URL}/request/send/${status}/${userId}`, {},{ withCredentials: true });
          if(data.success) {
             toast.success(data.message);
             dispatch(removeUserFromFeed(userId));
          }else{
             toast.error(data.message);
          }
      } catch (error) {
          toast.error(error?.response?.data?.message || "Something went wrong");
      } finally {
        setIsSending(false);
      }
    };

    return (
       <div className="card bg-white rounded-2xl overflow-hidden w-[360px] h-[500px] shadow-lg">
          <figure className="relative h-[320px]">
               <img className="w-full h-full object-cover"
               src= {photoURL}  alt="Photo" />
               
               <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/80 to-transparent p-3 text-white">
                  <div className="flex justify-between items-center">
                     <h2 className="font-semibold text-lg"> {firstName} {lastName} </h2>
                     {age && ( <span className="text-sm font-medium text-white/90">{age}, {gender}</span> )}
                  </div>
                </div>
             </figure>

             <div className="px-4 pt-3 min-h-[130px] flex flex-col ">
               <div className="text-sm text-gray-700 leading-relaxed  max-h-[72px] overflow-hidden line-clamp-3">
                 <span className="text-sm font-semibold text-gray-500 mr-1">About:</span>
                 <span className="text-gray-700" >{about}</span>
               </div>

               <div className="flex justify-center gap-2 flex-nowrap w-full max-w-full mt-2">
                 {visibleSkills.map((skill, index) => (
                   <span key={index} title={skill}  className="bg-indigo-50 text-slate-600 border border-slate-200 transition-colors px-3 py-1.5 rounded-full text-xs font-semibold  whitespace-nowrap  max-w-[130px]  overflow-hidden text-ellipsis"
                   >{skill}</span>
                 ))}
                   {hiddenCount > 0  && ( <span className="bg-slate-200 text-slate-600 text-xs  px-3 py-1.5 rounded-full font-semibold">+{hiddenCount}</span> )}
                </div>
              </div>   

              <div className="h-[60px] flex items-center justify-center gap-6 border-t border-slate-200 bg-slate-50">
                <button className="btn bg-slate-300 hover:bg-slate-400 hover:text-slate-900 text-slate-700 px-8" disabled={isSending} onClick={()=>handleSendRequest("ignored",_id)}>Ignore</button>
                <button className="btn bg-pink-500 hover:bg-pink-600 text-white px-5.5 " disabled={isSending} onClick={()=>handleSendRequest("interested",_id)}>Interested</button>
              </div>
          </div>
    )
};

export default UserCard;