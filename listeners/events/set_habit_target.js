const { formatState } = require("../../helper");
const { updateUser, getTeamInformation } = require("../../database/db.js");

const setHabitTarget = async ({ ack, say, body, client }) => {
  await ack();

  // get message ts and channelid
  const [messageTs, channelId] = body.view.private_metadata;

  // get selected habits
  console.log(formatState(body.view.state));
};

module.exports = { setHabitTarget };
