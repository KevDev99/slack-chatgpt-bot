
const { formatMessageState } = require("../../helper");

const submitChannel = async ({ ack, say, body, client }) => {
  await ack();

  const formattedState = formatMessageState(body.state);

  if (!formattedState.channels_select) return;

  // save selected channel id to database
  await updateUser(body.team.id, {
    roundup_channel: formattedState.channels_select,
    roundup_day: formattedState.static_select,
  });

  // get bot and user details from installation
  const installationUserToken = await getTeamInformation(
    body.team.id,
    "user.token"
  );
  const botUserId = await getTeamInformation(body.team.id, "bot.userId");

  // invite bot to channel
  try {
    client.conversations.invite({
      channel: formattedState.channels_select,
      users: botUserId,
      token: installationUserToken,
    });
  } catch (err) {}

  // update message
  await client.chat.update({
    channel: body.channel.id,
    ts: body.message.ts,
    text: "awesome thanks!",
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "awesome thanks! Everything is ready now.",
        },
      },
      {
        type: "image",
        image_url:
          "https://media0.giphy.com/media/lMameLIF8voLu8HxWV/giphy.gif",
        alt_text: "celebration",
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "*We’ll send the daily habits to your selected channel. ",
        },
      },
    ],
  });
};

module.exports = { submitChannelö };
