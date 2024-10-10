import React from "react";
import {BiCog, BiHome, BiMale, BiPowerOff, } from 'react-icons/bi';
import { useState } from "react";
import './Sidebar.css'
import { Link } from "react-router-dom";

const Sidebar = () => {
    return (
    <>
    <div>
        <div className="menu">
            <h2 className="dash-head">Dashboard</h2>
        <div className="menu-list">
            <a href="#" className="item">
                <BiHome className="icon"/>
                Home
            </a>

            <Link to="/my" className="item">
                <BiCog className="icon"/>
                My Account
            </Link>

            <a href="#" className="item">
                <BiMale className="icon"/>
                Profile
            </a>

            <Link to="/login" className="item">
                <BiPowerOff className="icon"/>
               Sign out
            </Link>
        </div>
    </div>
    </div>
    </>
    )
}

export default Sidebar;