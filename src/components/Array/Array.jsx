import React, { useState } from "react";
import "./Array.css";

const Array = () => {
  const [array, setArray] = useState([1, 2, 3, 4, 5]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [newValue, setNewValue] = useState("");

  const renderSelectedInfo = () => {
    if (selectedIndex !== null) {
      return `Selected Index: ${selectedIndex}, Value: ${array[selectedIndex]}`;
    }
    return "";
  };

  const addElement = () => {
    if (newValue !== "") {
      setArray([...array, parseInt(newValue)]);
      setNewValue("");
    }
  };

  const removeElement = () => {
    const updatedArray = [...array];
    updatedArray.pop();
    setArray(updatedArray);
    if (selectedIndex >= updatedArray.length) {
      setSelectedIndex(null);
    }
  };

  const resetArray = () => {
    setArray([1, 2, 3, 4, 5]);
    setSelectedIndex(null);
  };

  const handleIndexClick = (index) => {
    setSelectedIndex(index);
  };

  return (
    <div className="card">
      <div className="title">Array Visualization</div>
      <div className="array-container">
        {array.map((item, index) => (
          <div
            key={index}
            className={`array-item ${
              selectedIndex === index ? "selected" : ""
            }`}
            onClick={() => handleIndexClick(index)}
          >
            {item}
          </div>
        ))}
      </div>
      <div className="selected-info">{renderSelectedInfo()}</div>
      <div className="input-container">
        <input
          type="number"
          placeholder="Enter a number"
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
        />
        <button className="button add-button" onClick={addElement}>
          Add
        </button>
        <button className="button remove-button" onClick={removeElement}>
          Remove
        </button>
        <button className="button reset-button" onClick={resetArray}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default Array;
