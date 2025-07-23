import axios from "axios";
import { Base_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";


const Feed = () => {
 
    const feed = useSelector((store)=>store.feed);
    const dispatch = useDispatch();
   
    const getFeed = async () => {
      try{
       const res = await axios.get( Base_URL + "/feed",{withCredentials:true});
        dispatch(addFeed(res.data)); 
       }catch(err){
         console.error(err.message);
       }
    }

    useEffect(()=>{
        getFeed();
    },[])

    return(
       feed && (
           <div className="flex justify-center my-10">
              <UserCard user={feed[0]} />
           </div>
       )
    );
     
}

export default Feed;