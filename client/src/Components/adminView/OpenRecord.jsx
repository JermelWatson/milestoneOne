import { useState, useEffect } from "react";

export function useOpenRecord(record) {
    const [prerequisites, setPrerequisites] = useState([]);
    const [coursePlan, setCoursePlan] = useState([]);
  
    useEffect(() => {
        const fetchCourses = async () => {
            const formBody = JSON.stringify({
                student: record.student_id,
            });
      
            try {
                const response = await fetch("http://localhost:3000/get_advising_history", {
                    method: "POST",
                    body: formBody,
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
        
                if (response.ok) {
                    const result = await response.json();
                    // Separate the records into prerequisites and course plan
                    setPrerequisites(result.data.filter(course => course.level < 400));
                    setCoursePlan(result.data.filter(course => course.level >= 390));
                } else {
                    console.log("Failed to fetch records:", response.statusText);
                }
            } catch (error) {
                console.error("Error fetching records:", error);
            }
        };
        
        if (record?.student_id) {
            fetchCourses();
        }
    }, [record]); // Ensure fetchCourses runs only when `record` changes

    return [prerequisites, coursePlan];
}
