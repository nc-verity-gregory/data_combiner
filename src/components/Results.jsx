import { saveAs } from "file-saver";
import { useState } from "react";
export const Result = ({ csvData, jsonData }) => {
  const [copied, setCopied] = useState(false);

  const formattedJson = JSON.stringify(jsonData, null, 2);
  const downloadCsv = () => {
    const file = new Blob([csvData], { type: "text/csv;charset=utf-8" });
    saveAs(file, "student_staff_rooms.csv");
  };
  const copyJson = () => {
    navigator.clipboard.writeText(formattedJson);
    setCopied(true);
  };
  return (
    <>
      <div className="results">
        <button onClick={downloadCsv}>Download CSV for Zoom</button>
        <button onClick={copyJson}>
          {copied ? <p>Copied!</p> : <p>Copy LMS pairs to clipboard</p>}
        </button>
      </div>
    </>
  );
};
