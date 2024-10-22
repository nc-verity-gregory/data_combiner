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
    <div className="results">
      <section className="json-output">
        <code>{formattedJson}</code>
      </section>
      <section>
        <button onClick={downloadCsv}>Gimmie some rooms</button>
        <button onClick={copyJson} className={copied ? "success" : ""}>
          {copied ? <p>On ya clipboard mate</p> : <p>Copy me some pairs</p>}
        </button>
      </section>
    </div>
  );
};
