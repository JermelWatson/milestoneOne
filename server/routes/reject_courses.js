import { Router } from "express";
import { connection } from "../database/database.js";
import { SendMail } from "../utils/SendEmail.js";

const reject_courses = Router();

reject_courses.put("/reject_courses", (req, res)=>{
    connection.execute(
        "UPDATE `Records` SET `status` = 'Rejected' WHERE `student_id` = ?",[req.body.student_id],
        function(err, result){
            if(err){
                res.json(err.message)
            }
            else{
                SendMail(req.body.email, "Admin decision",`Rejected submission: ${req.body.message}`);
                res.json({
                    status: 200,
                    message: "Rejected courses selection",
                });
            }
        }
    );
});

export default reject_courses;