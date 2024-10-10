import { useRef, useState, useEffect } from "react";
import React from "react";
import "./Dashboard.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Sidebar from "./Sidebar";
import Content from "./Content";
import Profile from "./Profile";


const MyAccount = () => {
    const [email, setEmail]
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert('New password and confirm password do not match');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/change-password', {
        oldPassword,
        newPassword
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Send token if needed
        }
      });

      if (response.data.success) {
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
    <form onSubmit={handleSubmit}>
      <div>
        <label>Old Password</label>
        <input
          type="password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          required
        />
      </div>

      <div>
        <label>New Password</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Confirm Password</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>

      <button type="submit">Change Password</button>
    </form>
  );
};

export default MyAccount;
