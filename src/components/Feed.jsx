import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { feed } from "../utils/feedSlice";
import ProfileUserCard from "./ProfileUserCard";


const Feed = ()=>{
  const dispatch = useDispatch();
  const {feed: feedData} = useSelector((state)=>state.feed);  

  useEffect(()=>{
    dispatch(feed())
  },[])

  if(!feedData) return 
  if(!feedData.length) return <>No users found</>

    return (
      // <h1>Feed Works</h1>
    <div className="flex justify-center mt-10 mb-24">
       <ProfileUserCard user={feedData[0]} showButtons={true}></ProfileUserCard>
    </div>
    )
  }
  
  export default Feed