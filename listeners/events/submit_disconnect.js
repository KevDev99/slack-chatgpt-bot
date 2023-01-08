const { formatState } = require("../../helper");
const {
  dbInstallation,
} = require("../../database/models/installationModel.js");
const axios = require("axios");

const {connectedInstanceBody}

const submitDisconnect = async ({ body, client, logger, ack }) => {
  try {
    // delete servicenow object of installation
    await dbInstallation.updateOne(
      { _id: body.team.id },
      { $unset: { servicenow: 1 } }
    );
    
    // refresh view
    const blocks = 
    await client.views.publish({
      // Use the user ID associated with the event
      user_id: body.user.id,
      view: {
        // Home tabs must be enabled in your app configuration page under "App Home"
        type: "home",
        blocks,
      },
    });
    
    await ack();
  } catch (err) {
    console.error(err);
  }
};

module.exports = submitDisconnect;
