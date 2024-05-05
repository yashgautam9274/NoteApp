// components/Note.js
import React, { useState } from "react";
import "./Note.css";
import { IoClose } from "react-icons/io5";

function Note({ id, top, left, setText ,onDelete }) {

  const handleChange = (e) => {
    setText(e.target.value);
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
    >
      <IoClose className="delete-note" onClick={onDelete}>Del</IoClose>
      <textarea
        onChange={handleChange}
        spellCheck="false"
        placeholder="Type your note here..."
        autoFocus
      />
    </div>
  );
}

export default Note;
