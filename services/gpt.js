const axios = require("axios");

class ChatGPT {
  constructor(apiKey) {
    this.apiKey = apiKey;
  }

  async sendCompletion(messages) {
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
