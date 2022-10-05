const { formatMessageState } = require("../../helper");
const {
  updateUser,
  getHabitByName,
  createUserHabit,
  getTeamInformation,
} = require("../../database/db.js");

const submitHabit = async ({ ack, say, body, client }) => {
  await ack();

  let selectedTargetsText = "";
  const [messageTs, channelId, ...selectedHabits] =
    body.view.private_metadata.split(";");

  // format state
  const state = formatBodyState(body.view.state, selectedHabits);

  // send to db
  state.map((userHabit, index) => {
    userHabit.userId = body.user.id;
    let targetText = userHabit.targetText;
    if (index < state.length - 1) targetText += ",";
    selectedTargetsText += targetText;
    createUserHabit(userHabit);
  });

  // reply to user
  await client.chat.update({
    ts: messageTs,
    channel: channelId,
    text: "Very Nice! you have accepted the daily habit challenge!",
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "Very Nice! you have accepted the daily habit challenge!",
        },
      },
    ],
  });

  const teamChannelId = await getTeamInformation(body.team.id, "channel");

  // notify channel
  await client.chat.postMessage({
    channel: teamChannelId,
    text: `<@${body.user.id}> accepted new habits!`,
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `<@${body.user.id}> has accepted their daily habit of (${selectedTargetsText}). Cheer them on! 🤸🏻`,
        },
      },
    ],
  });
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
        targetText: state.values[key][subKey].selected_option.text.text,
      });
    }
  });

  return formattedState;
};

module.exports = { submitHabit };
