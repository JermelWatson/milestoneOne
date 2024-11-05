import React from "react";
import { BiEdit } from "react-icons/bi";
import "./Sidebar.css"

const ProfileHeader =() => {
    return (
        <>
            <div className="profile-header">
                <h2 className="profile-title">Profile</h2>
                <div className="edit">
                    <BiEdit className="icon"/>
                </div>
            </div>
        </>
    )
}

export default ProfileHeader