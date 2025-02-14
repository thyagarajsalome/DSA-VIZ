import React, { useState } from "react";

const FactorialVisualization = () => {
  const [inputNumber, setInputNumber] = useState(5);
  const [result, setResult] = useState(null);
  const [steps, setSteps] = useState([]);

  const factorial = (n, depth = 0) => {
    setSteps((prev) => [...prev, { n, depth }]);
    if (n <= 1) return 1;
    const subResult = n * factorial(n - 1, depth + 1);
    setSteps((prev) => [...prev, { n, depth, result: subResult }]);
    return subResult;
  };

  const handleCalculate = () => {
    setSteps([]);
    const res = factorial(parseInt(inputNumber));
    setResult(res);
  };

  return (
    <div className="card container">
      <h2>Recursion Visualization: Factorial</h2>
      <div>
        <input
          type="number"
          value={inputNumber}
          min="0"
          max="10"
          onChange={(e) => setInputNumber(e.target.value)}
        />
        <button onClick={handleCalculate}>Calculate Factorial</button>
      </div>
      {result !== null && (
        <div className="result">
          Factorial of {inputNumber} is: {result}
        </div>
      )}
      <div id="steps-container">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`step-card ${step.result ? "bg-green" : "bg-blue"}`}
            style={{ marginLeft: `${step.depth * 20}px` }}
          >
            {step.result
              ? `factorial(${step.n}) = ${step.result}`
              : `factorial(${step.n}) = ${step.n} * factorial(${step.n - 1})`}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FactorialVisualization;
