const { getUserFromTextBody, setUserStatus } = require("../../helper");
const {getUsers} = require('../../database/db.js')

const setDialPadStatus = async ({ message, client, say }) => {
  try {
    const { attachments } = message;
    

    if(!attachments) return;
    
    const text = attachments[2].text;
    
    console.log(text);
    
    
    if (!text.includes("Handled by")) {
      return;
    }
    
    const textParts = text.split("\n");

    const user = await getUserFromTextBody(textParts, client);
    
    console.log(user);
    
    if(!user) {
      return;
    }

    setUserStatus(client, user, "In a call", "☎️");
  } catch (err) {
    console.error(err);
  }
};

module.exports = { setDialPadStatus };
