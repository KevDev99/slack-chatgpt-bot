const {
  getTeams,
  getDailyUserHabits,
  getTeamInformation,
  updateDailyUserHabit,
  getRandomUsers,
  addChallenge,
  getLatestChallenge,
  getDailyUserHabitsScores,
  updateChallenge,
} = require("../database/db.js");
const cron = require("node-cron");
const axios = require("axios");
const { nthofMonth } = require("../helper/");

const registerJobs = () => {
  sendDailyHabitMessage();
  checkIfDailyHabitsAreDone();
  challengeTime();
  challengeEnding();
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
    if (team._id !== "T01JNNW3ZFD") return;

    try {
      if (team.channel) {
        cron.schedule(
          `49 16 * * WED`,
          async () => {
            // check ordinal week
            const ordinalOfWeekday = nthofMonth(new Date());

            // skip each second week (only needed every second week)
            if (ordinalOfWeekday === 2 || ordinalOfWeekday === 4) return;
            try {
              const randomUsers = await getRandomUsers(6, team._id);

              // split in team blue and red
              const teamRed = [];
              const teamBlue = [];

              randomUsers.map((randomUser, index) => {
                if (index <= (randomUsers.length - 1) / 2) {
                  return teamRed.push({ userId: randomUser, team: "red" });
                }
                teamBlue.push({ userId: randomUser, team: "blue" });
              });

              // set daily habits amount
              await Promise.all(
                teamRed.map(async (user) => {
                  const currentAmount = (
                    await getDailyUserHabitsScores({
                      user_id: user.userId,
                    })
                  )[0].count;
                  user.currentHabitsAmount = currentAmount;
                })
              );

              await Promise.all(
                teamBlue.map(async (user) => {
                  const currentAmount = (
                    await getDailyUserHabitsScores({
                      user_id: user.userId,
                    })
                  )[0].count;
                  user.currentHabitsAmount = currentAmount;
                })
              );

              addChallenge([...teamRed, ...teamBlue], team._id);

              const res = await axios.post(
                "https://slack.com/api/chat.postMessage",
                {
                  text: "🤺 Challenge Time",
                  channel: team.channel,
                  blocks: challengeBody(teamRed, teamBlue),
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

const challengeEnding = async () => {
  const teams = await getTeams();

  teams.map(async (team) => {
    if (team._id !== "T01JNNW3ZFD") return;
    try {
      if (team.channel) {
        cron.schedule(
          `00 08 * * THU`,
          async () => {
            try {
              const challenge = await getLatestChallenge(team._id);

              if (!challenge || challenge.userList.length === 0) return;

              let teamBluePoints = 0;
              let teamRedPoints = 0;

              // calculate points (difference last week score to current score) of each team
              challenge.userList.map(async (challengeUser) => {
                const newScore = await getDailyUserHabitsScores({
                  user_id: challengeUser.userId,
                });
                const points = newScore - challengeUser.currentHabitsAmount;
                if (challengeUser.team === "blue") {
                  teamBluePoints += points;
                } else {
                  teamRedPoints += points;
                }
              });

              let winner;
              let looser;

              if (teamBluePoints > teamRedPoints) {
                winner = { team: "🦋BLUE", points: teamBluePoints };
                looser = { team: "🍎RED", points: teamRedPoints };
              } else {
                winner = { team: "🍎RED", points: teamRedPoints };
                looser = { team: "🦋BLUE", points: teamBluePoints };
              }

              const res = await axios.post(
                "https://slack.com/api/chat.postMessage",
                {
                  text: "🏁 3, 2, 1… Challenge over",
                  channel: team.channel,
                  blocks: challengeEndBody(challenge, winner, looser),
                },
                {
                  headers: {
                    Authorization: `Bearer ${team.bot.token}`,
                  },
                }
              );

              // update challenge -set open to false
              updateChallenge(challenge._id, { open: false });
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

const challengeBody = (teamRed, teamBlue) => {
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

  // add challenge text
  block.push({
    type: "section",
    text: {
      type: "mrkdwn",
      text: `It’s challenge time! I’ve created two teams to face off over the next 7 days to see who can come out on top with the most habit points! 3, 2 1… GO!`,
    },
  });

  // team red
  let teamRedString = "";
  teamRed.map((teamMember) => {
    teamRedString += `<@${teamMember.userId}>\n`;
  });

  block.push({
    type: "section",
    text: {
      type: "mrkdwn",
      text: "Team 🍎RED:\n\n" + teamRedString,
    },
  });

  // team blue
  let teamBlueString = "";
  teamBlue.map((teamMember) => {
    teamBlueString += `<@${teamMember.userId}>\n`;
  });

  block.push({
    type: "section",
    text: {
      type: "mrkdwn",
      text: "Team 🦋BLUE:\n\n" + teamBlueString,
    },
  });

  return block;
};

const challengeEndBody = (challenge, winner, looser) => {
  const block = [
    {
      type: "header",
      text: {
        type: "plain_text",
        text: "🏁 3, 2, 1… Challenge over",
        emoji: true,
      },
    },
  ];

  // check if its undecided (equal pooints)
  if (winner.points === looser.points) {
    block.push({
      type: "section",
      text: {
        type: "mrkdwn",
        text: `3, 2, 1… Challenge over!\n\nDraw! Both teams gave their best and ended with an equal score of ${winner.points} pts! Congratulations! Keep working on your personal daily habits and I’ll see you at the next face off! Who will it be this time?`,
      },
    });
  } else {
    block.push({
      type: "section",
      text: {
        type: "mrkdwn",
        text: `3, 2, 1… Challenge over!\n\nTeam ${winner.team} has come out on top with a total of ${winner.points} pts! Congratulations! Keep working on your personal daily habits and I’ll see you at the next face off! Who will it be this time?`,
      },
    });
  }

  return block;
};

module.exports = registerJobs;
