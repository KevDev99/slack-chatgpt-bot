const setDialPadStatus = async ({ message, client, say }) => {
  const { text } = message;
  const textParts = text.split("\n");
  const { members } = await client.users.list();
  
  console.log(message);

  textParts.map((textPart) => {
    if (!textPart.includes("Handled by")) {
      return;
    }

    const handledByFields = textPart.split(" ");

    const validFilterField = [];

    handledByFields.map((field) => {
      const filteredMembers = members.filter((member) =>
        member.profile.real_name.includes(field)
      );

      if (filteredMembers.length >= 1) {
        return validFilterField.push(field);
      }
    });

    const foundMembers = [];

    members.map((member) => {
      let matchYN = new RegExp(validFilterField.join("|")).test(
        member.profile.real_name
      );

      if (matchYN) {
        foundMembers.push(member);
      }
    });

    let user = foundMembers[0];
    

  });
};

module.exports = { setDialPadStatus };
