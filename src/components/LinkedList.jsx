import React, { useState } from "react";

const LinkedList = () => {
  const [linkedList, setLinkedList] = useState({ head: null });
  const [newValue, setNewValue] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const Node = (data) => ({ data, next: null });

  const appendNode = () => {
    if (newValue === "") return;

    const newNode = Node(Number(newValue));
    setLinkedList((prev) => {
      if (!prev.head) return { head: newNode };

      let current = prev.head;
      while (current.next) current = current.next;
      current.next = newNode;
      return { ...prev };
    });

    setAlertMessage(`Appended ${newValue} to the linked list.`);
    setNewValue("");
  };

  const removeNode = () => {
    if (newValue === "") return;

    const valueToRemove = Number(newValue);
    setLinkedList((prev) => {
      if (!prev.head) return prev;
      if (prev.head.data === valueToRemove) return { head: prev.head.next };

      let current = prev.head;
      while (current.next) {
        if (current.next.data === valueToRemove) {
          current.next = current.next.next;
          return { ...prev };
        }
        current = current.next;
      }
      return prev;
    });

    setAlertMessage(`Removed ${newValue} from the linked list.`);
    setNewValue("");
  };

  const resetList = () => {
    setLinkedList({ head: null });
    setAlertMessage("Reset the linked list.");
  };

  const renderList = () => {
    const items = [];
    let current = linkedList.head;
    while (current) {
      items.push(
        <React.Fragment key={current.data}>
          <div className="list-item">{current.data}</div>
          {current.next && <div className="arrow" />}
        </React.Fragment>
      );
      current = current.next;
    }
    if (items.length === 0) {
      items.push(
        <div key="empty" className="text-gray-500 italic">
          Linked List is empty
        </div>
      );
    }
    return items;
  };

  return (
    <div className="card">
      <div className="title">Linked List Visualization</div>
      <div className="list-container">{renderList()}</div>
      <div className="button-container">
        <input
          type="number"
          placeholder="Enter a number"
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
        />
        <button className="button append-button" onClick={appendNode}>
          Append
        </button>
        <button className="button remove-button" onClick={removeNode}>
          Remove
        </button>
        <button className="button reset-button" onClick={resetList}>
          Reset
        </button>
      </div>
      {alertMessage && <div className="alert">{alertMessage}</div>}
    </div>
  );
};

export default LinkedList;
