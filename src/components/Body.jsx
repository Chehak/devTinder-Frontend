import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import Footer from "./Footer"
import { useDispatch, useSelector } from "react-redux"
import { profile } from "../utils/userSlice"
import { useEffect } from "react"

const Body = ()=>{
    const dispatch = useDispatch()
    const {userData} = useSelector((state)=>state.user);

    const getProfile = async()=>{
        if(userData) return;
        try{
          await  dispatch(profile()).unwrap()
        }catch(err){
            console.log(err);
            
        }
    }

    useEffect(()=>{
        getProfile()
    },[])

return(    
    <>
   <Navbar/>
   <Outlet/>
   <Footer />
    </>
)

}
export default Body