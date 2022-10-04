const { formatState } = require("../../helper");
const { updateUser, getHabitByName } = require("../../database/db.js");

const submitHabit = async ({ ack, say, body, client }) => {
  await ack();
  
  console.log(body.view.state);
};

module.exports = { submitHabit };
