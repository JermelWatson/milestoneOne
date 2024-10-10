import { Router } from "express";
import { connection } from "../database/database.js";
import { ComparePasword } from "../utils/helper.js";
const verify = Router();

verify.post('/verify', (req, res) => {
  connection.execute(
    "Select * from user_data WHERE email=?",[req.body.email],
    function (err, result){
      console.log()
      if(result[0] === req.body.code){
        return res.status("200").json({message: "Correct code received"});
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
