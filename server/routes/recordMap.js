const prereqs = body.prereqs;

try {
 const updatePromises = Object.entries(prereqs).map(([courseId]) => {
   return new Promise((resolve, reject) => {
       connection.execute(
           "INSERT INTO records_mapping (`record_id`, `course_id`, `student_id`) Values(?,?,?)",
   [record_id, courseId, body.student],
   
           function(err, result) {
               if (err) {
                   reject(err);
               } else {
                 console.log("success in mapping", result)
                   resolve(result);
               }
           }
       );
   });
});

const results = Promise.all(updatePromises);
  if( results.status === 200){
   console.log("Got results here", results)
   results.json({
     status: 200,
     message: "record mapping updated correctly",
     data: results,
   });
 }
 } catch (error) {
   console.error('Error completing mapping:', error);
 }
return