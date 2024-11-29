import { useRef, useState, useEffect, useContext } from "react";
import React from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../UserContext";
import ReCAPTCHA from "react-google-recaptcha";

const EMAIL_REGEX = /^[^\s@]+@[^s@]+\.[^\s@]+$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Login = () => {
  const emailRef = useRef();
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [view, setView] = useState("login");
  const [code, setCode] = useState("");
  const recaptchaRef = useRef(null);

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
      const response = await fetch(import.meta.env.VITE_API_KEY + "/verify", {
        method: "POST",
        body: verifyBody,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const result = await response.json(); // Parse the response body
        if (result.data[0]) {
          const user = {
            user_id: result.data[0].id,
            first_name: result.data[0].first_name,
            last_name: result.data[0].last_name,
            email: result.data[0].email,
          }; // Retrieved from API
          setUser(user);
          if (result.data && result.data[0].is_admin === 1) {
            console.log("IS ADMIN USER");
            navigate("/admin");
          } else {
            console.log("IS NORMAL USER");
            navigate("/dashboard");
          }
        } else {
          alert("Incorrect verification code. Try again");
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

    const token = recaptchaRef.current.getValue();

    if (token === ""){
      alert("Please verify that you are not a Robot!")
      setView('login')
      navigate('/login')
      return
    }
    console.log("ReCAPTCHA Token:", token);

    // Reset reCAPTCHA if needed
    recaptchaRef.current.reset();

    try {
      const result = await axios.post(
        import.meta.env.VITE_API_KEY + "/login",
        formBody,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

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
      alert("User does not exist. Please Sign up");
      console.error("Error:", error);
    }
  };

  return (
    <>
      {view === "login" && (
        <div className="signin-container">
          <form className="signup-form" onSubmit={handleLogin}>
            <img src="/odulogo.png" alt="Course Portal Logo" className="logo" />
            <div className="header">
              <div>CSWEB - 518</div>
              <div>COURSE PORTAL</div>
              <div>LOG IN</div>
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
                <button type="submit" className="signup-button">
                  Login
                </button>
              </div>
            </div>
            <ReCAPTCHA
                  ref={recaptchaRef} // Assign the ref to the component
                  sitekey={import.meta.env.VITE_SITE_KEY} // Set the site key from environment
                />
            <p>
              <Link to="/forgot-password" className="href">
                Forgot password?
              </Link>
            </p>
            <p>Don't have an account?</p>
            <div>
              <Link to="/" className="signinBtn">
                <button
                  type="button"
                  className="signup-button"
                  onClick={() => navigate("/")}
                >
                  Sign up
                </button>
              </Link>
            </div>
          </form>
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
              <div className="login">
                <div>
                  <button width="100px" onClick={() => setView("login")}>
                    Back
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Login;
