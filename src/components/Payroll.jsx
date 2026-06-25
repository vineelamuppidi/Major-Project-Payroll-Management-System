function Payroll() {
  const salary = 50000;
  const tax = salary * 0.1;

  return (
    <div>
      <h2>Payroll Calculation</h2>

      <p>Salary: ₹{salary}</p>
      <p>Tax (10%): ₹{tax}</p>
      <p>Net Salary: ₹{salary - tax}</p>
    </div>
  );
}

export default Payroll;