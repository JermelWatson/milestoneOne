import { Router } from "express";
import { connection } from "../database/database.js";   
import { SendMail } from "../utils/SendEmail.js";
const signinHelper = Router();



signinHelper.post("/signinHelper", (req, res) => {

    const verification_code = Math.floor(Math.random() * (999999)) + 1;

    connection.execute(
        "UPDATE user_data SET `token`=? WHERE email=?",[verification_code, req.body.email],
        function (err, result) {
            if (err) {
                res.json({ status: "500", message: "Database error", error: err.message });
                return;
            }
            
            //Send verification email
            SendMail(req.body.email, "Login Verification", verification_code)
            return res.json({
                status: "200",
                message: "Verification code sent to email"
            });
        });
        
})
export default signinHelper;