import React, { useContext } from "react";
import { BiCog, BiHome, BiMale, BiPowerOff } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import './AdminView.css';
import { UserContext } from "../UserContext";

const AdminView = () => {
  const navigate = useNavigate();
  const { userData } = useContext(UserContext); // Accessing userData from context

  console.log("Logged in user", userData);

  return (
    <>
      <div className="sidebaer">
        <div className="menu">
          <h2 className="dash-head">Admin</h2>
          
          {/* Safely access first_name using optional chaining or fallback */}
          <h4>Welcome {userData?.first_name || 'Guest'}</h4> 
          <div className="menu-list">
            <Link to="/" className="item">
              <BiHome className="icon" />
              Home
            </Link>

            <Link to="/account" className="item">
              <BiCog className="icon" />
              My Account
            </Link>

            <Link to="/profile" className="item">
              <BiMale className="icon" />
              Profile
            </Link>

            <Link to="/login" className="item">
              <BiPowerOff className="icon" />
              Sign out
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminView;