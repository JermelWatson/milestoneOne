import { Router } from "express";
import { connection } from "../database/database.js";
const signinHelper = Router();

signinHelper.post("/signinHelper", (req, res) => {

    const email = req.body.email;
  
    const sql = 'SELECT COUNT(*) AS count from user_data WHERE email=?';
  
    connection.query(sql, [email], (err, results) => {
      const count = results[0].count;
  
      const emailExists = count === 1;
  
      res.json({ emailExists });
    });

});

export default signinHelper;