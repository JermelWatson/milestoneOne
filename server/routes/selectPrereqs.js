import { Router } from "express";
import { connection } from "../database/database.js";
const select_prereqs = Router();

select_prereqs.get("/select-prereqs", (req, res) => {
    connection.execute(
        "SELECT * FROM prerequisites",
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
});

export default select_prereqs;