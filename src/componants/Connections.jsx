import axios from "axios";
import { Base_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { useEffect } from "react";

const Connections = () =>{

    const connections = useSelector((store)=>store.connections);
    const dispatch = useDispatch();


     const fetchConnections =  async() =>{
       try{ 
        const res = await axios.get(Base_URL + "/user/connections" , {withCredentials:true})
        dispatch(addConnections(res.data?.data));
       
       }catch(err){
         console.log(err);
       }
     }

     useEffect(()=>{
        fetchConnections();
     },[])

    if(!connections) return;
    if(connections.length === 0) return <h1>No connections Found</h1>

    return (
  <div className="flex flex-col my-10 w-[600px] mx-auto">
    <h1 className="font-bold text-2xl text-center">Connections</h1>

    <div className="flex flex-col gap-4 w-full">
      {connections.map((connection) => (
        <div key={connection._id}>
          <div className="card card-side bg-base-100 shadow-sm w-full h-30">
            <figure>
              <img
                className="w-30 h-32 object-cover"
                src={connection.photoURL}
                alt="Image"
              />
            </figure>
            <div className="card-body">
             <div className="flex justify-between">   
              <h2 className="card-title">
                {connection.firstName + " " + connection.lastName}
              </h2>
              <h4 className="font-bold my-3 mx-4">{connection.age+"/"+connection.gender } </h4>
             </div>
              <p>{connection.about}</p>
              {/* <div className="card-actions justify-end">
                <button className="btn btn-primary">See</button>
              </div> */}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

}

export default Connections;