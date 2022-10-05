const { updateDailyUserHabit } = require("../../database/db.js");

const habitCompleted = async ({ ack, say, body, client }) => {
  await ack();

  const completed = body.actions[0].value == "yes" ? true : false;

  // get daily user habit id from the metadata
  const { event_payload } = body.message.metadata;
  const { userHabitId } = event_payload;

  // update on the db
  updateDailyUserHabit(userHabitId, { completed });

  // send message back to user
  let messageBlock = [];
  let text = "";
  if (completed) {
    text = "🎉 *Great news! You get 1 point for the day!*";
    messageBlock = [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "🎉 *Great news! You get 1 point for the day!*",
        },
      },
    ];
  } else {
    text = "No worries, let’s try again tomorrow!";
    messageBlock = [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "No worries, let’s try again tomorrow!",
        },
      },
    ];
  }

  client.chat.update({
    ts: body.message.ts,
    channel: body.channel.id,
    text,
    blocks: messageBlock,
  });
};

module.exports = { habitCompleted };
