import React from "react";
import Array from "./components/Array/Array";
import LinkedList from "./components/LinkedList/LinkedList";
import Maps from "./components/Maps/Maps";
import Navbar from "./components/Navbar/Navbar";

const App = () => {
  return (
    <div>
      <Navbar />
      <Array />
      <LinkedList />
      <Maps />
    </div>
  );
};

export default App;
