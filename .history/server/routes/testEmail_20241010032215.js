import { Router } from "express";
import { connection } from "../database/database.js";
//import { ComparePasword, HashedPassword } from "../utils/helper.js";
//import { SendMail } from "../utils/SendMail.js";
const testEmailjsjs = Router();

testEmailjsjs.post("/", (req, res) => {
  connection.execute("select * from testEmailjsjs_data", function (err, result) {
    if (err) {
      res.json(err.message);
      console.log(err)
    } else {
      
      if (result.length > 0){
        console.log("Result ERROR")
        return res.json({
          status: 400,
          message: "testEmailjsjs already exist",
          data: result,
        });
      }
      else{
        res.json({
          status: 200,
          message: "Response from testEmailjsjs get api",
          data: result,
        });
      }
    }
  });
});





export default testEmailjsjs;
