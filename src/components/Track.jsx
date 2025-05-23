import React, { useState } from "react";

const Track = () => {
  const [cart, setCart] = useState(new Set());
  const [itemInput, setItemInput] = useState("");

  const addToCart = (item) => {
    const newCart = new Set(cart);
    if (!newCart.has(item)) {
      newCart.add(item);
      setCart(newCart);
      console.log(`${item} added to cart.`);
    } else {
      console.log(`${item} is already in the cart (no duplicate).`);
    }
  };

  const handleAddItem = () => {
    const item = itemInput.trim();
    if (item) {
      addToCart(item);
      setItemInput("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddItem();
    }
  };

  return (
    <div className="container">
      <h2>Shopping Cart</h2>
      <input
        type="text"
        value={itemInput}
        placeholder="Enter item name"
        onChange={(e) => setItemInput(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <button className="button add-button" onClick={handleAddItem}>
        Add to Cart
      </button>
      <div className="cart-display">
        {Array.from(cart).map((item, index) => (
          <span key={index}>{item}</span>
        ))}
      </div>
    </div>
  );
};

export default Track;
