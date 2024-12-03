import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { BiArrowBack } from "react-icons/bi";
import "./AdminView.css";
import DisplayRecord from "./DisplayRecord";

function ApproveCourses() {
  const [records, setRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [view, setView] = useState("all_records");
  const [currentRecord, setCurrentRecord] = useState(null);
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
          console.log("This is records object: ", data.data)
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
    const recordIndex = records.findIndex(record => record.record_id === record_id);
    if (recordIndex !== -1) {
      const record = records[recordIndex]
      const recordData = {
        student_id: record.student_id,
        studentName: `${record.first_name} ${record.last_name}`,
        email: record.email,
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

  const fetchCourses = async (record_id) => {
    const record = records.find((rec) => rec.record_id === record_id);
    console.log(record)
    if (!record) {
      console.error("Record not found");
      setError("Record not found.");
      return;
    }

    const formBody = JSON.stringify({ student_id: record.student_id});
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_KEY}/get_advising_history`,
        {
          method: "POST",
          body: formBody,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log("This is result", result);
        // Handle prerequisites and courses here
        setCurrentPrerequisites(
          result.data.filter((course) => course.level < 400)
        );
        setCurrentCourses(result.data.filter((course) => course.level >= 390));
      } else {
        console.log("Failed to fetch courses:", response.statusText);
        setError("Failed to load courses");
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  // Set up details for a single record
  const setUp = async (record_id) => {
    setView("single_record");
    sendRecord(record_id);
    await fetchCourses(record_id);
  };

  const resetRecord = ()=>{
    setCurrentRecord({
    last_term:'',
    last_gpa:'',
    advising_term:'',
  })
  }

  const approveRecord = async () => {
    console.log("Approve clicked for record:", currentRecord);
    // Add logic for approving the record
    const formBody = JSON.stringify({ 
      student_id: currentRecord.student_id,
    email: currentRecord.email 
  });
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_KEY}/approve_courses`,
        {
          method: "PUT",
          body: formBody,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log("Approved courses successfully", result);
      }
    } catch (error) {
      console.error("Failed to approve courses", error);
    }

};

const rejectRecord = () => {
    console.log("Reject clicked for record:", currentRecord);
    // Add logic for rejecting the record
};


  // Main render
  return (
    <div>
      <button onClick={goBack}>
        <BiArrowBack /> Back
      </button>
      <h1>Course Advising History</h1>
      {/* All Records View */}
      {view === "all_records" &&
        (isLoading ? (
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
                  key={record.record_id}
                  onClick={
                    () => {console.log("Record:", record);
                    console.log("Clicked Record ID:", record.record_id);
                    setUp(record.record_id)}
                    }
                  style={{ cursor: "pointer" }}
                >
                  <td>
                    {record.first_name} {record.last_name}
                  </td>
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
        ))}
      {/* Single Record View */}
      {view === "single_record" && currentRecord && (
        <div>
          <button onClick={() => {setView("all_records"); resetRecord()}}>
            Back to All Records
          </button>
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
          <button onClick={()=> approveRecord()}>Approve</button> <button onClick={()=> rejectRecord()}>Reject</button>
        </div>
      )}
    </div>
  );
}
export default ApproveCourses;
