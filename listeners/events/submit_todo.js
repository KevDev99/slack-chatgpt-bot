const { getUser, addTask } = require("../../database/db.js");
const { formatReminderState } = require("../../helper/index.js");

const submitTodo = async ({ ack, body, view, client, logger }) => {
  try {
    // send "clear" signal as response action to close the modal in slack
    await ack();

    console.log(client.views);

    // format incoming state
    const state = formatReminderState(view.state.values);

    // get user id from body
    const userId = body["user"]["id"];

    // get user informations
    const user = await getUser(userId);

    // check null fields
    if (!state.summary) {
      return logger.error(`Mandatory summary field not provided!`);
    }

    // add new todo to database
    await addTask(state.summary, state.notes, state.assigned_user, userId);
  } catch (error) {
    console.error(error);
  }
};

module.exports = { submitTodo };
