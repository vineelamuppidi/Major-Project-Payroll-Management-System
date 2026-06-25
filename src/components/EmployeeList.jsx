import { useEffect, useState } from "react";
import axios from "axios";

function EmployeeList() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/employees")
      .then((res) => setEmployees(res.data));
  }, []);

  return (
    <div>
      <h2>Employees</h2>

      {employees.map((emp) => (
        <div key={emp.id}>
          {emp.name} - {emp.position} - ₹{emp.salary}
        </div>
      ))}
    </div>
  );
}

export default EmployeeList;