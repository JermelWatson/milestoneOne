import { Router } from "express";
import { connection } from "../database/database.js";
const create_record = Router();

const updateRecordMap = async (body, record_id) => {
    try {
        const prereqs = body.prereqs;
        const courses = body.courses;
        
        // Extract course IDs from each array by mapping over the objects
        const prereqsCourseIds = prereqs.map(course => course.courseId);
        const coursesCourseIds = courses.map(course => course.courseId);
        
        // Combine both arrays and remove duplicates
        const allCourseIds = Array.from(new Set([...prereqsCourseIds, ...coursesCourseIds]));
        
        // Log the combined course IDs array for debugging
        console.log("Combined Course IDs:", allCourseIds);
        
        // Insert each unique course ID into the records_mapping table
        const updatePromises = allCourseIds.map(courseId => {
            return new Promise((resolve, reject) => {
                connection.execute(
                    "INSERT INTO records_mapping (`record_id`, `course_id`, `student_id`) VALUES (?, ?, ?)",
                    [record_id, courseId, body.student],
                    function (err, result) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(result);
                        }
                    }
                );
            });
        });

        await Promise.all(updatePromises);
        console.log("Records mapping updated successfully.");
    } catch (error) {
        console.error('Error updating record mappings:', error);
    }
};

create_record.post("/create_record", async (req, res) => {
    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const year = today.getFullYear();
    const formattedDate = `${month}/${day}/${year}`;
    
    try {
        // Insert the main record and get the inserted record ID
        const [result] = await connection.promise().execute(
            "REPLACE INTO Records (`student_id`, `last_gpa`, `last_term`, `advising_term`, `status`, `date`) VALUES (?, ?, ?, ?, ?, ?)",
            [req.body.student, req.body.lastGPA, req.body.last_term, req.body.advising_term, "Pending", today]
        );

        const record_id = result.insertId;
        
        // Respond immediately to the client
        res.json({
            status: 200,
            message: "Record created successfully; prerequisites mappings update in progress.",
            data: result,
        });

        // Call `updateRecordMap` in the background
        updateRecordMap(req.body, record_id);
    } catch (error) {
        console.error('Error creating record:', error);
        res.status(500).json({
            status: 500,
            message: "Error creating record",
            error: error.message,
        });
    }
});

export default create_record;
