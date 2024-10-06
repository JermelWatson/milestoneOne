import { Router } from "express";
import { connection } from "../database/database.js";
//import { ComparePasword, HashedPassword } from "../utils/helper.js";
//import { SendMail } from "../utils/SendMail.js";
const login = Router();


login.get('/login', (req, res)=>{
    res.json({
        'status': 200,
        'message':'Response is sent',
        'data':'Testing login'
    });
})







export default login;
