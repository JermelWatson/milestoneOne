import { Router } from "express";
import { connection } from "../database/database.js";
import { HashedPassword } from "../utils/helper.js";
const signin = Router();

signin.post("/signin", (req, res) => {

    const hashedPassword = HashedPassword(req.body.password)

    connection.execute(
      "INSERT INTO user_data (`first_name`, `last_name`, `email`,`password`, `is_admin`, `token`) Values(?,?,?,?,?,?)",
      [req.body.first_name, req.body.last_name, req.body.email, hashedPassword, req.body.is_admin, req.body.token],
      function (err, result) {
        if (err) {
          console.log(result)
          console("Error occurred")
          res.json(err.message);
        } else {
          console("No Error occurred")
          res.json({
            status: 200,
            message: "User has been added",
            data: result,
          });
        }
      }
    );
});

export default signin;