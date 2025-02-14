import React, { useState } from "react";

const Tag = () => {
  const [tags, setTags] = useState(new Set());
  const [tagInput, setTagInput] = useState("");

  const addTag = (tag) => {
    const newTags = new Set(tags);
    newTags.add(tag.toLowerCase());
    setTags(newTags);
    console.log(`${tag} added to tags.`);
  };

  const handleAddTag = () => {
    const tag = tagInput.trim();
    if (tag) {
      addTag(tag);
      setTagInput("");
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
        placeholder="Enter a tag"
        onChange={(e) => setTagInput(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <button className="button add-button" onClick={handleAddTag}>
        Add Tag
      </button>
      <div className="tags-display">
        {Array.from(tags).map((tag, index) => (
          <span key={index}>{tag}</span>
        ))}
      </div>
    </div>
  );
};

export default Tag;
