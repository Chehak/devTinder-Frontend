import React from "react";
import { useDispatch } from "react-redux";
import { sendConnectionRequest } from "../utils/feedSlice";


const ProfileUserCard = ({ user , showButtons }) => {
    const dispatch = useDispatch()
    const { firstName, lastName, age, gender, photoUrl, about ,_id} = user;

    const handleRequest = async(status,userId)=>{
        try{
            await dispatch(sendConnectionRequest({status,userId})).unwrap()
        }catch(err){
            console.log(err);            
        }
    };
    return (
        <div className="card bg-base-300 w-[20rem] shadow-xl">
            <figure>
                <img 
                    src={photoUrl}
                    alt="userPhoto" />
            </figure>
            <div className="card-body grow-0">
                <h2 className="card-title">{firstName} {lastName && lastName}</h2>
                {age && gender && <p>{age },{gender} </p>}
                <p>{about && about}</p>
               {
                showButtons && 
                <div className="card-actions justify-center my-4" >
                <button className="btn btn-primary" onClick={()=>handleRequest("ignored",_id)}>Ignore</button>
                <button className="btn btn-secondary" onClick={()=>handleRequest("interested",_id)}>Interested</button>
            </div>
               }
            </div>
        </div>
    )


}
export default ProfileUserCard