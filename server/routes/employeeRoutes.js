const express = require("express");
const router = express.Router();
const fs = require("fs");

const filePath = "./data/employees.json";

// Get all employees
router.get("/", (req, res) => {
  const data = JSON.parse(fs.readFileSync(filePath));
  res.json(data);
});

// Add employee
router.post("/", (req, res) => {
  const employees = JSON.parse(fs.readFileSync(filePath));

  const newEmployee = {
    id: Date.now(),
    ...req.body
  };

  employees.push(newEmployee);

  fs.writeFileSync(filePath, JSON.stringify(employees, null, 2));

  res.json(newEmployee);
});

module.exports = router;