import axios from "axios";
import { Base_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


const Feed = () => {
  
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const feed = useSelector((store) => store.feed);

    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const limit = 10;
   
    const getFeed = async () => {

       if (loading || !hasMore) return;
      try{
       setLoading(true);
        
       const {data} = await axios.get(`${Base_URL}/user/feed?page=${page}&limit=${limit}`,{withCredentials:true});
        if(data.success){
          dispatch(addFeed(data.feed));
          setHasMore(data.hasMore);

          if(data.hasMore){
           setPage(prev=>prev+1);
          }

          if (page === 1 && data.feed.length > 0) {
            toast.success("Feed fetched successfully!");
          }
        }else{
          toast.error(data.message)
          navigate("/login")
        }
         
       }catch(error){
         toast.error(error.message)
       }finally {
         setLoading(false);
       }
    }

    useEffect(()=>{
      if (feed.length === 0) {
      getFeed();
     }
    },[feed.length])

    if (!hasMore && feed.length === 0) {
      return (
        <h1 className="text-white text-2xl flex items-center justify-center">🎉 No more users</h1>
      );
    }

    if (loading && feed.length === 0) {
      return (
        <h1 className="text-white text-2xl flex items-center justify-center">Loading users...</h1>
      );
    }

    return (
      <div className="flex justify-center pt-26">
        <UserCard user={feed[0]} />
      </div>
    );
};

export default Feed;