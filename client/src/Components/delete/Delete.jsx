import { useRef, useState, useEffect } from "react";
import React from "react";
import "./Delete.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Delete = () => {
  const emailRef = useRef();
  const [email, setEmail] = useState("");
  const [emailFocus, setEmailFocus] = useState(false);

  const navigate = useNavigate();

  const handleDelete = async (e) => {
    e.preventDefault(); // Prevent page reload
    const formBody = {
        email: email,
    };

    try {
      const result = await axios.delete("http://localhost:3000/delete", formBody, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (result.status === 200) {
        console.log(formBody);
        navigate('/login');
      } else {
        console.error("Delete failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="signin-container">
        <form className="delete-form" onSubmit={handleDelete}>
          <div className="header">Delete
            <div className="underline"></div>
          </div>
          <div className="input-fields">
            <input
              type="email"
              className="input"
              ref={emailRef}
              id="email"
              autoComplete="off"
              placeholder="Verify email@example.com"
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
              required
            />
            <div className="btn"><button type="submit" className="delete-button">Delete</button></div>
    
          </div>
        </form>
        <div className="go-back">
          <p>Return to home?</p>
         <div className="link"><Link to="/dashboard" className="returnBtn">Return</Link></div> 
        </div>
      </div>
    </>
  );
};

export default Delete;