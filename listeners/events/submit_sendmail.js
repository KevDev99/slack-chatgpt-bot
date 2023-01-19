const { formatState, downloadFile } = require("../../helper");
const {
  dbInstallation,
} = require("../../database/models/installationModel.js");
const { getTeamBotToken } = require("../../database/db.js");

const { MailService } = require("../../services");

const axios = require("axios");

const submitSendMail = async ({ body, client, logger, ack }) => {
  try {
    await ack();

    // format body state
    const state = formatState(body.view.state.values);

    const token = await getTeamBotToken(body.team.id);

    const filesString = body.view.private_metadata;

    // check that at least one is given
    if (
      (!filesString || filesString === "") &&
      (!state.message || state.message == "")
    )
      return;

    // if files given -> temporarily download them
    const downloadedFiles = [];
    if (filesString) {
      const files = filesString.split(";");
      for (const fileUrl of files) {
        let fileName = fileUrl.split("/").pop();

        try {
          const base64 = await downloadFile(fileName, fileUrl, token);
          console.log(base64);
          const fileObj = {
            filename: fileName,
            content: base64.toString(),
            encoding: "base64",
          };
          downloadedFiles.push(fileObj);
        } catch (error) {
          console.error(error);
        }
      }
    }

    // send mail
    state.receipts.map((receipt) =>
      MailService.mail(
        receipt.value,
        "New Mail From Slack",
        state.message,
        downloadedFiles
      )
    );
  } catch (err) {
    console.error(err);
  }
};

module.exports = submitSendMail;
