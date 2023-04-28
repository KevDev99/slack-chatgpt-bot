const { formatState } = require("../../helper");
const db = require("../../database/db.js");

const sendBotMessage = async ({ body, ack, client, event, state }) => {
  try {
    if (!body.view.state) {
      await ack();
      return;
    }
  
    // extract value
    const messageInputValue = body.view.state.values["message_block_input"]["send_bot_message"].value;

    // send message with mentioning the bot
    client.chat.postMessage({channel: })
    
    await ack();
  } catch (err) {
    console.error(err);
  }
};

module.exports = sendBotMessage;
