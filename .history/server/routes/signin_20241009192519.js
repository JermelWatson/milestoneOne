import { response, Router } from "express";
import { connection } from "../database/database.js";
import { HashedPassword } from "../utils/helper.js";
const signin = Router();

const is_verified = useState(false)

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
    setIs_verified(true)
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
    if (!is_verified){
      sendVerificationCode(req.body.email)
    }
    else{
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
  }
});



export default signin;
