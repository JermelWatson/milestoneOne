import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useOpenRecord } from "./OpenRecord";

function ApproveCourses() {
  const [records, setRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [view, setView] = useState("all_records");
  const [currentRecord, setCurrentRecord] = useState(null);
  const [currentRecordId, setCurrentRecordId] = useState(null);
  const [studentRecordData, setStudentRecordData] = useState(null);
  const [currentPrerequisites, setCurrentPrerequisites] = useState([]);
  const [currentCourses, setCurrentCourses] = useState([]);
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  // Fetch records from the records table
  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_API_KEY + "/advising_record", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const data = await response.json();
          setRecords(data.data);
        } else {
          console.error("Failed to fetch records:", response.statusText);
          setError("Failed to load records");
        }
      } catch (error) {
        console.error("Error fetching records:", error);
        setError("An error occurred while fetching records");
      } finally {
        setIsLoading(false);
      }
    };
    fetchRecords();
  }, []);

  // Function to prepare student record data and set current record state
  const sendRecord = (record_id) => {
    const record = records.find((rec) => rec.id === record_id);

    if (record) {
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
      };

      setCurrentRecord(recordData); // Set currentRecord directly
    } else {
      console.error("Record not found for ID:", record_id);
    }
  };

  const setUp = async (record_id) => {
    setView("single_record");
    setCurrentRecordId(record_id);

    sendRecord(record_id);

    const [prerequisites, coursePlan] = useOpenRecord({ student_id: record_id });
    setCurrentPrerequisites(prerequisites);
    setCurrentCourses(coursePlan);
  };

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
                  onClick={() => setUp(record.id)}
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
        )
      )}

      {view === "single_record" && currentRecord && (
        <div>
          <div>
            <h2>History</h2>
            <label>
              Last Term:
              <input
                type="text"
                name="lastTerm"
                value={currentRecord.last_term || ""}
                readOnly
              />
            </label>
            <label>
              Last GPA:
              <input
                type="number"
                step="0.01"
                name="lastGPA"
                value={currentRecord.last_gpa || ""}
                readOnly
              />
            </label>
            <label>
              Advising Term:
              <input
                type="text"
                name="advisingTerm"
                value={currentRecord.term || ""}
                readOnly
              />
            </label>
          </div>

          <div>
            <h2>Prerequisites</h2>
            <ul>
              {currentPrerequisites.map((course, index) => (
                <li key={index}>
                  <strong>Course Name:</strong> {course.course} | <strong>Level:</strong> {course.level}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2>Course Plan</h2>
            <ul>
              {currentCourses.map((course, index) => (
                <li key={index}>
                  <strong>Course Name:</strong> {course.course} | <strong>Level:</strong> {course.level}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default ApproveCourses;