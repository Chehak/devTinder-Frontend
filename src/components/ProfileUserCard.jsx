import React from "react";


const ProfileUserCard = ({ user }) => {
    const { firstName, lastName, age, gender, photoUrl, about } = user;

    return (
        <div className="card bg-base-300 w-96 shadow-xl">
            <figure>
                <img 
                    src={photoUrl}
                    alt="userPhoto" />
            </figure>
            <div className="card-body grow-0">
                <h2 className="card-title">{firstName} {lastName && lastName}</h2>
                {age && gender && <p>{age },{gender} </p>}
                <p>{about && about}</p>
                <div className="card-actions justify-center my-4">
                    <button
                        className="btn btn-primary"

                    >
                        Ignore
                    </button>
                    <button
                        className="btn btn-secondary"

                    >
                        Interested
                    </button>
                </div>
            </div>
        </div>
    )


}
export default ProfileUserCard