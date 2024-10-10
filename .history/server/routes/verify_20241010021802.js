import { Router } from "express";
import { connection } from "../database/database.js";
import { ComparePasword } from "../utils/helper.js";
const verify = Router();

verify.post('/verify', (req, res) => {
  connection.execute(
    "Select * from user_data WHERE email=?",[req.body.email],
    function (err, result){
      if(result[0].token === req.body.code){
        console.log("")
        res.json({ 
          status: 200,
        message: "Verification successful",
        data: result})
      }else{
        res.json({ 
          status: 400,
        message: "Inccorect verification code",
        data: result,})
        }
    }
  );
})

export default verify
