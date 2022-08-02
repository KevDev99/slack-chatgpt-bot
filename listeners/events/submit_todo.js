const { getUser, addTask, updateTask } = require("../../database/db.js");
const { formatReminderState } = require("../../helper/index.js");

const { getAppHome } = require("./app_home_opened.js");

const submitTodo = async ({ ack, body, view, client, logger }) => {
  try {
    // send "clear" signal as response action to close the modal in slack
    await ack();

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

    // check if there is an external_id provided -> submit is an edit form
    const private_metadata = body.view.private_metadata;

    if (private_metadata) {
      await updateTask(private_metadata, {
        summary: state.summary,
        notes: state.notes,
        assigned_user: state.assigned_user,
      });
    } else {
      // add new todo to database
      await addTask(state.summary, state.notes, state.assigned_user, userId);

      // if a user has been assigned -> send user information
      if (state.assigned_user) {
        client.chat.postMessage({
          channel: state.assigned_user,
          blocks: [
            {
              type: "section",
              text: {
                type: "plain_text",
                text: "🆕 task assigned:",
                emoji: true,
              },
            },
            {
              type: "header",
              text: {
                type: "plain_text",
                text: state.summary,
                emoji: true,
              },
            },
            {
              type: "context",
              elements: [
                {
                  type: "mrkdwn",
                  text: "From: " + `<@${userId}>`,
                },
              ],
            },
          ],
        });
      }
    }

    // update view
    client.views.publish({
      view: (await getAppHome()).view,
      user_id: userId,
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = { submitTodo };
