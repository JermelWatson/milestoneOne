import { Router } from "express";
import { connection } from "../database/database.js";
import signinHelper from "./signinHelper.js";
const verify = Router();

const verifyCode = async (email, code) => {
    try {
        const formBody =JSON.stringify({
            email: email,
            code: code
        })
      const response = await fetch('/verify', { 
        method: "POST",
        body: formBody,
        headers: {
            'content-type':'application/json'
        }
    })
      console.log(response.data.message);
    } catch (error) {
      console.error('Error verifying code:', error);
    }
  };


verify.post("/verify", (req, res)=> {

    verifyCode(req.body.email, req.body.code)

})

export default verify
