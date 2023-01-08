const { formatState } = require("../../helper");
const {
  dbInstallation,
} = require("../../database/models/installationModel.js");
const axios = require("axios");

const submitDisconnect = async ({ body, client, logger, ack }) => {
  try {
    console.log("DISCONNECT");
  } catch (err) {
    console.error(err);
  }
};

module.exports = submitDisconnect;
