import { response, Router } from "express";
import { connection } from "../database/database.js";
import { HashedPassword } from "../utils/helper.js";
const signin = Router();

signin.post("/signin", (req, res) => {
    const hashedPassword = HashedPassword(req.body.password)

    connection.execute("SELECT * FROM user_data WHERE email=?", [req.body.email],
      function(err, result){
      if(err){
        res.json(err.message);
      }
      else{
        if (result.legnth > 0){
          alert("User already exists")
          return res.status("400").json({message: "User alreasy existed"});
        }
      }
    });
});

export default signin;
