const { formatState } = require("../../helper");
const {
  dbInstallation,
} = require("../../database/models/installationModel.js");
const axios = require("axios");

const submitSendMail = async ({ body, client, logger, ack }) => {
  try {
    await ack();

    // format body state
    const state = formatState(body.view.state.values);

    const files = body.view.private_metadata;

    // check that at least one is given
    if ((!files || files === "") && (!state.message || state.message == ""))
      return;
    
    // if files given -> temporarily download them
    
  } catch (err) {
    console.error(err);
  }
};

module.exports = submitSendMail;
