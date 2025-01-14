import React from "react";

import Array from "./components/Array/Array";
import LinkedList from "./components/LinkedList/LinkedList";
import Maps from "./components/Maps/Maps";
import Queue from "./components/Queue/Queue";
import SetVis from "./components/Setvis/Setvis";
import StackVis from "./components/StackVis/StackVis";
import Tag from "./components/Tag/Tag";
import Track from "./components/Track/Track";
import "./index.css";

const App = () => {
  return (
    <div className="app-container">
      <main className="main-content">
        <section className="grid-container">
          <div className="grid-item">
            <Array />
          </div>
          <div className="grid-item">
            <LinkedList />
          </div>
          <div className="grid-item">
            <Maps />
          </div>
          <div className="grid-item">
            <Queue />
          </div>
          <div className="grid-item">
            <SetVis />
          </div>
          <div className="grid-item">
            <StackVis />
          </div>
          <div className="grid-item">
            <Tag />
          </div>
          <div className="grid-item">
            <Track />
          </div>
        </section>
      </main>
    </div>
  );
};

export default App;
