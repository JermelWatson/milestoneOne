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
      const formBody = JSON.stringify({ student_id: user.user_id });

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
            result.data[0] || {
              last_term: "",
              last_gpa: "",
              advising_term: "",
              status: "",
            }
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
          console.log(result.data);
          const prereqs = result.data.prerequisites;
          const courseplan = result.data.courses;
          console.log("Current Prereqs", prereqs);
          console.log("Current Course plan", courseplan);
          setPrerequisites(prereqs);
          setCoursePlan(courseplan);
        }
      } catch (error) {
        console.error("Error fetching records here:", error);
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

    console.log(`Form body to send to api ${formBody}`);

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
        //alert("Successfully updated advising record");
        navigate(-1);
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

  //handling updates
  const checkIfPrerequisiteExists = (newPrerequisite) => {
    return prerequisites.some(
      (prereq) =>
        prereq.prerequisite_level === newPrerequisite.level &&
        prereq.prerequisite_name === newPrerequisite.courseName
    );
  };
  const handleAddPrerequisite = (newPrerequisite) => {
    if (checkIfPrerequisiteExists(newPrerequisite)) {
      alert("This course is already in your prerequisite selection.");
      return;
    }

    setPrerequisites((prevPrerequisites) => [
      ...prevPrerequisites,
      newPrerequisite,
    ]);
  };

  const handleRemovePrerequisite = (indexToRemove) => {
    const updatedPrerequisites = prerequisites.filter(
      (_, index) => index !== indexToRemove
    );
    setPrerequisites(updatedPrerequisites);
  };
  
  const handleRemoveCourse = (indexToRemove) => {
    const updatedCoursePlan = coursePlan.filter(
      (_, index) => index !== indexToRemove
    );
    setCoursePlan(updatedCoursePlan);
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
            {prerequisites.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>Course Code</th>
                    <th>Course Name</th>
                  </tr>
                </thead>
                <tbody>
                  {prerequisites.map((prerequisite, index) => (
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
          </div>
          <div>
            <h2>Current Course Plan</h2>
            {coursePlan.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>Course Code</th>
                    <th>Course Name</th>
                  </tr>
                </thead>
                <tbody>
                  {coursePlan.map((course, index) => (
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
        </>
      ) : (
        <>
          <div>
            <h2>Current Prerequisites</h2>
            {prerequisites.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>Course Code</th>
                    <th>Course Name</th>
                    <th>Actions</th> {/* Add an Actions column */}
                  </tr>
                </thead>
                <tbody>
                  {prerequisites.map((prerequisite, index) => (
                    <tr key={index}>
                      <td>{prerequisite.prerequisite_level || "N/A"}</td>
                      <td>{prerequisite.prerequisite_name || "N/A"}</td>
                      <td>
                        <button
                          onClick={() => handleRemovePrerequisite(index)}
                          style={{ color: "red" }}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No prerequisites available for this record.</p>
            )}
          </div>
          <div>
            <h2>Current Course Plan</h2>
            {coursePlan.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>Course Code</th>
                    <th>Course Name</th>
                    <th>Actions</th> {/* Add an Actions column */}
                  </tr>
                </thead>
                <tbody>
                  {coursePlan.map((course, index) => (
                    <tr key={index}>
                      <td>{course.course_level || "N/A"}</td>
                      <td>{course.course_name || "N/A"}</td>
                      <td>
                        <button
                          onClick={() => handleRemoveCourse(index)}
                          style={{ color: "red" }}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No courses in course plan.</p>
            )}
          </div>
          <h3>Edit Course plan here</h3>
          <AddPrereqs
            title="Prerequisites"
            data={prerequisites}
            setData={setPrerequisites}
            addRow={() => addRow(prerequisites, setPrerequisites)}
            removeRow={(index) =>
              removeRow(index, prerequisites, setPrerequisites)
            }
            handleChange={(index, value, field) =>
              handleSectionChange(
                index,
                value,
                field,
                prerequisites,
                setPrerequisites
              )
            }
            onAddPrerequisite={handleAddPrerequisite}
          />
          <AddCourse
            title="Course Plan"
            data={coursePlan}
            setData={setCoursePlan}
            addRow={() => addRow(coursePlan, setCoursePlan)}
            removeRow={(index) => removeRow(index, coursePlan, setCoursePlan)}
            handleChange={(index, value, field) =>
              handleSectionChange(
                index,
                value,
                field,
                coursePlan,
                setCoursePlan
              )
            }
          />
        </>
      )}

      <button type="submit">Update Entry</button>
    </form>
  );
}

export default CourseAdvisingManager;
