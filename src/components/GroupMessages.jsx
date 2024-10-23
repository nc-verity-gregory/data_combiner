import { useState } from "react";
export const GroupMessage = ({ group, links, groupCount }) => {
  const [copied, setCopied] = useState(false);
  const fullMessage = `Hello @channel Here are your details for today\n :school: ${links.zoom}\n:github: ${links.repo}\n ${group}`;
  const copyMessage = () => {
    navigator.clipboard.writeText(fullMessage);
    setCopied(true);
  };
  return (
    <section>
      <div>
        <h3>Group {groupCount}</h3>
        {fullMessage.split("\n").map((line) => {
          return <p className="student-pairs">{line}</p>;
        })}
      </div>
      <div>
        <button onClick={copyMessage}>{copied ? "Copy" : "Copied!"}</button>
      </div>
    </section>
  );
};
