import React from "react";
import { BiCloud, BiLogoHtml5, BiNetworkChart, BiMath } from "react-icons/bi";
import "./Content.css"

const courses = [
    {
        title: "CS Web Development",
        icon: <BiLogoHtml5 />,
    },
    {
        title: "Computational Methods",
        duration:"7 Hours",
        icon: <BiMath />,
    },
    {
        title: "Artificial Intelligence",
        duration: "2 Hours",
        icon: <BiNetworkChart />,
    },
    {
        title: "Cloud Computing",
        duration: "3 Hours",
        icon: <BiCloud/>,
    },
]

const Card = () => {
    return (
        <>
            <div className="card-container">
            {courses.map((item) => (
                <div className='card'>
                <div className="card-cover">{item.icon}</div>
                <div className="card-title"><h5>{item.title}</h5></div>
                </div>
            ))}
            </div>
        </>
    )
}

export default Card;