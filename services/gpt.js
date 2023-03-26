const axios = require("axios");

class ChatGPT {
  constructor(apiKey) {
    this.apiKey = apiKey;
  }

  async sendCompletion(prompt) {
    await axios.post(
      process.env.CHATGPT_COMPLETIONS_URL,
      {
        model: "gpt-3.5-turbo",
        prompt: prompt,
        max_tokens: 7,
        temperature: 0,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.CHATGPT_API_KEY}`
        }
      }
    );
  }
}


module.exports = ChatGPT