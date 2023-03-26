const { getUsers } = require("../../database/db.js");
const ChatGPT = require("../../services/gpt.js");

const appMention = async ({ event, client, body, say }) => {
  try {
    if (!event || !event.text) {
      console.error("event text not provided or empty");
      return;
    }

    let threadMessages = [];

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
        threadMessages.push({
          role: threadMessage.botId ? "assistant" : "user",
          content: threadMessage.text.replace(/<@([A-Z])\w+>/g, ""),
        });
      });

      threadMessages = fetchedThreadMessages;

      if (!ok) {
        console.log(error);
        return;
      }
    }

    console.log(threadMessages);

    return;

    // get text
    const text = event.text;

    // filter out user ids from text
    const filteredText = event.text.replace(/<@([A-Z])\w+>/g, "");

    const chatGPT = new ChatGPT(process.env.CHATGPT_API_KEY);
    const messages = [
      {
        role: "system",
        content:
          "You are a friendly chat bot designed to answer specific questions in any category and summarize threads.",
      },
      { role: "user", content: text },
    ];
    const resData = await chatGPT.sendCompletion(messages);

    const resMessage = resData.choices[0].message.content;

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
