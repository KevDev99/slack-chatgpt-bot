const { connect } = require("./database/db.js");
const { registerListeners } = require("./listeners");

const { app, receiver } = require("./config/index.js");

// connect to db
connect();

// register Listeners (actions, commands, events, ... -> all slack related api endpoints)
registerListeners(app);

(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);
  console.log("⚡️ Bolt app is running!");
})();
