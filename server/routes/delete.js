import { Router } from "express";
import { connection } from "../database/database.js";
import { ComparePasword, HashedPassword } from "../utils/helper.js";
//import { SendMail } from "../utils/SendMail.js";
const deleteUser = Router();

deleteUser.delete("/delete", (req, res)=>{
    connection.execute(
        "DELETE FROM `user_data` WHERE `user_data`.`id` = 48;",
        function(err, result){
            if(err){
                res.json(err.message)
            }
            else{
                res.json({
                    status: 200,
                    message: "Deleted user info api",
                    data:result,
                });
            }
        }
    );
});

export default deleteUser;