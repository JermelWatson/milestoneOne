import { Link, useNavigate } from "react-router-dom";
import "./courseAdvising.css";
import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../UserContext";
import { BiArrowBack } from "react-icons/bi";

function CourseAdvisingHistory() {
  const [record, setRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  // Fetch records from records table
  useEffect(() => {
    const fetchRecord = async () => {
      const formBody = JSON.stringify({
        student_id: user.user_id
    });
      try {
        const response = await fetch(import.meta.env.VITE_API_KEY + "/get_student_record", {
          method: "GET",
          body: formBody,
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const data = await response.json();
          setRecords(data.data); // Update the records state
        } else {
          console.error("Failed to fetch records:", response.statusText);
          setError("Failed to load records");
        }
      } catch (error) {
        console.error("Error fetching records:", error);
        setError("An error occurred while fetching records");
      } finally {
        setIsLoading(false); // Set loading to false once data is fetched
      }
    };
    fetchRecord();
  }, []);

  return (
    <div>
      <button onClick={goBack}>
        <BiArrowBack /> Back
      </button>
      <h1>Course Advising History</h1>
      
      {isLoading ? (
        <p>Loading records...</p>
      ) : error ? (
        <p>{error}</p>
      ) : record.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Term</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {record.map((record) => (
              <tr
                key={record.id}
                onClick={() => navigate(`/edit_records`)}
                style={{ cursor: "pointer" }}
              >
                 <td>{new Date(record.date).toLocaleDateString("en-US", { month: "2-digit", day: "2-digit", year: "numeric" })}</td>
                 <td>{record.advising_term}</td>
                <td>{record.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No records available. Start by creating a new record.</p>
      )}
    </div>
  );
}

export default CourseAdvisingHistory;
