const { getUserFromTextBody, setUserStatus } = require("../../helper");

const setDialPadStatus = async ({ message, client, say }) => {
  try {
    const { text } = message;
    const textParts = text.split("\n");
    const { members } = await client.users.list();
    
    console.log(message);
    

    const user = getUserFromTextBody(textParts, members);
    
    if(!user) {
      return;
    }

    setUserStatus(client, user, "In a call", "📞");
  } catch (err) {
    console.error(err);
  }
};

module.exports = { setDialPadStatus };
