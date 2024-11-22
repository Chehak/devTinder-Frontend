import React from "react"
import { useSelector } from "react-redux"
import EditProfile from "./EditProfile"

const Profile = ()=>{
  const {userData}= useSelector((state)=>state.user)
  
  return (
    
    userData && (
      <div>
        <EditProfile user={userData}/>
      </div>
    )

  )
}

export default Profile