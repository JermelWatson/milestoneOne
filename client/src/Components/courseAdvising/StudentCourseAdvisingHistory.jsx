import { Link, useNavigate } from "react-router-dom";
import "./courseAdvising.css";
import { BiArrowBack } from "react-icons/bi";
import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from "../UserContext";

function StudentCourseAdvisingHistory() {
  const [records, setRecords] = useState({});
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  // Fetch records from records table
  useEffect(() => {
    const fetchRecords = async () => {
        if (!user || !user.user_id) {
          setError("User ID is missing.");
          setIsLoading(false);
          return;
        }

        const formBody = JSON.stringify({
            student: user.user_id,
        });

        try {
            const response = await fetch(import.meta.env.VITE_API_KEY + "/get_student_record", {
                method: "POST",
                body: formBody,
                headers: {
                    "content-type": "application/json",
                },
            });
            if (response.ok) {
                const result = await response.json();
                setIsLoading(false);
                setRecords(result.data[0]);
                setError(null); // Clear any previous error
            } else {
                setError("Failed to fetch records: " + response.statusText);
            }
        } catch (error) {
            setError("Error fetching records: " + error.message);
        }
    };
    fetchRecords();
  }, [user]);
console.log('This is records:',records)
  return (
    <div>
      <button onClick={goBack}>
        <BiArrowBack /> Back
      </button>
      <h1>Student Course Advising History</h1>
      
      {isLoading ? (
        <p>Loading records...</p>
      ) : error ? (
        <p>{error}</p>
      ) : records.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Term</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
              <tr
                key={records.id}
                onClick={() => navigate(`/edit_records`)}
                style={{ cursor: "pointer" }}
              >
                <td>{new Date(records.date).toLocaleDateString("en-US", { month: "2-digit", day: "2-digit", year: "numeric" })}</td>
                <td>{records.advising_term}</td>
                <td>{records.status}</td>
              </tr>
          </tbody>
        </table>
      ) : (
        <p>No records available. Start by creating a new record.</p>
      )}
    </div>
  );
}

export default StudentCourseAdvisingHistory;