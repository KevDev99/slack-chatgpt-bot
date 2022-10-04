const { getTeams } = require("../database/db.js");
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
        cron.schedule(
          `33 15 * * *`,
          async () => {
            try {
              // send each user dm with daily habit reminder
              const userListRes = await axios.get(
                "https://slack.com/api/users.list",
                {
                  headers: {
                    Authorization: `Bearer ${team.bot.token}`,
                  },
                }
              );

              const { members } = userListRes.data;

              members.map(async (teamMember) => {
                const res = await axios.post(
                  "https://slack.com/api/chat.postMessage",
                  {
                    text: "Daily Habit",
                    channel: teamMember.id,
                    blocks: dailyHabitBody(),
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${team.bot.token}`,
                    },
                  }
                );
              });
            } catch (error) {
              console.error(error);
            }
          },
          {
            timezone: team.user_tz,
            scheduled: true,
          }
        );
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
        text: "*Welcome to a new day! It’s time to set your healthy habit for the day.*",
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
            text: "Accept",
          },
          action_id: "set_daily_habit-0",
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
          action_id: "set_daily_habit-1",
          style: "danger",
          value: "deny",
        },
      ],
    },
  ];
};

module.exports = registerJobs;
