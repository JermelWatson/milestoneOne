import React from "react";
import {
  BiBookContent,
  BiCog,
  BiHome,
  BiMale,
  BiPowerOff,
} from "react-icons/bi";
import { useState, useContext} from "react";
import "./Sidebar.css";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";

const Sidebar = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const options = ["Course Advising History", "Courses Advising form"];

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    if (user.is_admin === true){
      if (option === "Course Advising History") {
        console.log(option)
      navigate("/approve_courses");
    } else {
      navigate("/course_Advising_form");
    }
    }
    else{
      if (option === "Course Advising History") {
        console.log(option)
      navigate("/course_Advising_history");
    } else {
      navigate("/course_Advising_form");
    }
    }
    
  };
  return (
    <>
      <div>
        <div className="menu">
          <h2 className="dash-head">Dashboard</h2>
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
                      style={{ cursor: "pointer" }}
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

export default Sidebar;
