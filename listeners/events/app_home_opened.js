const { getDailyUserHabitsScores } = require("../../database/db.js");

const moment = require("moment");

const appHomeOpened = async ({ event, client, body, say, context }) => {
  console.log(body);
  
  const appHomeBlock = await getAppHome(body.authorizations[0].team_id)
  try {
    // Call views.publish with the built-in client
    const result = await client.views.publish({
      // Use the user ID associated with the event
      user_id: event.user,
      view: {
        blocks: [
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
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: "1. <@U42424242> (100 points)",
            },
          },
        ],
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
  const userHabitsScores = await getDailyUserHabitsScores({team_id: teamId, completed: true, status: true});
  
  userHabitsScores.map((userHabit, index) => {
    block.push({
            type: "section",
            text: {
              type: "mrkdwn",
              text: `${index+1}. <@${userHabit._id}> (${index} points)`,
            },
          })
  })
};

module.exports = { appHomeOpened };
