import React, { useState } from "react"
import ProfileUserCard from "./ProfileUserCard";
import { useDispatch } from "react-redux";
import { editProfile } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const dispatch = useDispatch()
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age || '')
  const [gender, setGender] = useState(user.gender || '');
  const [about, setAbout] = useState(user.about || '');
  const [successMessage, setSuccessMessage] = useState(false)


  const handleEditProfile = async () => {
    try {
      const data = { firstName, lastName, photoUrl, age, gender, about };
      await dispatch(editProfile({ data })).unwrap();
      setSuccessMessage(true);
      setTimeout(() => {
      setSuccessMessage(false);        
      }, 3000);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="flex justify-center mb-20 mt-10">
      <div className="flex justify-center mx-10">
        <div className="card bg-base-300 w-96 shadow-xl">
          <div className="card-body">
            <h2 className="card-title justify-center">Edit Profile</h2>
            <div></div>
            <div className="">
              <label className="form-control w-full  max-w-xs my-2">
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

              <label className="form-control w-full max-w-xs my-2">
                <div className="label">
                  <span className="label-text">Age</span>
                </div>
                <input
                  type="text"
                  value={age}
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setAge(e.target.value)}
                />
              </label>

              <label className="form-control w-full max-w-xs my-2">
                <div className="label">
                  <span className="label-text">Gender</span>
                </div>
                <select className="select select-bordered w-full max-w-xs" value={gender} onChange={(e) => setGender(e.target.value)}>
                  <option value="" disabled>Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </label>

              <label className="form-control w-full  max-w-xs my-2">
                <div className="label">
                  <span className="label-text">Photo URL</span>
                </div>
                <input
                  type="text"
                  value={photoUrl}
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setPhotoUrl(e.target.value)}
                />
              </label>

              <label className="form-control w-full max-w-xs my-2">
                <div className="label">
                  <span className="label-text">About</span>
                </div>
                <textarea className="textarea textarea-bordered" value={about} placeholder="Write here" onChange={(e) => setAbout(e.target.value)}></textarea>

              </label>
            </div>
            <button className="btn btn-primary" onClick={handleEditProfile}>Save</button>
          </div>
        </div>
      </div>
      <ProfileUserCard user={{ firstName, lastName, age, gender, photoUrl, about }} />
     { successMessage &&
       <div className="toast toast-top toast-center">
       <div className="alert alert-success">
         <span>Profile updated successfully.</span>
       </div>
     </div>
     }
    </div>
  )
}

export default EditProfile