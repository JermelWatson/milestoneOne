import { Router } from "express";
import { connection } from "../database/database.js";

const get_advising_history = Router();

get_advising_history.post("/get_advising_history", (req, res) => {
  const studentId = req.body.student_id;

  const courseQuery = `
    SELECT 
      c.course AS course_name, 
      c.level AS course_level
    FROM 
      records_mapping rm
    JOIN 
      course c ON rm.course_id = c.id
    WHERE 
      rm.student_id = ?;
  `;

  const prerequisitesQuery = `
    SELECT 
      p.course_name AS prerequisite_name, 
      p.level AS prerequisite_level
    FROM 
      records_mapping rm
    JOIN 
      prerequisites p ON rm.course_id = p.id
    WHERE 
      rm.student_id = ?;
  `;

  // Execute both queries sequentially and combine results
  connection.execute(courseQuery, [studentId], (err, courseResult) => {
    if (err) {
      return res.status(500).json({
        status: 500,
        message: `Error fetching courses: ${err.message}`,
      });
    }

    connection.execute(prerequisitesQuery, [studentId], (err, prerequisitesResult) => {
      if (err) {
        return res.status(500).json({
          status: 500,
          message: `Error fetching prerequisites: ${err.message}`,
        });
      }

      // Combine results and send response
      res.status(200).json({
        status: 200,
        message: "Successfully retrieved advising history",
        data: {
          courses: courseResult,
          prerequisites: prerequisitesResult,
        },
      });
    });
  });
});

export default get_advising_history;
