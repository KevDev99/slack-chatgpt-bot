const { formatMessageState } = require("../../helper");
const {updateUser, getTeamInformation} = require("../../database/db.js");

const submitChannel = async ({ ack, say, body, client }) => {
  await ack();

  const formattedState = formatMessageState(body.state);

  if (!formattedState.channels_select) return;

  // save selected channel id to database
  await updateUser(body.team.id, {
    channel: formattedState.channels_select,
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
  
  // welcome message for bot
  await client.chat.postMessage({
    channel: formattedState.channels_select,
    text: "👋 Welcome to BODZii",
    blocks: [{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": `Hey everyone! <@${body.user.id}> asked me to help you all stay healthy and happy! It’s time to make your daily healthy habits a priority to keep you feeling energized and clear-minded throughout your busy day. Every morning, you’ll have an opportunity to select one or multiple daily habits you’d like to complete! I’ll ping you at 6pm local time to see if you’ve completed them! Each day you’ll get point(s) for every habit you complete! Let’s see who becomes the habit King or Queen! Join in on our first habit tomorrow at 9am!`
			}
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "*Join in our first habit tomorrow at 9am!*"
			}
		}]
  })
  

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

module.exports = { submitChannel };