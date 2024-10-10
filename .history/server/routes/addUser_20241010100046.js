import { response, Router } from "express";
import { connection } from "../database/database.js";
import { HashedPassword } from "../utils/helper.js";
const addUser = Router();


addUser.post("/addUser", (req, res) => {

    connection.execute(
        "S",
        [req.body.first_name, req.body.last_name, req.body.email, hashedPassword, false],
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
})



  export default addUser;