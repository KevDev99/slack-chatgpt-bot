const { formatState } = require("../../helper");
const db = require("../../database/db.js");

const sendBotMessage = async ({ body, ack, client, event }) => {
  try {
    console.log(body);
    
    await ack();
  } catch (err) {
    console.error(err);
  }
};

module.exports = sendBotMessage;
