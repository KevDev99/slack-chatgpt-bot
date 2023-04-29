const { getUsers } = require("../../database/db.js");
const ChatGPT = require("../../services/gpt.js");

const appMention = async ({ event, client, body, say }) => {
  try {
    const chatGPT = new ChatGPT(process.env.CHATGPT_API_KEY);
    
    if (!event || !event.text) {
      console.error("event text not provided or empty");
      return;
    }

    let messages = [];

    // check if the message is in a thread already
    if (event.thread_ts) {
      // check if message is in a thread
      const {
        ok,
        messages: fetchedThreadMessages,
        error,
      } = await client.conversations.replies({
        channel: event.channel,
        ts: event.thread_ts,
      });

      fetchedThreadMessages.map((threadMessage) => {
        messages.push({
          role: threadMessage.botId ? "assistant" : "user",
          content: threadMessage.botId
            ? "@bot "
            : "" + threadMessage.text.replace(/<@([A-Z])\w+>/g, ""),
        });
      });

      if (!ok) {
        console.log(error);
        return;
      }
    }

    const text = event.text;
    // filter out user ids from text
    const filteredText = event.text.replace(/<@([A-Z])\w+>/g, "");

    const resMessage = await chatGPT.sendCompletion(messages, filteredText);

    await client.chat.postMessage({
      channel: event.channel,
      thread_ts: event.ts,
      text: resMessage,
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = { appMention };
