import { response, Router } from "express";
import { connection } from "../database/database.js";
import { HashedPassword } from "../utils/helper.js";
import verify from "./verify.js";
const signin = Router();

const sendVerificationCode = async (email) => {
  try {
    const formBody = JSON.stringify({
      email: email
    })
    const response = await fetch('/signinHelper', {
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
    res.json(response.da)
  }
};

signin.post("/signin", (req, res) => {
    const hashedPassword = HashedPassword(req.body.password)

    sendVerificationCode(req.body.email)

    const is_verified = 

    connection.execute(
      "INSERT INTO user_data (`first_name`, `last_name`, `email`,`password`, `is_admin`) Values(?,?,?,?,?)",
      [req.body.first_name, req.body.last_name, req.body.email, hashedPassword, false],
      function (err, result) {
        if (err) {
          res.json(err.message);
        } else {
          res.json({
            status: 200,
            message: "Response is sent",
            data: result,
          });
        }
      }
    );
});



export default signin;
