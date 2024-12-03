import { Router } from "express";
import { connection } from "../database/database.js";
import { SendMail } from "../utils/SendEmail.js";

const approve_courses = Router();

approve_courses.put("/approve_courses", (req, res)=>{
    connection.execute(
        "UPDATE `Records` SET `status` = 'Approved' WHERE `student_id` = ?",[req.body.student_id],
        function(err, result){
            if(err){
                res.json(err.message)
            }
            else{
                SendMail(req.body.email, "Admin decision","Your courses have been approved");
                res.json({
                    status: 200,
                    message: "Approved courses successfully",
                });
            }
        }
    );
});

export default approve_courses;