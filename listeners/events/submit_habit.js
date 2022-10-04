const { formatMessageState } = require("../../helper");
const { updateUser, getHabitByName } = require("../../database/db.js");

const submitHabit = async ({ ack, say, body, client }) => {
  await ack();

  const [messageTs, channelId, ...selectedHabits] =
    body.view.private_metadata.split(";");

  const state = formatBodyState(body.view.state, selectedHabits);
  
  
};

const formatBodyState = (state, selectedHabits) => {

  const formattedObj = {};
  const keys = Object.keys(state.values);
  keys.map((key, index) => {
    const subKey = Object.keys(state.values[key])[0];

    if (state.values[key][subKey].type === "static_select") {
      formattedObj[selectedHabits[index]] =
        state.values[key][subKey].selected_option.value;
    }
  });

  return formattedObj;
};

module.exports = { submitHabit };
