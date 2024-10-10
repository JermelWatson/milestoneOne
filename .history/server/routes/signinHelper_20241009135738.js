import { Router } from "express";
import { connection } from "../database/database.js";   
import { SendMail } from "../utils/SendEmail.js";
const signinHelper = Router();

signinHelper.post("/signinHelper", (req, res) => {

    const verification_code = Math.floor(Math.random() * (999999)) + 1;

   XMLDocument
            
            //Send verification email
            SendMail(req.body.email, "Login Verification", verification_code)
            res.json({
                status: "200",
                message: "Verification code sent to email"
            });
        });
        
})
export default signinHelper;