import { Router } from "express";
import { connection } from "../database/database.js";
import { ComparePasword, HashedPassword } from "../utils/helper.js";
//import { SendMail } from "../utils/SendMail.js";
const changePassword = Router();

changePassword.put("/changePassword", (req, res)=>{
    connection.execute(
        "changePassword `user_data` SET `first_name` = 'Jermel', `last_name` = 'Watson' WHERE `user_data`.`id` = 1",
        function(err, result){
            if(err){
                res.json(err.message)
            }
            else{
                res.json({
                    status: 200,
                    message: "changePasswordd user info api",
                    data:result,
                });
            }
        }
    );
});

export default changePassword;