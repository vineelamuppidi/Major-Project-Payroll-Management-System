import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Payroll from "./Payroll";
import EmployeeDashboard from "./EmployeeDashboard";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={user? <Navigate to="/dashboard" /> : <Login />} />
        <Route
          path="/dashboard"
          element={
            user && (user.role === "Admin" || user.role === "HR")
             ? <Payroll />
              : user && user.role === "Employee"
             ? <EmployeeDashboard />
              : <Navigate to="/" />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
export default App;