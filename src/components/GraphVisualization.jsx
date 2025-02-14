import React, { useState } from "react";

const GraphVisualization = () => {
  const [graph, setGraph] = useState({});
  const [vertexInput, setVertexInput] = useState("");
  const [edgeStart, setEdgeStart] = useState("");
  const [edgeEnd, setEdgeEnd] = useState("");
  const [message, setMessage] = useState("");

  const addVertex = (vertex) => {
    setGraph((prev) => {
      if (!prev[vertex]) {
        return { ...prev, [vertex]: [] };
      }
      return prev;
    });
  };

  const addEdge = (v1, v2) => {
    setGraph((prev) => {
      const newGraph = { ...prev };
      if (!newGraph[v1]) newGraph[v1] = [];
      if (!newGraph[v2]) newGraph[v2] = [];
      if (!newGraph[v1].includes(v2)) {
        newGraph[v1].push(v2);
      }
      if (!newGraph[v2].includes(v1)) {
        newGraph[v2].push(v1);
      }
      return newGraph;
    });
  };

  const handleAddVertex = () => {
    const vertex = vertexInput.trim();
    if (vertex !== "") {
      addVertex(vertex);
      setMessage(`Vertex "${vertex}" added to the graph.`);
      setVertexInput("");
    }
  };

  const handleAddEdge = () => {
    if (edgeStart && edgeEnd) {
      addEdge(edgeStart, edgeEnd);
      setMessage(`Edge added between "${edgeStart}" and "${edgeEnd}".`);
      setEdgeStart("");
      setEdgeEnd("");
    }
  };

  const vertices = Object.keys(graph);

  return (
    <div className="card container">
      <div className="title">Graph Visualization</div>
      <div className="section">
        <h3>Add Vertex</h3>
        <input
          type="text"
          placeholder="Enter vertex name"
          value={vertexInput}
          onChange={(e) => setVertexInput(e.target.value)}
        />
        <button onClick={handleAddVertex}>Add Vertex</button>
      </div>
      <div className="section">
        <h3>Add Edge</h3>
        <select
          value={edgeStart}
          onChange={(e) => setEdgeStart(e.target.value)}
        >
          <option value="">Select start vertex</option>
          {vertices.map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </select>
        <select value={edgeEnd} onChange={(e) => setEdgeEnd(e.target.value)}>
          <option value="">Select end vertex</option>
          {vertices.map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </select>
        <button onClick={handleAddEdge}>Add Edge</button>
      </div>
      {message && <div className="alert">{message}</div>}
      <div className="graph-output">
        <h3>Graph Structure:</h3>
        <div>
          {vertices.map((vertex) => (
            <div key={vertex}>
              <strong>{vertex}:</strong> {graph[vertex].join(", ")}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GraphVisualization;
