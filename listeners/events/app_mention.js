const { getUsers } = require("../../database/db.js");

const appMention = async ({ event, client, body }) => {

  try {
    
    if(!event || !event.text) {
      console.error("event text not provided or empty")
      return;
    }
    // get text
    const text = event.text;
    
    // filter out user ids from text
    const filteredText = event.text.replace(/<@([A-Z])\w+>/g, "")
    
    console.log(filteredText);
  } catch (error) {
    console.error(error);
  }
};



module.exports = {appMention};
