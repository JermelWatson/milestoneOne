import { useRef, useState, useEffect } from "react";
import React from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EMAIL_REGEX = /^[^\s@]+@[^s@]+\.[^\s@]+$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Login = () => {
  const emailRef = useRef();
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [view, setView] = useState("login")

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
      console.log(result.status);
      if (result.status === 200) {
     
        if (result.data.status === 400) {
          alert("Password is incorrect");
        } else {
          if (result.data.data[0].is_admin === 1) {
            console.log("IS ADMIN USER");

            navigate("/admin");
          } else {
            console.log("IS NORMAL USER");
            navigate("/dashboard");
          }
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
      {view === "login" && ()}
        

        {view === "verify" && ()}
    </>
  );
};

export default Login;
