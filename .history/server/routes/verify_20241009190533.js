import { Router } from "express";
import { connection } from "../database/database.js";
import { ComparePasword } from "../utils/helper.js";
const verify = Router();

verify.post('/verify', (req, res) => {
  
  connection.execute(
    "Select * from user_data WHERE email=?",[req.body.email],
    function (err, result){

      if(resul)
        if (err){
            res.json("Incorrect code",err.message)
            return;
        }else{
          console.log("Entered result okay", result[0].token)
        }
    }
  );
})

export default verify
