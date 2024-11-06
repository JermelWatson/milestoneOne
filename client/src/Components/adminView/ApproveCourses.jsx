import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { BiArrowBack } from "react-icons/bi";
import {openRecord} from "./OpenRecord";

function ApproveCourses() {
  const [records, setRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state
  const [view, setView] = useState("all_records");
  const [currentRecord, setCurrentRecord] = useState();
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  // Fetch records from records table
  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await fetch("http://localhost:3000/advising_record", {
          method: "GET",
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
    fetchRecords();
  }, []);

  //open record for approval
  // Function to create an object with data associated with a specific record_id
  const sendRecord = (record_id) => {
    // Find the record with the matching ID
    const record = records.find((rec) => rec.id === record_id);

    if (record) {
      // Create an object with the specific data you want to use
      const recordData = {
        student_id: record.student_id,
        studentName: `${record.first_name} ${record.last_name}`,
        date: new Date(record.date).toLocaleDateString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
        }),
        term: record.advising_term,
        status: record.status,
        // Add other fields as needed
      };

      console.log("Record data:", recordData);
      return recordData; // Return the object if needed
    } else {
      console.error("Record not found for ID:", record_id);
    }
  };
  function setUp (record_id){
    setView("single_record")
    setCurrentRecord(record_id)
  }
  
  return (
    <div>
      <button onClick={goBack}>
        <BiArrowBack /> Back
      </button>
      <h1>Course Advising History</h1>
      
      {view === "all_records" && (
        records.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Student</th>
              <th>Date</th>
              <th>Term</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr
                key={record.id}
                onClick={() => setUp()}
                style={{ cursor: "pointer" }}
              >
                 <td>{record.first_name} {record.last_name}</td>
                 <td>{new Date(record.date).toLocaleDateString("en-US", { month: "2-digit", day: "2-digit", year: "numeric" })}</td>
                 <td>{record.advising_term}</td>
                <td>{record.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No records available. Start by creating a new record.</p>
      ))}

      {
        view === "single_record" &&(
          <div>
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
          </div>
        )
      }
    </div>
  );
}

export default ApproveCourses;

