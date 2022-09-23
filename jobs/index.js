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
        cron.schedule(`00 10 * * *`, async () => {
          try {
            
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



module.exports = registerJobs;
