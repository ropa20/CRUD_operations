import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import EmployeeForm from "./Pages/EmployeeForm";

const NotFound = () => <h1>Page Not Found</h1>;

const App = () => {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Dasboard</Link>
          </li>
          <li>
            <Link to="/add">Add Employee</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add" element={<EmployeeForm />} />
        <Route path="/view/:id" element={<EmployeeForm />} />
        <Route path="/edit/:id" element={<EmployeeForm />} />

        <Route component={NotFound} />
      </Routes>
    </Router>
  );
};

export default App;
