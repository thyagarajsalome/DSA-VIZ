import React, { useState } from "react";
import "./Maps.css";

const Maps = () => {
  const [map, setMap] = useState(
    new Map([
      ["name", "Alice"],
      ["age", 25],
      ["city", "New York"],
    ])
  );
  const [newKey, setNewKey] = useState("");
  const [newValue, setNewValue] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [alert, setAlert] = useState(null);

  const renderMapEntries = () => {
    const entries = [];
    map.forEach((value, key) => {
      entries.push(
        <div className="map-entry" key={key}>
          <span>{key}:</span>
          <input
            type="text"
            value={value}
            onChange={(e) => {
              const updatedMap = new Map(map);
              updatedMap.set(key, e.target.value);
              setMap(updatedMap);
            }}
          />
          <button
            className="button delete-button"
            onClick={() => deleteEntry(key)}
          >
            Delete
          </button>
        </div>
      );
    });
    return entries;
  };

  const addEntry = () => {
    if (newKey && newValue) {
      const updatedMap = new Map(map);
      updatedMap.set(newKey, newValue);
      setMap(updatedMap);
      setNewKey("");
      setNewValue("");
    }
  };

  const deleteEntry = (key) => {
    const updatedMap = new Map(map);
    updatedMap.delete(key);
    setMap(updatedMap);
  };

  const resetMap = () => {
    setMap(
      new Map([
        ["name", "Alice"],
        ["age", 25],
        ["city", "New York"],
      ])
    );
    setAlert(null);
  };

  const searchEntry = () => {
    if (searchKey) {
      const value = map.get(searchKey);
      setAlert(
        value
          ? {
              type: "success",
              message: `Value for key "${searchKey}": ${value}`,
            }
          : {
              type: "fail",
              message: `Key "${searchKey}" not found in the map.`,
            }
      );
    }
  };

  return (
    <div className="card">
      <div className="title">Map Visualization</div>
      <div className="map-container">{renderMapEntries()}</div>
      <div className="input-container">
        <input
          type="text"
          value={newKey}
          placeholder="New key"
          onChange={(e) => setNewKey(e.target.value)}
        />
        <input
          type="text"
          value={newValue}
          placeholder="New value"
          onChange={(e) => setNewValue(e.target.value)}
        />
        <button className="button add-button" onClick={addEntry}>
          Add Entry
        </button>
      </div>
      <div className="input-container">
        <input
          type="text"
          value={searchKey}
          placeholder="Search for a key"
          onChange={(e) => setSearchKey(e.target.value)}
        />
        <button className="button search-button" onClick={searchEntry}>
          Search
        </button>
        <button className="button reset-button" onClick={resetMap}>
          Reset
        </button>
      </div>
      {alert && (
        <div
          className={`alert ${
            alert.type === "success" ? "alert-success" : "alert-fail"
          }`}
        >
          {alert.message}
        </div>
      )}
    </div>
  );
};

export default Maps;
