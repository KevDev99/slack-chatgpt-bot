const { getUsers } = require("../../database/db.js");
const ChatGPT = require("../../services/gpt.js");

const appMention = async ({ event, client, body, say }) => {
  try {
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
    
    const resMessage = ChatGPT.sendCompletion(messages,)

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
