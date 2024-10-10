import { Router } from "express";
import { connection } from "../database/database.js";
import { ComparePasword, HashedPassword } from "../utils/helper.js";
import { SendMail } from "../utils/SendEmail.js";
const login = Router();


login.post('/login', (req, res)=>{

    const is_admin = false;

    connection.execute(
        "select * from user_data where email=?",[req.body.email],
        function(err, result){
            if (err){
                res.json(err.message)
            }else{
                if (result[0].is_admin === 1){
                        is_admin = true
                }
                else{
                    is_admin = false
                }
                //check if is a admin user
                if (ComparePasword(req.body.password, result[0].password)){
                    SendMail(req.body.email, "Login Verification", "Your login verification is token")
                    res.json({
                        'status': 200,
                        'message':'User has logged in',
                        'is_admin': is_admin,
                        'data':result
                    });
                }
                else{

                    return res.json({
                        status: "400",
                        message: "Invalid password"
                    })
                }
            }
        }
    );
});

export default login;
