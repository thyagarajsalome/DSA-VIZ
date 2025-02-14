import React, { useState, useRef } from "react";

const LinkedList = () => {
  const [linkedList, setLinkedList] = useState({ head: null });
  const [newValue, setNewValue] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const nodeIdRef = useRef(0);

  // Create a node with a unique id
  const Node = (data) => ({ id: nodeIdRef.current++, data, next: null });

  // Helper to deep clone the linked list starting from a given node
  const cloneList = (node) => {
    if (!node) return null;
    return { id: node.id, data: node.data, next: cloneList(node.next) };
  };

  const appendNode = () => {
    if (newValue === "") return;
    const newNode = Node(Number(newValue));

    setLinkedList((prev) => {
      // If the list is empty, set head to the new node.
      if (!prev.head) return { head: newNode };

      // Clone the current list to avoid direct mutation.
      const newHead = cloneList(prev.head);
      let current = newHead;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
      return { head: newHead };
    });

    setAlertMessage(`Appended ${newValue} to the linked list.`);
    setNewValue("");
  };

  const removeNode = () => {
    if (newValue === "") return;
    const valueToRemove = Number(newValue);

    setLinkedList((prev) => {
      if (!prev.head) return prev;

      // Special case: if head is the node to remove.
      if (prev.head.data === valueToRemove) {
        return { head: cloneList(prev.head.next) };
      }

      // Clone the list so we don’t mutate the original.
      const newHead = cloneList(prev.head);
      let current = newHead;
      while (current.next) {
        if (current.next.data === valueToRemove) {
          current.next = current.next.next;
          return { head: newHead };
        }
        current = current.next;
      }
      return prev; // No node found; state remains the same.
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
        <React.Fragment key={current.id}>
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
