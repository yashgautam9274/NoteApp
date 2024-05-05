// App.js
import React, { useState } from 'react';
import './App.css';
import NotesArea from './components/NotesArea';
import ExportButton from './components/ExportButton';
import { Toaster, toast } from 'sonner'

function App() {
  const [notes, setNotes] = useState([]);

  return (
    <div className="App">
      <Toaster richColors/>
      <h1>Interactive Note-taking Application</h1>
      <NotesArea notes={notes} setNotes={setNotes} />
      
    </div>
  );
}

export default App;
