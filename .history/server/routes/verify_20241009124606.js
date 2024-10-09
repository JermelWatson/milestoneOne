import { Router } from "express";
import { connection } from "../database/database.js";
const verify = Router();

verify.post('/verify',)
  connection.execute(
    "Select token from user_data WHERE email=?",[req.body.email],
    function(err, result){
        if (err){
            res.json("Incorrect code",err.message)
            return;
        }
        if (result.ok){
            res.json({
                status: "200",
                message: "Verification successful",
                data: result
            })
        }
    }
  );

export default verify
