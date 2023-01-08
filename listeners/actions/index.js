const openConnectServicenow = require("./open_connect_servicenow.js");
const disconnectInstance = require("./disconnect_instance.js");

module.exports.register = (app) => {
  app.action("open_connect_servicenow", openConnectServicenow);
  app.action("disconnect_instance", disconnectInstance);
};
