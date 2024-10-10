import { Router } from "express";
import { connection } from "../database/database.js";
import { ComparePasword } from "../utils/helper.js";
const verify = Router();

verify.post('/verify', (req, res) => {
  
  connection.execute(
    "Select * from user_data WHERE email=?",[req.body.email],
    function (err, result){
        if (err){
            res.json("Incorrect code",err.message)
            return;
        }else{
          if(req.body.code === result.token){
          console.log("Entered result okay", req.body.)
            const data = res.json({
                status: "200",
                message: "Verification successful",
                data: result
            })
          }
        }
    }
  );
})

export default verify
