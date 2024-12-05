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
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
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
    const recordIndex = records.findIndex(
      (record) => record.record_id === record_id
    );
    if (recordIndex !== -1) {
      const record = records[recordIndex];
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
    if (!record) {
      console.error("Record not found");
      setError("Record not found.");
      return;
    }
    const formBody = JSON.stringify({ student_id: record.student_id });
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

        console.log("API results", result.data);
        // Handle prerequisites and courses here
        setCurrentPrerequisites(result.data.prerequisites);
        setCurrentCourses(result.data.courses);
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

  const resetRecord = () => {
    setCurrentRecord({
      last_term: "",
      last_gpa: "",
      advising_term: "",
    });
  };

  const approveRecord = async () => {
    console.log("Approve clicked for record:", currentRecord);
    // Add logic for approving the record
    const formBody = JSON.stringify({
      student_id: currentRecord.student_id,
      email: currentRecord.email,
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
        alert(" Successfully Approved selections");
        setView("all_records");
      }
    } catch (error) {
      console.error("Failed to approve courses", error);
    }
  };

  // const rejectRecord = async () => {
  //   console.log("Reject clicked for record:", currentRecord);
  //   // Add logic for rejecting the record
  //   const formBody = JSON.stringify({
  //     student_id: currentRecord.student_id,
  //     email: currentRecord.email,
  //   });
  //   try {
  //     const response = await fetch(
  //       `${import.meta.env.VITE_API_KEY}/reject_courses`,
  //       {
  //         method: "PUT",
  //         body: formBody,
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );

  //     if (response.ok) {
  //       const result = await response.json();
  //       console.log("Rejected student courses selection ", result);
  //       alert(" Successfully rejected selections");
  //     }
  //   } catch (error) {
  //     console.error("Failed to approve courses", error);
  //   }
  // };

  const rejectRecord = async () => {
    const formBody = JSON.stringify({
      student_id: currentRecord.student_id,
      email: currentRecord.email,
      message: rejectionReason,
    });
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_KEY}/reject_courses`,
        {
          method: "PUT",
          body: formBody,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        alert("Successfully rejected selections");
        setView("all_records");
      }
    } catch (error) {
      console.error("Failed to reject courses", error);
    } finally {
      setShowRejectModal(false); // Close the modal
      setRejectionReason(""); // Clear the reason
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
                  onClick={() => {
                    setUp(record.record_id);
                  }}
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
          <button
            onClick={() => {
              setView("all_records");
              resetRecord();
            }}
          >
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
            {console.log("This is prereqs:", currentPrerequisites)}
            {console.log("This is Courses:", currentCourses)}

            <h3>Prerequisites</h3>
            {currentPrerequisites.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>Course Code</th>
                    <th>Course Name</th>
                  </tr>
                </thead>
                <tbody>
                  {currentPrerequisites.map((prerequisite, index) => (
                    <tr key={index}>
                      <td>{prerequisite.prerequisite_level || "N/A"}</td>
                      <td>{prerequisite.prerequisite_name || "N/A"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No prerequisites available for this record.</p>
            )}
            <h3>Course Plan</h3>
            {currentCourses.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>Course Code</th>
                    <th>Course Name</th>
                  </tr>
                </thead>
                <tbody>
                  {currentCourses.map((course, index) => (
                    <tr key={index}>
                      <td>{course.course_level || "N/A"}</td>
                      <td>{course.course_name || "N/A"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No courses in course plan.</p>
            )}
          </div>
          <button onClick={() => approveRecord()}>Approve</button>
          <button
            onClick={() => {
              setShowRejectModal(true);
              setView("reject_modal");
            }}
          >
            Reject
          </button>
        </div>
      )}

      {/* Reject Modal */}
      {showRejectModal && view === "reject_modal" && (
        <div>
          <h3>Reject Record</h3>
          <textarea
            placeholder="Enter the reason for rejection..."
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
            rows="4"
            style={{ width: "100%", background: "#222222" }}
          > Didn't change</textarea>
          <button onClick={() => rejectRecord()}>Submit</button>
          <button onClick={() => setView("single_record")}>Cancel</button>
        </div>
      )}
    </div>
  );
}
export default ApproveCourses;
