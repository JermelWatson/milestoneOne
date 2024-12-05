import React, { useEffect, useState } from "react";

function AddPrereqs({ title, data, setData, addRow, handleChange, onAddPrerequisite }) {
    const [courses, setCourses] = useState([]);

    // Fetch courses on component mount
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch(import.meta.env.VITE_API_KEY + "/add_prereqs", {
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

    // Function to filter courses by level range
    const filterCoursesByLevel = (level) => {
        const minRange = level;
        const maxRange = level + 99;
        return courses.filter(course => course.level >= minRange && course.level <= maxRange);
    };

    // Handle level change for a specific row
    const handleLevelChange = (index, selectedLevel) => {
        const updatedData = data.map((item, i) =>
            i === index ? { ...item, level: selectedLevel } : item
        );
        setData(updatedData);
    };

    // Remove a specific row by index
    const removeRow = (index) => {
        const updatedData = data.filter((_, i) => i !== index);
        setData(updatedData);
    };

    //handling adding similar courses
    const handleAdd = () => {
        const newPrerequisite = { level: "", courseName: "" }; // Replace with actual values
        onAddPrerequisite(newPrerequisite);
      };

    return (
        <div>
            <h2>{title}</h2>
            {data.map((item, index) => (
                <div key={index} style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                    <label>
                        Level:
                        <select 
                            value={item.level || 0} 
                            onChange={(e) => handleLevelChange(index, parseInt(e.target.value))}
                        >
                            <option value={0}></option>
                            <option value={100}>100</option>
                            <option value={200}>200</option>
                            <option value={300}>300</option>
                        </select>
                    </label>
                    <label style={{ marginRight: '10px' }}>
                        Course Name:
                        <select
                            value={item.courseId || ""}
                            onChange={(e) => {handleChange(index, e.target.value, "courseId", data, setData); handleAdd()}}
                        >
                            <option value="">Select Course</option>
                            {(item.level ? filterCoursesByLevel(item.level) : []).map(course => (
                                <option key={course.id} value={course.id}>
                                    {`${course.level} - ${course.course_name}`}
                                </option>
                            ))}
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

export default AddPrereqs;