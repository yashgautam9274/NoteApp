// components/Note.js
import React, { useState } from "react";
import "./Note.css";
import { IoClose } from "react-icons/io5";

function Note({ id, top, left, text, setText, onDelete }) {
  const [localText, setLocalText] = useState(text); // Local state to manage textarea value

  const handleChange = (e) => {
    const newText = e.target.value;
    setLocalText(newText); // Update local state
    setText(id, newText); // Pass updated text to parent component
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const droppedText = e.dataTransfer.getData("text/plain");
    if(droppedText[0]==='#') return
    const newText = localText + " " + droppedText;
    setLocalText(newText); // Append dropped text to local state
    setText(id, newText); // Pass updated text to parent component
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragStart = (e) => {
    e.dataTransfer.setData("text/plain", id);
  };

  return (
    <div
      className="note"
      style={{ top, left }}
      draggable
      onDragStart={handleDragStart}
      onDrop={handleDrop} // Handle drop event to append text
      onDragOver={handleDragOver} // Prevent default behavior on drag over
    >
      <IoClose className="delete-note" onClick={() => onDelete(id)}>
        Del
      </IoClose>
      <textarea
        value={localText} // Bind value to local state
        onChange={handleChange} // Handle text change
        spellCheck="false"
        placeholder="Type your note here..."
        autoFocus
      />
    </div>
  );
}

export default Note;
