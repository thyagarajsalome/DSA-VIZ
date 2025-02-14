import React, { useState } from "react";

const HASH_TABLE_SIZE = 10;

const HashTableVisualization = () => {
  const [hashTable, setHashTable] = useState(
    Array(HASH_TABLE_SIZE)
      .fill()
      .map(() => [])
  );
  const [selectedBucket, setSelectedBucket] = useState(null);
  const [keyInput, setKeyInput] = useState("");
  const [valueInput, setValueInput] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState("");

  const hash = (key) => {
    let total = 0;
    for (let i = 0; i < key.length; i++) {
      total += key.charCodeAt(i);
    }
    return total % HASH_TABLE_SIZE;
  };

  const handleAdd = () => {
    if (keyInput && valueInput) {
      const index = hash(keyInput);
      setHashTable((prev) => {
        const newTable = [...prev];
        const bucket = newTable[index] || [];
        const existingIndex = bucket.findIndex((item) => item.key === keyInput);
        if (existingIndex !== -1) {
          bucket[existingIndex] = { key: keyInput, value: valueInput };
        } else {
          bucket.push({ key: keyInput, value: valueInput });
        }
        newTable[index] = bucket;
        return newTable;
      });
      setKeyInput("");
      setValueInput("");
    }
  };

  const handleSearch = () => {
    if (searchInput) {
      const index = hash(searchInput);
      const bucket = hashTable[index];
      const item = bucket.find((item) => item.key === searchInput);
      setSearchResult(
        item ? `Search Result: ${item.value}` : "Search Result: Not found"
      );
      setSelectedBucket(index);
    }
  };

  const handleRemove = (bucketIndex, itemKey) => {
    setHashTable((prev) => {
      const newTable = [...prev];
      newTable[bucketIndex] = newTable[bucketIndex].filter(
        (item) => item.key !== itemKey
      );
      return newTable;
    });
  };

  const handleReset = () => {
    setHashTable(
      Array(HASH_TABLE_SIZE)
        .fill()
        .map(() => [])
    );
    setSelectedBucket(null);
    setKeyInput("");
    setValueInput("");
    setSearchInput("");
    setSearchResult("");
  };

  const totalItems = hashTable.reduce((sum, bucket) => sum + bucket.length, 0);
  const loadFactor = totalItems / HASH_TABLE_SIZE;

  return (
    <div className="card container">
      <h2>Interactive Hash Table Visualization</h2>
      <div className="input-group">
        <input
          type="text"
          placeholder="Key"
          value={keyInput}
          onChange={(e) => setKeyInput(e.target.value)}
        />
        <input
          type="text"
          placeholder="Value"
          value={valueInput}
          onChange={(e) => setValueInput(e.target.value)}
        />
        <button className="add" onClick={handleAdd}>
          Add
        </button>
      </div>
      <div className="input-group">
        <input
          type="text"
          placeholder="Search key"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button className="search" onClick={handleSearch}>
          Search
        </button>
      </div>
      {searchResult && <div className="search-result">{searchResult}</div>}
      <div id="loadFactor">Load Factor: {loadFactor.toFixed(2)}</div>
      <div className="hash-table">
        {hashTable.map((bucket, index) => (
          <div
            key={index}
            className={`bucket ${index === selectedBucket ? "selected" : ""}`}
            onClick={() => setSelectedBucket(index)}
          >
            <div className="bucket-title">Bucket {index}</div>
            {bucket.length === 0 ? (
              <span style={{ color: "#888" }}>Empty</span>
            ) : (
              <ul>
                {bucket.map((item, i) => (
                  <li key={i}>
                    <span>
                      {item.key}: {item.value}
                    </span>
                    <button
                      className="remove-item"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemove(index, item.key);
                      }}
                      title="Remove item"
                    >
                      X
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
      <button className="reset" onClick={handleReset}>
        Reset
      </button>
    </div>
  );
};

export default HashTableVisualization;
