const { formatState } = require("../../helper");
const db = require("../../database/db.js");

const removeUser = async ({ body, client, ack, shortcut, say }) => {
  try {
   

    await ack();
  } catch (err) {
    console.error(err);
  }
};

module.exports = removeUser;
