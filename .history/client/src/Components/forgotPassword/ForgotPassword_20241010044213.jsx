import { useRef, useState, useEffect } from "react";
import React from "react";
import "./ForgotPassword.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const EMAIL_REGEX = /^[^\s@]+@[^s@]+\.[^\s@]+$/;

const ForgotPassword = () => {
  const emailRef = useRef();
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [view, setView] = useState("forgot");  // Initial view set to "forgot"
  const [code, setCode] = useState("");        // Initialize with an empty string for code

  // Validate email on change
  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);

  const navigate = useNavigate();

  // Handle verification code submission
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

        if (result.status === 200) {
          // Check if the user is admin or not
          console.lo
          if (result.data[0].is_admin === 1) {
            console.log("IS ADMIN USER");
            navigate("/admin");
          } else {
            console.log("IS NORMAL USER");
            navigate("/dashboard");
          }
        } else {
          console.error("Verification failed: Invalid code or no token found.");
        }
      } else {
        console.error("Failed to verify email");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Handle forgot password email submission
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent page reload

    const formBody = JSON.stringify({
      email: email,
    });

    try {
      const result = await fetch("http://localhost:3000/forgot-password", {
        method: "POST",
        body: formBody,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (result.ok) {
        setView("verify");  // Switch to the verification view
      } else {
        console.error("Verification failed: Unable to send verification code.");
      }
    } catch (error) {
      console.error("Error during request:", error);
    }
  };

  return (
    <>
      {/* Forgot Password View */}
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

      {/* Verification Code View */}
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
                value={code} // Bind the code value to the state
                id="code"
                autoComplete="off"
                placeholder="Enter code"
                onChange={(e) => setCode(e.target.value)} // Update the code state on input
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