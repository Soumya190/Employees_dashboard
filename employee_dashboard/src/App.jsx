import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import viteLogo from "/vite.svg";
import "./App.css";
import Dashboard from "./Components/Dashboard";
import EmployeeDetails from "./pages/EmployeeDetails";

function App() {
  return (
    <>
      {/* <BrowserRouter> */}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/employeeDetails/:id" element={<EmployeeDetails />} />
        </Routes>
      {/* </BrowserRouter> */}
    </>
  );
}

export default App;
