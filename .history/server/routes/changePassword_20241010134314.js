import { Router } from "express";
import { connection } from "../database/database.js";
import { ComparePasword, HashedPassword } from "../utils/helper.js";
//import { SendMail } from "../utils/SendMail.js";
const changePassword = Router();

changePassw.put("/", (req, res)=>{
    connection.execute(
        "changePassw `user_data` SET `first_name` = 'Jermel', `last_name` = 'Watson' WHERE `user_data`.`id` = 1",
        function(err, result){
            if(err){
                res.json(err.message)
            }
            else{
                res.json({
                    status: 200,
                    message: "changePasswd user info api",
                    data:result,
                });
            }
        }
    );
});

export default changePassw;