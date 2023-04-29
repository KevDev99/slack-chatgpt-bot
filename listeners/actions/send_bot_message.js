const { formatState } = require("../../helper");
const db = require("../../database/db.js");
const ChatGPT = require("../../services/gpt.js");

const sendBotMessage = async ({ body, ack, client, event, state }) => {
  try {
    const chatGPT = new ChatGPT(process.env.CHATGPT_API_KEY);

    if (!body.view.state) {
      await ack();
      return;
    }
    
    const text = body.view.state.values["message_block_input"]["send_bot_message"].value;

    await ack();

    // extract value
    // TODO: make bot id dynamic
    const messageInputValue =
      `<@${"U04V9UQ9RK7"}>` +
      " " +
      text;

    // send message with mentioning the bot
    const response = await client.chat.postMessage({
      channel: body.user.id,
      as_user: true,
      text: messageInputValue,
      blocks: [
        {
          type: "section",
          text: { type: "mrkdwn", text: `${messageInputValue}` },
        },
      ],
    });

    const {channel, ts} = response;

    const resMessage = await chatGPT.sendCompletion([], messageInputValue);

    await client.chat.postMessage({
      channel: body.user.id,
      thread_ts: ts,
      text: resMessage,
    });
    

    // save timestamp, channel and question to db (as history)
    db.saveMessage(channel, ts, text, body.user.id)
    
  } catch (err) {
    console.error(err);
  }
};

module.exports = sendBotMessage;
