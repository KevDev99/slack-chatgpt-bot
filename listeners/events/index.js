const { appHomeOpened } = require("./app_home_opened.js");
const { setHabitTarget } = require("./set_habit_target.js");

module.exports.register = (app) => {
  app.event("app_home_opened", appHomeOpened);
  app.view("set_habit_target", setHabitTarget);
};

