import { useRef, useState, useEffect } from "react";
import React from "react";
import "./Dashboard.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Sidebar from "./Sidebar";
import Content from "./Content";
import Profile from "./Profile";


const MyAccount = () => {
    const [email, setEmail] = useState()
  const [oldPassword, setOldPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert('New password and confirm password do not match');
      return;
    }
    const formBody = JSON.stringify({
        email: email,
        password: confirmPassword,
      });

      try {
        const response = await fetch("http://localhost:3000/change-password", {
          method: "PUT",
          body: formBody,
          headers: {
            "Content-Type": "application/json",
          },
        });

      if (response.ok) {
        alert('Password changed successfully');
      } else {
        alert('Failed to change password');
      }
    } catch (error) {
      console.error('Error changing password', error);
      alert('Error changing password');
    }
  };

  return (
    <>
    <div className="signin-container">
    <form className="signup-form" onSubmit={handleSubmit}>
    <div className="header">
              Change Password
              <div className="underline"></div>
              </div>
      <div className="input-fields">
        <input
        className="input"       
        placeholder="Enter email address"
          type="text"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          required
          autoComplete="off"
        />

<input
        className="input"       
        placeholder="Enter Old Password"
          type="password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          required
          autoComplete="off"
        />
      
        <input
        className="input"
        placeholder="Enter New Password"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          autoComplete="off"
        />
      
        <input
        className="input"
        placeholder="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          autoComplete="off"
        />

        </div>
      <button className="sendBtn" type="submit">Change Password</button>
    </form>
    </div>
    </>
  );
};

export default MyAccount;
