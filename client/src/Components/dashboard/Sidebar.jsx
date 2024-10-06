import React from "react";
import {BiCog, BiHome, BiMale, BiPowerOff, } from 'react-icons/bi';
import { useState } from "react";
import './Sidebar.css'

const Sidebar = () => {
    return (
    <>
    <div>
        <div className="menu">
            <h2>Dashboard</h2>
        <div className="menu-list">
            <a href="#" className="item">
                <BiHome className="icon"/>
                Home
            </a>

            <a href="#" className="item">
                <BiCog className="icon"/>
                My Account
            </a>

            <a href="#" className="item">
                <BiMale className="icon"/>
                Profile
            </a>

            <a href="#" className="item">
                <BiPowerOff className="icon"/>
                Sign out
            </a>
        </div>
    </div>
    </div>
    </>
    )
}

export default Sidebar;