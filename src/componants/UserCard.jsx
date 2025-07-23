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
          <div className="card bg-base-100 w-90 h-125 shadow-sm mb-15">
            <figure>
              <img className="h-75"
               src= {photoURL}
               alt="Photo" />
            </figure>
            <div className="card-body">
             <div className="flex justify-between items-center"> 
              <h2 className="card-title">{firstName + " " + lastName}</h2>
              <h3>{age + " , " + gender}</h3>
             </div> 
              <p>{about}</p>
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