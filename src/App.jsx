import "./App.css";
import { useState } from "react";
import { Result } from "./components/Results";
import { csvGenerator, jsonGenerator } from "./utils";
import deleteIcon from "./assets/delete.png";
function App() {
  const [inputData, setInputData] = useState({
    groupOne: "",
    groupTwo: "",
    tutorRoom: "",
    staff: [],
  });
  const [dataGenerator, setDataGenerator] = useState({
    json: { converted: false, data: "" },
    csv: { converted: false, data: "" },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const jsonData = jsonGenerator(inputData.groupOne, inputData.groupTwo);
    const csvData = csvGenerator(
      jsonData,
      inputData.tutorRoom,
      inputData.staff
    );
    const currData = { ...dataGenerator };
    currData.json.data = jsonData;
    currData.json.converted = true;
    currData.csv.data = csvData;
    currData.csv.converted = true;
    setDataGenerator(currData);
  };

  const handleAddStaff = () => {
    const currData = { ...inputData };
    const newStaff = [...currData.staff, { name: "" }];
    currData.staff = newStaff;
    setInputData(currData);
  };
  const deleteRoom = (person, e) => {
    e.preventDefault();

    const currData = { ...inputData };
    const newStaff = currData.staff.filter(({ name }) => name !== person);
    currData.staff = newStaff;
    setInputData(currData);
  };
  const handleStaffChange = (index, event) => {
    const currData = { ...inputData };
    const newStaff = [...currData.staff];
    newStaff[index].name = event.target.value;
    currData.staff = newStaff;
    setInputData(currData);
  };
  const handleClearForm = (e) => {
    e.preventDefault();
    setInputData({
      groupOne: "",
      groupTwo: "",
      tutorRoom: "",
      staff: [],
    });
    setDataGenerator({
      json: { converted: false, data: "" },
      csv: { converted: false, data: "" },
    });
  };
  return (
    <>
      <h1>JSON & CSV Generator</h1>
      <h3>A tidy way to make a faffy job less faffy</h3>
      <form onSubmit={handleSubmit}>
        <div className="learner-group-inputs">
          <div>
            <label>Learner Group One JSON</label>
            <br></br>
            <textarea
              type="text"
              name="learner-group-one"
              onChange={(e) => {
                const currData = { ...inputData };
                currData.groupOne = e.target.value;
                setInputData(currData);
              }}
              value={inputData.groupOne}
            ></textarea>
          </div>
          <div>
            <label>Learner Group Two JSON</label>
            <br></br>
            <textarea
              type="text"
              name="learner-group-two"
              onChange={(e) => {
                const currData = { ...inputData };
                currData.groupTwo = e.target.value;
                setInputData(currData);
              }}
              value={inputData.groupTwo}
            ></textarea>
          </div>
        </div>
        <br></br>
        <label>Tutor Room Name</label>
        <input
          type="text"
          name="tutor-room-name"
          onChange={(e) => {
            const currData = { ...inputData };
            currData.tutorRoom = e.target.value;
            setInputData(currData);
          }}
          value={inputData.tutorRoom}
        ></input>
        <br></br>
        <label>Add Staff Members</label>
        {inputData.staff.map((staffMember, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder={`Staff Member ${index + 1}`}
              value={staffMember.name}
              onChange={(e) => {
                handleStaffChange(index, e);
              }}
            />
            <button
              onClick={(e) => {
                deleteRoom(staffMember.name, e);
              }}
            >
              x
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddStaff}
          className="add-staff-btn"
        >
          +
        </button>
        <br></br>
        <button type="submit">Make me some funky data</button>
        <button
          onClick={(e) => {
            handleClearForm(e);
          }}
        >
          Clear form
        </button>
      </form>
      {dataGenerator.json.converted && dataGenerator.csv.converted ? (
        <Result
          jsonData={dataGenerator.json.data}
          csvData={dataGenerator.csv.data}
        />
      ) : null}
    </>
  );
}

export default App;
