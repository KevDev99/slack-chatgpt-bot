const { formatState } = require("../../helper");
const db = require("../../database/db.js");

const sendBotMessage = async ({ body, ack, client, event, state }) => {
  try {
    if (!body.view.state) {
      await ack();
      return;
    }

    await ack();

    // extract value
    const messageInputValue =
      body.view.state.values["message_block_input"]["send_bot_message"].value;
    const botId = "U04V9UQ9RK7"; //body.view["bot_id"];

    // send message with mentioning the bot
    const response = await client.chat.postMessage({
      channel: body.user.id,
      as_user: true,
      blocks: [
        {
          type: "section",
          text: { type: "mrkdwn", text: `<@${botId}> ${messageInputValue}` },
        },
      ],
    });

    console.log(response);
  } catch (err) {
    console.error(err);
  }
};

module.exports = sendBotMessage;
