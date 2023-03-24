const removeUser = require("./remove_user.js");

module.exports.register = (app) => {
  app.action("remove_user", removeUser);
};
3