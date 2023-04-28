const removeUser = require("./remove_user.js");
const sendBotMessage = require("./send_bot_message.js");

module.exports.register = (app) => {
  app.action("remove_user", removeUser);
    app.action("send_bot_message", sendBotMessage);

};
3