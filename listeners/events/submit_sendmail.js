const { formatState, downloadFile } = require("../../helper");
const {
  dbInstallation,
} = require("../../database/models/installationModel.js");
const { getTeamBotToken } = require("../../database/db.js");

const {MailService}

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
    if (filesString) {
      const files = filesString.split(";");
      for (const fileUrl of files) {
        
        let fileName = fileUrl.split('/').pop();
    
        try {
          await downloadFile(fileName, fileUrl, token);
        } catch (error) {
          console.error(error);
        }
      }
    }
    
    // send mail
    
  } catch (err) {
    console.error(err);
  }
};

module.exports = submitSendMail;
