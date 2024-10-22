export const jsonGenerator = (groupOneStr, groupTwoStr) => {
  const studentOutputForJson = { pairs: [], solo: [] };
  const groupOne = JSON.parse(groupOneStr);
  const groupTwo = JSON.parse(groupTwoStr);
  groupOne.solo.forEach((student) => {
    studentOutputForJson.solo.push(student);
  });
  groupTwo.solo.forEach((student) => {
    studentOutputForJson.solo.push(student);
  });

  groupOne.pairs.forEach((pair) => {
    studentOutputForJson.pairs.push(pair);
  });
  groupTwo.pairs.forEach((pair) => {
    studentOutputForJson.pairs.push(pair);
  });
  return studentOutputForJson;
};

export const csvGenerator = (studentData, tutorRoom, staffRooms) => {
  const studentOutputForCsv = ["Pre-assign Room Name, Email Address"];
  const nameTruncator = (name) => {
    const names = name.split(" ");
    const firstName = names[0];
    const initial = names[names.length - 1][0];
    return `${firstName} ${initial}`;
  };
  studentData.pairs.forEach(([personOne, personTwo]) => {
    const roomName = `${nameTruncator(personOne.name)}/${nameTruncator(
      personTwo.name
    )}`;
    studentOutputForCsv.push(`${roomName}, null@null.com`);
  });
  studentData.solo.forEach(({ name }) => {
    studentOutputForCsv.push(`${nameTruncator(name)}, null@null.com`);
  });
  studentOutputForCsv.push(`${tutorRoom}, null@null.com`);
  staffRooms.forEach(({ name }) => {
    studentOutputForCsv.push(`${name}-NC, null@null.com`);
  });
  return studentOutputForCsv.join("\n");
};
