const { getUsers } = require("../../database/db.js");
const ChatGPT = require("../../services/gpt.js");

const appMention = async ({ event, client, body, say }) => {
  try {
    
    console.log("HERE");
    if (!event || !event.text) {
      console.error("event text not provided or empty");
      return;
    }

    let threadMessages = [
      {
        role: "system",
        content:
          "You are a friendly chat bot designed to answer specific questions in any category and summarize threads.",
      },
    ];

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
          content: threadMessage.botId ? '@bot ' : "" + threadMessage.text.replace(/<@([A-Z])\w+>/g, ""),
        });
      });

      if (!ok) {
        console.log(error);
        return;
      }
    }

    // get text
    const text = event.text;

    // filter out user ids from text
    const filteredText = event.text.replace(/<@([A-Z])\w+>/g, "");

    const chatGPT = new ChatGPT(process.env.CHATGPT_API_KEY);
    threadMessages.push({ role: "user", content: text });
    console.log(threadMessages);
    
    const resData = await chatGPT.sendCompletion(threadMessages);

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
