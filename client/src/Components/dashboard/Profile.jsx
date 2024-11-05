import React, { useContext } from "react";
import { UserContext } from "../UserContext";
import {BiCog, BiHome, BiMale, BiPowerOff, BiUser, } from 'react-icons/bi';
import { useState } from "react";
import './Profile.css'
import ProfileHeader from "./ProfileHeader";

const Profile = () => {
    const { user } = useContext(UserContext);
    return (
        <div className="profile">
            <ProfileHeader />

            <div className="user-profile">
                <div className="user-detail">
                    <div className="pro-container">
                        <BiUser className="user-icon"/>
                        </div>
                    <h3 className="user-name">{user?.first_name && user?.last_name || "Guest"}</h3>

                </div>
            </div>
        </div>
    )
}
export default Profile