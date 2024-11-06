import { Router } from "express";
import { connection } from "../database/database.js";
const get_advising_history = Router();

get_advising_history.post("/get_advising_history", (req, res) => {
    connection.execute(
        `SELECT c.course, c.level FROM records_mapping rm JOIN course c ON rm.course_id = c.id WHERE rm.student_id = ?`,[req.body.student], function (err, result) {
            if (err) {
                res.status(500).json({ 
                    status: 500,
                    message: err.message 
                });
            } else {
                res.status(200).json({
                    status: 200,
                    message: "Successfully retrieved advising record id",
                    data: result,
                });
            }
        }
        
    );
    return
})
export default get_advising_history;
