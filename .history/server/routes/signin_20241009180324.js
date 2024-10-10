import { response, Router } from "express";
import { connection } from "../database/database.js";
import { HashedPassword } from "../utils/helper.js";
import signinHelper from "./signinHelper.js";
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
    console.log(response.data)
  }
};

signin.post("/signin", (req, res) => {

  function test() {async () =>}
    const result = await fetch("http://localhost:3000/signinHelper", {
      method: "POST",
      body: req.body,
      headers: {
        "content-type": "application/json",
      },
    });
    const hashedPassword = HashedPassword(req.body.password)

    connection.execute("SELECT * FROM user_data WHERE email=?", [req.body.email],
      function(err, result){
      if(err){
        res.json(err.message);
      }
      else{
        if (result.legnth > 0){
          alert({message: "User already exists, try another email!!"})
        }
      }
    });

    sendVerificationCode(req.body.email)

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
