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

    threadMessages.push({ role: "user", content: text });
  
    const res = await axios.post(
      process.env.CHATGPT_CHAT_URL,
      {
        model: "gpt-3.5-turbo",
        messages: threadMessages,
      },
      {
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
        },
      }
    );
    
    if(res.status != 200) {
      return "Error:  " + res.data.error.message;
    }

    return res.data.choices[0].message.content;
  }
}

module.exports = ChatGPT;
