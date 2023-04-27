const { getUsers } = require("../../database/db.js");
const ChatGPT = require("../../services/gpt.js");

const appHomeOpened = async ({ event, client, body, say, logger }) => {
  try {
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
            type: "section",
            text: {
              type: "mrkdwn",
              text: "Learn how home tabs can be more useful and interactive <https://api.slack.com/surfaces/tabs/using|*in the documentation*>.",
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
