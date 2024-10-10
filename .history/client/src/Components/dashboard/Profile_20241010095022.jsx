import React from "react";
import {BiCog, BiHome, BiMale, BiPowerOff, BiUser, } from 'react-icons/bi';
import { useState } from "react";
import './Profile.css'
import ProfileHeader from "./ProfileHeader";

const [user, setUser] = useState();

const loadUser = async (e) => {
    e.preventDefault(); // Prevent form submission reload

    const verifyBody = JSON.stringify({
      email: email,
      code: code,
    });

    try {
      const response = await fetch("http://localhost:3000/verify", {
        method: "POST",
        body: verifyBody,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const result = await response.json(); // Parse the response body

        if (result.status === 200) {
          // Check if the user is admin or not
          console.log(result.data)
          if (result.data[0].is_admin === 1) {
            console.log("IS ADMIN USER");
            navigate("/admin");
          } else {
            console.log("IS NORMAL USER");
            navigate("/dashboard");
          }
        } else {
          console.error("Verification failed: Invalid code or no token found.");
        }
      } else {
        console.error("Failed to verify email");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

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