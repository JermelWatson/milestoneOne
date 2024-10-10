import { useRef, useState, useEffect } from "react";
import React from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../UserContext";
import { useContext } from 'react';


const EMAIL_REGEX = /^[^\s@]+@[^s@]+\.[^\s@]+$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Login = () => {
  const emailRef = useRef();
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [view, setView] = useState("login");
  const [code, setCode] = useState("");

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  useEffect(() => {
    const result = PWD_REGEX.test(password);
    setValidPassword(result);
  }, [password]);

  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleVerify = async (e) => {
    e.preventDefault(); // Prevent form submission reload
    
    const verifyBody = JSON.stringify({
      email: email,
      code: code,
    });

    try {
      const response = await fetch("http://localhost:3000/verify", {
        method: "POST",
        body: verifyBody,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const result = await response.json(); // Parse the response body
        const user = { 
          first_name: result.data[0].first_name, 
          last_name: result.data[0].last
          email: 'jane.doe@example.com' 
        
        }; // Retrieved from API
        setUserData(user); 
        if (result.data && result.data[0].is_admin === 1) {
          console.log("IS ADMIN USER");
          navigate("/admin");
        } else {
          console.log("IS NORMAL USER");
          navigate("/dashboard");
        }
      } else {
        console.log("Failed to verify email");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent page reload
    const formBody = JSON.stringify({
      email: email,
      password: password,
    });

    try {
      const result = await axios.post("http://localhost:3000/login", formBody, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (result.status === 200) {
        if (result.data.status === 400) {
          alert("Password is incorrect");
        } else {
          setView("verify");
        }
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      {view === "login" && (
        <div className="signin-container">
          <form className="signup-form" onSubmit={handleLogin}>
            <div className="header">
              Log in
              <div className="underline"></div>
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
              <input
                type="password"
                className="input"
                id="password"
                autoComplete="off"
                placeholder="Enter Password"
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setPasswordFocus(true)}
                onBlur={() => setPasswordFocus(false)}
                required
              />
              <div className="btn">
                <button type="submit" className="loginBtn">
                  Login
                </button>
              </div>
            </div>
            <p>
              <Link to="/forgot-password" className="href">
                Forgot password?
              </Link>
            </p>
          </form>
          <div className="login">
            <p>Don't have an account?</p>
            <div>
              <Link to="/" className="signinBtn">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      )}

      {view === "verify" && (
        <div className="signin-container">
          <form className="signup-form" onSubmit={handleVerify}>
            <div className="forgot-password">
              Enter verification code below:
            </div>
            <div className="input-fields">
              <input
                type="text"
                className="input"
                value={code}  // Correctly bind the value
                id="code"
                autoComplete="off"
                placeholder="Enter code"
                onChange={(e) => setCode(e.target.value)}  // Update the state
                required
              />
              <div className="btn">
                <button type="submit" className="sendBtn">
                  Enter
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Login;