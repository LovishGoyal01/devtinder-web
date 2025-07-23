import axios from "axios";
import { Base_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addRequest } from "../utils/requestSlice";

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

     useEffect(()=>{
        fetchRequests();
     },[])

    if(requests === null) return <h1>Loading...</h1>;
    if(requests.length === 0) return <h1>No Requests Found</h1>

    return (
  <div className="flex flex-col my-10 w-[700px] mx-auto">
    <h1 className="font-bold text-2xl text-center mb-3">Requests</h1>

    <div className="flex flex-col gap-4 w-full">
      {requests.map((request) => (
        <div key={request._id}>
          <div className="card card-side bg-base-100 shadow-sm w-full h-32">
            <figure>
              <img
                className="w-33 h-32 object-cover"
                src={request.fromUserId.photoURL}
                alt="Image"
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
              <p className="max-w-3/5 ">{request.fromUserId.about}</p>
               <div className="card-actions justify-end mx-2">
                <button className="btn btn-secondary px-4">Accept</button>
                <button className="btn btn-primary px-5">Reject</button>
              </div>
             </div>   
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

}

export default Requests;