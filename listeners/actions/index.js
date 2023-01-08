const openConnectServicenow = require('./open_connect_servicenow.js');

module.exports.register = (app) => {
  app.action("open_connect_servicenow", openConnectServicenow)
};
