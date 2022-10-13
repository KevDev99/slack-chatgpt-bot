const { getDailyUserHabitsScores } = require("../../database/db.js");

const moment = require("moment");

const appHomeOpened = async ({ event, client, body, say, context }) => {
  const appHomeBlock = await getAppHome(body.authorizations[0].team_id);

  try {
    // Call views.publish with the built-in client
    const result = await client.views.publish({
      // Use the user ID associated with the event
      user_id: event.user,
      view: {
        type: "home",
        blocks: appHomeBlock,
      },
    });
  } catch (error) {
    console.error(error);
  }
};

const getAppHome = async (teamId) => {
  const block = [
    {
      type: "header",
      text: {
        type: "plain_text",
        text: "🏆 Leaderboard",
        emoji: true,
      },
    },
    {
      type: "divider",
    },
  ];

  // get completed habits
  const userHabitsScores = await getDailyUserHabitsScores({
    team_id: teamId,
    completed: true,
    status: true,
  });
  

  for (const userHabit of userHabitsScores.sort(compare)) {
    block.push({
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*${userHabitsScores.indexOf(userHabit) + 1}. <@${
          userHabit._id
        }> (${userHabit.count} points)*`,
      },
    });
  }

  return block;
};

function compare(a, b) {
  if (a.count > b.count) return -1;
  if (a.count < b.count) return 1;
  return 0;
}
module.exports = { appHomeOpened };
