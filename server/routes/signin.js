import { Router } from "express";
import { connection } from "../database/database.js";
import { ComparePasword, HashedPassword } from "../utils/helper.js";
//import { SendMail } from "../utils/SendMail.js";
const signin = Router();

signin.post("/signin", (req, res) => {
  //const hashedPassword = HashedPassword(req.body.password)
  connection.execute(
    "INSERT INTO user_data (`first_name`, `last_name`, `email`,`password`, `is_admin`) Values( 'nado','waston','fiwiemail@gmail.com','1234567990',false)",
    function (err, result) {
      if (err) {
        res.json(err.message);
      } else {
        res.json({
          status: 200,
          message: "Response is sent",
          data: result,
        });
        //return res.json(data);
      }
    }
  );
});

{
  /*Signin.post("/", (req, res) => {
  connection.execute(
    "insert into user_data (first_name, last_name, email, password, is_admin) values(?,?,?,?,?)", 
    ['req.body.first_name', 'req.body.last_name', 'req.body.email', 'req.body.password', false],
    function (err, result) {
    if (err) {
      res.json(err.message);
      console.log(err)
      console.log(req.body.first_name)
    } else {
      res.json({
        status: 200,
        message: "Response from user get api",
        data: result,
      });
    }
  });
});*/
}

export default signin;
