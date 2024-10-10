import { useRef, useState, useEffect } from "react";
import React from "react";
import "./ForgotPassword.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const EMAIL_REGEX = /^[^\s@]+@[^s@]+\.[^\s@]+$/;


const ForgotPassword = () => {
  const emailRef = useRef();
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [vie]

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent page reload

    const formBody=JSON.stringify({
      email: email
    })

    const result = await fetch("http://localhost:3000/forgot-password", {
      method: "POST",
      body:formBody,
      headers:{
        'content-type':'application/json'
      }
    });
      if (result.status === 200) {
        navigate('/verify');
      } else {
        console.error("verificatiion failed");
      }
    }

  return (
    <>
      <div className="signin-container">
        <form className="signup-form" onSubmit={handleLogin}>
          <div className="forgot-password">Enter existing email address
          </div>
          <div className="input-fields">
            <input
              type="email"
              className="input"
              ref={emailRef}
              id="email"
              autoComplete="off"
              placeholder="Enter email@example.com"
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
              required
            />
            <div className="btn"><button type="submit" className="sendBtn">Send verification</button></div>
          </div>
        </form>
        <div className="login">
          <p>Return to login</p>
         <div><Link to="/login" className="return">Return</Link></div> 
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;