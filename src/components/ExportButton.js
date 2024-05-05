// components/ExportButton.js
import React from 'react';
import * as XLSX from 'xlsx';
import './ExportButton.css'
import { FaDownload } from "react-icons/fa";
import { Toaster, toast } from 'sonner'

function ExportButton({ notes }) {
  const handleExport = () => {

    if (notes.length === 0){
      return toast.error('No notes to export..!');
    }

    const data = notes.map(note => {
      return {
        Text: note.text,
        'Distance from Top': note.top,
        'Distance from Left': note.left,
        'Distance from Top-Left Corner': Math.sqrt(note.top ** 2 + note.left ** 2)
      };
    });

    console.log(data);

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Notes');
    XLSX.writeFile(wb, 'notes.xlsx');
  };

  return (
    <div>
      <button className="export-button" onClick={handleExport}><FaDownload/> Export Notes</button>
    </div>
  );
}

export default ExportButton;
