import { useState } from "react";
import axios from "axios";

function AddEmployee() {
  const [employee, setEmployee] = useState({
    name: "",
    position: "",
    salary: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post(
      "http://localhost:5000/api/employees",
      employee
    );

    alert("Employee Added");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Name"
        onChange={(e) =>
          setEmployee({ ...employee, name: e.target.value })
        }
      />

      <input
        placeholder="Position"
        onChange={(e) =>
          setEmployee({ ...employee, position: e.target.value })
        }
      />

      <input
        placeholder="Salary"
        onChange={(e) =>
          setEmployee({ ...employee, salary: e.target.value })
        }
      />

      <button type="submit">Add Employee</button>
    </form>
  );
}

export default AddEmployee;