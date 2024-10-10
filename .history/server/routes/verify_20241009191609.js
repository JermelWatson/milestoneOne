import { Router } from "express";
import { connection } from "../database/database.js";
import { ComparePasword } from "../utils/helper.js";
const verify = Router();

verify.post('/verify', (req, res) => {
  
  connection.execute(
    "Select * from user_data WHERE email=?",[req.body.email],
    function (err, result){

      if(result[0].token === req.body.code){
        return res.status("200").json({message: "Correct code received"});
      }else{
        status: 200,
        message: "Response from user get api",
        data: result,
        
        }
    }
  );
})

export default verify
