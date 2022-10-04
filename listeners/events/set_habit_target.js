const { formatState } = require("../../helper");
const { updateUser, getHabitByName } = require("../../database/db.js");

const setHabitTarget = async ({ ack, say, body, client }) => {
  await ack();
  const updateBlock = [];
  
  // get message ts and channelid
  const [messageTs, channelId] = body.view.private_metadata;

  // get selected habits
  const {checkboxes: selectedHabits} = formatState(body.view.state);
  
  // loop through every selected habit and add the input block to the updateBlock

  
  for (let selectedHabit of selectedHabits) {
     // get habit
    const habit = await getHabitByName(selectedHabit.value);
    
    // add block to updateBlock
    updateBlock = updateBlock.concat()

  }
  
  
};

module.exports = { setHabitTarget };
