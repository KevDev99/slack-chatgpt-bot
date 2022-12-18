const { setDialPadStatus } = require("./set_dial_pad_status.js");
const { clearUserStatus } = require("./clear_user_status.js");

module.exports.register = (app) => {
  app.message("Call answered", setDialPadStatus);
  app.message("", clearUserStatus)
};