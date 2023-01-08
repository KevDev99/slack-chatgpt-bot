const connectServicenow = require('./connect_servicenow.js');

module.exports.register = (app) => {
  app.action("connect_servicenow", connectServicenow)
};
