const { formatState } = require("../../helper");
const db = require("../../database/db.js");

const sendBotMessage = async ({ body, ack, client, event, state }) => {
  try {
    console.log(body.view.state);

    await ack();
  } catch (err) {
    console.error(err);
  }
};

module.exports = sendBotMessage;
