const { getUser } = require("../../database/db.js");
const { formatReminderState } = require("../../helper/index.js");

const submitTodo = async ({ ack, body, view, client, logger }) => {
  try {
    // send "clear" signal as response action to close the modal in slack
    await ack();

    // format incoming state
    const state = formatReminderState(view.state.values);

    // get user id from body
    const userId = body["user"]["id"];

    const user = await getUser(userId);
    
    // check null fields
    if (!state.start_time || !state.end_time || !state.interval) {
      publishMessage(
        user,
        `❌ Oh Oh! Looks like some informations are missing 😕 Please make sure you have everything filled out correctly.`,
        client
      );
      return logger.error(`Not all input fields provided`);
    }

    // if end time is smaller than start time -> notify the user that this is forbidden

    if (parseInt(state.start_time) > parseInt(state.end_time)) {
      publishMessage(
        user,
        `❌ Oh Oh! Looks like the end time is lower or equal as the start time 😕 Please make sure that your end time is greater then your start time.`,
        client
      );
      return logger.error(`End time smaller then start time`);
    }

    // get users timezone offset with the users information
    const user_info = await client.users.info({
      user: user._id,
    });


    // send success message
    publishMessage(
      user,
      `Your Reminder settings have been saved successfully ✅
the Drink Water Reminder is ready 💧`,
      client
    );
  } catch (error) {
    console.error(error);
  }
};

module.exports = { submitTodo };
