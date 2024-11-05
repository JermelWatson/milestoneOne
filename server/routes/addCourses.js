import { Router } from "express";
import { connection } from "../database/database.js";
const add_courses = Router();

add_courses.get("/add_courses", (req, res) => {
    connection.execute(
        "SELECT * FROM course",
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
export default add_courses;
