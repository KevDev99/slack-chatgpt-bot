const { getUserFromTextBody, setUserStatus } = require("../../helper");

const clearUserStatus = async ({ message, client, say }) => {
  try {
    // get original message from thread
    const { event_ts, channel } = message;

    const { ok, messages, error } = await client.conversations.history({
      // The token you used to initialize your app
      channel: channel,
      // In a more realistic app, you may store ts data in a db
      latest: event_ts,
      // Limit results
      inclusive: true,
      limit: 1,
    });

    if (!ok) throw error;

    if (messages.length <= 0) {
      console.log("no messages found");
      return;
    }

    const { text } = messages[0];

    const textParts = text.split("\n");
    const { members } = await client.users.list();

    const user = getUserFromTextBody(textParts, members);

    if (!user) {
      return;
    }

    setUserStatus(client, user, "", "");
  } catch (err) {
    console.error(err);
  }
};

module.exports = { clearUserStatus };
