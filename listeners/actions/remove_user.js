const { formatState } = require("../../helper");
const db = require("../../database/db.js");
const { getAppHomeBlocks } = require("../events/app_home_opened.js");

const removeUser = async ({ ack, body, client }) => {
  try {
    await ack();

    const triggeredAction = body.actions[0];

    if (!triggeredAction) return;

    await removeUser({ email: triggeredAction.value });

    // refresh home
    // Call views.publish with the built-in client
    await client.views.publish({
      // Use the user ID associated with the event
      user_id: body.user.id,
      view: {
        // Home tabs must be enabled in your app configuration page under "App Home"
        type: "home",
        blocks: await getAppHomeBlocks(body.team.id),
      },
    });
  } catch (err) {
    console.error(err);
  }
};

module.exports = removeUser;
