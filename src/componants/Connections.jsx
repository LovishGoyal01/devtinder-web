import axios from "axios";
import { Base_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Connections = () => {
  
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const {data} = await axios.get(Base_URL + "/user/connections", {
        withCredentials: true,
      });
      if(data.success){
         dispatch(addConnections(data.connections));
         toast.success(data.message)
      }else{
         toast.error(data.message)
      }
     
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <h1 className="text-white text-2xl font-semibold">Fetching connections…</h1>
      </div>
    );
  }

  if (connections.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <h1 className="text-white text-2xl font-semibold mb-2">No connections yet 👋</h1>
        <p className="text-white/80 text-sm max-w-md"> Go to the feed and start exploring to find people you’d like to connect with.</p>
      </div>
    );
  }
   

  return (
     <div className="flex flex-col items-center pt-24 w-full max-w-[720px] mx-auto">
       <h1 className="font-bold text-2xl mb-6 text-white">
         Connections
       </h1>
   
      <div className="flex flex-col gap-4 w-full">
        {connections.map((user) => (
           <div key={user._id} className="flex bg-white/85 backdrop-blur-lg shadow-lg rounded-xl overflow-hidden h-[130px] border border-indigo-200/40 hover:shadow-xl hover:-translate-y-[1px] transition-all">    {/* Avatar */}
             <div className="w-32 h-full flex-shrink-0">
               <img src={user.photoURL} alt="User" className="w-full h-full object-cover"/>
             </div>
   
             {/* Info */}
             <div className="flex flex-col justify-start px-4 py-2 flex-1">
               <div>
                 <div className="flex justify-between items-center">
                   <h2 className="font-semibold text-lg text-slate-900">{user.firstName} {user.lastName}</h2>
   
                   {user.age && ( <span className="text-sm font-medium text-slate-600">{user.age} · {user.gender}</span> )}
                 </div>

                 {/* About */}
                 <p className="text-sm text-slate-700 mt-1 line-clamp-2">{user.about}</p>
               </div>
   
               {/* Skills */}
               {user.skills?.length > 0 && (
                 <div className="flex flex-wrap gap-2 mt-2 ">
                   {user.skills.slice(0, 3).map((skill, idx) => (
                     <span key={idx} className="bg-slate-100 text-slate-700 border border-slate-200 px-2.5 py-1 rounded-full text-xs font-semibold">
                       {skill}
                     </span>
                   ))}
                   {user.skills.length > 3 && (
                     <span className="bg-slate-200 text-slate-600 px-2.5 py-1 rounded-full text-xs font-semibold">
                       +{user.skills.length - 3} more
                     </span>
                   )}
                 </div>
               )}
             </div>

             {/* Action */}
             <div className="flex flex-col items-center justify-center px-5 border-l border-slate-200">
               <span className="text-[11px] text-slate-500 mb-1 tracking-wide">Message</span>
               <Link to={`/chat/${user._id}`}>
                 <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white min-w-[100px] shadow-md">Chat</button>
               </Link>
             </div>
           </div>
         ))}
       </div>
   
       <div className="mb-20" />
     </div>
   );

};

export default Connections;
