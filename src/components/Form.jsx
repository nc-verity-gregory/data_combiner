import { useEffect, useState } from "react";
import { csvGenerator, jsonGenerator } from "../utils";
export const Form = ({ dataGenerator, setDataGenerator }) => {
  const [inputData, setInputData] = useState({
    groups: [{ pairs: [], solo: [] }],
    tutorRoom: "",
    staff: [],
  });
  const [reset, setReset] = useState(false);

  useEffect(() => {}, [reset]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const jsonData = jsonGenerator(inputData.groups);
    const csvData = csvGenerator(
      jsonData,
      inputData.tutorRoom,
      inputData.staff
    );

    const currData = { ...dataGenerator };
    currData.json.data = jsonData;
    currData.json.converted = true;
    currData.json.groups = inputData.groups;
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
      groups: [{ pairs: [], solo: [] }],
      tutorRoom: "",
      staff: [],
    });
    setDataGenerator({
      json: { converted: false, data: "", groups: [] },
      csv: { converted: false, data: "" },
    });
    setReset(true);
  };
  const handleAddGroup = (e) => {
    e.preventDefault();
    const currData = { ...inputData };
    const newGroups = [...currData.groups, {}];
    currData.groups = newGroups;
    setInputData(currData);
  };
  const handleRemoveGroup = (e, index) => {
    e.preventDefault();
    const currData = { ...inputData };
    const newGroups = currData.groups.filter((_, i) => i !== index);
    currData.groups = newGroups;
    setInputData(currData);
  };
  return (
    <section className="form-section">
      <form onSubmit={handleSubmit}>
        <h3>Learner Group LMS JSON Data</h3>
        <div>
          {inputData.groups.map((_, index) => {
            return (
              <div className="learner-group-inputs" key={index}>
                <label>LG{index + 1} JSON</label>
                <br></br>
                <textarea
                  type="text"
                  name={`learner-group-${index + 1}`}
                  autoFocus
                  onChange={(e) => {
                    const currData = { ...inputData };
                    currData.groups[index] = e.target.value;
                    setInputData(currData);
                  }}
                  value={inputData.groups[index].pairs}
                ></textarea>

                <button
                  onClick={(e) => {
                    handleAddGroup(e);
                  }}
                >
                  +
                </button>
                {index === 0 ? null : (
                  <button
                    onClick={(e) => {
                      handleRemoveGroup(e, index);
                    }}
                  >
                    x
                  </button>
                )}
              </div>
            );
          })}
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
              autoFocus
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
        <button type="submit">Generate Learner Data</button>
        <button
          onClick={(e) => {
            handleClearForm(e);
          }}
        >
          Clear form
        </button>
      </form>
    </section>
  );
};
