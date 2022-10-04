const { setHabit } = require("./set_habit");
const { submitChannel } = require("./submit_channel");

module.exports.register = (app) => {
  app.action("set_daily_habit-0", setHabit);
  app.action("set_daily_habit-1", setHabit);
  app.action("submit_channel", submitChannel);
};
