import React, { useState } from "react";
import "./SetVis.css";

const SetVis = () => {
  const [set, setSet] = useState(new Set([1, 2, 3, 4]));
  const [newValue, setNewValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState(null);

  const renderSet = () => {
    return Array.from(set).map((item) => (
      <div key={item} className="set-item">
        {item}
        <button className="delete-button" onClick={() => removeElement(item)}>
          X
        </button>
      </div>
    ));
  };

  const addElement = () => {
    if (newValue !== "") {
      const updatedSet = new Set(set);
      updatedSet.add(Number(newValue));
      setSet(updatedSet);
      setNewValue("");
    }
  };

  const removeElement = (element) => {
    const updatedSet = new Set(set);
    updatedSet.delete(element);
    setSet(updatedSet);
  };

  const resetSet = () => {
    setSet(new Set([1, 2, 3, 4]));
    setSearchResult(null);
    setNewValue("");
    setSearchValue("");
  };

  const searchElement = () => {
    if (searchValue !== "") {
      const result = set.has(Number(searchValue));
      setSearchResult({
        found: result,
        value: searchValue,
      });
    }
  };

  const renderAlert = () => {
    if (!searchResult) return null;

    const alertClass = searchResult.found ? "alert-success" : "alert-fail";
    const message = searchResult.found
      ? `${searchResult.value} is in the set.`
      : `${searchResult.value} is not in the set.`;

    return <div className={`alert ${alertClass}`}>{message}</div>;
  };

  return (
    <div className="card">
      <div className="title">Set Visualization</div>
      <div className="set-container">{renderSet()}</div>
      <div className="input-container">
        <input
          type="number"
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
          placeholder="Enter a number"
        />
        <button className="button add-button" onClick={addElement}>
          Add
        </button>
        <button className="button reset-button" onClick={resetSet}>
          Reset
        </button>
      </div>
      <div className="input-container">
        <input
          type="number"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search for a number"
        />
        <button className="button search-button" onClick={searchElement}>
          Search
        </button>
      </div>
      {renderAlert()}
    </div>
  );
};

export default SetVis;
