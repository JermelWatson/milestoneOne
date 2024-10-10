import { useRef, useState, useEffect } from "react";
import React from "react";
import "./Signup.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const EMAIL_REGEX = /^[^\s@]+@[^s@]+\.[^\s@]+$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Signup = () => {
  const navigate = useNavigate();
  //input references
  const emailRef = useRef();
  const errRef = useRef();
  //Username input variables
  const [first_name, setfirst_name] = useState();
  const [last_name, setlast_name] = useState();
  //email input variable
  const [email, setEmail] = useState();
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  //password and password validation
  const [password, setPassword] = useState();
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  // match-password and match-password validation
  const [matchPwd, setMatchpwd] = useState();
  const [validMatchpwd, setValidMatchpwd] = useState(false);
  const [matchpwdFocus, setMatchpwdFocus] = useState(false);

  const [code, setCode] = useState();
  //Error handler message
  const [errMsg, setErrMsg] = useState();

  const [view, setView] = useState("register");

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    console.log(result);
    setValidEmail(result);
  }, [email]);
  useEffect(() => {
    const result = PWD_REGEX.test(password);
    console.log(result);

    setValidPassword(result);
    const match = password === matchPwd;
    setValidPassword(match);
  }, [password, matchPwd]);
  useEffect(() => {
    setErrMsg("");
  }, [email, password, matchPwd]);

  const handleSubmit = async (e) => {
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
      token:0,
    });

    const test_email = await fetch("http://localhost:3000/test-email", {
      method: "POST",
      body: formBody,
      headers: {
        "content-type": "application/json",
      },
    });

    if(test_email.status === 200){
      const response = await test_email.json()
      if (response.data.length > 0){
        console.log("Email already in use")
        alert("Email already in use");
      }
      else{
        console.log(formBody)
        const result = await fetch("http://localhost:3000/signin", {
          method: "POST",
          body: formBody,
          headers: {
            "content-type": "application/json",
          },
        });
        if (result.ok) {
          navigate("/login")
        }
      };
    }
  }

  const handleVerify = async () => {
    const verifyBody = JSON.stringify({
      email: email,
      code: code,
    });

    const response = await fetch("http://localhost:3000/verify", {
      method: "POST",
      body: verifyBody,
      headers: {
        "content-type": "application/json",
      },
    });
    if (response.ok) {
      const result = await response.json(); // Parse the response body

      console.log(result);
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
  };

  return (
    <>
      {view === "register" && (
        <div className="signin-container">
          <form className="signup-form" onSubmit={handleSubmit}>
            <div className="header">Course Advising</div>
            <div className="header">
            <div>CSWEB - 518</div>
            <div>COURSE PORTAL</div>
              <div></div>Sign up
              <div className="underline"></div>
            </div>

            <div className="input-fields">
              <input
                type="text"
                className="input"
                id="first_name"
                autoComplete="off"
                placeholder="Enter first_name"
                onChange={(e) => setfirst_name(e.target.value)}
                required
              />

              <input
                type="text"
                className="input"
                id="last_name"
                autoComplete="off"
                placeholder="Enter last_name"
                onChange={(e) => setlast_name(e.target.value)}
                required
              />

              <input
                type="email"
                className="input"
                ref={emailRef}
                id="email"
                autoComplete="off"
                aria-autocomplete="off"
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

              <input
                type="password"
                className="input"
                id="mtchPassword"
                autoComplete="off"
                placeholder="Confirm Password"
                onChange={(e) => setMatchpwd(e.target.value)}
                onFocus={() => setMatchpwdFocus(true)}
                onBlur={() => setMatchpwdFocus(false)}
                required
              />
              <button type="submit" className="signin-button">
                Sign up
              </button>
            </div>
          </form>
          <div className="login">
            <p>Already have an account?</p>
            <Link to="/login" type="submit" className="login-button">
              Log in
            </Link>
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
                name={code}
                id="email"
                autoComplete="off"
                placeholder="Enter code"
                onChange={(e) => setCode(e.target.value)}
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

export default Signup;
