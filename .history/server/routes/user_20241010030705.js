import { Router } from "express";
import { connection } from "../database/database.js";
//import { ComparePasword, HashedPassword } from "../utils/helper.js";
//import { SendMail } from "../utils/SendMail.js";
const user = Router();

user.post("/", (req, res) => {
  connection.execute("select * from user_data", function (err, result) {
    if (err) {
      res.json(err.message);
      console.log(err)
    } else {
      if (result.email;)
      res.json({
        status: 200,
        message: "Response from user get api",
        data: result,
      });
    }
  });
});





export default user;
