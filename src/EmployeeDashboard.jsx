import { useState, useEffect } from "react";

function EmployeeDashboard() {
  const [user, setUser] = useState(null);
  const [employeeData, setEmployeeData] = useState(null);

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("user"));
    if (!loggedUser) {
      window.location.href = "/";
      return;
    }
    setUser(loggedUser);

    const employees = JSON.parse(localStorage.getItem("employees")) || [];
    const emp = employees.find(e =>
      e.name.toLowerCase().trim() === loggedUser.username.toLowerCase().trim()
    );
    setEmployeeData(emp);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user"); // Only logout, do not delete employee data
    window.location.href = "/";
  };

  if (!user) return null;

  return (
    <div style={{padding: "30px", maxWidth: "600px", margin: "0 auto", fontFamily: "Arial"}}>
      <div style={{display: "flex", justifyContent: "space-between", marginBottom: "20px"}}>
        <h2>Employee Portal</h2>
        <button onClick={handleLogout} style={{padding: "6px 12px", cursor: "pointer"}}>Logout</button>
      </div>

      <h3>Welcome, {user.username}</h3>

      {employeeData? (
        <div style={{border: "2px solid #007bff", padding: "25px", borderRadius: "8px", marginTop: "20px", background: "#f0f8ff"}}>
          <h4 style={{color: "#007bff", marginTop: "0"}}>Your Salary Slip</h4>
          <p><b>Employee Name:</b> {employeeData.name}</p>
          <p><b>Gross Salary:</b> ₹{employeeData.salary.toLocaleString()}</p>
          <p><b>Tax Deduction 10%:</b> ₹{employeeData.tax.toLocaleString()}</p>
          <hr/>
          <p style={{fontSize: "18px"}}><b>Net Salary:</b> ₹{employeeData.netSalary.toLocaleString()}</p>
        </div>
      ) : (
        <div style={{marginTop: "20px", padding: "15px", background: "#fff3cd", borderRadius: "5px", border: "1px solid #ffeeba"}}>
          <p style={{margin: "0", color: "#856404"}}>
            Salary details not found in system.
            <br/>Please ask Admin to add employee with exact name: <b>{user.username}</b>
          </p>
        </div>
      )}
    </div>
  );
}
export default EmployeeDashboard;