export const jsonGenerator = (groups) => {
  const studentOutputForJson = { pairs: [], solo: [] };
  groups.forEach((group) => {
    const { pairs, solo } = JSON.parse(group);
    pairs.forEach((pair) => studentOutputForJson.pairs.push(pair));
    solo.forEach((person) => studentOutputForJson.solo.push(person));
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

export const pairStringsForSlack = (groups) => {
  const addEmojis = groups.map((group) => {
    const { pairs, solo } = JSON.parse(group);
    let groupsString = "";
    pairs.forEach(([personOne, personTwo]) => {
      groupsString += `🍐 ${personOne.name} & ${personTwo.name} 🍐\n`;
    });
    solo.forEach(({ name }) => {
      groupsString += `🍎 ${name} 🍎\n`;
    });
    return groupsString;
  });
  return addEmojis;
};
