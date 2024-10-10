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
  const [view, setView] = useState("forgot");
  const [code, setCode] = useState("verify");

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);

  const navigate = useNavigate();

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
        if (result.data && result.data[0].token === code) {
          if (result.data && result.data[0].is_admin === code) {
            console.log("IS ADMIN USER");
            navigate("/admin");
          } else {
            console.log("IS NORMAL USER");
            navigate("/dashboard");
          }
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
    });

    const result = await fetch("http://localhost:3000/forgot-password", {
      method: "POST",
      body: formBody,
      headers: {
        "content-type": "application/json",
      },
    });
    if (result.status === 200) {
      setView("verify");
    } else {
      console.error("verificatiion failed");
    }
  };
  return (
    <>
      {view === "forgot" && (
        <div className="signin-container">
          <form className="signup-form" onSubmit={handleLogin}>
            <div className="forgot-password">Enter existing email address</div>
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
              <div className="btn">
                <button type="submit" className="sendBtn">
                  Send verification
                </button>
              </div>
            </div>
          </form>
          <div className="login">
            <p>Return to login</p>
            <div>
              <Link to="/login" className="return">
                Return
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
                value={code} // Correctly bind the value
                id="code"
                autoComplete="off"
                placeholder="Enter code"
                onChange={(e) => setCode(e.target.value)} // Update the state
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

export default ForgotPassword;
