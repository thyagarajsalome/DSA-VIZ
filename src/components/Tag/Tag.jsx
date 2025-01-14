import React, { useState } from "react";
import "./Tag.css";

const Tag = () => {
  const [tags, setTags] = useState(new Set());
  const [tagInput, setTagInput] = useState("");

  const addTag = (tag) => {
    const newTags = new Set(tags);
    newTags.add(tag.toLowerCase()); // Store tags in lowercase for consistency
    setTags(newTags);
    console.log(`${tag} added to tags.`);
  };

  const handleAddTag = () => {
    const tag = tagInput.trim();
    if (tag) {
      addTag(tag);
      setTagInput(""); // Clear the input after adding
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddTag();
    }
  };

  return (
    <div className="container">
      <h2>Tag Manager</h2>
      <input
        type="text"
        value={tagInput}
        onChange={(e) => setTagInput(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Enter a tag"
      />
      <button onClick={handleAddTag}>Add Tag</button>
      <div className="tags-display">
        {Array.from(tags).map((tag, index) => (
          <span key={index}>{tag}</span>
        ))}
      </div>
    </div>
  );
};

export default Tag;
