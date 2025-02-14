import React, { useState } from "react";

const FibonacciVisualization = () => {
  const [inputNumber, setInputNumber] = useState(10);
  const [result, setResult] = useState(null);
  const [steps, setSteps] = useState([]);

  const fibonacci = (n, memo = {}) => {
    let localSteps = [];
    const fib = (n) => {
      if (n in memo) {
        localSteps.push(`Retrieved fib(${n}) = ${memo[n]} from memo`);
        return memo[n];
      }
      if (n <= 1) {
        memo[n] = n;
        localSteps.push(`Base case: fib(${n}) = ${n}`);
        return n;
      }
      memo[n] = fib(n - 1) + fib(n - 2);
      localSteps.push(`Calculated fib(${n}) = ${memo[n]}`);
      return memo[n];
    };
    const res = fib(n);
    setSteps(localSteps);
    return res;
  };

  const handleCalculate = () => {
    const num = parseInt(inputNumber);
    const res = fibonacci(num);
    setResult(res);
  };

  return (
    <div className="card container">
      <h2>Dynamic Programming: Fibonacci</h2>
      <div>
        <input
          type="number"
          value={inputNumber}
          min="0"
          max="20"
          onChange={(e) => setInputNumber(e.target.value)}
        />
        <button onClick={handleCalculate}>Calculate Fibonacci</button>
      </div>
      {result !== null && (
        <div className="result">
          Fibonacci({inputNumber}) = {result}
        </div>
      )}
      <div className="steps-container">
        {steps.map((step, index) => {
          let className = "step-text";
          if (step.includes("Retrieved")) className += " retrieved";
          else if (step.includes("Base case")) className += " base";
          else className += " calculated";
          return (
            <p key={index} className={className}>
              {step}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default FibonacciVisualization;
