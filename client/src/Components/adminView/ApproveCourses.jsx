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
  const [showRejectModal, setShowRejectModal] = useState(false); // Modal visibility
  const [rejectionReason, setRejectionReason] = useState(""); // Rejection reason
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
        alert("Successfully Approved selections");
      }
    } catch (error) {
      console.error("Failed to approve courses", error);
    }
  };

  const rejectRecord = async () => {
    const formBody = JSON.stringify({
      student_id: currentRecord.student_id,
      email: currentRecord.email,
      rejectionReason,
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
      }
    } catch (error) {
      console.error("Failed to reject courses", error);
    } finally {
      setShowRejectModal(false); // Close the modal
      setRejectionReason(""); // Clear the reason
    }
  };

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
          <h3>Prerequisites</h3>
          <p>No prerequisites available for this record.</p>
          <h3>Course Plan</h3>
          <p>No courses in course plan.</p>
          <button onClick={() => approveRecord()}>Approve</button>{" "}
          <button onClick={() => setShowRejectModal(true)}>Reject</button>
        </div>
      )}

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Reject Record</h3>
            <textarea
              placeholder="Enter the reason for rejection..."
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              rows="4"
              style={{ width: "100%" }}
            ></textarea>
            <button onClick={() => rejectRecord()}>Submit</button>
            <button onClick={() => setShowRejectModal(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
export default ApproveCourses;
