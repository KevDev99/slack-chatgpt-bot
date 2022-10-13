onst { setHabit } = require("./set_habit");
const { submitChannel } = require("./submit_channel");
const { habitCompleted } = require("./habit_completed");

module.exports.register = (app) => {
  app.action("set_daily_habit-0", setHabit);
  app.action("set_daily_habit-1", setHabit);
  app.action("submit_channel", submitChannel);
  app.action("habit_completed-0", habitCompleted);
  app.action("habit_completed-1", habitCompleted);
};