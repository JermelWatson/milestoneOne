import { useRef, useState, useEffect } from "react";
import React from "react";
import "./login.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const EMAIL_REGEX = /^[^\s@]+@[^s@]+\.[^\s@]+$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Signup = () => {
  const navigate = useNavigate();
  const emailRef = useRef();
  const errRef = useRef();

  // input state variables
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errMsg, setErrMsg] = useState();
  const [view, setView] = useState("login"); // Default to "login" view

  // Signup-specific state variables
  const [first_name, setFirstName] = useState();
  const [last_name, setLastName] = useState();
  const [matchPwd, setMatchPwd] = useState();
  const [validEmail, setValidEmail] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [validMatchPwd, setValidMatchPwd] = useState(false);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    const result = PWD_REGEX.test(password);
    setValidPassword(result);
    const match = password === matchPwd;
    setValidMatchPwd(match);
  }, [password, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [email, password, matchPwd]);

  // Handle sign-up submission
  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    const v1 = EMAIL_REGEX.test(email);
    const v2 = PWD_REGEX.test(password);

    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }

    const formBody = JSON.stringify({
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: password,
      is_admin: false,
      token: 0,
    });

    try {
      const test_email = await fetch("http://localhost:3000/test-email", {
        method: "POST",
        body: formBody,
        headers: {
          "content-type": "application/json",
        },
      });

      if (test_email.status === 200) {
        const response = await test_email.json();
        if (response.data.length > 0) {
          alert("Email already in use");
        } else {
          const result = await fetch("http://localhost:3000/signin", {
            method: "POST",
            body: formBody,
            headers: {
              "content-type": "application/json",
            },
          });
          if (result.ok) {
            navigate("/login");
          }
        }
      }
    } catch (error) {
      console.error("Error during sign up:", error);
      setErrMsg("Signup failed");
    }
  };

  // Handle login submission
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Login submitted");
  };

  return (
    <div className="signin-container">
      {view === "login" ? (
        <form className="login-form" onSubmit={handleLoginSubmit}>
          <div className="header">
            <img src="/odulogo.png" alt="Course Portal Logo" className="logo" />
            <div>Course Portal</div>
            <div className="underline"></div>
          </div>

          <div className="input-fields">
            <input
              type="email"
              className="input"
              id="email"
              placeholder="Enter email@example.com"
              onChange={(e) => setEmail(e.target.value)}
              ref={emailRef}
              required
            />

            <input
              type="password"
              className="input"
              id="password"
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="signin-button">
              Log in
            </button>
          </div>

          <div className="signup-option">
            <p>Don't have an account?</p>
            <button
              type="button"
              className="signup-button"
              onClick={() => setView("register")}
            >
              Sign up
            </button>
          </div>
        </form>
      ) : (
        <form className="signup-form" onSubmit={handleSignUpSubmit}>
          <div className="header">
            <img src="/odulogo.png" alt="Course Portal Logo" className="logo" />
            <div>Course Portal</div>
            <div className="underline"></div>
            <div>Sign up</div>
          </div>

          <div className="input-fields">
            <input
              type="text"
              className="input"
              id="first_name"
              placeholder="Enter first name"
              onChange={(e) => setFirstName(e.target.value)}
              required
            />

            <input
              type="text"
              className="input"
              id="last_name"
              placeholder="Enter last name"
              onChange={(e) => setLastName(e.target.value)}
              required
            />

            <input
              type="email"
              className="input"
              id="email"
              placeholder="Enter email@example.com"
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              className="input"
              id="password"
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <input
              type="password"
              className="input"
              id="matchPassword"
              placeholder="Confirm Password"
              onChange={(e) => setMatchPwd(e.target.value)}
              required
            />
            <button type="submit" className="signin-button">
              Sign up
            </button>
          </div>

          <div className="login-option">
            <p>Already have an account?</p>
            <button
              type="button"
              className="login-button"
              onClick={() => setView("login")}
            >
              Log in
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Signup;
