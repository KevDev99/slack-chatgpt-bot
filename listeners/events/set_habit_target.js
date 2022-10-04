const { formatState } = require("../../helper");
const { updateUser, getTeamInformation } = require("../../database/db.js");

const setHabitTarget = async ({ ack, say, body, client }) => {
  await ack();

  // get message ts and channelid
  const [messageTs, channelId] = body.view.private_metadata;

  // get selected habits
  const {checkboxes: selectedHabits} = formatState(body.view.state);
  
  // loop through every selected habit and add input to select the target / goal value
  selectedHabits.map(habit => {
    if(habit)
  })
  
};

module.exports = { setHabitTarget };
