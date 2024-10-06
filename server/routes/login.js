import { Router } from "express";
import { connection } from "../database/database.js";
import { ComparePasword, HashedPassword } from "../utils/helper.js";
import { SendMail } from "../utils/SendEmail.js";
const login = Router();


login.post('/login', (req, res)=>{
    connection.execute(
        "select * from user_data where email='email@gmail.com'",
        function(err, result){
            if (err){
                res.json(err.message)
            }else{
                res.json({
                    'status': 200,
                    'message':'Response is sent',
                    'data':result
                });
            }
        }
    );
})

export default login;
