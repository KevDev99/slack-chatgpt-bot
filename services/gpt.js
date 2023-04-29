const axios = require("axios");

class ChatGPT {
  constructor(apiKey) {
    this.apiKey = apiKey;
  }

  async sendCompletion(messages, text) {
    let threadMessages = [
      {
        role: "system",
        content:
          "You are a friendly chat bot designed to answer specific questions in any category and summarize threads.",
      },
    ];

    messages.map((message) => threadMessages.push(message));

    const chatGPT = new ChatGPT(process.env.CHATGPT_API_KEY);
    threadMessages.push({ role: "user", content: text });

    const resData = await chatGPT.sendCompletion(threadMessages);

    const resMessage = resData.choices[0].message.content;

    const res = await axios.post(
      process.env.CHATGPT_CHAT_URL,
      {
        model: "gpt-3.5-turbo",
        messages: messages,
      },
      {
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
        },
      }
    );

    return res.data;
  }
}

module.exports = ChatGPT;
