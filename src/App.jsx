import React, { useState } from "react";
import "./styles.css";

import ArrayVisualization from "./components/ArrayVisualization";
import LinkedList from "./components/LinkedList";
import Maps from "./components/Maps";
import Queue from "./components/Queue";

import StackVis from "./components/StackVis";
import Tag from "./components/Tag";
import Track from "./components/Track";

import AVLTreeVisualization from "./components/AVLTreeVisualization";
import GraphVisualization from "./components/GraphVisualization";
import HashTableVisualization from "./components/HashTableVisualization";
import MinHeapVisualization from "./components/MinHeapVisualization";
import FactorialVisualization from "./components/FactorialVisualization";

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const sections = [
    {
      id: "array",
      title: "Array Visualization",
      component: <ArrayVisualization />,
    },
    {
      id: "linkedlist",
      title: "Linked List Visualization",
      component: <LinkedList />,
    },
    { id: "maps", title: "Map Visualization", component: <Maps /> },
    { id: "queue", title: "Queue Visualization", component: <Queue /> },

    { id: "stack", title: "Stack Visualization", component: <StackVis /> },
    { id: "tag", title: "Tag Manager", component: <Tag /> },
    { id: "track", title: "Shopping Cart", component: <Track /> },
    {
      id: "avl",
      title: "AVL Tree Visualization",
      component: <AVLTreeVisualization />,
    },

    {
      id: "graph",
      title: "Graph Visualization",
      component: <GraphVisualization />,
    },
    {
      id: "hashtable",
      title: "Hash Table Visualization",
      component: <HashTableVisualization />,
    },
    {
      id: "minheap",
      title: "Min Heap Visualization",
      component: <MinHeapVisualization />,
    },
    {
      id: "factorial",
      title: "Factorial Visualization",
      component: <FactorialVisualization />,
    },
  ];

  return (
    <div className="app-container">
      <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <button className="sidebar-toggle" onClick={toggleSidebar}>
          {sidebarOpen ? "Close" : "Menu"}
        </button>
        <ul>
          {sections.map((section) => (
            <li key={section.id}>
              <a href={`#${section.id}`} onClick={() => setSidebarOpen(false)}>
                {section.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="content">
        {sections.map((section) => (
          <section id={section.id} key={section.id}>
            {section.component}
          </section>
        ))}
      </div>
    </div>
  );
};

export default App;
