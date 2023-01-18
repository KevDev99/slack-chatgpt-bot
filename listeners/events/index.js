const submitSendMail = require("./submit_sendmail.js");

module.exports.register = (app) => {
  app.view("submit_sendmail", submitSendMail);
};
