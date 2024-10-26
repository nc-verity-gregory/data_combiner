import { saveAs } from "file-saver";
import { useState } from "react";
import JSZip from "jszip";
export const Result = ({ csvData, jsonData, groups }) => {
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
  const downloadJson = () => {
    const file = new Blob([formattedJson, { type: "text/json;charset=utf-8" }]);
    saveAs(file, "LMS_json_pairs.json");
  };
  const downloadJsonGroupFiles = async (groups) => {
    const zip = new JSZip();

    groups.forEach((group, index) => {
      const jsonContent = JSON.stringify(group, null, 2);
      zip.file(`LMS_pairs_group_${index + 1}.json`, jsonContent);
    });

    const zipBlob = await zip.generateAsync({ type: "blob" });
    saveAs(zipBlob, "LMS_pairs_groups.zip");
  };
  return (
    <>
      <div className="results">
        <div className="csv-json">
          <button onClick={downloadCsv} className="results-btn">
            Download CSV
          </button>

          <button onClick={copyJson} className="results-btn">
            {copied ? <p>Copied LMS JSON!</p> : <p>Copy LMS JSON</p>}
          </button>
        </div>
        <p>Do you want these pairs again tomorrow?</p>
        <button onClick={downloadJson} className="results-btn">
          Download Joined JSON
        </button>
        <button
          onClick={() => {
            downloadJsonGroupFiles(groups);
          }}
          className="results-btn"
        >
          Download JSON per Learner Group
        </button>
      </div>
    </>
  );
};
