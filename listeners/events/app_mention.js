const { getUsers } = require("../../database/db.js");

const appMention = async ({ event, client, body }) => {

  try {
    console.log(event);
  } catch (error) {
    console.error(error);
  }
};



module.exports = {appMention};
