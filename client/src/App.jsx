import { useState, useEffect } from "react";
import axios from "axios";
import Signup from "./Components/signup/Signup";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./Components/login/Login";
import Dashboard from "./Components/dashboard/Dashboard";
import Delete from "./Components/delete/Delete";
import ForgotPassword from "./Components/forgotPassword/ForgotPassword.jsx";
import AdminView from "./Components/adminView/AdminView.jsx";
import { UserProvider } from "./Components/UserContext.jsx";
import MyAccount from "./Components/dashboard/MyAccount.jsx";
import ApproveCourses from "./Components/adminView/ApproveCourses.jsx";
import SelectPrereqs from "./Components/adminView/SelectPrereqs.jsx";
import CourseAdvisingForm from "./Components/courseAdvising/CourseAdvisingForm.jsx";
import CourseAdvisingHistory from "./Components/courseAdvising/CourseAdvisingHistory.jsx";
import EditRecords from "./Components/courseAdvising/EditRecord.jsx";
function App() {
  const route = createBrowserRouter([
    {
      path: "/",
      element: <Signup />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
    {
      path: "/delete",
      element: <Delete />,
    },
    {
      path: "/forgot-password",
      element: <ForgotPassword />,
    },
    {
      path: "/admin",
      element: <AdminView />,
    },
    {
      path: "/my-account",
      element: <MyAccount />,
    },
    {
      path: "/approve_courses",
      element: <ApproveCourses/>,
    },
    {
      path: "/select_prereqs",
      element: <SelectPrereqs/>
    },
    {
      path: "/course_Advising_form",
      element: <CourseAdvisingForm/>,
    },
    {
      path: "/course_Advising_history",
      element: <CourseAdvisingHistory/>
    },
    {
      path: "/edit_records",
      element: <EditRecords/>
    },
  ]);
  return (
    <>
      <div>
        <UserProvider>
          <RouterProvider router={route}></RouterProvider>
        </UserProvider>
      </div>
    </>
  );
}

export default App;
