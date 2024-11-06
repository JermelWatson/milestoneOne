import { Router } from "express";
import { connection } from "../database/database.js";
const getStudentRecord = Router();

getStudentRecord.post("/get_student_record", (req, res) => {
    connection.execute(
        "SELECT * FROM `Records` WHERE student_id = ? ",[req.body.student],
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
export default getStudentRecord;
