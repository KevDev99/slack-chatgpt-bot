const { getUserFromTextBody } = require("../../helper");
const { getUser } = require("../../database/db.js");

const setDialPadStatus = async ({ message, client, say }) => {
  const { text } = message;
  const textParts = text.split("\n");
  const { members } = await client.users.list();

  const user = getUserFromTextBody(textParts, members);

  // check if user is given
  if (!user) {
    console.log("User not found: ", textParts);
  }

  // check if user exists in db
  const dbUser = await getUser(user.id);
  console.log(dbUser);
};

module.exports = { setDialPadStatus };
