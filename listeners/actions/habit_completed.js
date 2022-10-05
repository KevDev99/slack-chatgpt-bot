const { updateDailyUserHabit } = require("../../database/db.js");

const habitCompleted = async ({ ack, say, body, client }) => {
  await ack();

  const completed = body.actions[0].value == "yes" ? true : false;

  // get daily user habit id from the metadata
  const { event_payload } = body.message.metadata;
  const { userHabitId } = event_payload;

  // update on the db
  updateDailyUserHabit(userHabitId, { completed });
  
  // send message back to user
  if(completed) {
    client.chat.update({
      ts: body.message.ts,
      
    })
  }
};

module.exports = { habitCompleted };
