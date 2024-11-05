import { Router } from "express";
import { connection } from "../database/database.js";
const add_prereqs = Router();

add_prereqs.get("/add_prereqs", (req, res) => {
    connection.execute(
        "SELECT * FROM prerequisites WHERE `enabled` = true",
        function (err, result) {
            if (err) {
                res.status(500).json({ 
                    status: 500,
                    message: err.message 
                });
            } else {
                res.status(200).json({
                    status: 200,
                    message: "Successfully retrieved courses",
                    data: result,
                });
            }
        }
    );
})
export default add_prereqs;
