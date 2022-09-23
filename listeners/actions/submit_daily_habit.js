const { formatMessageState } = require("../../helper");
const { updateUser, getTeamInformation } = require("../../database/db.js");

const submitDailyHabit = async ({ ack, say, body, client }) => {
  await ack();

  // check if approve or deny
  const action = body.actions[0];
  
  if(!action) return;
  
  if(action.value === 'approve') {
    // inform users in channel that the current user accepted the challenge!
    
  } else {
    
  }
};

module.exports = { submitDailyHabit };
