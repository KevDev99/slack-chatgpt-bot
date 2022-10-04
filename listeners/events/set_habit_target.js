const { formatState } = require("../../helper");
const { updateUser, getHabitByName } = require("../../database/db.js");

const setHabitTarget = async ({ ack, say, body, client }) => {
  let updateBlock = [];
  let metadata = "";

  // add message ts and channel id to the metadata
  metadata = body.view.privatemetadata;

  // get selected habits
  const { checkboxes: selectedHabits } = formatState(body.view.state);

  // loop through every selected habit and add the input block to the updateBlock

  for (let selectedHabit of selectedHabits) {
    // get habit
    const habit = await getHabitByName(selectedHabit.value);

    // add block to updateBlock
    updateBlock = updateBlock.concat([...habit.inputBlock]);

    // add selected value of habit to  metadata
    metadata = metadata + ";" + habit.value;
  }

  const newView = {
    // Home tabs must be enabled in your app configuration page under "App Home"
    type: "modal",
    private_metadata: metadata,
    callback_id: "submit_habit",
    title: body.view.title,
    submit: {
      type: "plain_text",
      text: "Submit",
      emoji: true,
    },
    close: body.view.close,
    blocks: updateBlock,
  };

  await ack({
    response_action: "update",
    view: newView,
  });
};

module.exports = { setHabitTarget };
