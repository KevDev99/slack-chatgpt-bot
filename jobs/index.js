const {
  getTeams,
  getDailyUserHabits,
  getTeamInformation,
  updateDailyUserHabit,
  getRandomUsers,
} = require("../database/db.js");
const cron = require("node-cron");
const axios = require("axios");

const registerJobs = () => {
  sendDailyHabitMessage();
  checkIfDailyHabitsAreDone();
  challengeTime();
};

const sendDailyHabitMessage = async () => {
  const teams = await getTeams();

  teams.map(async (team) => {
    try {
      if (team.channel) {
        cron.schedule(
          `53 07 * * *`,
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

const checkIfDailyHabitsAreDone = async () => {
  try {
    const teams = await getTeams();
    teams.map(async (team) => {
      cron.schedule(
        `51 07 * * *`,
        async () => {
          // get open daily habits
          const openDailyUserHabits = await getDailyUserHabits({
            status: false,
            team_id: team.team.id,
          });

          // get team bot token
          const teamBotToken = await getTeamInformation(
            team.team.id,
            "bot.token"
          );

          // loop through all open habits and set status to "closed" (true), and also send message to the user if he has completed the habit
          openDailyUserHabits.map(async (dailyUserHabit) => {
            // send user dm if he has completed the habit or not
            await axios.post(
              "https://slack.com/api/chat.postMessage",
              {
                channel: dailyUserHabit.user_id,
                text: "Have you completed your daily habit?",
                metadata: {
                  event_type: "habit_closed",
                  event_payload: {
                    userHabitId: dailyUserHabit._id,
                  },
                },
                blocks: [
                  {
                    type: "section",
                    text: {
                      type: "mrkdwn",
                      text: "*Have you completed your habit today?*",
                    },
                  },
                  {
                    type: "section",
                    text: {
                      type: "mrkdwn",
                      text: dailyUserHabit.targetText,
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
                          text: "Yes!",
                        },
                        style: "primary",
                        value: "yes",
                        action_id: "habit_completed-0",
                      },
                      {
                        type: "button",
                        text: {
                          type: "plain_text",
                          emoji: true,
                          text: "No",
                        },
                        style: "danger",
                        value: "no",
                        action_id: "habit_completed-1",
                      },
                    ],
                  },
                ],
              },
              {
                headers: {
                  Authorization: `Bearer ${teamBotToken}`,
                },
              }
            );

            // close status
            updateDailyUserHabit(dailyUserHabit._id, { status: true });
          });
        },
        {
          timezone: team.user_tz,
          scheduled: true,
        }
      );
    });
  } catch (error) {
    console.error(error);
  }
};

const challengeTime = async () => {
  const teams = await getTeams();

  teams.map(async (team) => {

    try {
      if (team.channel) {
        cron.schedule(
          `00 10 * * WED`,
          async () => {
            try {
              const randomUsers = await getRandomUsers(2, team._id);

              const res = await axios.post(
                "https://slack.com/api/chat.postMessage",
                {
                  text: "🤺 Challenge Time",
                  channel: team.channel,
                  blocks: challengeBody(randomUsers),
                },
                {
                  headers: {
                    Authorization: `Bearer ${team.bot.token}`,
                  },
                }
              );
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

const dailyHabitBody = async () => {
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

const challengeBody = (randomUsers) => {
  const block = [
    {
      type: "header",
      text: {
        type: "plain_text",
        text: "🤺 Challenge Time",
        emoji: true,
      },
    },
  ];

  block.push({
    type: "section",
    text: {
      type: "mrkdwn",
      text: `Welcome to a new week! This week I select <@${randomUsers[0]}> and <@${randomUsers[1]}> to face off! You have the next 7 days to accumulate your habit points and climb the leaderboard. Let’s see who comes out on top! The loser owes the winner a ☕ ! `,
    },
  });

  return block;
};

module.exports = registerJobs;
