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

    console.log(state);

    if ((!files || files === "") && (!state.message || state.message == ""))
      return;
    
    console.log("send mail")
  } catch (err) {
    console.error(err);
  }
};

module.exports = submitSendMail;
