import React, { useState, useRef } from "react";

class AVLNode {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
    this.height = 1;
  }
}

class AVLTree {
  constructor() {
    this.root = null;
  }

  height(node) {
    return node ? node.height : 0;
  }

  balanceFactor(node) {
    return this.height(node.left) - this.height(node.right);
  }

  updateHeight(node) {
    node.height = 1 + Math.max(this.height(node.left), this.height(node.right));
  }

  rotateRight(y) {
    const x = y.left;
    const T2 = x.right;
    x.right = y;
    y.left = T2;
    this.updateHeight(y);
    this.updateHeight(x);
    return x;
  }

  rotateLeft(x) {
    const y = x.right;
    const T2 = y.left;
    y.left = x;
    x.right = T2;
    this.updateHeight(x);
    this.updateHeight(y);
    return y;
  }

  insert(node, data) {
    if (!node) return new AVLNode(data);

    if (data < node.data) {
      node.left = this.insert(node.left, data);
    } else if (data > node.data) {
      node.right = this.insert(node.right, data);
    } else {
      return node;
    }

    this.updateHeight(node);
    const balance = this.balanceFactor(node);

    if (balance > 1) {
      if (data < node.left.data) {
        return this.rotateRight(node);
      } else {
        node.left = this.rotateLeft(node.left);
        return this.rotateRight(node);
      }
    }

    if (balance < -1) {
      if (data > node.right.data) {
        return this.rotateLeft(node);
      } else {
        node.right = this.rotateRight(node.right);
        return this.rotateLeft(node);
      }
    }

    return node;
  }

  insertValue(data) {
    this.root = this.insert(this.root, data);
  }
}

const AVLTreeVisualization = () => {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");
  const treeRef = useRef(new AVLTree());
  const svgRef = useRef(null);

  const handleInsert = () => {
    const value = parseInt(inputValue);
    if (isNaN(value)) {
      setError("Please enter a valid number");
      return;
    }
    setError("");
    treeRef.current.insertValue(value);
    setInputValue("");
    renderTree(treeRef.current.root);
  };

  const renderTree = (node, x = 300, y = 30, level = 1) => {
    const svg = svgRef.current;
    if (!svg) return;
    while (svg.firstChild) {
      svg.removeChild(svg.firstChild);
    }
    recursiveRender(svg, node, x, y, level);
  };

  const recursiveRender = (svg, node, x, y, level) => {
    if (!node) return;
    const svgns = "http://www.w3.org/2000/svg";
    const circle = document.createElementNS(svgns, "circle");
    circle.setAttribute("cx", x);
    circle.setAttribute("cy", y);
    circle.setAttribute("r", 20);
    circle.setAttribute("fill", "lightblue");
    circle.setAttribute("stroke", "black");

    const text = document.createElementNS(svgns, "text");
    text.setAttribute("x", x);
    text.setAttribute("y", y + 5);
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("alignment-baseline", "middle");
    text.textContent = node.data;

    svg.appendChild(circle);
    svg.appendChild(text);

    const verticalSpacing = 50;
    const horizontalSpacing = 150 / level;

    if (node.left) {
      const leftLine = document.createElementNS(svgns, "line");
      leftLine.setAttribute("x1", x);
      leftLine.setAttribute("y1", y + 20);
      leftLine.setAttribute("x2", x - horizontalSpacing);
      leftLine.setAttribute("y2", y + verticalSpacing);
      leftLine.setAttribute("stroke", "black");
      svg.appendChild(leftLine);
      recursiveRender(
        svg,
        node.left,
        x - horizontalSpacing,
        y + verticalSpacing,
        level + 1
      );
    }

    if (node.right) {
      const rightLine = document.createElementNS(svgns, "line");
      rightLine.setAttribute("x1", x);
      rightLine.setAttribute("y1", y + 20);
      rightLine.setAttribute("x2", x + horizontalSpacing);
      rightLine.setAttribute("y2", y + verticalSpacing);
      rightLine.setAttribute("stroke", "black");
      svg.appendChild(rightLine);
      recursiveRender(
        svg,
        node.right,
        x + horizontalSpacing,
        y + verticalSpacing,
        level + 1
      );
    }
  };

  return (
    <div className="card">
      <div className="title">AVL Tree Visualization</div>
      <div>
        <input
          type="text"
          placeholder="Enter a number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button onClick={handleInsert}>Insert</button>
      </div>
      {error && <div className="error">{error}</div>}
      <svg ref={svgRef} width="600" height="300"></svg>
    </div>
  );
};

export default AVLTreeVisualization;
