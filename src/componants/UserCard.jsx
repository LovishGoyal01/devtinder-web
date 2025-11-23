import axios from "axios";
import { useDispatch } from "react-redux";
import { Base_URL } from "../utils/constants";
import { removeUserFromFeed } from "../utils/feedSlice";

 
const UserCard = ({user}) => {

   const {_id,firstName , lastName , photoURL, age , gender , about , skills} = user;
   const dispatch = useDispatch();

   const handleSendRequest = async (status,userId) =>{
     try{
      await axios.post(Base_URL+"/request/send/"+status+"/"+userId , {},{withCredentials:true})
      dispatch(removeUserFromFeed(userId));
     }catch(err){
      console.log(err);
     }
   }

    return (
        <div>
          <div className="card bg-base-100 w-90 h-125 shadow-md hover:shadow-2xl mt-25">
            <figure>
              <img className="h-90 w-full object-center object-contain"
               src= {photoURL}
               alt="Photo" />
            </figure>
            <div className="card-body ">
             <div className="flex justify-between items-center -mt-4"> 
              <h2 className="card-title ">{firstName + " " + lastName}</h2>
              {age && gender && <h3 className="font-bold  mr-1">{age + " , " + gender}</h3>}
             </div> 
              <p className="-mt-1 mb-1">{about}</p>
              {skills && <p>{skills}</p>}
              <div className="card-actions justify-center gap-4">
                <button className="btn btn-primary px-7" onClick={()=>handleSendRequest("ignored",_id)}>Ignore</button>
                <button className="btn btn-secondary" onClick={()=>handleSendRequest("interested",_id)}>Interested</button>
              </div>
            </div>
          </div>
        </div>

    )
};

export default UserCard;