const { getUserFromTextBody, setUserStatus } = require("../../helper");

const setDialPadStatus = async ({ message, client, say }) => {
  try {
    const { text } = message;
    const textParts = text.split("\n");
    const { members } = await client.users.list();

    const user = getUserFromTextBody(textParts, members);

    setUserStatus(client, user, "In a call", "📞");
  } catch (err) {
    console.error(err);
  }
};

module.exports = { setDialPadStatus };