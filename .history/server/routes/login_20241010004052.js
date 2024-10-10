import { Router } from "express";
import { connection } from "../database/database.js";
import { ComparePasword, HashedPassword } from "../utils/helper.js";
import { SendMail } from "../utils/SendEmail.js";
const login = Router();

const sendVerificationCode = async (body) => {
    try {
      const formBody = JSON.stringify({
        email: body.email
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
      return
    }
  };

login.post('/login', (req, res)=>{

    connection.execute(
        "select * from user_data where email=?",[req.body.email],
        function(err, result){
            if (err){
                res.json(err.message)
            }else{
                //check if is a admin user
                if (ComparePasword(req.body.password, result[0].password)){
                    sendVerificationCode(r)
                }
                else{

                    return res.json({
                        status: 400,
                        message: "Invalid password"
                    })
                }
            }
        }
    );
});

export default login;
