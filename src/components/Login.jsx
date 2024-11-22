import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { clearErrorMessage, login, register } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error , userData } = useSelector((state)=>state.user);
  const [email, setEmail] = useState('elon@gmail.com');
  const [password, setPassword] = useState('Elon@123');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isLoginForm, setIsLoginForm] = useState(true);

  const handleLogin = async() => {
    if(!email || !password) {
      return alert("Email and password is required")
    } 
    try {
      await dispatch(login({ email, password })).unwrap();
      navigate('/'); 
    } catch (err) {
      console.error("Login failed:", err); 
    }    
  }
  
  const handleSignUp = async() => {   
   
    try {
      await dispatch(register({ email, password, firstName,lastName })).unwrap();
      navigate('/'); 
    } catch (err) {
      console.error("Register failed:", err); 
    }    
  }
  
 useEffect(()=>{
  const timeOutId=  setTimeout(() => {
    dispatch(clearErrorMessage())
  }, 3000);
  return ()=> clearTimeout(timeOutId)
 },[error])
  
  return (
    <>
    {isLoading && <span className="loading loading-spinner loading-md absolute top-[50%] left-[50%] z-10"></span>}
     <div className="flex justify-center mt-10 mb-20">
    <div className="card bg-base-300 w-96 shadow-xl">
      <div className="card-body gap-0">
        <h2 className="card-title justify-center">
          {isLoginForm ? "Login" : "Sign Up"}
        </h2>
        <div>
          {!isLoginForm && (
            <>
              <label className="form-control w-full max-w-xs my-2">
                <div className="label">
                  <span className="label-text">First Name</span>
                </div>
                <input
                  type="text"
                  value={firstName}
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </label>
              <label className="form-control w-full max-w-xs my-2">
                <div className="label">
                  <span className="label-text">Last Name</span>
                </div>
                <input
                  type="text"
                  value={lastName}
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </label>
            </>
          )}
          <label className="form-control w-full max-w-xs my-2">
            <div className="label">
              <span className="label-text">Email ID:</span>
            </div>
            <input
              type="text"
              value={email}
              className="input input-bordered w-full max-w-xs"
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label className="form-control w-full max-w-xs my-2">
            <div className="label">
              <span className="label-text">Password</span>
            </div>
            <input
              type="password"
              value={password}
              className="input input-bordered w-full max-w-xs"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>
        <p className="text-red-500">{error}</p>
        <div className="card-actions justify-center m-2">
          <button
            className="btn btn-primary"
            onClick={isLoginForm ? handleLogin : handleSignUp}
          >
            {isLoginForm ? "Login" : "Sign Up"}
          </button>
        </div>

        <p
          className="m-auto cursor-pointer py-2"
          onClick={() => setIsLoginForm((value) => !value)}
        >
          {isLoginForm
            ? "New User? Signup Here"
            : "Existing User? Login Here"}
        </p>
      </div>
    </div>
  </div>
    </>
   
  )
}

export default Login