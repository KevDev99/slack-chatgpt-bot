const { getUserFromTextBody, setUserStatus, getTimestampInSeconds } = require("../../helper");

const setDialPadStatus = async ({ message, client, say }) => {
  try {
    
    console.log(message);
   //  const { attachments } = message;

    // if (!attachments) return;

    const text = message.text //attachments[2].text;

    if (!text.includes("Handled by")) {
      return;
    }

    const textParts = text.split("\n");

    const user = await getUserFromTextBody(textParts, client);

    console.log("set status of ", user);

    if (!user) {
      return;
    }

    // set status in a call

    // get unix timestamp for expiration
    const unixTimestamp = getTimestampInSeconds(new Date(), 15);
    setUserStatus(client, user, "In a call", "☎️", unixTimestamp);
  } catch (err) {
    console.error(err);
  }
};

module.exports = { setDialPadStatus };
