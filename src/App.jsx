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

  return (
    <>
      <h1>JSON & CSV Generator</h1>
      <h3>A tidy way to make a faffy job less faffy</h3>

      <Form dataGenerator={dataGenerator} setDataGenerator={setDataGenerator} />
      {dataGenerator.json.converted && dataGenerator.csv.converted ? (
        <>
          <Result
            jsonData={dataGenerator.json.data}
            csvData={dataGenerator.csv.data}
          />
          <SlackMessage groups={dataGenerator.json.groups} />
        </>
      ) : null}
    </>
  );
}

export default App;
