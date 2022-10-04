const { setHabit } = require("./set_habit");
const { submitChannel } = require("./submit_channel");
const { setHabitTarget } = require("./set_habit_target");

module.exports.register = (app) => {
  app.action("set_daily_habit-0", setHabit);
  app.action("set_daily_habit-1", setHabit);
  app.action("set_habit_target", setHabitTarget);
  app.action("submit_channel", submitChannel);
};
