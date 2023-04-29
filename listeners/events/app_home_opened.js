const { getUserMessages } = require("../../database/db.js");
const ChatGPT = require("../../services/gpt.js");

const appHomeOpened = async ({ event, client, body, say, logger }) => {
  try {
    
    // get user messages
    const userMessage = await getUserMessages();
    
    // Call views.publish with the built-in client
    const result = await client.views.publish({
      // Use the user ID associated with the event
      user_id: event.user,
      view: {
        // Home tabs must be enabled in your app configuration page under "App Home"
        type: "home",
        blocks: [
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: "*Hey, <@" + event.user + ">*",
            },
          },
          {
            dispatch_action: true,
            block_id: "message_block_input",
            type: "input",
            element: {
              type: "plain_text_input",
              action_id: "send_bot_message",
              placeholder: {
                type: "plain_text",
                text: "Send a message to the bot...",
              },
            },
            label: {
              type: "plain_text",
              text: " ",
              emoji: true,
            },
          },
          {
            type: "header",
            text: {
              type: "plain_text",
              text: "History (Latest)",
              emoji: true,
            },
          },
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: "💬 <https://google.com|this is a link>",
            },
          },
        ],
      },
    });
  } catch (error) {
    logger.error(error);
  }
};

module.exports = { appHomeOpened };
