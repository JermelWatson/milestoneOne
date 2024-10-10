import { Router } from "express";
import { connection } from "../database/database.js";
const testEmail = Router();

testEmail.post("/test-email", (req, res) => {
  connection.execute("select * from user_da", function (err, result) {
    if (err) {
      res.json(err.message);
      console.log(err)
    } else {
      
      if (result.length > 0){
        console.log("Result ERROR")
        return res.json({
          status: 400,
          message: "testEmail already exist",
          data: result,
        });
      }
      else{
        res.json({
          status: 200,
          message: "Response from testEmail get api",
          data: result,
        });
      }
    }
  });
});

export default testEmail;
