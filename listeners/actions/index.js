const sendMail = require("./send_mail.js");
const addUser = require("./add_user.js");

module.exports.register = (app) => {
  app.shortcut("send_mail", sendMail);
  app.action("add_user-action", addUser);
};
