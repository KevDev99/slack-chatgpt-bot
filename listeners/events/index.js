const submitSendMail = require("./submit_sendmail.js");
const {appHomeOpened} = require("./app_home_opened.js");

module.exports.register = (app) => {
  app.view("submit_sendmail", submitSendMail);
  app.event("app_home_opened", appHomeOpened);
  app.event("app_home_opened", appHomeOpened);
};
