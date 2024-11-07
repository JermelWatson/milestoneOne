import React, { useState, useContext, useEffect } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";

function EditRecords() {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const [prerequisites, setPrerequisites] = useState([]);
    const [coursePlan, setCoursePlan] = useState([]);
    const [advising_term, setAdvisingTerm] = useState();
    const [last_term, setLastTerm] = useState();
    const [lastGPA, setLastGPA] = useState();
    const [record, setRecord] = useState({})

    const goBack = () => {
        navigate(-1);
    };
    //get student record
    useEffect(() => {
        const fetchRecords = async () => {
            const formBody = JSON.stringify({
                student: user.user_id,
            });

            try {
                const response = await fetch("http://localhost:3000/get_student_record", {
                    method: "POST",
                    body: formBody,
                    headers: {
                        "content-type": "application/json",
                    },
                });
                if (response.ok) {
                    const result = await response.json();
                    console.log(result)
                    setRecord(result.data[0])
                } else {
                    console.log("Failed to fetch records:", response.statusText);
                }
            } catch (error) {
                console.error("Error fetching records:", error);
            }
        };
        fetchRecords()
    },[])

    useEffect(() => {
        const fetchCourses = async () => {
            const formBody = JSON.stringify({
                student: user.user_id,
            });

            try {
                const response = await fetch(import.meta.env.VITE_API_KEY + "/get_advising_history", {
                    method: "POST",
                    body: formBody,
                    headers: {
                        "content-type": "application/json",
                    },
                });

                if (response.ok) {
                    const result = await response.json();

                    // Separate the records into prerequisites and course plan
                    const prerequisites = result.data.filter(record => record.level < 400);
                    const coursePlan = result.data.filter(record => record.level >= 390);

                    setPrerequisites(prerequisites);
                    setCoursePlan(coursePlan);
                } else {
                    console.log("Failed to fetch records:", response.statusText);
                }
            } catch (error) {
                console.error("Error fetching records:", error);
            }
        };
        fetchCourses();
    }, [user.user_id]);



    const handleSubmit = async (e) => {
        e.preventDefault();
        // Submit logic goes here
    };

    return (
        <form onSubmit={handleSubmit}>
            <button onClick={goBack}>
                <BiArrowBack /> Back
            </button>
            <h1>Course Advising Form</h1>
            <div>
                <h2>History</h2>
                <label>
                    Last Term:
                    <input 
                        type="text" 
                        name="lastTerm" 
                        value={record.last_term}
                    />
                </label>
                <label>
                    Last GPA:
                    <input 
                        type="number" 
                        step="0.01" 
                        name="lastGPA" 
                        value = {record.last_gpa}
                    />
                </label>
                <label>
                    Advising Term:
                    <input 
                        type="text" 
                        name="advisingTerm" 
                        value = {record.advising_term}
                    />
                </label>
            </div>

            <div>
                <h2>Prerequisites</h2>
                <ul>
                    {prerequisites.map((course, index) => (
                        <li key={index}>
                            <strong>Course Name:</strong> {course.course} | <strong>Level:</strong> {course.level}
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                <h2>Course Plan</h2>
                <ul>
                    {coursePlan.map((course, index) => (
                        <li key={index}>
                            <strong>Course Name:</strong> {course.course} | <strong>Level:</strong> {course.level}
                        </li>
                    ))}
                </ul>
            </div>

            <button type="submit">Submit</button>
        </form>
    );
}

export default EditRecords;
