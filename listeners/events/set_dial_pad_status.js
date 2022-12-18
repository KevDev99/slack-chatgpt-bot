const setDialPadStatus = async ({ message, client, say }) => {
  const { text } = message;
  const textParts = text.split("\n");
  const { members } = await client.users.list();

  textParts.map((textPart) => {
    if (!textPart.includes("Handled by")) {
      return;
    }

    const handledByFields = textPart.split(" ");

    const validFilterField = [];
    let user;

    handledByFields.map((field) => {
      const filteredMembers = members.filter((member) =>
        member.profile.real_name.includes(field)
      );
      
      if (filteredMembers.length > 1) {
        return validFilterField.push(field);
      }

      if (filteredMembers.length == 1) {
        user = field;
      }
    });
    
    console.log(validFilterField);
    
    console.log(user);
  });
};

module.exports = { setDialPadStatus };
