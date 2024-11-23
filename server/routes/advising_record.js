import { Router } from "express";
import { connection } from "../database/database.js";
const advising_record = Router();

advising_record.get("/advising_record", (req, res) => {
    connection.execute(
        "SELECT Records.id AS record_id, Records.date, Records.status, Records.advising_term, Records.last_term, Records.last_gpa, Records.student_id, user_data.first_name, user_data.last_name FROM Records JOIN  user_data ON Records.student_id = user_data.id;",
        function (err, result) {
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
export default advising_record;
