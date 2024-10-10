import { useState, useEffect } from 'react'
import axios from 'axios';
import Signup from './Components/signup/Signup';
import './App.css'
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from './Components/login/Login';
import Dashboard from './Components/dashboard/Dashboard';
import Delete from './Components/delete/Delete';
import ForgotPassword from './Components/forgotPassword/ForgotPassword.jsx';
import AdminView from './Components/adminView/AdminView.jsx';
import Verify from './Components/verification/Verify.jsx';
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
    element: <ForgotPassword />
  },
  {
    path: "/admin",
    element: <AdminView />
  }
])
  return (
    <>
      <div>
        <RouterProvider router={route}></RouterProvider>
      </div>
    </>
  )
}

export default App
