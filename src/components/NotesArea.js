// components/NotesArea.js
import React, { useState } from "react";
import Note from "./Note";
import "./NotesArea.css";
import ExportButton from "./ExportButton";
import { MdDelete } from "react-icons/md";
import { toast } from "sonner";

function NotesArea() {
  const [notes, setNotes] = useState([]);

  const handleDoubleClick = (e) => {
    const { clientX, clientY } = e;
    const newNote = {
      id:"#" + Math.random().toString(36).substr(2, 9), // generate unique id
      text: "",
      top: clientY - 100,
      left: clientX - 180,
    };
    setNotes([...notes, newNote]);
    console.log(newNote.id);
  };

  const handleDeleteNote = (idToDelete) => {
    const updatedNotes = notes.filter((note) => note.id !== idToDelete);
    setNotes(updatedNotes);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedText = e.dataTransfer.getData("text/plain");
    console.log(droppedText)
    if (droppedText[0]!=='#') {
      const { clientX, clientY } = e;
      const newNote = {
        id: "#" + Math.random().toString(36).substr(2, 9),
        text: droppedText,
        top: clientY - 100,
        left: clientX - 180,
      };
      ////////////////
      // console.log(notes)
      // console.log(newNote)
      setNotes([...notes, newNote]);
      // console.log(notes)
    } else {
      const noteId = e.dataTransfer.getData("text/plain");
      console.log("noteId",noteId)
      const note = notes.find((note) => note.id === noteId);
      handleDeleteNote(noteId);
      if (note) {
        const { clientX, clientY } = e;
        const updatedNotes = notes.map((item) => {
          if (item.id === noteId) {
            return {
              ...item,
              top: clientY - 100,
              left: clientX - 180,
            };
          }
          return item;
        });
        setNotes(updatedNotes);
      }
    }
  };
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDelete = () => {
    if (notes.length === 0) {
      return toast.error("No notes to delete..!");
    }
    setNotes([]);
  };

  return (
    <div
      className="notes-area"
      style={{ width: "75vw", height: "75vh" }}
      onDoubleClick={handleDoubleClick}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      {notes.map((note) => (
        <Note
          key={note.id}
          id={note.id}
          top={note.top}
          left={note.left}
          text={note.text}
          setText={(newText) => {
            const updatedNotes = notes.map((n) =>
              n.id === note.id ? { ...n, text: newText } : n
            );
            setNotes(updatedNotes);
          }}
          onDelete={() => handleDeleteNote(note.id)}
        />
      ))}
      <ExportButton notes={notes} />
      <button className="delete-button" onClick={handleDelete}>
        <MdDelete /> Delete
      </button>
    </div>
  );
}

export default NotesArea;
