const appHomeOpened = async ({ event, client }) => {
  try {
    // Call views.publish with the built-in client
    await client.views.publish({
      // Use the user ID associated with the event
      user_id: event.user,
      view: {
        // Home tabs must be enabled in your app configuration page under "App Home"
        type: "home",
        blocks: getAppHomeBlocks(),
      },
    });
  } catch (error) {
    console.error(error);
  }
};

const getAppHomeBlocks = () => {
  const blocks = [
    {
      type: "header",
      text: {
        type: "plain_text",
        text: "Users",
        emoji: true,
      },
    },
  ];
  
  // load users
  const users = 

  blocks.push({
    type: "section",
    text: {
      type: "mrkdwn",
      text: "kevin.taufer@outlook.com",
    },
    accessory: {
      type: "button",
      text: {
        type: "plain_text",
        text: "Remove",
        emoji: true,
      },
      value: "kevin.taufer@outlook.com",
      action_id: "remove_user",
    },
  });

  blocks.push(
    {
      type: "divider",
    },
    {
      dispatch_action: true,
      block_id: "add_user",
      type: "input",
      element: {
        type: "plain_text_input",
        action_id: "add_user-action",
      },
      label: {
        type: "plain_text",
        text: "New user",
        emoji: true,
      },
    }
  );

  return blocks;
};

module.exports = appHomeOpened;
