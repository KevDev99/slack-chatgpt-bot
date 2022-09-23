const { getTeams, getEmojiMetrics } = require("../database/db.js");
const cron = require("node-cron");
const axios = require("axios");

const registerJobs = () => {
  sendDailyHabitMessage();
};

const sendDailyHabitMessage = async () => {
  const teams = await getTeams();

  teams.map(async (team) => {
    try {
      if (team.channel) {
        cron.schedule(`40 12 * * *`, async () => {
          try {
            const res = await axios.post(
              "https://slack.com/api/chat.postMessage",
              {
                text: "Daily Habit",
                channel: team.channel,
                blocks: dailyHabitBody(),
              },
              {
                headers: {
                  Authorization: `Bearer ${team.bot.token}`,
                },
              }
            );
            console.log(res);
          } catch (error) {
            console.error(error);
          }
        });
      }
    } catch (error) {
      console.error(error);
    }
  });
};

const dailyHabitBody = () => {
  return [
    {
      type: "header",
      text: {
        type: "plain_text",
        text: "Daily Habit",
        emoji: true,
      },
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: "*time to set your daily habits!*",
      },
    },
    {
      type: "actions",
      elements: [
        {
          type: "button",
          text: {
            type: "plain_text",
            emoji: true,
            text: "Approve",
          },
          action_id: "submit_daily_habit-0",
          style: "primary",
          value: "approve",
        },
        {
          type: "button",
          text: {
            type: "plain_text",
            emoji: true,
            text: "Deny",
          },
          action_id: "submit_daily_habit-1",
          style: "danger",
          value: "deny",
        },
      ],
    },
  ];
};

module.exports = registerJobs;
