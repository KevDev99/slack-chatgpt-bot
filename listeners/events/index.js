const { appMention } = require("./app_mention.js");

module.exports.register = (app) => {
  app.event("app_mention", appMention);
};
