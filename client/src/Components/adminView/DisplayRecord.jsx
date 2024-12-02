import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useOpenRecord } from "./OpenRecord";
import "./AdminView.css";

function DisplayRecord() {
  const [courses, setCourses] = useState();
  const [prereqs, setPrereqs] = useState();

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_KEY}/get_advising_history`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          console.log(data)
        } else {
          console.error("Failed to fetch records:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching records:", error);
      }
    };
    fetchRecords();
  }, []);
}

export default DisplayRecord;
