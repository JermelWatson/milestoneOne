import React from "react";
import {BiCog, BiHome, BiMale, BiPowerOff, BiUser, } from 'react-icons/bi';
import { useState } from "react";
import './Profile.css'
import ProfileHeader from "./ProfileHeader";

const [user, set]

const Profile = () => {
    return (
        <div className="profile">
            <ProfileHeader />

            <div className="user-profile">
                <div className="user-detail">
                    <div className="pro-container">
                        <BiUser className="user-icon"/>
                        </div>
                    <h3 className="user-name">Dynamically display first and last name from database here</h3>

                </div>
            </div>
        </div>
    )
}
export default Profile