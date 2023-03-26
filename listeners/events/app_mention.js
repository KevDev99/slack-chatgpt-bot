const { getUsers } = require("../../database/db.js");
const ChatGPT = require("../../services/gpt.js");

const appMention = async ({ event, client, body, say }) => {
  try {
    if (!event || !event.text) {
      console.error("event text not provided or empty");
      return;
    }
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
    const resData = chatGPT.sendCompletion(messages);
    const resMessage = resData[0].message.content;
    
    await say("")
    
  } catch (error) {
    console.error(error);
  }
};

module.exports = { appMention };
