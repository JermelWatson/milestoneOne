import { Router } from "express";
import { connection } from "../database/database.js";
import { ComparePasword, HashedPassword } from "../utils/helper.js";
import { SendMail } from "../utils/SendEmail.js";
import user from "./user.js";
const forgotPassword = Router();


forgotPassword.post("/forgot-password", (req, res)=> {


    connection.execute(
        "select * from user_data where email=?",[req.body.email],
        function(err, result){
            if (err){
                res.json(err.message)
            }else{
                    SendMail(req.body.email, "Login Verification", "Your login verification is token")

                    res.json({
                        'status': 200,
                        'message':'User has logged in',
                        'data':result
                    });
                    console.log(result)
            }
        }
    );
});

export default forgotPassword;
