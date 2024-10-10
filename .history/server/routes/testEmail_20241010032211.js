import { Router } from "express";
import { connection } from "../database/database.js";
//import { ComparePasword, HashedPassword } from "../utils/helper.js";
//import { SendMail } from "../utils/SendMail.js";
const test = Router();

test.post("/", (req, res) => {
  connection.execute("select * from test_data", function (err, result) {
    if (err) {
      res.json(err.message);
      console.log(err)
    } else {
      
      if (result.length > 0){
        console.log("Result ERROR")
        return res.json({
          status: 400,
          message: "test already exist",
          data: result,
        });
      }
      else{
        res.json({
          status: 200,
          message: "Response from test get api",
          data: result,
        });
      }
    }
  });
});





export default test;
