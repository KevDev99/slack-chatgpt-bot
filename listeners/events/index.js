const { appMention } = require("./app_mention.js");
const { appHomeOpened } = require("./app_home_opened.js");

module.exports.register = (app) => {
  app.event("app_mention", appMention);
  app.event("app_home_opened", appHomeOpened);
};
