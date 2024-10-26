import "./App.css";
import { useState } from "react";
import { Result } from "./components/Results";
import { SlackMessage } from "./components/SlackMessage";
import { Form } from "./components/Form";

function App() {
  const [dataGenerator, setDataGenerator] = useState({
    json: { converted: false, data: "", groups: [] },
    csv: { converted: false, data: "" },
  });
  const [show, setShow] = useState(false);

  return (
    <>
      <h1>JSON & CSV Generator</h1>
      <h3>A tidy(ish) way to make a faffy job less faffy</h3>
      <button
        onClick={() => {
          setShow(!show);
        }}
      >
        {!show ? "Instructions" : "Hide instructions"}
      </button>
      {show ? (
        <article>
          <ol>
            <li>
              From the pairing generator, copy the LMS pairs for the learner
              groups working today and paste them one at a time in the boxes.
            </li>
            <li>
              Add a tutor room name and the names of every staff member that
              needs a room. The form will add "-NC" at the end of their name
              automatically.
            </li>
            <li>
              Generating the data will combine all learner groups into both a
              CSV for Zoom breakout room auto allocation and a joined JSON for
              the LMS. If your learner groups are not in one seminar group you
              will need the single JSON pairs either from the Pairing Generator
              or you can download all the JSON inputs as a ZIP
            </li>
            <li>
              If pairs are carrying over to another sprint you can save the
              joined JSON or a ZIP of all JSONs to be used the next day.
            </li>
            <li>
              The Slack Message builder can take today's L2C link and Zoom link
              to generate a list of slack messages per learner group to copy and
              paste into the relevant channels.
            </li>
          </ol>
        </article>
      ) : null}

      <section className="inputs-display">
        <Form
          dataGenerator={dataGenerator}
          setDataGenerator={setDataGenerator}
        />
        {dataGenerator.json.converted && dataGenerator.csv.converted ? (
          <Result
            jsonData={dataGenerator.json.data}
            groups={dataGenerator.json.groups}
            csvData={dataGenerator.csv.data}
          />
        ) : null}
      </section>

      {dataGenerator.json.converted && dataGenerator.csv.converted ? (
        <>
          <SlackMessage groups={dataGenerator.json.groups} />
        </>
      ) : null}
    </>
  );
}

export default App;
