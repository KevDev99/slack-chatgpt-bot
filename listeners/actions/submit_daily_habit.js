const { formatMessageState } = require("../../helper");
const { updateUser, getTeamInformation } = require("../../database/db.js");

const submitDailyHabit = async ({ ack, say, body, client }) => {
  await ack();

  // check if approve or deny
  const action = body.actions[0];
  
  if(!action) return;
  
  if(action.value === 'approve') {
    // inform users in channel that the current user accepted the challenge
    const teamChannelId = await getTeamInformation(body.team.id);
    
    client.chat.postMessage({
      channel: teamChannelId,
      text: "user has accepted their daily habit challenge!",
      blocks: [{
        
      }]
    })
    
  } else {
    // update message"you’ve declined your habits today. No worries, get after it tomorrow!"
    client.chat.update({
      channel: body.channel.id,
      ts: body.message.ts,
      text: "you’ve declined your habits today. No worries, get after it tomorrow!",
    })    
  }
};

module.exports = { submitDailyHabit };
