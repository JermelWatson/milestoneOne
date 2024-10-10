import { Router } from "express";
import { connection } from "../database/database.js";
import { ComparePasword } from "../utils/helper.js";
const verify = Router();

verify.post('/verify', (req, res) => {
  
  connection.execute(
    "Select token from user_data WHERE email=?",[req.body.email],
    function (err, result){
      console.log("Entered result okay")
        if (err){
            res.json("Incorrect code",err.message)
            return;
        }else{if(result.ok){
          console.log("Entered result okay")
            const data = res.json({
                status: "200",
                message: "Verification successful",
                data: result
            })
            console.log(data)
          }
        }
    }
  );
})

export default verify
