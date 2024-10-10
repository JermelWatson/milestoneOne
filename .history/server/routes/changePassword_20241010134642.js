import { Router } from "express";
import { connection } from "../database/database.js";
import { ComparePasword, HashedPassword } from "../utils/helper.js";
//import { SendMail } from "../utils/SendMail.js";
const changePassword = Router();

changePassword.put("/change-password", (req, res)=>{

    hashedPassword = HashedPassword(req.body.password)
    connection.execute(
        "UPDATE `user_data` SET `password` =? WHERE `user_data`.`email` =?",
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