import React, { useState, useContext } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import AddPrereqs from './AddPrereqs';
import AddCourse from './AddCourse';

function CourseAdvisingForm() {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const [prerequisites, setPrerequisites] = useState([{ level: '', courseName: '' }]);
    const [coursePlan, setCoursePlan] = useState([{ level: '', courseName: '' }]);
    const [advising_term, setAdvisingTerm] = useState()
    const [last_term, setLastTerm] = useState()
    const [lastGPA, setLastGPA] = useState()
    
    const addRow = (section, setSection) => {
        setSection([...section, { level: '', courseName: '' }]);
    };

    const removeRow = (index, section, setSection) => {
        const newSection = section.filter((_, i) => i !== index);
        setSection(newSection);
    };

    const goBack = () => {
        navigate(-1);
    };

    const handleChange = (index, value, field, section, setSection) => {
        const newSection = [...section];
        newSection[index][field] = value;
        setSection(newSection);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formBody = JSON.stringify({
            student: user.user_id,
            last_term: last_term,
            lastGPA: lastGPA,
            advising_term: advising_term,
            prereqs: prerequisites,
            courses: coursePlan,
          });
       

          const response = await fetch(import.meta.env.VITE_API_KEY + "/create_record", {
            method: "POST",
            body: formBody,
            headers: {
              "content-type": "application/json",
            },
          });

          if (response.ok) {
            const result = await response.json(); // Parse the response body
            console.log("Form submitted with no error")
            alert("Successfully added new advising record")
        }
        else{
            console.log("Error occurred")
        }
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
                <input type="text" 
                name="lastTerm" 
                onChange={(e)=>setLastTerm(e.target.value)}
                required
                />
            </label>
            <label>
                Last GPA:
                <input type="text" 
                step="0.01" 
                name="lastGPA" 
                onChange={(e)=> setLastGPA(parseFloat(e.target.value))}
                required
                />
            </label>
            <label>
                Advising Term:
                <input type="text" 
                name="advisingTerm" 
                onChange={(e)=> setAdvisingTerm(e.target.value)}
                required
                />
            </label>
        </div>
            <AddPrereqs
                title="Prerequisites"
                data={prerequisites}
                setData={setPrerequisites}
                addRow={() => addRow(prerequisites, setPrerequisites)}
                removeRow={(index) => removeRow(index, prerequisites, setPrerequisites)}
                handleChange={handleChange}
            />
            <AddCourse
                title="Course Plan"
                data={coursePlan}
                setData={setCoursePlan}
                addRow={() => addRow(coursePlan, setCoursePlan)}
                removeRow={(index) => removeRow(index, coursePlan, setCoursePlan)}
                handleChange={handleChange}
            />
            <button type="submit">Submit</button>
        </form>
    );
}

export default CourseAdvisingForm;
