const { getUserFromTextBody, setUserStatus } = require("../../helper");

const clearUserStatus = async ({ message, client, say }) => {
  try {
    
    const res = await client.conversations.replies('')
    
    return;
    
    
    const textParts = "text".split("\n");
    const { members } = await client.users.list();

    console.log(message);
    return;

    const user = getUserFromTextBody(textParts, members);

    if (!user) {
      return;
    }

    setUserStatus(client, user, "", "");
  } catch (err) {
    console.error(err);
  }
};

module.exports = { clearUserStatus };
