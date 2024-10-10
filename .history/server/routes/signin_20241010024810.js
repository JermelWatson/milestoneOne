import { response, Router } from "express";
import { connection } from "../database/database.js";
import { HashedPassword } from "../utils/helper.js";
const signin = Router();

const sendVerificationCode = async (body) => {
  try {
    const formBody = JSON.stringify({
      email: body.email
    })
    const response = await fetch("http://localhost:3000/signinHelper", {
      method: "POST",
      body: formBody,
      headers:{
        'content-type':'application/json'
      }
    });
  } catch (error) {
    console.error('Error sending verification code:', error);
  }
  if (response.ok){
    return
  }
};

const addingUser = async (body) => {
  try {
    const formBody = JSON.stringify({
      email: body.email
    })
    const response = await fetch("http://localhost:3000/signinHelper", {
      method: "POST",
      body: formBody,
      headers:{
        'content-type':'application/json'
      }
    });
  } catch (error) {
    console.error('Error sending verification code:', error);
  }
  if (response.ok){
    return
  }
};


signin.post("/signin", (req, res) => {
    const hashedPassword = HashedPassword(req.body.password)

    connection.execute("SELECT * FROM user_data WHERE email=?", [req.body.email],
      function(err, result){
      if(err){
        res.json(err.message);
      }
      else{
        if (result.legnth > 0){
          return res.status("400").json({message: "User alreasy existed"});
        }
      }
    });
});

export default signin;
