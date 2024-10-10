import { response, Router } from "express";
import { connection } from "../database/database.js";
import { HashedPassword } from "../utils/helper.js";
const addUser = Router();


addUser.post("/addUser", (req, res) => {
    const hashedPassword = HashedPassword(req.body.password)

})





  export default addUser;