const sendMail = require('./send_mail.js');

module.exports.register = (app) => {
  app.shortcut("send_mail", sendMail)
};
