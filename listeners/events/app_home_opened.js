const appHomeOpened = async ({ event, client }) => {
  try {
    // Call views.publish with the built-in client
    await client.views.publish({
      // Use the user ID associated with the event
      user_id: event.user,
      view: {
        // Home tabs must be enabled in your app configuration page under "App Home"
        type: "home",
        blocks: [
          {
            type: "header",
            text: {
              type: "plain_text",
              text: "How To Send Mails:",
            },
          },
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: "Click on the *'more actions' menu* on a message",
            },
          },
          {
            type: "image",
            title: {
              type: "plain_text",
              text: " ",
              emoji: true,
            },
            image_url:
              "https://www.linkpicture.com/q/Screenshot-2023-01-20-at-11.08.14.png",
            alt_text: "marg",
          },
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: "Click on the *Shortcut* 'Send as Mail'",
            },
          },
          {
            type: "image",
            image_url:
              "https://www.linkpicture.com/q/Screenshot-2023-01-20-at-11.13.27.png",
            alt_text: "inspiration",
          },
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: "All *documents, images, ... will be automatically attatched* to the mail. The message text is automatically added to the message input on the modal: Choose your receipts and Click on Send",
            },
          },
          {
            type: "image",
            image_url:
              "https://www.linkpicture.com/q/Screenshot-2023-01-20-at-11.15.26.png",
            alt_text: "inspiration",
          },
        ],
      },
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = appHomeOpened;
