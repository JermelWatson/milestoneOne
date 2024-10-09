import React from "react";
import {BiCog, BiHome, BiMale, BiPowerOff, } from 'react-icons/bi';
import { useState } from "react";
import './AdminView.css'
import { Link } from "react-router-dom";
import Content from "../dashboard/Content";
import ContentHeader from "../dashboard/ContentHeader";


const AdminView = () => {
    return (
    <>
    <div className="sidebaer">
        <div className="menu">
            <h2 className="dash-head">Admin</h2>
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

export default AdminView;