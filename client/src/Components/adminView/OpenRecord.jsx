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
  }
