import { Router } from "express";
import { connection } from "../database/database.js";
import { HashedPassword } from "../utils/helper.js";
const signin = Router();

signin.post("/signin", (req, res) => {

    const hashedPassword = HashedPassword(req.body.password)

    connection.execute(
      "INSERT INTO user_data (`first_name`, `last_name`, `email`,`password`, `is_admin`, `token`) Values(?,?,?,?,?,?)",
      [req.body.first_name, req.body.last_name, req.body.email, hashedPassword, req.body.is_admin, req.],
      function (err, result) {
        if (err) {
          res.json(err.message);
        } else {
          res.json({
            status: 200,
            message: "Response is sent",
            data: result,
          });
        }
      }
    );
});

export default signin;