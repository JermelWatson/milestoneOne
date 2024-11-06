import React, { useContext, useState } from "react";
import {BiBookContent, BiCog, BiHome, BiMale, BiPowerOff } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import "./AdminView.css";
import { UserContext } from "../UserContext";

const AdminView = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext); // Accessing userData from context

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const options = ['Approve Courses', 'Select Prerequisites'];

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option) => {
      setSelectedOption(option);
      setIsOpen(false);
      if(option === "Approve Courses"){
        navigate("/approve_courses");
      }
      else{
        navigate("/select_prereqs");
      }
  };

  return (
    <>
      <div className="sidebar">
        <div className="menu">
          <h2 className="dash-head">Admin</h2>
          {/* Safely access first_name using optional chaining or fallback */}
          <h4>Welcome: {user?.first_name || "Guest"}</h4>
          <div className="menu-list">
            <a href="#" className="item">
              <BiHome className="icon" />
              Home
            </a>

            <div>
              <button id="adviceBtn" className="item" onClick={toggleDropdown}>
              <BiBookContent className="icon" />
                {selectedOption || "Advising Menu"}
              </button>
              {isOpen && (
                <ul>
                  {options.map((option, index) => (
                    <li
                      key={index}
                      onClick={() => handleOptionClick(option)}
                      style={{cursor: "pointer" }}
                      className="item"
                      id="list_item"
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <Link to="/my-account" className="item">
              <BiCog className="icon" />
              My Account
            </Link>

            <a href="#" className="item">
              <BiMale className="icon" />
              Profile
            </a>

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
