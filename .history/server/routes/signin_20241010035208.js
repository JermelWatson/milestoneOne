import { response, Router } from "express";
import { connection } from "../database/database.js";
import { HashedPassword } from "../utils/helper.js";
const signin = Router();

signin.post("/signin", (req, res) => {

  const hashedPassword = HashedPassword(req.body.password)

  console.log(hashedPassword)

  connection.execute(
    "INSERT into user_data (first_name,last_name,email,password,is_admin,token) values(?,?,?,?,?,?)",
    [req.body.firstName, req.body.lastName, req.body.email, hashedPassword, req., 0],
    function (err, result) {
      if (err) {
        res.json(err.message);
      } else {
        res.json({
          status: 200,
          message: "New user added successfully",
          data: result,
        });
      }
    }
  );
});

export default signin;
