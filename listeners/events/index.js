const { appHomeOpened } = require("./app_home_opened.js");
const { setHabitTarget } = require("./set_habit_target.js");
const { submitHabit } = require("./submit_habit.js");

module.exports.register = (app) => {
  app.event("app_home_opened", appHomeOpened);
  app.view("set_habit_target", setHabitTarget);
  app.view("submit_habit", submitHabit);
};
