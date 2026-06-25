import { useState } from "react";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const users = [
    { username: "admin", password: "1234", role: "Admin" },
    { username: "hr1", password: "hr123", role: "HR" },
    { username: "vineela", password: "emp123", role: "Employee" },
    { username: "bhuvana", password: "emp123", role: "Employee" },
    { username: "prasanna", password: "emp123", role: "Employee" }
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      setError("");
      window.location.href = "/dashboard";
    } else {
      setError("Invalid Username or Password!");
    }
  };

  return (
    <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: "#f5f5f5"}}>
      <form onSubmit={handleLogin} style={{background: "white", padding: "40px", borderRadius: "10px", boxShadow: "0 2px 10px gray", width: "300px"}}>
        <h2 style={{textAlign: "center", marginBottom: "20px"}}>Payroll Login</h2>

        <label>Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={{display: "block", margin: "5px 0 15px", padding: "8px", width: "100%", boxSizing: "border-box"}}
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{display: "block", margin: "5px 0 15px", padding: "8px", width: "100%", boxSizing: "border-box"}}
        />

        <button type="submit" style={{width: "100%", padding: "10px", background: "#007bff", color: "white", border: "none", borderRadius: "5px", cursor: "pointer"}}>
          Login
        </button>

        {error && <p style={{color: "red", marginTop: "10px", fontSize: "14px"}}>{error}</p>}

        <p style={{fontSize: "12px", marginTop: "20px", color: "gray"}}>
          Admin: admin / 1234<br/>
          HR: hr1 / hr123<br/>
          Employee: vineela / emp123
        </p>
      </form>
    </div>
  );
}
export default Login;