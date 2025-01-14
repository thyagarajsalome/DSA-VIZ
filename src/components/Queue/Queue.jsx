import React, { useState } from "react";
import "./Queue.css";

const Queue = () => {
  const [queue, setQueue] = useState([1, 2, 3]);
  const [lastOperation, setLastOperation] = useState(null);
  const [newValue, setNewValue] = useState("");

  const renderQueue = () => {
    if (queue.length > 0) {
      return queue.map((item, index) => (
        <div
          key={index}
          className={`queue-item ${
            index === 0 ? "front" : index === queue.length - 1 ? "rear" : ""
          }`}
        >
          {item}
        </div>
      ));
    } else {
      return <div className="text-gray-500 italic">Queue is empty</div>;
    }
  };

  const enqueue = () => {
    if (newValue !== "") {
      const numberValue = Number(newValue);
      setQueue([...queue, numberValue]);
      setLastOperation({ type: "enqueue", value: numberValue });
      setNewValue("");
    }
  };

  const dequeue = () => {
    if (queue.length > 0) {
      const newQueue = [...queue];
      const dequeuedValue = newQueue.shift();
      setQueue(newQueue);
      setLastOperation({ type: "dequeue", value: dequeuedValue });
    } else {
      setLastOperation({
        type: "error",
        message: "Cannot dequeue from an empty queue",
      });
    }
  };

  const resetQueue = () => {
    setQueue([1, 2, 3]);
    setLastOperation(null);
    setNewValue("");
  };

  const renderAlert = () => {
    if (!lastOperation) return null;

    const alertClass =
      lastOperation.type !== "error" ? "alert-success" : "alert-fail";
    let message = "";

    if (lastOperation.type === "enqueue") {
      message = `Enqueued ${lastOperation.value} to the queue.`;
    } else if (lastOperation.type === "dequeue") {
      message = `Dequeued ${lastOperation.value} from the queue.`;
    } else if (lastOperation.type === "error") {
      message = lastOperation.message;
    }

    return <div className={`alert ${alertClass}`}>{message}</div>;
  };

  return (
    <div className="card">
      <div className="title">Queue Visualization</div>
      <div className="queue-container">{renderQueue()}</div>
      <div className="button-container">
        <input
          type="number"
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
          placeholder="Enter a number"
        />
        <button className="button enqueue-button" onClick={enqueue}>
          Enqueue
        </button>
        <button className="button dequeue-button" onClick={dequeue}>
          Dequeue
        </button>
        <button className="button reset-button" onClick={resetQueue}>
          Reset
        </button>
      </div>
      {renderAlert()}
    </div>
  );
};

export default Queue;
