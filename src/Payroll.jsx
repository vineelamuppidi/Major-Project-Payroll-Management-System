import { useState, useEffect, useRef } from "react";

function Payroll() {
  const [employees, setEmployees] = useState([]);
  const [name, setName] = useState("");
  const [salary, setSalary] = useState("");
  const [user, setUser] = useState(null);
  const isFirstLoad = useRef(true); // Flag to skip first save

  // Load user + employees ONCE when component mounts
  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("user"));
    if (!loggedUser) {
      window.location.href = "/";
      return;
    }
    setUser(loggedUser);

    const saved = localStorage.getItem("employees");
    if (saved) {
      setEmployees(JSON.parse(saved));
    }
  }, []);

  // Save employees to localStorage, but skip first render
  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return; // Skip saving on first load
    }
    localStorage.setItem("employees", JSON.stringify(employees));
  }, [employees]);

  const calculateTax = (sal) => Math.round(sal * 0.1);

  const handleAdd = (e) => {
    e.preventDefault();
    if (name.trim() && salary && Number(salary) > 0) {
      const sal = Number(salary);
      const newEmp = {
        id: Date.now(),
        name: name.trim(),
        salary: sal,
        tax: calculateTax(sal),
        netSalary: sal - calculateTax(sal)
      };
      setEmployees(prev => [...prev, newEmp]);
      setName("");
      setSalary("");
    }
  };

  const handleDelete = (id) => {
    setEmployees(prev => prev.filter(emp => emp.id!== id));
  };

  const handleLogout = () => {
    localStorage.removeItem("user"); // Only remove login, keep employees
    window.location.href = "/";
  };

  if (!user) return <div>Loading...</div>;

  const isAdmin = user.role === "Admin";

  return (
    <div style={{padding: "30px", fontFamily: "Arial"}}>
      <div style={{display: "flex", justifyContent: "space-between", marginBottom: "20px"}}>
        <h2>Payroll System</h2>
        <div>
          {user.username} | {user.role}
          <button onClick={handleLogout} style={{marginLeft: "10px", padding: "5px 10px", cursor: "pointer"}}>Logout</button>
        </div>
      </div>

      {(user.role === "Admin" || user.role === "HR") && (
        <form onSubmit={handleAdd} style={{margin: "20px 0", padding: "15px", border: "1px solid #ccc", borderRadius: "5px"}}>
          <h3>Add Employee</h3>
          <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" required style={{marginRight: "10px", padding: "8px"}} />
          <input type="number" value={salary} onChange={e => setSalary(e.target.value)} placeholder="Salary" required style={{marginRight: "10px", padding: "8px"}} />
          <button type="submit" style={{padding: "8px 15px", cursor: "pointer"}}>Add</button>
        </form>
      )}

      <table border="1" cellPadding="8" style={{width: "100%", borderCollapse: "collapse"}}>
        <thead>
          <tr style={{background: "#f0f0f0"}}>
            <th>Name</th><th>Salary</th><th>Tax 10%</th><th>Net Salary</th>
            {isAdmin && <th>Action</th>}
          </tr>
        </thead>
        <tbody>
          {employees.length === 0? (
            <tr><td colSpan={isAdmin?5:4} style={{textAlign:"center", padding: "20px"}}>No employees added yet</td></tr>
          ) : employees.map(emp => (
            <tr key={emp.id}>
              <td>{emp.name}</td>
              <td>₹{emp.salary.toLocaleString()}</td>
              <td>₹{emp.tax.toLocaleString()}</td>
              <td>₹{emp.netSalary.toLocaleString()}</td>
              {isAdmin && <td><button onClick={() => handleDelete(emp.id)} style={{cursor: "pointer", color: "red"}}>Delete</button></td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default Payroll;