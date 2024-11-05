import { Router } from "express";
import { connection } from "../database/database.js";
const create_record = Router();

const updateRecordMap = async (body) =>{
     const prereqs = req.body.prereqs; // { courseId: enabledStatus, ... }
     console.log(prereqs);

     try {
         const formBody = JSON.stringify({
          prereqs: body
         })
        const response = await fetch("http://localhost:3000/signinHelper", {
          method: "POST",
          body: formBody,
          headers:{
            'content-type':'application/json'
          }
        });
       if( response.status === 200){return}
      } catch (error) {
        console.error('Error sending verification code:', error);
      }

    // Loop through each entry in the selected object
    // for (const courseId in selected) {
    //     if (selected.hasOwnProperty(courseId)) {
    //         const enabledStatus = selected[courseId];
    //         console.log(Course ID: ${courseId}, Enabled: ${enabledStatus});}}
   return
};

create_record.post("/create_record", (req, res) => {
    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(today.getDate()).padStart(2, '0');
    const year = today.getFullYear();

    const formattedDate = `${month}/${day}/${year}`;
    console.log(formattedDate); 

    connection.execute(
        "INSERT INTO Records (`student_id`, `last_gpa`, `last_term`, `advising_term`,`status`, `date`) Values(?,?,?,?,?,?)",
        [req.body.student, req.body.lastGPA, req.body.last_term, req.body.advising_term, "Pending", today],
        function (err, result) {
          if (err) {
            res.json(err.message);
          } else {
            updateRecordMap(req.body)
            res.json({
              status: 200,
              message: "record updated correctly",
              data: result,
            });
          }
        }
      );
})
export default create_record;