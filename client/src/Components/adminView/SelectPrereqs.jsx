import React, { useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import './AdminView.css';
import { UserContext } from "../UserContext";

const SelectPrereqs = () => {
    const [level, setLevel] = useState();
    const [courses, setCourses] = useState([]); // All courses available
    const [filteredCourses, setFilteredCourses] = useState([]); // Filtered courses by level
    const [enabledCourses, setEnabledCourses] = useState({}); // Tracks enabled/disabled state for each course
    const [term, setTerm] = useState()
    const navigate = useNavigate()
    // Function to filter courses based on level range
    const filterCoursesByLevel = (level) => {
        const minRange = level;
        const maxRange = level + 99;
        const filtered = courses.filter(course => course.level >= minRange && course.level <= maxRange);
        setFilteredCourses(filtered);
    };

    // Fetch all courses on component mount
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch(import.meta.env.VITE_API_KEY + "/select-prereqs", {
                    method: "GET",
                    headers:{
                        "Content-Type": "application/json",
                    }
                });
                if(response.ok){
                    const data = await response.json();
                    setCourses(data.data);

                    // Initialize enabled states
                    const initialEnabledStates = {};
                    data.data.forEach(course => {
                        initialEnabledStates[course.id] = course.enabled;
                    });
                    setEnabledCourses(initialEnabledStates);

                    filterCoursesByLevel(100); // Set default level to 100 on mount
                } else {
                    console.error('Failed to fetch courses:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };
        fetchCourses();
    }, []);

      // Return to previous page
    const goBack = () => {
        navigate(-1);
    };
    // Handle level change
    const handleLevelChange = (e) => {
        const selectedLevel = parseInt(e.target.value);
        setLevel(selectedLevel);
        filterCoursesByLevel(selectedLevel);
    };

    // Toggle enable/disable status for a course
    const handleEnableToggle = (courseId) => {
        setEnabledCourses(prevState => ({
            ...prevState,
            [courseId]: !prevState[courseId],
        }));
    };

    // Submit the enabled states to the backend
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("This is the enabled courses: ", enabledCourses)
        const prereqBody = JSON.stringify({
            term: term,
            enabled_Courses: enabledCourses,
        }
        )
        try {
            const response = await fetch(import.meta.env.VITE_API_KEY + "/update-prereqs", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: prereqBody,
            });

            if (response.ok) {
                alert("Updated Prerequisites Successfully")
                console.log("Courses updated successfully!");
            } else {
                console.error("Failed to update courses:", response.statusText);
            }
        } catch (error) {
            console.error("Error updating courses:", error);
        }
    };

    return (
        <div>
        <button onClick={goBack}>
                <BiArrowBack /> Back
            </button>
            <h2>Pre-requisites Courses</h2>
            <form onSubmit={handleSubmit}>
            <div className="pre_table">
            <label>Term: </label>
                <input 
                type="text"
                placeholder="Enter term"
                required
                onChange={(e) => setTerm(e.target.value)}
                />
                <table>
                    <thead>
                        <tr>
                            <th><div>
                    <label>Level:</label>
                    <select value={level} onChange={handleLevelChange}>
                        <option value={0}></option>
                        <option value={100}>100</option>
                        <option value={200}>200</option>
                        <option value={300}>300</option>
                    </select>
                </div></th>
                            <th>Course</th>
                            <th>Enable/Disable</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCourses.length > 0 ? (
                            filteredCourses.map(course => (
                                <tr key={course.id}>
                                    <td>{level}</td>
                                    <td>{`${course.level} - ${course.course_name}`}</td>
                                    <td>
                                        <input
                                            className="isChecked"
                                            type="checkbox"
                                            checked={!!enabledCourses[course.id]}
                                            onChange={() => handleEnableToggle(course.id)}
                                        />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3">No courses available for this level.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <button type="submit" className="updateBtn">Update Prerequisites</button>
                </div>
            </form>
        </div>
    );
};

export default SelectPrereqs;