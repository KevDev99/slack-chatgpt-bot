const { getUserMessages } = require("../../database/db.js");
const ChatGPT = require("../../services/gpt.js");

const appHomeOpened = async ({ event, client, body, say, logger }) => {
  try {
    const userId = event.user;

    // get user messages
    const userMessages = await getUserMessages(userId);

    // Call views.publish with the built-in client
    const result = await client.views.publish(
      appHomeBlock(userId, userMessages)
    );
  } catch (error) {
    logger.error(error);
  }
};

const appHomeBlock = (userId, userMessages) => {
  const appHome = {
    // Use the user ID associated with the event
    user_id: userId,
    view: {
      // Home tabs must be enabled in your app configuration page under "App Home"
      type: "home",
    },
  };

  const blocks = [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: "*Hey, <@" + userId + ">*",
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
  ];

  userMessages.map((userMessage) => {
    blocks.push({
      type: "section",
      text: {
        type: "mrkdwn",
        text: `💬 <https://akte-dev.slack.com/archives/${userMessage.channel}/p${userMessage.ts}|${userMessage.text}>`,
      },
    });
  });
  
  appHome.view.blocks = blocks;

  return appHome;
};

module.exports = { appHomeOpened };
