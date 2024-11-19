import React, { useState, useContext, useEffect } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import AddPrereqs from "./AddPrereqs";
import AddCourse from "./AddCourse";

function CourseAdvisingManager() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [prerequisites, setPrerequisites] = useState([]);
  const [coursePlan, setCoursePlan] = useState([]);
  const [record, setRecord] = useState({
    last_term: "",
    last_gpa: "",
    advising_term: "",
    status: "", // Include status in record state
  });

  // Fetch initial advising records and course history
  useEffect(() => {
    const fetchInitialRecords = async () => {
      const formBody = JSON.stringify({ student: user.user_id });

      try {
        // Fetch student record data
        const recordResponse = await fetch(
          import.meta.env.VITE_API_KEY + "/get_student_record",
          {
            method: "POST",
            body: formBody,
            headers: { "content-type": "application/json" },
          }
        );
        if (recordResponse.ok) {

            
          const result = await recordResponse.json();
          setRecord(
            result.data[0] || { last_term: "", last_gpa: "", advising_term: "", status: "" }
          );
        }

        // Fetch course history data
        const courseResponse = await fetch(
          import.meta.env.VITE_API_KEY + "/get_advising_history",
          {
            method: "POST",
            body: formBody,
            headers: { "content-type": "application/json" },
          }
        );
        if (courseResponse.ok) {
          const result = await courseResponse.json();
          const prerequisites = result.data.filter(
            (course) => course.level < 400
          );
          const coursePlan = result.data.filter(
            (course) => course.level >= 390
          );
          setPrerequisites(prerequisites);
          setCoursePlan(coursePlan);
        }
      } catch (error) {
        console.error("Error fetching records:", error);
      }
    };

    fetchInitialRecords();
  }, [user.user_id]);

  // Handlers for input changes in record fields
  const handleRecordChange = (e) => {
    const { name, value } = e.target;
    setRecord((prevRecord) => ({
      ...prevRecord,
      [name]: value,
    }));
  };

  // Handlers for adding/removing rows in prerequisites and course plan sections
  const addRow = (section, setSection) => {
    setSection([...section, { level: "", courseName: "" }]);
  };

  const removeRow = (index, section, setSection) => {
    const newSection = section.filter((_, i) => i !== index);
    setSection(newSection);
  };

  const handleSectionChange = (index, value, field, section, setSection) => {
    const newSection = [...section];
    newSection[index][field] = value;
    setSection(newSection);
  };

  // Submit handler for updating and adding records
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formBody = JSON.stringify({
      student: user.user_id,
      last_term: record.last_term,
      lastGPA: record.last_gpa,
      advising_term: record.advising_term,
      prereqs: prerequisites,
      courses: coursePlan,
    });

    try {
      const response = await fetch(
        import.meta.env.VITE_API_KEY + "/create_record",
        {
          method: "POST",
          body: formBody,
          headers: { "content-type": "application/json" },
        }
      );
      if (response.ok) {
        alert("Successfully updated and added new advising record");
      } else {
        console.log("Error occurred:", response.statusText);
      }
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  // Back button handler
  const goBack = () => {
    navigate(-1);
  };

  return (
    <form onSubmit={handleSubmit}>
      <button onClick={goBack}>
        <BiArrowBack /> Back
      </button>
      <h1>Course Advising Form</h1>

      <div>
        <h2>History</h2>
        <label>
          Last Term:
          <input
            type="text"
            name="last_term"
            value={record.last_term}
            onChange={handleRecordChange}
            required
          />
        </label>
        <label>
          Last GPA:
          <input
            type="number"
            step="0.01"
            name="last_gpa"
            value={record.last_gpa}
            onChange={handleRecordChange}
            required
          />
        </label>
        <label>
          Advising Term:
          <input
            type="text"
            name="advising_term"
            value={record.advising_term}
            onChange={handleRecordChange}
            required
          />
        </label>
      </div>

      {record.status !== "Pending" ? (
        <>
          <div>
            <h2>Current Prerequisites</h2>
            <ul>
              {prerequisites.map((course, index) => (
                <li key={index}>
                  <strong>Course Name:</strong> {course.course} |{" "}
                  <strong>Level:</strong> {course.level}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2>Current Course Plan</h2>
            <ul>
              {coursePlan.map((course, index) => (
                <li key={index}>
                  <strong>Course Name:</strong> {course.course} |{" "}
                  <strong>Level:</strong> {course.level}
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <>
          <AddPrereqs
            title="Prerequisites"
            data={prerequisites}
            setData={setPrerequisites}
            addRow={() => addRow(prerequisites, setPrerequisites)}
            removeRow={(index) => removeRow(index, prerequisites, setPrerequisites)}
            handleChange={(index, value, field) =>
              handleSectionChange(
                index,
                value,
                field,
                prerequisites,
                setPrerequisites
              )
            }
          />

          <AddCourse
            title="Course Plan"
            data={coursePlan}
            setData={setCoursePlan}
            addRow={() => addRow(coursePlan, setCoursePlan)}
            removeRow={(index) => removeRow(index, coursePlan, setCoursePlan)}
            handleChange={(index, value, field) =>
              handleSectionChange(index, value, field, coursePlan, setCoursePlan)
            }
          />
        </>
      )}

      <button type="submit">Submit</button>
    </form>
  );
}

export default CourseAdvisingManager;
