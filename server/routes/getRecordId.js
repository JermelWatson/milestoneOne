import { Router } from "express";
import { connection } from "../database/database.js";
const record_id = Router();

record_id.get("/record_id", (req, res) => {
    connection.execute(
        "SELECT * FROM `Records` ",
        function (err, result) {
            if (err) {
                res.status(500).json({ 
                    status: 500,
                    message: err.message 
                });
            } else {
                res.status(200).json({
                    status: 200,
                    message: "Successfully retrieved record id",
                    data: result,
                });
            }
        }
        
    );
    return
})
export default record_id;
