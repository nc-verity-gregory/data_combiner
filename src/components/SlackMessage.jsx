import { useState } from "react";
import { pairStringsForSlack } from "../utils";
import { GroupMessage } from "./GroupMessage";

export const SlackMessage = ({ groups }) => {
  const [links, setLinks] = useState({ repo: "", zoom: "" });
  const [renderMessages, setRenderMessages] = useState(false);
  const groupEmojis = pairStringsForSlack(groups);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (groupEmojis.length && links.repo.length && links.zoom.length) {
      setRenderMessages(true);
    }
  };
  return (
    <div className="slack-section">
      <h3>Slack Message builder</h3>
      <form onSubmit={handleSubmit}>
        <label>L2C Link</label>
        <input
          type="text"
          onChange={(e) => {
            const currData = { ...links };
            currData.repo = e.target.value;
            setLinks(currData);
          }}
        ></input>
        <br></br>
        <label>Zoom Link</label>
        <input
          type="text"
          onChange={(e) => {
            const currData = { ...links };
            currData.zoom = e.target.value;
            setLinks(currData);
          }}
        ></input>
        <button>Generate Messages</button>
      </form>
      {renderMessages
        ? groupEmojis.map((group, i) => {
            return (
              <GroupMessage
                key={i}
                group={group}
                groupCount={i + 1}
                links={links}
              />
            );
          })
        : null}
    </div>
  );
};
