import axios from "axios";
import { Base_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addRequest, removeRequest } from "../utils/requestSlice";

const Requests = () =>{

    const requests = useSelector((store)=>store.requests);
    const dispatch = useDispatch();
   
     const fetchRequests =  async() =>{
       try{ 
        const res = await axios.get(Base_URL + "/user/requests/received" , {withCredentials:true})
        dispatch(addRequest(res.data));
       
       }catch(err){
         console.log(err);
       }
     }

     const handleRequest = async (status,_id) =>{
        try{
        await axios.post(Base_URL+ "/request/review/"+status+"/"+_id ,{}, {withCredentials:true})
        dispatch(removeRequest(_id));
        }catch(err){
         console.log(err);
       }
    }


     useEffect(()=>{
        fetchRequests();
     },[])

    if(requests === null) return <h1 className="flex justify-center my-10">Loading...</h1>;
    if(requests.length === 0) return <h1 className="flex justify-center my-10">No Requests Found</h1>

    return (
<div className="bg-gradient-to-r from-rose-400 to-blue-400 min-h-screen" >      
  <div className="flex flex-col  w-[700px]   mx-auto ">
    <div className=" object-contain">
    <h1 className="font-bold text-2xl text-center pt-18 mb-3  text-gray-700">Requests</h1>

    <div className="flex flex-col gap-4 w-full">
      {requests.map((request) => (
        <div key={request._id}>
          <div className="card card-side bg-base-100 shadow-sm w-full h-32">
            <figure className="w-32 h-32 flex-shrink-0 overflow-hidden bg-amber-100 rounded-md">
               <img
                src={request.fromUserId.photoURL}
               alt="User"
               className="w-full h-full object-cover"
              />
            </figure>
            <div className="card-body pt-2">
             <div className="flex justify-between">   
              <h2 className="card-title">
                {request.fromUserId.firstName + " " + request.fromUserId.lastName}
              </h2>
              <h4 className="font-bold my-3 mx-4">{request.fromUserId.age + "/" + request.fromUserId.gender} </h4>
             </div>
             <div className="flex justify-between ">
              <p className="max-w-3/5">{request.fromUserId.about}</p>
               <div className="card-actions justify-end mx-2">
                <button className="btn btn-secondary px-4" onClick={()=>handleRequest("accepted",request.fromUserId._id)} >Accept</button>
                <button className="btn btn-primary px-5" onClick={()=>handleRequest("rejected",request.fromUserId._id)}>Reject</button>
              </div>
             </div>   
            </div>
          </div>
        </div>
      ))}
    </div>
   </div> 
    <div className="mb-20"></div>
  </div>
</div>  
);

}

export default Requests;