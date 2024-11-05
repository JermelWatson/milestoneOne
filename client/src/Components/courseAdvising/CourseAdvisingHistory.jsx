import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import "./courseAdvising.css";
import { BiArrowBack } from 'react-icons/bi';

function CourseAdvisingHistory() {
    // Sample data representing fetched records
    const records = [
        { id: 1, studentName: 'John Doe', date: '2023-08-15', term: 'Fall 2023', status: 'Completed', gpa: '3.5' },
        { id: 2, studentName: 'Jane Smith', date: '2023-01-10', term: 'Spring 2023', status: 'In Progress', gpa: '3.8' },
        // Add more records as needed
    ];
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };

    return (
        <div>
            <button onClick={goBack}>
                <BiArrowBack /> Back
            </button>
            <h1>Course Advising History</h1>
            {records.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Term</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {records.map((record) => (
                            <tr key={record.id} onClick={() => navigate(`/record/${record.id}`)} style={{ cursor: "pointer" }}>
                                <td>{record.date}</td>
                                <td>{record.term}</td>
                                <td>{record.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No records available.</p>
            )}
        </div>
    );
}

export default CourseAdvisingHistory;
