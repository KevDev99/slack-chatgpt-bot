const { formatMessageState } = require("../../helper");
const {
  updateUser,
  getHabitByName,
  createUserHabit,
} = require("../../database/db.js");

const submitHabit = async ({ ack, say, body, client }) => {
  await ack();

  const [messageTs, channelId, ...selectedHabits] =
    body.view.private_metadata.split(";");

  // format state
  const state = formatBodyState(body.view.state, selectedHabits);

  // send to db
  state.map((userHabit) => {
    userHabit.userId = body.user.id;
    createUserHabit(userHabit);
  });
  
  // reply to user
  await client.chat.update({
    ts: messageTs,
    channel: channelId,
    text: ""
  })
};

const formatBodyState = (state, selectedHabits) => {
  const formattedState = [];
  const keys = Object.keys(state.values);
  keys.map((key, index) => {
    const subKey = Object.keys(state.values[key])[0];

    if (state.values[key][subKey].type === "static_select") {
      formattedState.push({
        name: selectedHabits[index],
        targetValue: state.values[key][subKey].selected_option.value,
      });
    }
  });

  return formattedState;
};

module.exports = { submitHabit };
