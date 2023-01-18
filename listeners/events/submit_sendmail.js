const { formatState } = require("../../helper");
const {
  dbInstallation,
} = require("../../database/models/installationModel.js");
const axios = require("axios");

const submitSendMail = async ({ body, client, logger, ack }) => {
  try {
    // format body state
    const state = formatState(body.view.state.values);

    try {
    } catch (err) {
      console.error(err);
    }
  } catch (err) {
    console.error(err);
  }
};

module.exports = submitSendMail;
