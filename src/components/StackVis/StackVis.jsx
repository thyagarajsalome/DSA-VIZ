import React, { useState } from "react";
import "./StackVis.css";

const StackVis = () => {
  const [stack, setStack] = useState([1, 2, 3]);
  const [lastOperation, setLastOperation] = useState(null);
  const [newValue, setNewValue] = useState("");

  const renderStack = () => {
    if (stack.length > 0) {
      return stack.map((item, index) => (
        <div
          key={index}
          className={`stack-item ${index === stack.length - 1 ? "top" : ""}`}
        >
          {item}
        </div>
      ));
    } else {
      return <div className="text-gray-500 italic">Stack is empty</div>;
    }
  };

  const push = () => {
    if (newValue !== "") {
      const numberValue = Number(newValue);
      setStack([...stack, numberValue]);
      setLastOperation({ type: "push", value: numberValue });
      setNewValue("");
    }
  };

  const pop = () => {
    if (stack.length > 0) {
      const newStack = [...stack];
      const poppedValue = newStack.pop();
      setStack(newStack);
      setLastOperation({ type: "pop", value: poppedValue });
    } else {
      setLastOperation({
        type: "error",
        message: "Cannot pop from an empty stack",
      });
    }
  };

  const resetStack = () => {
    setStack([1, 2, 3]);
    setLastOperation(null);
    setNewValue("");
  };

  const renderAlert = () => {
    if (!lastOperation) return null;

    const alertClass =
      lastOperation.type !== "error" ? "alert-success" : "alert-fail";
    let message = "";

    if (lastOperation.type === "push") {
      message = `Pushed ${lastOperation.value} onto the stack.`;
    } else if (lastOperation.type === "pop") {
      message = `Popped ${lastOperation.value} from the stack.`;
    } else if (lastOperation.type === "error") {
      message = lastOperation.message;
    }

    return <div className={`alert ${alertClass}`}>{message}</div>;
  };

  return (
    <div className="card">
      <div className="title">Stack Visualization</div>
      <div className="stack-container">{renderStack()}</div>
      <div className="button-container">
        <input
          type="number"
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
          placeholder="Enter a number"
        />
        <button className="button push-button" onClick={push}>
          Push
        </button>
        <button className="button pop-button" onClick={pop}>
          Pop
        </button>
        <button className="button reset-button" onClick={resetStack}>
          Reset
        </button>
      </div>
      {renderAlert()}
    </div>
  );
};

export default StackVis;
