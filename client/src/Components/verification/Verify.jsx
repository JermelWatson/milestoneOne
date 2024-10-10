import { useRef, useState, useEffect } from "react";
import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Verify = () => {
    const [code, setCode] = useState();
    
    const navigate = useNavigate();

    const handleVerify = async (e) => {
    
    e.preventDefault(); // Prevent page reload

    const formBody=JSON.stringify({
      code: code
    })

    const result = await fetch("http://localhost:3000/verify", {
      method: "POST",
      body:formBody,
      headers:{
        'content-type':'application/json'
      }
    });
      if (result.status === 200) {
        navigate('/login');
      } else {
        console.error("verificatiion failed");
      }
    }

  return (
    <>
      <div className="signin-container">
        <form className="signup-form" onSubmit={handleVerify}>
          <div className="forgot-password">Enter verification code below:</div>
          <div className="input-fields">
            <input
              type="text"
              className="input"
              name={code}
              id="email"
              autoComplete="off"
              placeholder="Enter code"
              onChange={(e) => setCode(e.target.value)}
              required
            />
            <div className="btn"><button type="submit" className="sendBtn">Enter</button></div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Verify;