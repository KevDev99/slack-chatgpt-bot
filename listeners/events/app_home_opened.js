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
         
        ],
      },
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = appHomeOpened;
