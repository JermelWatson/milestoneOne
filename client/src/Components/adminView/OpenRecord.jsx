import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { BiArrowBack } from "react-icons/bi";


export function openRecord(record){

    let setPrerequisites = []
    let setCoursePlan = []
    
    //get course ids and student id in an object.
      const fetchCourses = async () => {
          const formBody = JSON.stringify({
              student: record.student_id,
          });

          try {
              const response = await fetch("http://localhost:3000/get_advising_history", {
                  method: "POST",
                  body: formBody,
                  headers: {
                      "content-type": "application/json",
                  },
              });

              if (response.ok) {
                  const result = await response.json();
                  console.log(result)
                  // Separate the records into prerequisites and course plan
                  const prerequisites = result.data.filter(record => record.level < 400);
                  const coursePlan = result.data.filter(record => record.level >= 390);

                  setPrerequisites = prerequisites;
                  setCoursePlan = coursePlan;
                  console.log(setCoursePlan)
              } else {
                  console.log("Failed to fetch records:", response.statusText);
              }
          } catch (error) {
              console.error("Error fetching records:", error);
          }
        }
        fetchCourses();  

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
    
                <button type="submit">Submit</button>
            </form>
        );
    
  }
