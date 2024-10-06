import { useState, useEffect } from 'react'
import axios from 'axios';
import Signup from './Components/signup/Signup';
import './App.css'
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from './Components/login/Login';
import Dashboard from './Components/dashboard/Dashboard';
function App() {

  //Login functionality
  const [user, setUser] = useState([]);



  const fetchUser = async () => {
    const response =  await axios.get("http://localhost:3000/");
    setUser(response)

    console.log(response);
  };

  useEffect(()=>{
    fetchUser();
  },[]);

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
