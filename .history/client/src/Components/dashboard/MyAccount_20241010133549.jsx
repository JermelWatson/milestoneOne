import { useRef, useState, useEffect } from "react";
import React from "react";
import "./Dashboard.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Sidebar from "./Sidebar";
import Content from "./Content";
import Profile from "./Profile";

const Dashboard = ()=> {
    return (
        <>
        <div className="dashboard">
            <Sidebar/>
            <div className="dashboard-content">
                <Content />
                <Profile />
            </div>
        </div>
        </>
)}

export default Dashboard;