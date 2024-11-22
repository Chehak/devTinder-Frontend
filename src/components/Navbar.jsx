import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { logout, profile, removeUser } from "../utils/userSlice"
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {userData} = useSelector((state)=>state.user)

  const handleLogout = async() => {
    try{
      await dispatch(logout()).unwrap();
      dispatch(removeUser())
      navigate('/login')
    }catch(err){
      console.log(err);      
    }

  }

  return (
    <div className="navbar bg-base-300">
      <div className="flex-1">
        <Link to='/' className="btn btn-ghost text-xl">DevTinder</Link>
      </div>
      {userData && 
      <div className="flex-none">
      <div className="form-control">Welcome, {userData.firstName}</div>

        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            {
              userData && 
              <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src={userData.photoUrl} />
            </div>
            }
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1]  w-52 p-2 shadow">
            <li>
              <Link to='profile' className="justify-between" >
                Profile
                <span className="badge">New</span>
              </Link>
            </li>
            {/* <li><a>Settings</a></li> */}
            <li onClick={handleLogout}><a>Logout</a></li>
          </ul>
        </div>
      </div>
      }
    </div>
  )
}

export default Navbar