import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useOpenRecord } from "./OpenRecord";
import "./AdminView.css";
import DisplayRecord from "./DisplayRecord";

function ApproveCourses() {
  const [records, setRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [view, setView] = useState("all_records");
  const [currentRecord, setCurrentRecord] = useState(null);
  const [currentRecordId, setCurrentRecordId] = useState(null);
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
        const response = await fetch(
          `${import.meta.env.VITE_API_KEY}/advising_record`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
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

  // Prepare student record data and set current record state
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
        advising_term: record.advising_term,
        last_term: record.last_term,
        last_gpa: record.last_gpa,
        status: record.status,
      };
      setCurrentRecord(recordData);
    } else {
      console.error("Record not found for ID:", record_id);
    }
  };

  // Set up details for a single record
  const setUp = async (record_id) => {
    setView("single_record");
    setCurrentRecordId(record_id);
    sendRecord(record_id);

    const [prerequisites, coursePlan, loading, error] = useOpenRecord({
      student_id: record_id,
    });
    if (!loading && !error) {
      setCurrentPrerequisites(prerequisites);
      setCurrentCourses(coursePlan);
    } else if (error) {
      console.error("Error loading data:", error);
    }
  };

  // Main render
  return (
    <div>
      <button onClick={goBack}>
        <BiArrowBack /> Back
      </button>
      <h1>Course Advising History</h1>

      {/* All Records View */}
      {view === "all_records" && (
        isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : records.length > 0 ? (
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
                  <td>
                    {new Date(record.date).toLocaleDateString("en-US", {
                      month: "2-digit",
                      day: "2-digit",
                      year: "numeric",
                    })}
                  </td>
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

      {/* Single Record View */}
      {view === "single_record" && currentRecord && (
        <div>
          {/* History Section */}
          <div>
            <h2>History</h2>
            <label>
              Last Term:
              <input
                type="text"
                name="lastTerm"
                value={currentRecord.last_term}
                readOnly
                className="single-record"
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
                className="single-record"
              />
            </label>
            <label>
              Advising Term:
              <input
                type="text"
                name="advisingTerm"
                value={currentRecord.advising_term || ""}
                readOnly
                className="single-record"
              />
            </label>
          </div>
        </div>
      )}
      <DisplayRecord/>
    </div>
    
  );
}
export default ApproveCourses;
