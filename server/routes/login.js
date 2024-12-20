import { Router } from "express";
import { connection } from "../database/database.js";
import { ComparePasword, HashedPassword } from "../utils/helper.js";
const login = Router();

const sendVerificationCode = async (body) => {
    try {
      const formBody = JSON.stringify({
        email: body
      })
      const response = await fetch("http://localhost:3000/signinHelper", {
        method: "POST",
        body: formBody,
        headers:{
          'content-type':'application/json'
        }
      });
     if( response.status === 200){return}
    } catch (error) {
      console.error('Error sending verification code:', error);
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
                if (result.length > 0){
                if (ComparePasword(req.body.password, result[0].password)){
                    sendVerificationCode(req.body.email)
                        res.json({
                        status: 200,
                        message: "Log in successful",
                        data: result
                    })

                }
                else{
                    return res.json({
                        status: 400,
                        message: "Invalid password"
                    })
                }
              }
              else{
                alert("User does not exist, Please sign up")
              }
            }
        }
    );
});

export default login;
