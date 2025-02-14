import React, { useState } from "react";

class MinHeap {
  constructor() {
    this.heap = [];
  }
  insert(value) {
    this.heap.push(value);
    this.bubbleUp();
  }
  bubbleUp() {
    let index = this.heap.length - 1;
    while (index > 0) {
      let parentIndex = Math.floor((index - 1) / 2);
      if (this.heap[index] >= this.heap[parentIndex]) break;
      [this.heap[index], this.heap[parentIndex]] = [
        this.heap[parentIndex],
        this.heap[index],
      ];
      index = parentIndex;
    }
  }
}

const MinHeapVisualization = () => {
  const [inputValue, setInputValue] = useState("");
  const [heapInstance] = useState(new MinHeap());
  const [heapArray, setHeapArray] = useState([]);

  const handleInsert = () => {
    const value = parseInt(inputValue);
    if (!isNaN(value)) {
      heapInstance.insert(value);
      setHeapArray([...heapInstance.heap]);
      setInputValue("");
    }
  };

  const levelWidth = 80;
  const levelHeight = 60;

  return (
    <div className="card">
      <div className="title">Min Heap Visualization</div>
      <div>
        <input
          type="number"
          placeholder="Enter a number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button onClick={handleInsert}>Insert</button>
      </div>
      <div
        id="heap-container"
        style={{
          position: "relative",
          width: "100%",
          height: "300px",
          border: "1px solid #ccc",
          marginTop: "20px",
        }}
      >
        {heapArray.map((value, index) => {
          const level = Math.floor(Math.log2(index + 1));
          const position = index - (Math.pow(2, level) - 1);
          const totalNodesInLevel = Math.pow(2, level);
          const x =
            ((position + 0.5) * (levelWidth * totalNodesInLevel)) /
            totalNodesInLevel;
          const y = level * levelHeight;
          return (
            <div
              key={index}
              className="heap-node"
              style={{ position: "absolute", left: `${x}px`, top: `${y}px` }}
            >
              {value}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MinHeapVisualization;
