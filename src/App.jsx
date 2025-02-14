import React, { useState } from "react";
import "./styles.css";

import ArrayVisualization from "./components/ArrayVisualization";
import LinkedList from "./components/LinkedList";
import Maps from "./components/Maps";
import Queue from "./components/Queue";
import SetVis from "./components/SetVis";
import StackVis from "./components/StackVis";
import Tag from "./components/Tag";
import Track from "./components/Track";

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
    { id: "set", title: "Set Visualization", component: <SetVis /> },
    { id: "stack", title: "Stack Visualization", component: <StackVis /> },
    { id: "tag", title: "Tag Manager", component: <Tag /> },
    { id: "track", title: "Shopping Cart", component: <Track /> },
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
