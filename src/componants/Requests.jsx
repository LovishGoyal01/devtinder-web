import axios from "axios";
import { Base_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addRequest, removeRequest } from "../utils/requestSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Requests = () =>{

    const requests = useSelector((store)=>store.requests);
    const dispatch = useDispatch();
    const naigate = useNavigate();

    const [iSDisable, setIsDisable] = useState(false);
   
    const fetchRequests =  async() =>{
       try{ 
          const {data} = await axios.get(Base_URL + "/user/requests/received" , {withCredentials:true})
          if(data.success){
             dispatch(addRequest(data.connectionRequest));
             toast.success(data.message)
          }else{
             toast.error(data.message)
          }
       }catch(error){
         toast.error(error.message)
       }
    }

    const handleRequest = async (status,_id) =>{
       try{
          setIsDisable(true); 

          const {data} = await axios.post(Base_URL+ "/request/review/"+status+"/"+_id ,{}, {withCredentials:true}) 
          if(data.success){
            dispatch(removeRequest(_id));
            toast.success(data.message)
          }else{
            toast.error(data.message)
          } 
       }catch(error){
          toast.error(error.message)
       }finally{
          setIsDisable(false)
       }
    }  

    useEffect(()=>{
      fetchRequests();
    },[])

    if (!requests) {
      return (
        <div className="flex items-center justify-center h-[60vh]">
          <h1 className="text-white text-2xl font-semibold">Fetching requests…</h1>
        </div>
      );
    }



    if (requests.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center h-[60vh] text-center">
          <h1 className="text-white text-2xl font-semibold mb-2">No Requests Yet 👋</h1>
          <p className="text-white/80 text-sm max-w-md"> Looks like no one has reached out so far. Try updating your profile to showcase your skills and interests better.</p>
        </div>
      );
    }
   
   return (
      <div className="flex flex-col items-center pt-24 w-full max-w-[720px] mx-auto">
        <h1 className="font-bold text-2xl text-center mb-6 text-white">
          Requests
        </h1>

        <div className="flex flex-col gap-4 w-full">
          {requests.map((request) => {
            const user = request.fromUserId;

            return (
             <div key={request._id} className="flex bg-white/85 backdrop-blur-md shadow-lg rounded-xl overflow-hidden h-[130px] border border-white/30">
               
                {/* LEFT: Avatar */}
                <div className="w-32 h-full flex-shrink-0">
                  <img src={user.photoURL} alt="User" className="w-full h-full object-cover"/>
                </div>

                {/* MIDDLE: Info */}
                <div className="flex flex-col justify-start px-4 py-2 flex-1">
                  <div>
                    <div className="flex items-center justify-between">
                      <h2 className="font-semibold text-lg text-gray-900">{user.firstName} {user.lastName}</h2>

                      {user.age && ( <span className="text-sm font-medium text-gray-600">{user.age} · {user.gender}</span>)}
                    </div>
                    
                    {/* About (2 lines max) */}
                    <p className="text-sm text-gray-700 mt-1 line-clamp-2">{user.about}</p>
                  </div>

                  {/* Skills */}
                  {user.skills?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {user.skills.slice(0, 3).map((skill, idx) => (
                        <span key={idx} className="bg-slate-100 text-slate-700 border border-slate-200 px-2.5 py-1 rounded-full text-xs font-semibold">
                         {skill}
                        </span>
                      ))}
                      {user.skills.length > 3 && (
                        <span className="bg-slate-200 text-slate-600 px-2.5 py-1 rounded-full text-xs font-semibold">+{user.skills.length - 3}</span>
                      )}
                    </div>
                  )}
                </div>

                {/* RIGHT: Actions */}
                <div className="flex flex-col justify-center gap-2 px-4">
                  <button className="btn bg-pink-500 hover:bg-pink-600 text-white min-w-[110px]" disabled={iSDisable} onClick={() =>handleRequest("accepted", user._id)}>   
                    Accept
                  </button>

                  <button className="btn bg-slate-300 hover:bg-slate-400 hover:text-slate-900 text-slate-700 min-w-[110px]" disabled={iSDisable} onClick={() => handleRequest("rejected", user._id) }>
                    Reject
                  </button>
                </div>
             </div>
            );
          })}
        </div>

        <div className="mb-20" />
     </div>
   );
} 

export default Requests;