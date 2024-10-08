import { Router } from "express";
import { connection } from "../database/database.js";
//import { SendMail } from "../utils/SendMail.js";
const deleteUser = Router();

deleteUser.delete("/delete", (req, res)=>{
    connection.execute(
        "DELETE FROM user_data WHERE `user_data`.`id`=?",
        function(err, result){
            if(err){
                console.log(res.body.id)
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