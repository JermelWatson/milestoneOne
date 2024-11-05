import React, { useEffect, useState } from "react";

function AddCourse({ title, data, setData, addRow, handleChange }) {
    const [courses, setCourses] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState({}); // Use an object to store filtered courses for each row

    // Function to filter courses based on level range for a specific row
    const filterCoursesByLevel = (level, index) => {
        const minRange = level;
        const maxRange = level + 99;
        const filtered = courses.filter(course => course.level >= minRange && course.level <= maxRange);
        setFilteredCourses(prev => ({ ...prev, [index]: filtered }));
    };

    // Fetch courses on component mount
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch("http://localhost:3000/add_courses", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setCourses(data.data); // Update the courses state
                } else {
                    console.error('Failed to fetch courses:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };
        fetchCourses();
    }, []);

    // Handle level change for a specific row
    const handleLevelChange = (e, index) => {
        const selectedLevel = parseInt(e.target.value);
        const updatedData = [...data];
        updatedData[index].level = selectedLevel;
        setData(updatedData);
        filterCoursesByLevel(selectedLevel, index);
    };

    // Remove a specific row by index
    const removeRow = (index) => {
        const updatedData = data.filter((_, i) => i !== index);
        setData(updatedData);
    };

    return (
        <div>
            <h2>{title}</h2>
            {data.map((item, index) => (
                <div key={index} style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                    <label>
                        Level:
                        <select
                            value={item.level || ""}
                            onChange={(e) => handleLevelChange(e, index)}
                        >
                            <option value=""></option>
                            <option value={300}>300</option>
                            <option value={400}>400</option>
                        </select>
                    </label>
                    <label style={{ marginRight: '10px' }}>
                        Course Name:
                        <select
                            value={item.courseId || ""}
                            onChange={(e) => handleChange(index, e.target.value, "courseId", data, setData)}
                        >
                            <option value="">Select Course</option>
                            {filteredCourses[index] && filteredCourses[index].length > 0 ? (
                                filteredCourses[index].map(course => (
                                    <option key={course.id} value={course.id}>
                                        {`${course.level} - ${course.course}`}
                                    </option>
                                ))
                            ) : (
                                <option>No classes available</option>
                            )}
                        </select>
                    </label>
                    <button type="button" onClick={() => removeRow(index)} style={{ marginLeft: '10px' }}>
                        Delete
                    </button>
                </div>
            ))}
            <button type="button" onClick={addRow}>Add {title} Row</button>
        </div>
    );
}

export default AddCourse;