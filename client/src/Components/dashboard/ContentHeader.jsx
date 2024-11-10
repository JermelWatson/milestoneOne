import React, { useContext } from "react";
import { BiNotification, BiSearch } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import "./Content.css"
import { UserContext } from "../UserContext";

const ContentHeader = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext); // Accessing userData from context

  return (
    <div className="content-header">
      <h1 className="header-title">Welcome: {user?.first_name || "Guest"}</h1>
      <div className="header-activity">
        <div className="search-box">
          <input type="text" placeholder="Search" />
          <BiSearch className="icon" />
        </div>

        <div className="notify">
            <BiNotification className="icon"/>
        </div>
      </div>
    </div>
  );
};

export default ContentHeader;
