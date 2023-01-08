const { connect } = require("./database/db.js");
const { registerListeners } = require("./listeners");
const { registerRoutes } = require("./routes");

const {app: appConfig, receiver} = require('./config/app.js');

const app = appConfig

// connect to db
connect();
// register Listeners (actions, commands, events, ... -> all slack related api endpoints)
registerListeners(app);
// register routes
registerRoutes(receiver);

(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);
  console.log("⚡️ Bolt app is running!");
})();
